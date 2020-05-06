<template>
  <a-modal
    title="新建项目"
    :width="700"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="全部工种"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <table>
            <tr>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">施工员</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">预算员</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">钢筋工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">升降机司机</label></td>
            </tr>
            <tr>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">质检员</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">木工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">架子工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">起重机司机</label></td>
            </tr>
            <tr>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">抹灰工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">瓦工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">油漆工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">混凝土工</label></td>
            </tr>
            <tr>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">砌筑工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">防水工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">电工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">爆破工</label></td>
            </tr>
            <tr>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">电焊工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">管工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">模板工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">门窗工</label></td>
            </tr>
            <tr>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">钳工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">起重工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">幕墙工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">水暖工</label></td>
            </tr>
            <tr>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">保温工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">通风工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">水电工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">仪表工</label></td>
            </tr>
            <tr>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">布线工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">消防工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">筑路工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">养护工</label></td>
            </tr>
            <tr>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">沥青工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">土建施工员</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">质量员</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">设备安装施工员</label></td>
            </tr>
            <tr>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">机械员</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">试验员</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">总监</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">监理工程师</label></td>
            </tr>
            <tr>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">安全监理员</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">监理员</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">管道工</label></td>
              <td><a-input type="checkbox" name="checkbox" style="width: 10px"/><label style="width: 50px">其他</label></td>
            </tr>
          </table>
          <!-- <a-input placeholder="请输入项目成员"/>
          <a-input placeholder="请输入项目岗位"/>
          <a-input placeholder="请输入项目联系方式"/> -->
          <!-- <a-input placeholder="请输入项目归属"/> -->
          <!-- <a-select v-model="one" placeholder="请输入项目有无分包">
            <a-select-option value="0">有</a-select-option>
            <a-select-option value="1">无</a-select-option>
          </a-select> -->
          <!-- <a-select v-model="two" placeholder="请输入项目状态">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">关闭</a-select-option>
            <a-select-option value="2">运行中</a-select-option>
          </a-select> -->
          <!-- <a-date-picker style="width: 100%" placeholder="更新时间"/> -->
        </a-form-item>
        <a-form-item label="自定义">
          <a-input type="text" style="width: 500px"/>
          <a-button>添加</a-button>
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
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
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
