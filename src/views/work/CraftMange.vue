<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="工种名称">
              <a-input placeholder="请输入工种名称" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
            >
              <a-button type="primary">查询</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">添加工种</a-button>&nbsp;&nbsp;
      <a-button type="dashed" @click="tableOption">{{ optionAlertShow && '关闭' || '开启' }} alert</a-button>

    </div>
    <s-table
      ref="table"
      size="default"
      :columns="columns"
      :data="loadData"
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
            <!-- <a class="edit" @click="() => edit(record)">修改</a> -->
            <!-- <a-divider type="vertical" /> -->
            <a class="delete" @click="() => del(record)">删除</a>
          </span>
        </div>
      </template>
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { axios } from '../../utils/request'
import { builder } from '../../mock/util'
import CreateForm from './MessCreateForm'

export default {
  name: 'TableList',
  components: {
    STable,
    CreateForm
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
          title: '工种名称',
          dataIndex: 'no'
        },
        {
          title: '添加时间',
          dataIndex: 'status',
          needTotal: true,
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '备注',
          dataIndex: 'updatedAt',
          sorter: true,
          scopedSlots: { customRender: 'updatedAt' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return axios({
          method: 'get',
          url: `/labour/listLabourWork`
        }).then(mork => {
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
            console.log(mork.list[i - 1].workId)
            result.push({
              key: mork.list[i - 1].workId,
              no: mork.list[i - 1].profession,
              updatedAt: mork.list[i - 1].message === null ? '' : mork.list[i - 1].message,
              status: mork.list[i - 1].gmtCreate,
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
