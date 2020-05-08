<template>
  <a-modal
    title="新建项目"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
        <a-form layout="inline">
         <div class="table-operator">
          | 基本信息
        </div>
          <a-row :gutter="20">
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
          </a-row>
          <a-row :gutter="20">

            <a-col :md="8" :sm="24">
              <a-form-item label="性别">
                <input type="radio" name="radios" value="1" v-model="sex"><label>&nbsp;男&nbsp;&nbsp;</label>&nbsp;
                <input type="radio" name="radios" value="0" v-model="sex"><label>&nbsp;女</label>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="手机号码">
                <a-input v-model="queryParam.telenumber" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
               证件有效期: <a-date-picker v-model="queryParam.date1" placeholder="" style="width: 30%" />
                <a-date-picker v-model="queryParam.date1" placeholder="" style="width: 30%" />
            </a-col>
          </a-row>

          <a-row :gutter="20">
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
            <a-col :md="8" :sm="24" style="margin-top:-22px">
              <a-form-item label="签发机关">
                <a-input v-model="queryParam.qfjg" placeholder=""/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="20">

            <a-col :md="8" :sm="24">
              <a-form-item label="出生日期">
                <a-date-picker v-model="queryParam.birth" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="健康状况">
                <a-select style="width:400%" v-model="queryParam.heath" placeholder="请选择" default-value="0">
                  <a-select-option  value="0">健康</a-select-option>
                  <a-select-option value="1">残疾</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <br>
            <a-col :md="8" :sm="24" style="margin-top:-22px">
              <a-form-item label="政治面貌">
                <a-select style="width:400%" v-model="queryParam.able" placeholder="请选择" default-value="0">
                  <a-select-option value="群众">群众</a-select-option>
                  <a-select-option value="少先队员">少先队员</a-select-option>
                  <a-select-option value="团员">团员</a-select-option>
                  <a-select-option value="入党积极分子">入党积极分子</a-select-option>
                  <a-select-option value="预备党员">预备党员</a-select-option>
                  <a-select-option value="党员">党员</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

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
            <a-divider style="width:80px; margin: 32px 0"/>
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
                <input type="radio" name="radios" value="1" v-model="need"><label>&nbsp;需要&nbsp;</label>&nbsp;
                <input type="radio" name="radios" value="0" v-model="need"><label>&nbsp;不需要</label>
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
                <a-date-picker v-model="queryParam.date" style="width: 50%" placeholder=""/>
                <a-date-picker v-model="queryParam.date" style="width: 50%" placeholder=""/>
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
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      queryParam: {

      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,

      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', this.par)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', this.par)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
