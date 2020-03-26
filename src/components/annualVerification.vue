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
                     :value="boradform.size"
                     label="座位规格："
                     placeholder="座位规格"
                     value-key="text"
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
                     :value="boradform.accident"
                     label="有无事故"
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
                     :value="boradform.scale"
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
          <!-- <van-field clickable
                     name="calendar"
                     :value="boradform.appointmentTime"
                     label="时间："
                     readonly="readonly"
                     placeholder="点击选择日期"
                     @click="timesshowCalendar = true" /> -->
          <!-- <van-calendar v-model="timesshowCalendar"
                        type="datetime"
                        color="#07c160"
                        @confirm="timesonConfirm" /> -->
          <van-field readonly
                     clickable
                     name="calendar"
                     :value="value"
                     label="时间"
                     placeholder="点击选择日期"
                     @click="showCalendar = true" />
          <van-calendar v-model="showCalendar"
                        @confirm="onConfirm" />
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
import { Toast } from 'vant';
import keyboard from "../components/keyboard";
export default {
  components: {
    keyboard
  },
  data () {
    return {
      value: '',
      showCalendar: false,
      username: '',
      password: '',
      boradArr: [],
      value: '',
      seatcolumns: [
        { "keyId": 1, "text": "七座以下" },
        { "keyId": 0, "text": "七座以上" },
      ],
      accidentcolumns: [
        { "keyId": 0, "text": "无" },
        { "keyId": 1, "text": "有" },
      ],
      operationcolumns: [
        { "keyId": 0, "text": "否" },
        { "keyId": 1, "text": "是" },
      ],
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
        size: "",
        accident: "",
        scale: "",
        appointmentTime: "",
        plateNumber: ""
      },
      boradparams: {
        size: "",
        accident: "",
        scale: "",
        appointmentTime: "",
        plateNumber: ""
      }
    }
  },
  mounted () {
    console.log(this.oepnID)
    this.getseatcolumns()
    this.getoperation();
    this.getseat_spec();
    this.getcarlist()

  },
  methods: {
    getcarlist () {
      this.actions = []
      var openId = "null"
      var params = {
        openId: openId
      }
      this.axios.post("/careful/car_list", params)
        .then(res => {
          console.log(res);
          var list = res.data.data.list;
          list.forEach((i, k) => {
            this.actions.push(
              { name: i.models, subname: '车牌号：' + i.plateNumber, value: i.plateNumber },
            )
          })
        })
        .catch(err => {
          console.error(err);
        })
    },
    onSubmit (values) {
      this.axios.post('/about/careful_add', this.boradparams)
        .then(res => {
          console.log(res)
          if (res.data.code !== 10000) {
            Toast.fail(res.data.msg + "请重新填写错误信息");
          } else {
            Toast.success(res.data.msg);
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    onClickRight () {
      this.$router.push('appointmentlist')
    },
    getboard (borad) {
      // console.log(borad)
      this.boradform.plateNumber = borad;
      this.boradparams.plateNumber = borad.join("");
    },
    // 事故
    getseatcolumns () {

      this.accidentcolumns = [];
      this.axios.post('/menu/accident')
        .then(res => {
          if (res.data.code !== 10000) {
            Toast.fail(res.data.msg);
            return false;
          }
          var data = res.data.data;
          data.forEach(element => {
            var data = { "keyId": element.value, "text": element.key };
            this.accidentcolumns.push(data)
          });
        })
        .catch(err => {
          console.error(err);
        })
    },
    // 维修项目
    getmaintenance_pro () {
      this.axios.post('/menu/maintenance_pro')
        .then(res => {
          console.log(res)

        })
        .catch(err => {
          console.error(err);
        })
    },
    // 运营
    getoperation () {
      this.operationcolumns = [];
      this.axios.post('/menu/operation')
        .then(res => {
          if (res.data.code !== 10000) {
            Toast.fail(res.data.msg);
            return false;
          }
          var data = res.data.data;
          data.forEach(element => {
            var data = { "keyId": element.value, "text": element.key };
            this.operationcolumns.push(data)
          });
        })
        .catch(err => {
          console.error(err);
        })
    },
    // 座位规格
    getseat_spec () {
      this.seatcolumns = []
      this.axios.post('/menu/seat_spec')
        .then(res => {
          if (res.data.code !== 10000) {
            Toast.fail(res.data.msg);
            return false;
          }
          var data = res.data.data;
          data.forEach(element => {
            var data = { "keyId": element.value, "text": element.key };
            this.seatcolumns.push(data)
          });
          // this.seatcolumns=
        })
        .catch(err => {
          console.error(err);
        })
    },
    // 保修项目
    getwarranty_pro () {
      this.axios.post('/menu/warranty_pro')
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err);
        })
    },
    seatonConfirm (value) {
      console.log(value)
      // var value = value.text
      this.boradform.size = value.text;
      this.boradparams.size = value.keyId;
      this.seatshowPicker = false;
    },
    accidentonConfirm (value) {
      this.boradform.accident = value.text;
      this.boradparams.accident = value.keyId;
      this.accidentshowPicker = false;
    },
    operationConfirm (value) {
      this.boradform.scale = value.text;
      this.boradparams.scale = value.keyId;
      this.operationcshowPicker = false;
    },
    onConfirm (date) {
      this.value = `${date.getMonth() + 1}/${date.getDate()}`;
      var timestamp = parseInt(new Date(date).getTime() / 1000);
      this.boradparams.appointmentTime = timestamp;
      this.showCalendar = false;
    },
    timesonConfirm (times) {
      var date = times;
      var timestamp = parseInt(new Date(times).getTime() / 1000);
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d;
      this.boradform.appointmentTime = timer;
      this.boradparams.appointmentTime = timestamp;
      this.timesshowCalendar = false;
    },
    onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.boardselectshow = false;
      this.boradparams.plateNumber = item.value;
      this.boradArr = item.value.split('');
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