<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="时间">
              <a-date-picker v-model="queryParam.curDate" style="width: 100%" placeholder="请输入更新日期"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="姓名">
              <a-input v-model="queryParam.labourName" placeholder="姓名"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="编号">
              <a-input v-model="queryParam.labourId" placeholder="编号"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="手机号">
              <a-input v-model="queryParam.telephone" placeholder="手机号"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="人员状态">
              <a-input v-model="queryParam.labourStatus" placeholder="状态"/>
            </a-form-item>
          </a-col>
          <a-col :md="3" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="{ float: 'right', overflow: 'hidden' } || {} "
            >
              <a-button type="primary" @click="$refs.table.refresh(true, {queryParam})">查询</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      ref="table"
      size="default"
      :columns="columns"
      :data="loadData"
      :search="search"
      :alert="{ show: true, clear: true }"
      :rowSelection="{ selectedRowKeys: this.selectedRowKeys, onChange: this.onSelectChange }"
    >
      <template
        v-for="(col, index) in columns"
        v-if="col.scopedSlots"
        :slot="col.dataIndex"
        slot-scope="text, record"
      >
        <div :key="index">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col, record)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="action" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record)">保存</a>
            <a-divider type="vertical" />
            <a-popconfirm title="真的放弃编辑吗?" @confirm="() => cancel(record)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a class="edit" @click="() => edit(record)">修改</a>
          </span>
        </div>
      </template>
    </s-table>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { axios } from '../../utils/request'
import { builder } from '../../mock/util'
export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '姓名',
          dataIndex: 'no',
          width: '100px'
        },
        {
          title: '编号',
          width: '150px',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '手机号',
          width: '150px',
          dataIndex: 'tel',
          scopedSlots: { customRender: 'tel' }
        },
        {
          title: '日期',
          width: '150px',
          dataIndex: 'curDate',
          scopedSlots: { customRender: 'curDate' }
        },
        {
          title: '进场体温',
          width: '150px',
          dataIndex: 'inTemperature',
          scopedSlots: { customRender: 'inTemperature' }
        },
        {
          title: '出场体温',
          width: '150px',
          dataIndex: 'outTemperature',
          scopedSlots: { customRender: 'outTemperature' }
        },
        {
          title: '人员状态',
          width: '150px',
          dataIndex: 'labourStatus',
          scopedSlots: { customRender: 'labourStatus' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return axios({
          method: 'get',
          url: `/labourTemperature/allLabours?pageNum=${parameter.pageNum}&pageSize=10`
        }).then(mork => {
          const totalCount = mork.total
          const parameters = {
            pageNo: mork.pageNum,
            pageSize: mork.pageSize
          }
          const result = []
          const pageNo = parseInt(parameters.pageNo)
          const pageSize = parseInt(parameters.pageSize)
          const totalPage = Math.ceil(totalCount / pageSize)
          // const key = (pageNo - 1) * pageSize
          const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1
          for (let i = 1; i < next; i++) {
            // const tmpKey = key + i
            result.push({
              no: mork.list[i - 1].labourName,
              id: mork.list[i - 1].labourId,
              tel: mork.list[i - 1].telephone,
              curDate: mork.list[i - 1].curDate,
              inTemperature: mork.list[i - 1].inTemperature,
              outTemperature: mork.list[i - 1].outTemperature,
              labourStatus: mork.list[i - 1].labourStatus,
              editable: false
            })
          }
          return builder({
            pageSize: pageSize,
            pageNo: pageNo,
            totalCount: totalCount,
            totalPage: totalPage,
            data: result
          })
        })
      },
      search: parameter => {
        parameter = {
          ...(parameter.queryParam),
          pageNum: parameter.pageNum,
          pageSize: 10
        }
        parameter.curDate = parameter.curDate !== null ? parameter.curDate._d.getFullYear() + '-' + (1 + parameter.curDate._d.getMonth()) + '-' + parameter.curDate._d.getDate() : undefined
        console.log('search.parameter', parameter)
        for (const key in parameter) {
          if (parameter[key] === '' || parameter[key] === undefined) delete parameter[key]
        }
        return axios({
          method: 'get',
          url: `/labourTemperature/allLabours`,
          data: parameter
        }).then(mork => {
          const totalCount = mork.total
          const parameters = {
            pageNo: mork.pageNum,
            pageSize: mork.pageSize
          }
          const result = []
          const pageNo = parseInt(parameters.pageNo)
          const pageSize = parseInt(parameters.pageSize)
          const totalPage = Math.ceil(totalCount / pageSize)
          // const key = (pageNo - 1) * pageSize
          const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1
          for (let i = 1; i < next; i++) {
            // const tmpKey = key + i
            result.push({
              no: mork.list[i - 1].labourName,
              id: mork.list[i - 1].labourId,
              tel: mork.list[i - 1].telephone,
              curDate: mork.list[i - 1].curDate,
              inTemperature: mork.list[i - 1].inTemperature,
              outTemperature: mork.list[i - 1].outTemperature,
              labourStatus: mork.list[i - 1].labourStatus,
              editable: false
            })
          }
          return builder({
            pageSize: pageSize,
            pageNo: pageNo,
            totalCount: totalCount,
            totalPage: totalPage,
            data: result
          })
        })
      },

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    handleChange (value, key, column, record) {
      console.log(value, key, column)
      record[column.dataIndex] = value
    },
    edit (row) {
      row.editable = true
      // row = Object.assign({}, row)
    },
    // eslint-disable-next-line
    del (row) {
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${row.no} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          console.log('OK')
          // 在这里调用删除接口
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    save (row) {
      row.editable = false
    },
    cancel (row) {
      row.editable = false
    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}

.fold {
  width: calc(100% - 216px);
  display: inline-block;
}

.operator {
  margin-bottom: 18px;
}

@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
.table-page-search-wrapper {
  text-align: center;
}
</style>
