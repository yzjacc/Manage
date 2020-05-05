<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input v-model="queryParam.name" placeholder="请输入项目名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="手机号">
              <a-input v-model="queryParam.phone" placeholder="请输入项目编号"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">未完成</a-select-option>
                <a-select-option value="1">完成</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="上岗日期">
              <a-date-picker v-model="queryParam.dateStart" style="width: 100%" placeholder="开始时间"/>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24" style="margin-left:-30px">
            <!-- <a-form-item label="创建日期"> -->
            <a-date-picker v-model="queryParam.dateEnd" style="width: 100%" placeholder="结束时间"/>
            <!-- </a-form-item> -->
          </a-col>
          <a-col :md=" 14" :sm="24" style="margin-left:30px">
            <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin: 0 8px" @click="() => queryParam = {}">重置</a-button>
              <a href="/labour/labour/outputExcel" download="文件名.xls"><a-button type="primary">导出</a-button></a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      size="default"
      :columns="columns"
      :data="loadData"
      :alert="{ show: true, clear: true }"
      :rowSelection="{ selectedRowKeys: this.selectedRowKeys, onChange: this.onSelectChange }"
    >
      <template v-for="(col, index) in columns" v-if="col.scopedSlots" :slot="col.dataIndex" slot-scope="text, record">
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
            <a-divider type="vertical" />
            <a class="delete" @click="() => del(record)">删除</a>
          </span>
        </div>
      </template>
    </s-table>
    <!-- <create-form ref="createModal" @ok="handleOk" /> -->
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { axios } from '../../utils/request'
import { builder } from '../../mock/util'
// import CreateForm from './modules/MessCreateForm'

export default {
  name: 'TableList',
  components: {
    STable
    // CreateForm
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
          title: '劳工编号',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '姓名',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '手机号',
          dataIndex: 'telenumber',
          scopedSlots: { customRender: 'telenumber' }
        },
        {
          title: '从事工种',
          dataIndex: 'sorts',
          scopedSlots: { customRender: 'sorts' }
        },
        {
          title: '上岗日期',
          dataIndex: 'date',
          scopedSlots: { customRender: 'date' }
        },
        {
          title: '身份证号',
          dataIndex: 'idcard',
          scopedSlots: { customRender: 'idcard' }
        },
        {
          title: '工资待遇(元/工日)',
          dataIndex: 'money',
          scopedSlots: { customRender: 'money' }
        },
        {
          title: '工作时间(小时/天)',
          dataIndex: 'timenum',
          scopedSlots: { customRender: 'timenum' }
        },
        {
          title: '银行卡号',
          dataIndex: 'moneycard',
          scopedSlots: { customRender: 'moneycard' }
        },
        {
          title: '更新时间',
          dataIndex: 'updatetime',
          scopedSlots: { customRender: 'updatetime' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return axios({
          method: 'get',
          url: `/labour/labour/listLabourSerach?pageNum=${parameter.pageNum - 1}&pageSize=10`
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
          const key = (pageNo - 1) * pageSize
          const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1
          for (let i = 1; i < next; i++) {
            const tmpKey = key + i
            result.push({
              key: tmpKey,
              id: mork.list[i - 1].labourNum,
              name: mork.list[i - 1].labourName,
              telenumber: mork.list[i - 1].telephone,
              sorts: mork.list[i - 1].personnelType,
              startTime: mork.list[i - 1].startTime,
              date: mork.list[i - 1].personnelType,
              idcard: mork.list[i - 1].cardNum,
              money: mork.list[i - 1].salary,
              salary: mork.list[i - 1].state,
              timenum: mork.list[i - 1].workTime,
              updatetime: mork.list[i - 1].workTime.gmtModified,
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
      console.log(row, 'ss')
      row.editable = false
      this.$refs.table.refresh(true)
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
    display: inline-block
  }

  .operator {
    margin-bottom: 18px;
  }

  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
