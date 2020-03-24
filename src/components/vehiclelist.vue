<template>
  <div>
    <van-nav-bar title="车辆列表"
                 right-text="添加"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight" />
    <div class="listCont">
      <van-list v-model="loading"
                :finished="finished"
                @load="onLoad">
        <van-card title="川A-123456"
                  thumb="http://img1.imgtn.bdimg.com/it/u=2085257975,2837583384&fm=26&gp=0.jpg">
          <template #tags>
            <van-tag plain
                     type="danger">奥迪A6</van-tag>
          </template>
          <template #desc>
            <div>
              <p class="cardDesc">
                注册日期：2020年01月01日
              </p>
            </div>
          </template>
        </van-card>
        <van-card title="川A-888888"
                  thumb="http://img.mp.itc.cn/upload/20160508/e1523a4ef01b48ee858ff096d72d8e37_th.jpg">
          <template #tags>
            <van-tag plain
                     type="danger">VISION NEXT 100</van-tag>
          </template>
          <template #desc>
            <div>
              <p class="cardDesc">
                注册日期：2020年02月01日
              </p>
            </div>
          </template>
        </van-card>
        <van-card title="川A-666666"
                  thumb="http://dealer.qc188.com/dealer/uploadfile/2017/11/11/20171111153358706.jpg">
          <template #tags>
            <van-tag plain
                     type="danger">奔弛G500</van-tag>
          </template>
          <template #desc>
            <div>
              <p class="cardDesc">
                注册日期：2020年01月01日
              </p>
            </div>
          </template>
        </van-card>

      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      finished: false
    }
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
      this.$router.push('addvehicle')
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