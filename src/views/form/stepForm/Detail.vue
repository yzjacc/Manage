<template>
 <page-view :title="title">
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <div class="table-operator">
        | 基本信息
      </div>
      <a-form layout="inline">
        <a-row :gutter="96">
          <a-col :md="8" :sm="24">
            <a-form-item label="身份证号">
              <a-input v-model="queryParam.name" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input v-model="queryParam.name" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="身份证地址">
              <a-input v-model="queryParam.idAddress" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="性别">
               <input type="radio" name="radios" value="1" v-model="sex"><label>男</label>&nbsp;
               <input type="radio" name="radios" value="0" v-model="sex"><label>女</label>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="手机号码">
              <a-input v-model="queryParam.telenumber" placeholder=""/>
            </a-form-item>
          </a-col>
           <a-col :md="8" :sm="12">
            <a-form-item label="证件有效期">
              <a-date-picker v-model="queryParam.date1" style="width: 40%" :sm="11"/>-<a-date-picker v-model="queryParam.date2" style="width: 40%" :sm="2"/>
            </a-form-item>
          </a-col>
           <a-col :md="8" :sm="24">
            <a-form-item label="民族">
              <a-input v-model="queryParam.minzu" placeholder=""/>
            </a-form-item>
          </a-col>
           <a-col :md="8" :sm="24">
            <a-form-item label="文化程度">
              <a-input v-model="queryParam.know" placeholder=""/>
            </a-form-item>
          </a-col>
          <br>
           <a-col :md="8" :sm="24">
            <a-form-item label="签发机关">
              <a-input v-model="queryParam.qfjg" placeholder=""/>
            </a-form-item>
          </a-col>
           <a-col :md="8" :sm="24">
            <a-form-item label="出生日期">
              <a-date-picker v-model="queryParam.birth" style="width: 100%" placeholder=""/>
            </a-form-item>
          </a-col>
           <a-col :md="8" :sm="24">
            <a-form-item label="健康状况">
              <a-select v-model="queryParam.heath" placeholder="请选择" default-value="0">
                <a-select-option value="0">健康</a-select-option>
                <a-select-option value="1">残疾</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <br>
           <a-col :md="8" :sm="24">
            <a-form-item label="政治面貌">
              <a-select v-model="queryParam.able" placeholder="请选择" default-value="0">
                <a-select-option value="0">群众</a-select-option>
                <a-select-option value="1">少先队员</a-select-option>
                <a-select-option value="2">团员</a-select-option>
                <a-select-option value="3">入党积极分子</a-select-option>
                <a-select-option value="4">预备党员</a-select-option>
                <a-select-option value="5">党员</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
           <a-col :md="8" :sm="24">
            <a-form-item label="常住地址">
              <a-input v-model="queryParam.address" placeholder=""/>
            </a-form-item>
          </a-col>
           <a-col :md="8" :sm="24">
            <a-form-item label="银行卡号">
              <a-input v-model="queryParam.idCardNumber" placeholder=""/>
            </a-form-item>
          </a-col>
           <a-col :md="8" :sm="24">
            <a-form-item label="开户行">
              <a-input v-model="queryParam.khh" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-divider style="margin-bottom: 32px"/>
          <a-col :md="24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'left', overflow: 'hidden' } || {} ">
            | 劳工信息
            </span>
          </a-col>
           <a-col :md="8" :sm="24">
            <a-form-item label="岗位">
              <a-input v-model="queryParam.post" placeholder="请输入身份证号"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="人员类型">
              <a-input v-model="queryParam.type" placeholder="请输入人员类型"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="是否需要签到">
               <input type="radio" name="radios" value="1" v-model="need"><label>需要</label>&nbsp;
               <input type="radio" name="radios" value="0" v-model="need"><label>不需要</label>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="专业">
              <a-input v-model="queryParam.major" placeholder="请输入专业类型"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="职称">
              <a-input v-model="queryParam.title" placeholder="请输入职称名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="证书号">
              <a-input v-model="queryParam.number" placeholder="请输入证书号"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="班组">
              <a-input v-model="queryParam.groupnumber" placeholder="请输入班组名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="从事工种">
              <a-input v-model="queryParam.craft" placeholder="请输入从事工种"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="工资待遇">
              <a-input v-model="queryParam.salary" placeholder="请输入工资待遇"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="工作时间">
              <a-input v-model="queryParam.time" placeholder="请输入时间（小时/天）"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="合同起止时间">
              <a-date-picker v-model="queryParam.date" style="width: 40%" placeholder="开始时间"/>-
              <a-date-picker v-model="queryParam.date" style="width: 40%" placeholder="结束时间"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="合同期限类型">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">一年制</a-select-option>
                <a-select-option value="1">两年制</a-select-option>
                <a-select-option value="2">三年制</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="劳务合同编号">
              <a-input v-model="queryParam.contractnumber" placeholder="劳务合同编号"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="劳务合同附件">
              <input type="file" id="filepicker" name="fileList1" placeholder="请选择文件" />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="安全教育附件">
              <input type="file" id="filepicker" name="fileList2" placeholder="请选择文件" />
            </a-form-item>
          </a-col>
          <a-divider style="margin-bottom: 32px"/>
          <a-col :md="24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'left', overflow: 'hidden' } || {} ">
            | 其他信息
            </span>
          </a-col>
          <a-divider style="margin-bottom: 32px"/>
          
          <a-col :md="!advanced && 8 || 24" :sm="48">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <create-form ref="createModal" @ok="handleOk" />
    <step-by-step-modal ref="modal" @ok="handleOk"/>
  </a-card>
</page-view>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import StepByStepModal from '@/views/list/modules/StepByStepModal'
import CreateForm from '@/views/list/modules/CreateForm'
import { getRoleList, getServiceList } from '@/api/manage'

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  created () {
    this.tableOption()
    getRoleList({ t: new Date() })
  },
  methods: {
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: record.no === 'No 2', // Column configuration not to be checked
                name: record.no
              }
            })
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },
    handleDelete (index, row) {
      this.loadData.splice(index, 1)
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
