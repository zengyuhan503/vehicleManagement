<template>
  <div>
    <van-nav-bar title="预约养护" />
    <van-notice-bar color="#1989fa"
                    background="#ecf9ff"
                    left-icon="info-o">
      预约钣喷，请填写车辆信息
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
                     name="calendar"
                     :value="boradform.appointmentTime"
                     label="预约时间："
                     placeholder="点击选择日期"
                     @click="timesshowCalendar = true" />
          <van-calendar v-model="timesshowCalendar"
                        @confirm="timesonConfirm" />
        </div>
      </div>
      <div>
        <van-field readonly
                   clickable
                   name="picker"
                   :value="boradform.project"
                   label="维修项目"
                   placeholder="选择维修项目"
                   @click="maintenanceshowCalendar = true" />
        <van-popup v-model="maintenanceshowCalendar"
                   position="bottom">
          <van-picker show-toolbar
                      :columns="project"
                      @confirm="maintenanceonConfirm"
                      @cancel="maintenanceshowCalendar = false" />
        </van-popup>
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
import { Toast } from 'vant';
export default {
  components: {
    keyboard
  },
  data () {
    return {
      project: ['轮胎养护', '发动机养护'],
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
        project: "",
        plateNumber: ""
      },
      boradparams: {
        timesvalue: "",
        project: "",
        plateNumber: ""
      },
      uploader: [],
    }
  },
  mounted () {
    this.getwarranty_pro()
  },
  methods: {
    // 保修项目
    getwarranty_pro () {
      this.project = []
      this.axios.post('/menu/warranty_pro')
        .then(res => {
          if (res.data.code !== 10000) {
            Toast.fail(res.data.msg);
            return false;
          }
          console.log(res)
          var data = res.data.data;
          data.forEach(element => {
            var data = { "keyId": element.value, "text": element.key };
            this.project.push(data)
          });
        })
        .catch(err => {
          console.error(err);
        })
    },
    maintenanceonConfirm (value) {
      this.boradform.project = value.text;
      this.boradparams.project = value.keyId;
      this.maintenanceshowCalendar = false;
    },
    onSubmit (values) {
      console.log(this.boradparams)
      this.axios.post('about/preserve_add', this.boradparams)
        .then(res => {
          if (res.data.code !== 10000) {
            Toast.fail(res.data.msg + "请重新填写错误信息");
          } else {
            Toast.success(res.data.msg);
          }
        })
        .catch(err => {
          console.error(err);
        })
      console.log('submit', values);
    },
    onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.boardselectshow = false;
      Toast(item.name);
    },
    getboard (borad) {
      console.log(borad)
      this.boradform.plateNumber = borad;
      this.boradparams.plateNumber = borad.join("");
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
  },
} 
</script>
<style scoped>
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
.upimg .van-cell {
  flex-flow: column;
}
</style>
<style >
.upimg .van-field__label {
  display: block;
  height: 40px;
  line-height: 40px;
  margin: 10px 0;
}
</style>