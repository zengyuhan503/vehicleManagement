<template>
  <div>
    <van-nav-bar title="钣喷列表"
                 right-text="预约"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />
    <div class="listCont">
      <van-list v-model="loading"
                :finished="finished"
                @load="onLoad">
        <div v-for="(item, index) in list"
             :key="index">
          <van-card :title="item.plateNumber"
                    :thumb="gridImg.icon1">
            <template #desc>
              <div>
                <p class="cardDesc">
                  预约时间：{{gettime(item.appointmentTime)}}
                </p>
              </div>
            </template>
          </van-card>
          <van-divider />
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      gridImg: {
        icon1: require("../assets/img/icon (1).png"),
        icon2: require("../assets/img/icon (2).png"),
        icon3: require("../assets/img/icon (3).png"),
      }
    }
  },
  mounted () {
    this.getpreservelist()
  },
  methods: {
    onLoad () {
      // 异步更新数据
      this.loading = false;
      this.finished = true;
    },
    onClickLeft () {
    },
    onClickRight () {
      this.$router.push('CoinSpray')
    },
    getpreservelist () {
      var params = {
        "endTime": "99999999999",

        "pageNum": 0,
        "pageSize": 1000,
        "startTime": "0"
      }
      this.axios.post("careful/lacquered_select", params)
        .then(res => {
          if (res.data.code !== 10000) {
            Toast.fail(res.data.msg);
          } else {
            this.list = res.data.data.list;
            console.log(this.list)
          }
        })
        .catch(err => {
          console.error(err);
        })
    }
  },
}
</script>
<style scoped>
.listCont {
  padding: 15px 15px;
}
.van-card {
  background: #ffffff;
}
.van-card__title {
  font-size: 16px;
}
.cardDesc {
  margin: 17px 0px;
}
</style>