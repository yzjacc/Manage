<template>
  <div class="s1">
    <div>
      <div class="s-title clearfix">
        <h1 class="c-title fl">
          <i class="vline"></i>实时数据
        </h1>
        <!-- <p class="fr fr-sea">
          <a-button type="danger">仅本项目</a-button>
          <span class="v-btn1">
            <a-button>包含分包项目</a-button>
          </span>
        </p> -->
      </div>
    </div>

    <div class="fo">
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="8">
          <div class="da1">
            在职劳工总人数
            <div class="s2">
              <a-row>
                <a-col :span="8" class="da3">48</a-col>
                <a-col :span="16">
                  <a-row :span="12" class="da2">
                    <i class="i-icon"></i>新增入职
                    <b>0</b>
                  </a-row>
                  <a-row :span="12" class="da2s">
                    <i class="i-icons"></i>新增离职
                    <b>0</b>
                  </a-row>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <div class="da1s">
            今日出勤劳工总人数
            <div class="s2s">
              <a-row>
                <a-col :span="8" class="da3">0</a-col>
                <a-col :span="16">
                  <a-row :span="12" class="da2">
                    <i class="i-icon"></i>出勤率
                    <b>0.00%</b>
                  </a-row>
                  <a-row :span="12" class="da2s">
                    <i class="i-icons"></i>当前在场人数
                    <b>0</b>
                  </a-row>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <div class="da1ss">
            上月应发薪资
            <div class="s2ss">
              <a-row>
                <a-col :span="8" class="da3">77.70</a-col>
                <a-col :span="16">
                  <a-row :span="12" class="da2">
                    <i class="i-icon"></i>上月实发薪资
                  </a-row>
                  <a-row :span="12" class="da2s">
                    <i class="i-icons"></i>上月未发薪资
                  </a-row>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style>
.vline {
  display: inline-block;
  width: 2px;
  height: 14px;
  border-radius: 1px;
  background: rgba(0,0,0,0.85);
  vertical-align: middle;
  margin: -1px 8px 0 0;
}

.c-title {
  font-size: 15px;
  color: rgba(0,0,0,0.85);
  padding: 20px 15px;
  height: 30px;
  font-weight: normal;
}

.fl {
  float: left;
}

.fr-sea {
  margin: 20px 20px 0px 0px;
}

.fr {
  float: right;
}

.fr-sea .act {
  background: #dd6b66;
}

.v-btn1 {
  height: 32px;
  line-height: 32px;
  min-width: 80px;
  border-radius: 2px;
  text-align: center;
  padding: 0px 10px;
  margin-left: 10px;
}

.fr-sea .act a {
  color: #fff;
}

.fr-sea .v-btn1 a {
  display: block;
}

a {
  text-decoration: none;
  cursor: pointer;
}

.s1 {
  height: 250px;
}

.fo {
  font-size: 20px;
  color: #fff;
  margin-left: 10px;
  margin-right: 10px;
}

.da1 {
  background: #464662;
  height: 50px;
  text-align: left;
  text-indent: 1em;
  line-height: 50px;
  margin-top: 20px;
}

.da1s {
  background: #446d8a;
  height: 50px;
  text-align: left;
  text-indent: 1em;
  line-height: 50px;
  margin-top: 20px;
}

.da1ss {
  background: #d93f38;
  height: 50px;
  text-align: left;
  text-indent: 1em;
  line-height: 50px;
  margin-top: 20px;
}

.da2 {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
  font-weight: normal;
  text-indent: 20px;
  text-align: left;
  border-bottom: 1px solid #fff;
}

.da2s {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
  font-weight: normal;
  text-indent: 20px;
  text-align: left;
}

.da3 {
  height: 100px;
  line-height: 100px;
  font-size: 20px;
  color: #fff;
  font-weight: normal;
  text-indent: 20px;
  text-align: center;
  border-right: 1px solid #fff;
}

.s2 {
  height: 100px;
  line-height: 100px;
  background: #9f9fbf;
}

.s2s {
  height: 100px;
  line-height: 100px;
  background: #8cafc8;
}

.s2ss {
  height: 100px;
  line-height: 100px;
  background: #f29490;
}

.d3 {
  height: 100px;
  border: 1px solid #fff;
}

.i-icon {
  background: url(./icon-index.png) no-repeat;
  float: left;
  margin: 15px 5px 15px 20px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-position: 0px 0px;
}

.i-icons {
  background: url(./icon-index.png) no-repeat;
  float: left;
  margin: 15px 5px 15px 20px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-position: 0px -34px;
}

.gutter-example >>> .ant-row > div {
  background: transparent;
  border: 0;
}
</style>
