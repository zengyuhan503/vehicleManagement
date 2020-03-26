// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

Vue.prototype.oepnID = "1";
let isFormData = (v) => {
  return Object.prototype.toString.call(v) === '[object FormData]';
}
Vue.use(Vant);
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.API_ROOT;
axios.interceptors.request.use(
  config => {
    if (config.method == 'post') {
      var v = config.data;
      // console.log(isFormData(config.data))
      var isconfigBody = isFormData(config.data);
      if (isconfigBody) {
        config.data.append("openId", "1")
      } else {
        config.data = {
          ...config.data,
          openId: 1,
        }
      }
    } else if (config.method == 'get') {
      config.params = {
        openId: 1,
        ...config.params
      }
    }
    return config
  }, function (error) {
    console.log(error)
    return Promise.reject(error)
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
