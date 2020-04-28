<template>
  <div>
    <a-button type="primary" @click="showModal">Open Modal with async logic</a-button>
    <a-modal
      :visible="visible"
      @ok="handleOk"
      :closable="false"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <div class="layui-layer-title">
        <a-row type="flex" justify="space-between">
          <a-col :span="5">
            <span>添加文字</span>
          </a-col>
          <a-col>
            <div class=""></div>
          </a-col>
        </a-row>
      </div>
      <p>{{ ModalText }}</p>
    </a-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ModalText: 'Content of the modal abc',
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel (e) {
      this.visible = false
    }
  }
}
</script>

<style scoped>
.web {
  padding: 0 !important;
  font-size: 0 !important;
  line-height: 1 !important;
}

.layui-layer-title {
  background: #22222c !important;
  color: #fff;
  padding: 0 80px 0 20px;
  height: 42px;
  line-height: 42px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #333;
  overflow: hidden;
  background-color: #F8F8F8;
  border-radius: 2px 2px 0 0;
}

</style>
