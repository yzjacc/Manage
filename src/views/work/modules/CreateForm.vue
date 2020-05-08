<template>
  <a-modal
    title="新建项目"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="项目信息输入"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >

          <a-col :md="8" :sm="24">
              <a-form-item label="身份证号">
               <a-input v-model="queryParam.name" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-input placeholder="请输入项目人员ID" v-model="par.projectId"/>
          <a-input placeholder="请输入项目人员姓名" v-model="par.memberName"/>
          <a-input placeholder="请输入项目人员岗位" v-model="par.post"/>
          <a-input placeholder="请输入项目人员联系方式" v-model="par.telephone"/>
          <a-input placeholder="请输入项目人员密码" v-model="par.password"/>
          <!-- <a-input placeholder="请输入项目项目状态 完成/未完成"/> -->
          <!-- <a-select v-model="par.state" placeholder="请输入项目状态" >
            <a-select-option value="0">已完成</a-select-option>
            <a-select-option value="1">未完成</a-select-option> -->
          <!-- <a-select-option value="2"></a-select-option> -->
          <!-- </a-select> -->
          <!-- <a-input placeholder="请输入项目劳工数" v-model="par.labourNum"/> -->
          <!-- <a-input placeholder="请输入项目创建时间"/> -->
          <!-- <a-input placeholder="请输入项目归属"/> -->
          <!-- <a-select v-model="one" placeholder="请输入项目有无分包">
            <a-select-option value="0">有</a-select-option>
            <a-select-option value="1">无</a-select-option>
          </a-select> -->
          <a-date-picker style="width: 100%" placeholder="更新时间" v-model="par.gmtCreate"/>
        </a-form-item>
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
      par: {

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
