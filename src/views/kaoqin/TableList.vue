<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <!-- <a-col :md="8" :sm="24">
            <a-form-item label="项目名称">
              <a-input v-model="queryParam.name" placeholder="请输入项目名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="项目编号">
              <a-input v-model="queryParam.id" placeholder="请输入项目编号"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="项目管理员">
              <a-input v-model="queryParam.manage" placeholder="请输入项目管理员"/>
            </a-form-item>
          </a-col> -->
          <a-col :md="8" :sm="24">
            <a-form-item label="设备ID">
              <a-input placeholder="请输入设备ID" v-model="queryParam.terminalId" />
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
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
          title: '设备ID(序列号)',
          dataIndex: 'no'
        },
        {
          title: '设备安装地址',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '类型',
          dataIndex: 'callNo',
          sorter: true,
          needTotal: true,
          scopedSlots: { customRender: 'callNo' }
          // customRender: (text) => text + ' 次'
        },
        {
          title: '安装场景',
          dataIndex: 'status',
          needTotal: true,
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '安装时间',
          dataIndex: 'updatedAt',
          sorter: true,
          scopedSlots: { customRender: 'updatedAt' }
        }
        // {
        //   table: '操作',
        //   dataIndex: 'action',
        //   scopedSlots: { customRender: 'action' }
        // }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return axios({
          method: 'get',
          url: `/terminal/selectTerminal?pageNum=${parameter.pageNum}&pageSize=10`
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
              no: mork.list[i - 1].terminalId,
              description: mork.list[i - 1].terminalAddress,
              callNo: mork.list[i - 1].terminalType,
              status: mork.list[i - 1].setScene,
              updatedAt: mork.list[i - 1].setDate,
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
          terminalId: parameter.queryParam.terminalId,
          pageNum: parameter.pageNum,
          pageSize: 10
        }
        console.log(parameter)

        return axios({
          method: 'get',
          url: `/terminal/selectTerminal?terminalId=${parameter.terminalId}&pageNum=1&pageSize=10`,
          data: parameter
        }).then(mork => {
          console.log(mork)
          const totalCount = mork.total
          const parameters = {
            pageNo: mork.pageNum - 1,
            pageSize: mork.pageSize
          }
          const result = []
          const pageNo = parseInt(parameters.pageNo)
          const pageSize = parseInt(parameters.pageSize)
          const totalPage = Math.ceil(totalCount / pageSize)
          // const key = (pageNo - 1) * pageSize
          // const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1
          for (let i = 1; i <= mork.size; i++) {
            // const tmpKey = key + i
            // var date = new Date(mork.list[i - 1].gmtCreate)
            result.push({
              no: mork.list[i - 1].terminalId,
              description: mork.list[i - 1].terminalAddress,
              callNo: mork.list[i - 1].terminalType,
              status: mork.list[i - 1].setScene,
              updatedAt: mork.list[i - 1].setDate,
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
    handleOk (value) {
      value.gmtCreate = value.gmtCreate._d.getFullYear() + '-' + (1 + value.gmtCreate._d.getMonth()) + '-' + value.gmtCreate._d.getDate()
      if (value.state !== 0) {
        if (value.state === 1) {
          value.state = '完成'
        } else {
          value.state = '未完成'
        }
      } else delete value.state
      return axios({
        method: 'post',
        url: `/proInformation/insertProInformation`
      }).then(() => {
        this.$refs.table.refresh(true)
      })
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
