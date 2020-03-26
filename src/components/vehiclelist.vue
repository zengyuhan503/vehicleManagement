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
                finished-text="没有更多数据，快去添加"
                @load="onLoad">
        <div v-for="(item, index) in list"
             :key="index">
          <van-card :title="item.plateNumber"
                    :thumb="item.image">
            <template #tags>
              <van-tag plain
                       type="danger">{{item.models}}</van-tag>
            </template>
            <template #desc>
              <div>
                <p class="cardDesc">
                  注册日期：{{item.registTime}}
                </p>
              </div>
            </template>
          </van-card>
        </div>

      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      finished: false,
      list: []
    }
  },
  mounted () {
    this.getcarlist()
  },
  methods: {
    getcarlist () {
      var openId = "null"
      var params = {
        openId: openId
      }
      this.axios.post("/careful/car_list", params)
        .then(res => {
          console.log(res);
          this.list = res.data.data.list
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