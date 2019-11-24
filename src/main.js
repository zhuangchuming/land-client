// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/font.css';
import {Rate,Toast} from 'vant';
import {request,initRequest} from '@/utils/request.js';
import {serviceUrl} from '@/config';

import store from './store/store';
initRequest(serviceUrl);
Vue.prototype.$request=request;
Vue.config.productionTip = false


Vue.use(Rate);
Vue.use(Toast);
Vue.prototype.$toast = Toast;
Vue.prototype.$isAndroid=/Android|Linux/i.test(navigator.userAgent);
Vue.prototype.$isIOS=/iPhone|iPod|iPad/i.test(navigator.userAgent);

Vue.prototype.$isAPP = Vue.prototype.$isAndroid||Vue.prototype.$isIOS;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
