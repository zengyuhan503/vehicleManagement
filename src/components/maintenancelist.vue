<template>
  <div>
    <van-nav-bar title="维修列表"
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
                    :thumb="gridImg.icon2">
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
    this.getmaintenancelist();
    this.getopenID()
  },
  methods: {
    getopenID () {
      var token = this.$route.query.state;

      var redirect_uri = escape(window.location.href + "?state=true");
      console.log(redirect_uri)
      var APPID = "wxd5c04a0b457efd8f";
      if (token) {
        var code = this.GetRequest(code)
        console.log(code)
        alert(code)
        return false
      } else {
        var wxopenidurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID + "&redirect_uri=" + redirect_uri + "&response_type=snsapi_base&scope=SCOPE&state=true#wechat_redirect"
        window.location.href = wxopenidurl;
      }
    },
    GetRequest (urlStr) {
      if (typeof urlStr == "undefined") {
        var url = decodeURI(location.search); //获取url中"?"符后的字符串
      } else {
        var url = "?" + urlStr.split("?")[1];
      }
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    },
    gettime (time) {
      return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },
    getmaintenancelist () {
      var params = {
        "endTime": "99999999999",
        "openId": "string",
        "pageNum": 0,
        "pageSize": 1000,
        "startTime": "0"
      }
      this.axios.post("careful/maintenance_select", params)
        .then(res => {
          console.log(res)
          if (res.data.code !== 10000) {
            Toast.fail(res.data.msg);
          } else {
            this.list = res.data.data.list
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    onLoad () {
      // 异步更新数据
      this.loading = false;
      this.finished = true;
    },
    onClickLeft () {
    },
    onClickRight () {
      this.$router.push('maintenance')
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