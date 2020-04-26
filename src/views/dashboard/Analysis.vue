<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <RealTimeData></RealTimeData>
      <a-row>
        <!-- 左边-->
        <a-col :span="12" class="overflow">
          <a-layout>
            <a-layout-header>
              <a-row type="flex" justify="space-between">
                <a-col :span="6">
                  <h1 class="title">
                    <i class="leftBar"></i>
                    项目编辑信息
                  </h1>
                </a-col>
                <a-col :span="6">
                  <h1 class="title">
                    <a-button type="danger" class="btn">编辑</a-button>
                  </h1>
                </a-col>
              </a-row>
            </a-layout-header>
            <!--左边的图表 -->
            <a-layout-content>
              <div id="leftCanvas" class="left_canvas"></div>
            </a-layout-content>
            <a-layout-footer>
              <a-row class="margin_bottom" type="flex" justify="space-between">
                <a-col :span="22" :offset="1">
                  <span class="title">{{ company.name }}</span>
                </a-col>
              </a-row>
              <a-row class="margin_bottom">
                <a-col :span="8" :offset="1">项目编号：{{ company.number }}</a-col>
                <a-col :span="9" :offset="5">
                  项目管理员：{{ company.manager }}
                  <a-button type="link">变更</a-button>
                </a-col>
              </a-row>
              <a-row class="margin_bottom">
                <a-col :span="8" :offset="1">开工日期：{{ company.beginDate }}</a-col>
                <a-col :span="9" :offset="5">竣工日期：{{ company.endDate }}</a-col>
              </a-row>
              <a-row class="margin_bottom">
                <a-col :span="23" :offset="1">项目地址：{{ company.projectLoc }}</a-col>
              </a-row>
              <a-row class="margin_bottom">
                <a-col :span="23" :offset="1">详细地址：{{ company.fullLoc }}</a-col>
              </a-row>
              <a-row class="margin_bottom">
                <a-col :span="23" :offset="1">项目分类：{{ company.class }}</a-col>
              </a-row>
              <a-row class="margin_bottom">
                <a-col :span="23" :offset="1">预上报城市：{{ company.city }}</a-col>
              </a-row>
            </a-layout-footer>
          </a-layout>
        </a-col>
        <!-- 右边-->
        <a-col :span="12">
          <a-layout>
            <a-layout-header>
              <a-row type="flex" justify="space-between">
                <a-col :span="6">
                  <h1 class="title">
                    <i class="leftBar"></i>
                    工种占比分析
                  </h1>
                </a-col>
                <a-col :span="6">
                  <h1 class="title">
                    <a-dropdown>
                      <a-menu slot="overlay" @click="handleMenuClick">
                        <a-menu-item key="1">
                          <a-icon type="user" />1st menu item
                        </a-menu-item>
                        <a-menu-item key="2">
                          <a-icon type="user" />2nd menu item
                        </a-menu-item>
                        <a-menu-item key="3">
                          <a-icon type="user" />3rd item
                        </a-menu-item>
                      </a-menu>
                      <a-button @click="e => e.preventDefault()">
                        全部
                        <a-icon type="down" />
                      </a-button>
                    </a-dropdown>
                  </h1>
                </a-col>
              </a-row>
            </a-layout-header>
            <a-layout-content>
              <div id="rightCanvas" class="right_canvas"></div>
            </a-layout-content>
          </a-layout>
        </a-col>
      </a-row>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

import { ChartCard } from '@/components'
import { Button } from 'ant-design-vue'
import RealTimeData from './RealTimeData'
import echarts from 'echarts'

const option = {
  title: {
    text: '昌平册数数据模块',
    subtext: '暂无数据：0(0%)',
    left: 'center',
    top: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 10,
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]
    }
  ]
}
export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: zhCN,
      company: {
        name: '全荣科技大厦',
        number: '0508123',
        manager: '陈玉金',
        beginDate: '2018-01-02',
        endDate: '2021-02-15',
        projectLoc: '安徽省宿州市埇桥区',
        fullLoc: '市区',
        class: '房屋建筑工程',
        city: '安徽省合肥市'
      }
    }
  },
  components: {
    ChartCard,
    Button,
    RealTimeData
  },
  mounted () {
    this.drawLeftEcharts()
    this.drawRightEcharts()
  },
  methods: {
    drawLeftEcharts () {
      const leftEcharts = echarts.init(document.getElementById('leftCanvas'))
      leftEcharts.setOption(option)
    },
    drawRightEcharts () {
      const rightEcharts = echarts.init(document.getElementById('rightCanvas'))
      rightEcharts.setOption(option)
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  color: rgba(0, 0, 0, 0.85);
}

.overflow:after {
  clear: both;
}

.ant-btn-danger {
  height: 32px;
  text-align: center;
  padding: 0 20px;
}

.title {
  font-size: 15px;
  height: 30px;
  font-weight: normal;
}

.ant-layout-header {
  padding: 0px 0px !important;
  background: #F0F2F5;
}

.txt_center {
  text-align: center;
}

.margin_bottom {
  margin-bottom: 5px;
}

.leftBar {
  display: inline-block;
  width: 2px;
  height: 14px;
  border-radius: 1px;
  background: rgba(0, 0, 0, 0.85);
  vertical-align: middle;
  margin: -1px 8px 0 0;
}

.p-c-name {
  text-align: center;
  font-size: 18px;
}

.left_canvas {
  width: 503px;
  height: 320px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.85);
}

.right_canvas {
  height: 614px;
  width: 482px;
  border: 1px solid rgba(0, 0, 0, 0.85);
}

.ant-btn.ant-btn-link {
  height: 20px !important;
  padding: 0px 0px 0px 8px !important;
}
</style>
