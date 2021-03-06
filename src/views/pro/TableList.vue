<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="项目名称">
              <a-input v-model="queryParam.projectName" placeholder="请输入项目名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="项目编号">
              <a-input v-model="queryParam.projectNum" placeholder="请输入项目编号"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="项目管理员">
              <a-input v-model="queryParam.memberName" placeholder="请输入项目管理员"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="项目状态">
              <a-select v-model="queryParam.state" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">完成</a-select-option>
                <a-select-option value="2">未完成</a-select-option>
              </a-select>
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
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
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
      :search="search"
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
import CreateForm from './modules/MessCreateForm'
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
          title: '项目ID',
          dataIndex: 'key',
          scopedSlots: { customRender: 'key' }
        },
        {
          title: '项目编号',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '项目名称',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '项目管理员',
          dataIndex: 'manager',
          width: 120
          // scopedSlots: { customRender: 'manager' }
        },
        {
          title: '联系方式',
          dataIndex: 'tel',
          scopedSlots: { customRender: 'tel' }
        },
        {
          title: '项目状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '劳工数',
          dataIndex: 'number',
          scopedSlots: { customRender: 'number' }
        },
        {
          title: '创建时间',
          dataIndex: 'updatedAt',
          width: '130px',
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
          method: 'post',
          url: `proInformation/getProInformationsByCondition`,
          data: qs.stringify({
            pageNum: parameter.pageNum,
            pageSize: 10
          })
        }).then(mork => {
          const totalCount = mork.total
          const parameters = {
            pageNo: mork.pageNum,
            pageSize: 10
          }
          const result = []
          const pageNo = parseInt(parameters.pageNo)
          const pageSize = parseInt(parameters.pageSize)
          const totalPage = Math.ceil(totalCount / pageSize)
          // const key = (pageNo - 1) * pageSize
          // const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1
          for (let i = 1; i <= mork.size; i++) {
            // const tmpKey = key + i
            var date = new Date(mork.list[i - 1].gmtCreate)
            result.push({
              key: mork.list[i - 1].projectId,
              id: mork.list[i - 1].projectNum,
              manager: mork.list[i - 1].proPersonnels[0] === undefined ? '' : mork.list[i - 1].proPersonnels[0].memberName,
              tel: mork.list[i - 1].telephone,
              description: mork.list[i - 1].projectName,
              number: mork.list[i - 1].labourNum,
              status: mork.list[i - 1].state,
              updatedAt: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
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
        console.log(parameter.queryParam.state)
        const paramete = {
          pageNum: String(parameter.pageNum),
          pageSize: String(parameter.pageSize),
          memberName: parameter.queryParam.memberName,
          projectNum: parameter.queryParam.projectNum,
          projectName: parameter.queryParam.projectName
        }
        if (parameter.queryParam.state === '1') paramete.state = '完成'
        if (parameter.queryParam.state === '2') paramete.state = '未完成'
        for (const key in paramete) {
          if (parameter['state'] === '0') delete paramete['state']
          if (paramete[key] === '') delete paramete[key]
        }
        console.log('search', paramete)
        return axios({
          method: 'post',
          url: `/proInformation/getProInformationsByCondition`,
          data: qs.stringify(paramete)
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
            var date = new Date(mork.list[i - 1].gmtCreate)
            result.push({
              key: mork.list[i - 1].projectId,
              id: mork.list[i - 1].projectNum,
              manager: mork.list[i - 1].proPersonnel === null ? '' : mork.list[i - 1].proPersonnel.memberName,
              tel: mork.list[i - 1].telephone,
              description: mork.list[i - 1].projectName,
              number: mork.list[i - 1].labourNum,
              status: mork.list[i - 1].state,
              updatedAt: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
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
        url: `/proInformation/insertProInformation`,
        data: qs.stringify(value)
      }).then(() => {
        this.$refs.table.refresh(true)
      })
    },
    handleChange (value, key, column, record) {
      console.log(value, key, column)
      record[column.dataIndex] = value
    },
    add () {
    },
    edit (row) {
      console.log(row)
      row.editable = true
      // row = Object.assign({}, row)
    },
    // eslint-disable-next-line
    del (row) {
      console.log(this.$confirm)
      this.$confirm({
        title: '警告',
        content: `真的要删除 ${row.description} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          console.log(row.key)
          // 在这里调用删除接口
          return axios({
            method: 'get',
            url: `/proInformation/deleteProInformation/${row.key}`
            // data: {
            //   projectId: row.no.split(' ')[1]
            // }
          })
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          // }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    save (row) {
      row = {
        projectName: row.description,
        projectNum: row.id,
        telephone: row.tel,
        state: row.status,
        labourNum: row.number,
        gmtCreate: row.updatedAt,
        projectId: row.key
        // memberName: row.manager
      }
      axios({
        method: 'post',
        url: `/proInformation/updateProInformation`,
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
