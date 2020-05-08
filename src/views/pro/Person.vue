<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="10" :sm="24">
            <a-form-item label="项目ID" >
              <a-input placeholder="请输入项目ID" v-model="queryParam.projectId" />
            </a-form-item>
          </a-col>
          <!-- <a-col :md="8" :sm="24">
            <a-form-item label="创建日期">
              <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入创建日期"/>
            </a-form-item>
          </a-col> -->
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true, {queryParam})">查询</a-button>
              <a-button style="margin: 0 8px" @click="() => queryParam = {}">重置</a-button>
              <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建</a-button>
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
    <create-form ref="createModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { axios } from '../../utils/request'
import { builder } from '../../mock/util'
import CreateForm from './modules/CreateForm'
import qs from 'qs'

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
          title: '项目管理员ID',
          dataIndex: 'personnelId'
        },
        {
          title: '项目成员',
          dataIndex: 'manage',
          scopedSlots: { customRender: 'manage' }
        },
        {
          title: '岗位',
          dataIndex: 'no',
          scopedSlots: { customRender: 'no' }

        },
        {
          title: '联系方式',
          dataIndex: 'contact',
          scopedSlots: { customRender: 'contact' }
        },
        {
          title: '密码',
          dataIndex: 'password',
          scopedSlots: { customRender: 'password' }
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
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
        let id = 1
        console.log('loadData.parameter', this.queryParam.projectId)
        if (this.queryParam.projectId !== undefined) id = this.queryParam.projectId
        return axios({
          method: 'get',
          url: `/proPersonnel/allProPersonnels/${id}`
          // data: qs.stringify({
          //   pageNum: parameter.pageNum,
          //   pageSize: 10
          // })
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
          // const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1
          for (let i = 1; i <= mork.size; i++) {
            // const tmpKey = key + i
            if (mork.list[i - 1].proPersonnel !== null) {
              // var date = new Date(mork.list[i - 1].proPersonnel.gmtModified)
              result.push({
                // key: tmpKey,
                personnelId: mork.list[i - 1].personnelId === undefined ? '' : mork.list[i - 1].personnelId,
                manage: mork.list[i - 1].memberName === undefined ? '' : mork.list[i - 1].memberName,
                no: mork.list[i - 1].post === undefined ? '' : mork.list[i - 1].post,
                contact: mork.list[i - 1].telephone === undefined ? '' : mork.list[i - 1].telephone,
                password: mork.list[i - 1].password === undefined ? '' : mork.list[i - 1].password,
                updatedAt: mork.list[i - 1].gmtModified === undefined ? '' : mork.list[i - 1].gmtModified,
                gmtCreate: mork.list[i - 1].gmtCreate === undefined ? '' : mork.list[i - 1].gmtCreate,
                // updatedAt: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
                editable: false
              })
            }
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
        console.log(parameter)
        return axios({
          method: 'get',
          url: `/proPersonnel/allProPersonnels/${parameter.queryParam.projectId}`
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
          // const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1
          for (let i = 1; i <= mork.size; i++) {
            // const tmpKey = key + i
            if (mork.list[i - 1].proPersonnel !== null) {
              // var date = new Date(mork.list[i - 1].proPersonnel.gmtModified)
              result.push({
                // key: tmpKey,
                personnelId: mork.list[i - 1].personnelId === undefined ? '' : mork.list[i - 1].personnelId,
                manage: mork.list[i - 1].memberName === undefined ? '' : mork.list[i - 1].memberName,
                no: mork.list[i - 1].post === undefined ? '' : mork.list[i - 1].post,
                contact: mork.list[i - 1].telephone === undefined ? '' : mork.list[i - 1].telephone,
                password: mork.list[i - 1].password === undefined ? '' : mork.list[i - 1].password,
                updatedAt: mork.list[i - 1].gmtModified === undefined ? '' : mork.list[i - 1].gmtModified,
                gmtCreate: mork.list[i - 1].gmtCreate === undefined ? '' : mork.list[i - 1].gmtCreate,
                // updatedAt: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
                editable: false
              })
            }
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
    handleOk (value) {
      value.gmtCreate = value.gmtCreate._d.getFullYear() + '-' + (1 + value.gmtCreate._d.getMonth()) + '-' + value.gmtCreate._d.getDate()
      return axios({
        method: 'post',
        url: `/proPersonnel/insertProPersonnel`,
        data: qs.stringify(value)
      }).then(() => {
        this.$refs.table.refresh(true)
      })
    },
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
        content: `真的要删除 ${row.manage} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          console.log('OK')
          // 在这里调用删除接口
          return axios({
            method: 'post',
            url: `/proPersonnel/deleteProPersonnel/${row.personnelId}`
            // data: {
            //   projectId: row.no.split(' ')[1]
            // }
          })
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    save (row) {
      console.log(row.gmtCreate)
      row = {
        personnelId: row.personnelId,
        memberName: row.manage,
        post: row.no,
        telephone: row.contact,
        password: row.password,
        gmtModified: new Date(row.updatedAt).getFullYear() + '-' + (new Date(row.updatedAt).getMonth() + 1) + '-' + new Date(row.updatedAt).getDate(),
        gmtCreate: new Date(row.gmtCreate).getFullYear() + '-' + (new Date(row.gmtCreate).getMonth() + 1) + '-' + new Date(row.gmtCreate).getDate()
      }
      console.log('row', row)
      axios({
        method: 'post',
        url: `/proPersonnel/updateProPersonnel`,
        data: qs.stringify(row)
      }).then(() => {
        this.$refs.table.refresh(true)
      })
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
