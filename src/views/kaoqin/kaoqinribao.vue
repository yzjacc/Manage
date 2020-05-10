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
                <a-select-option value="0">未完成</a-select-option>
                <a-select-option value="1">完成</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="创建日期">
              <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入创建日期"/>
            </a-form-item>
          </a-col>
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
      size="small"
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
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { axios } from '../../utils/request'
import { builder } from '../../mock/util'
import qs from 'qs'

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
          title: '编号',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '姓名',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '职位',
          dataIndex: 'manager',
          scopedSlots: { customRender: 'manager' }
        },
        {
          title: '日期',
          dataIndex: 'tel',
          scopedSlots: { customRender: 'tel' }
        },
        {
          title: '1 状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '2 状态',
          dataIndex: 'number',
          scopedSlots: { customRender: 'number' }
        },
        {
          title: '工作时长',
          dataIndex: 'updatedAt',
          scopedSlots: { customRender: 'updatedAt' }
        },
        {
          title: '迟到次数',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        },
        {
          title: '迟到时长',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        },
        {
          title: '早退次数',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        },
        {
          title: '早退时长',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        },
        {
          title: '缺卡次数',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        },
        {
          title: '未出勤天数',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return axios({
          method: 'get',
          url: `attendanceReport/getAttendanceRecordsByConditions?pageNum=${parameter.pageNum}&pageSize=10&pageSize=10`
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
            // var date = new Date(mork.list[i - 1].gmtCreate)
            result.push({
              key: mork.list[i - 1].projectId,
              id: mork.list[i - 1].projectNum,
              manager: mork.list[i - 1].proPersonnel === null ? '' : mork.list[i - 1].proPersonnel.memberName,
              tel: mork.list[i - 1].telephone,
              description: mork.list[i - 1].projectName,
              number: mork.list[i - 1].labourNum,
              status: mork.list[i - 1].state,
              updatedAt: mork.list[i - 1].gmtCreate,
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
          pageNum: String(parameter.pageNum),
          pageSize: String(parameter.pageSize),
          memberName: parameter.queryParam.memberName,
          projectNum: parameter.queryParam.projectNum,
          projectName: parameter.queryParam.projectName,
          state: '完成'
        }
        console.log('search', parameter)
        return axios({
          method: 'post',
          url: `/labour/proInformation/getProInformationsByCondition`,
          data: qs.stringify(parameter)
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
            var date = new Date(mork.list[i - 1].gmtCreate)
            result.push({
              key: mork.list[i - 1].projectId,
              id: mork.list[i - 1].projectNum,
              manager: mork.list[i - 1].proPersonnel === null ? '' : mork.list[i - 1].proPersonnel.memberName,
              tel: mork.list[i - 1].telephone,
              description: mork.list[i - 1].projectName,
              number: mork.list[i - 1].labourNum,
              status: mork.list[i - 1].state,
              updatedAt: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
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
      value.state = value.state === 0 ? '完成' : '未完成'
      value.gmtCreate = value.gmtCreate._d.getFullYear() + '-' + (1 + value.gmtCreate._d.getMonth()) + '-' + value.gmtCreate._d.getDate()
      return axios({
        method: 'post',
        url: `/labour/proInformation/insertProInformation`,
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
        content: `真的要删除 ${row.key} 吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk () {
          console.log(row.key)
          // 在这里调用删除接口
          return axios({
            method: 'get',
            url: `/labour/proInformation/deleteProInformation/${row.key}`
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
        url: `/labour/proInformation/updateProInformation`,
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
