<template>
  <div>
    <van-nav-bar title="代办年审"
                 right-text="预约"
                 @click-right="onClickRight" />
    <van-notice-bar color="#1989fa"
                    background="#ecf9ff"
                    left-icon="info-o">
      年检预约，请填写车辆信息
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
              <van-col span="8">
                <div style="    text-align: right;">
                  <van-button size="small"
                              @click="boardselectshow=true"
                              type="primary">选择车辆</van-button>
                </div>
              </van-col>
            </van-row>
          </div>
        </template>
      </van-panel>
      <van-action-sheet v-model="boardselectshow"
                        :actions="actions"
                        @select="onSelect" />
    </div>

    <van-form @submit="onSubmit"
              label-align='left'>
      <div class="form_module">
        <div>
          <van-field readonly
                     clickable
                     name="picker"
                     :value="boradform.seatvalue"
                     label="座位规格："
                     placeholder="座位规格"
                     @click="seatshowPicker = true" />
          <van-popup v-model="seatshowPicker"
                     position="bottom">
            <van-picker show-toolbar
                        :columns="seatcolumns"
                        @confirm="seatonConfirm"
                        @cancel="seatshowPicker = false" />
          </van-popup>
        </div>
        <div>
          <van-field readonly
                     clickable
                     name="picker"
                     :value="boradform.accidentvalue"
                     label="选择器："
                     placeholder="有无事故"
                     @click="accidentshowPicker = true" />
          <van-popup v-model="accidentshowPicker"
                     position="bottom">
            <van-picker show-toolbar
                        :columns="accidentcolumns"
                        @confirm="accidentonConfirm"
                        @cancel="accidentshowPicker = false" />
          </van-popup>
        </div>
        <div>
          <van-field readonly
                     clickable
                     name="picker"
                     :value="boradform.operationcvalue"
                     label="运营车辆："
                     placeholder="运营车辆"
                     @click="operationcshowPicker = true" />
          <van-popup v-model="operationcshowPicker"
                     position="bottom">
            <van-picker show-toolbar
                        :columns="operationcolumns"
                        @confirm="operationConfirm"
                        @cancel="operationcshowPicker = false" />
          </van-popup>
        </div>
        <div>
          <van-field readonly
                     clickable
                     name="calendar"
                     :value="boradform.timesvalue"
                     label="时间："
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
      password: '',
      boradArr: [],
      value: '',
      seatcolumns: ['七座以下', '七座以上'],
      accidentcolumns: ['有', '五'],
      operationcolumns: ['是', '否'],
      showPicker: false,
      seatshowPicker: false,
      accidentshowPicker: false,
      operationcshowPicker: false,
      timesshowCalendar: false,
      times: '',
      boardselectshow: false,
      actions: [
        { name: '奥迪Q7', subname: '车牌号：川A497979' },
        { name: '宝马X3', subname: '车牌号：川A497979' },
        { name: '宝骏530', subname: '车牌号：川A497979' }
      ],
      boradform: {
        seatvalue: "",
        accidentvalue: "",
        operationcvalue: "",
        timesvalue: "",
      }
    }
  },
  mounted () {

  },
  methods: {
    onSubmit (values) {
      console.log('submit', values);
    },
    onClickRight () {
      this.$router.push('appointmentlist')
    },
    getboard (borad) {
      console.log(borad)
    },
    seatonConfirm (value) {
      this.boradform.seatvalue = value;
      this.seatshowPicker = false;
    },
    accidentonConfirm (value) {

      this.boradform.accidentvalue = value;
      this.accidentshowPicker = false;
    },
    operationConfirm (value) {
      this.boradform.operationcvalue = value;
      this.operationcshowPicker = false;
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
    onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.boardselectshow = false;
      Toast(item.name);
    },

  },
}
</script>
<style  scoped>
.infotxt {
  height: 34px;
  line-height: 34px;
  text-align: left;
  padding: 9px 40px;
  font-size: 17px;
}
.keyboardCont {
  margin: 15px;
  padding-bottom: 15px;
}
</style>
<style >
.van-field__label {
  text-align: left;
}
</style>