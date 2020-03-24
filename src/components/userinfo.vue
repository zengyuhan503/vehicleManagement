<template>
  <div>
    <van-nav-bar title="个人中心" />
    <!-- 左对齐 -->
    <div class="userheader">
      <van-row type="flex">
        <van-col span="24">
          <div style="text-align:center">
            <van-image round
                       width="5rem"
                       height="5rem"
                       src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <p>曾鈺涵</p>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="van-hairline--bottom">
      <van-grid :column-num="3">
        <van-grid-item to="/CoinSpraylist">
          <div style="text-align:center;">
            <div>
              <van-image width="3rem"
                         height="3rem"
                         :src="gridImg.icon3" />
            </div>
            <p> 预约钣喷：10</p>
          </div>
        </van-grid-item>
        <van-grid-item to="/maintenancelist">
          <div style="text-align:center;">
            <div>
              <van-image width="3rem"
                         height="3rem"
                         :src="gridImg.icon1" />
            </div>
            <p> 预约维修：10</p>
          </div>
        </van-grid-item>
        <van-grid-item to="/maintainlist">
          <div style="text-align:center;">
            <div>
              <van-image width="3rem"
                         height="3rem"
                         :src="gridImg.icon2" />
            </div>
            <p> 预约养护：10</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell-group>
      <van-cell title="车辆管理"
                @click="$router.push('vehiclelist')"
                is-link />
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      gridImg: {
        icon1: require("../assets/img/icon (1).png"),
        icon2: require("../assets/img/icon (2).png"),
        icon3: require("../assets/img/icon (3).png"),
      }
    }
  },
}
</script>
<style  scoped>
.userheader {
  padding: 15px;
  background: #ffffff;
  background: url("http://img0.imgtn.bdimg.com/it/u=3209478221,3791663447&fm=26&gp=0.jpg");
  height: 167px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.userheader .van-row--flex {
  justify-content: center;
  align-items: center;
}
.userheader p {
  color: #fff;
  font-size: 15px;
  line-height: 30px;
}
</style>