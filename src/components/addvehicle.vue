<template>
  <div>
    <van-nav-bar title="添加车辆"
                 left-arrow
                 @click-left="onClickLeft" />
    <van-tabs v-model="activeName">
      <van-tab title="驾驶证扫描添加"
               name="a">
        <van-notice-bar color="#1989fa"
                        background="#ecf9ff"
                        left-icon="info-o">
          请在明亮区域拍取完整驾驶证并且上传
        </van-notice-bar>
        <div>
          <van-form @submit="onSubmit"
                    label-align='left'>
            <div class="upimg">
              <van-field name="uploader"
                         label-width="100%"
                         label="请上传需要驾驶证图片：">
                <template #input>
                  <van-uploader :max-count="6"
                                v-model="uploader" />
                </template>
              </van-field>
            </div>
            <div style="margin: 16px;">
              <van-button round
                          block
                          type="info"
                          native-type="submit">
                提交
              </van-button>
            </div>
          </van-form>
        </div>
      </van-tab>
      <van-tab title="填写资料添加"
               name="b">
        <van-notice-bar color="#1989fa"
                        background="#ecf9ff"
                        left-icon="info-o">
          请填写完整信息并且确定正确
        </van-notice-bar>

        <div>
          <van-panel title="标题"
                     desc="描述信息"
                     status="状态">
            <div class="keyboardCont">
              <keyboard ref="cropperImgFun"
                        :boradArr='boradArr'
                        :getboard="getboard"></keyboard>
            </div>
            <template #header>
              <div class="infotxt">
                <van-row type="flex"
                         justify="space-between">
                  <van-col span="16">车辆信息：</van-col>

                </van-row>
              </div>
            </template>
          </van-panel>
        </div>

        <van-form @submit="onsetSubmit"
                  label-align='left'>
          <div>
            <van-field readonly
                       clickable
                       name="picker"
                       :value="boradform.maintenancecolumns"
                       label="车辆品牌"
                       placeholder="选择车辆品牌"
                       @click="maintenanceshowCalendar = true" />
            <van-popup v-model="maintenanceshowCalendar"
                       position="bottom">
              <van-picker show-toolbar
                          :columns="maintenancecolumns"
                          @confirm="maintenanceonConfirm"
                          @cancel="maintenanceshowCalendar = false" />
            </van-popup>
          </div>
          <div>
            <van-field v-model="username"
                       name="车架号"
                       label="车架号"
                       placeholder="车架号"
                       :rules="[{ required: true, message: '请填写车架号' }]" />
          </div>
          <div class="form_module">
            <div>
              <van-field readonly
                         clickable
                         name="calendar"
                         :value="boradform.timesvalue"
                         label="注册时间"
                         placeholder="点击选择日期"
                         @click="timesshowCalendar = true" />
              <van-calendar v-model="timesshowCalendar"
                            @confirm="timesonConfirm" />
            </div>
          </div>
          <div style="margin: 16px;">
            <van-button round
                        block
                        type="info"
                        native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>

import keyboard from "../components/keyboard";
export default {

  components: {
    keyboard
  },
  data () {
    return {
      username: '',
      maintenancecolumns: ['轮胎维修', '发动机维修'],
      boardselectshow: false,
      boradArr: [],
      actions: [
        { name: '奥迪Q7', subname: '车牌号：川A497979' },
        { name: '宝马X3', subname: '车牌号：川A497979' },
        { name: '宝骏530', subname: '车牌号：川A497979' }
      ],
      timesshowCalendar: false,
      maintenanceshowCalendar: false,
      boradform: {
        timesvalue: "",
        maintenancecolumns: ""
      },
      activeName: 'a',
      uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
    };
  },
  methods: {

    maintenanceonConfirm (value) {
      this.boradform.maintenancecolumns = value;
      this.maintenanceshowCalendar = false;
    },
    onSubmit (values) {
      console.log('submit', values);
    },
    onsetSubmit (values) {
      console.log('submit', values);
    },
    onClickLeft () {
    },

    getboard (borad) {
      console.log(borad)
    },
    timesonConfirm (date) {
      var date = date;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d;
      this.boradform.timesvalue = timer;
      this.timesshowCalendar = false;
    },
  }
}
</script>
<style  scoped>
.upimg .van-cell {
  flex-flow: column;
}

.keyboardCont {
  margin: 15px;
  padding-bottom: 15px;
}

.infotxt {
  height: 34px;
  line-height: 34px;
  text-align: left;
  padding: 9px 40px;
  font-size: 17px;
}
</style>
<style >
.upimg .van-field__label {
  display: block;
  height: 40px;
  line-height: 40px;
  margin: 0 0 10px 0;
}
</style>