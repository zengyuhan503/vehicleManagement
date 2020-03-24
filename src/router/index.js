import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import annualVerification from '@/components/annualVerification';
import keyboard from '@/components/keyboard';
import appointmentlist from '@/components/appointmentlist';
import CoinSpray from '@/components/CoinSpray';
import maintenance from '@/components/maintenance';
import maintain from '@/components/maintain';
import userinfo from '@/components/userinfo';
import vehiclelist from '@/components/vehiclelist';
import addvehicle from '@/components/addvehicle';
import CoinSpraylist from '@/components/CoinSpraylist';
import maintenancelist from '@/components/maintenancelist';
import maintainlist from '@/components/maintainlist';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '代办年审',
      component: annualVerification
    },
    {
      path: '/keyboard',
      name: 'keyboard',
      component: keyboard
    },
    {
      path: '/appointmentlist',
      name: '预约列表',
      component: appointmentlist
    },
    {
      path: '/CoinSpray',
      name: '预约钣喷',
      component: CoinSpray
    },
    {
      path: '/CoinSpraylist',
      name: '钣喷LIST',
      component: CoinSpraylist
    },
    {
      path: '/maintenance',
      name: '预约维修',
      component: maintenance
    },
    {
      path: '/maintenancelist',
      name: '维修LIST',
      component: maintenancelist
    },
    {
      path: '/maintain',
      name: '预约养护',
      component: maintain
    },
    {
      path: '/maintainlist',
      name: '养护LIST',
      component: maintainlist
    },
    {
      path: '/userinfo',
      name: '个人中心',
      component: userinfo
    },
    {
      path: '/vehiclelist',
      name: '车辆列表',
      component: vehiclelist
    },
    {
      path: '/addvehicle',
      name: '添加车辆',
      component: addvehicle
    },
  ]
})
