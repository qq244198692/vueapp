// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex);
var store=new Vuex.Store({
	state:{
		tab:'home',
		footshow:true,
		userid:'',
		username:'',
		avatar_url:'',
		accesstoken:'',
		count:0,
		collectid:[]
	},
	mutations:{
		changeshow:function(state,flag){
			state.footshow=flag;
		}
	}
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
