// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import '@/assets/font.css';
import '@/assets/font/iconfont.css';

import {Rate,Toast,Popup,Pagination} from 'vant';
import {request,initRequest} from '@/utils/request.js';
import {serviceUrl} from '@/config';

import store from './store/store';
initRequest(serviceUrl);
Vue.prototype.$request=request;
Vue.config.productionTip = false

Vue.use(Pagination);
Vue.use(Rate);
Vue.use(Toast);
Vue.use(Popup);
Vue.prototype.$toast = Toast;
Vue.prototype.$isAndroid=/Android|Linux/i.test(navigator.userAgent);
Vue.prototype.$isIOS=/iPhone|iPod|iPad/i.test(navigator.userAgent);
Vue.prototype.$isWinPhe=/windowsphone/i.test(navigator.userAgent);
Vue.prototype.$BLACKBERRY =/(playbook|blackberry|bb\d+).*version\/([\d.]+)/i.test(navigator.userAgent);
Vue.prototype.$isAPP = Vue.prototype.$isAndroid||Vue.prototype.$isIOS||Vue.prototype.$BLACKBERRY||Vue.prototype.$isWinPhe;
Vue.prototype.$isWap=!Vue.prototype.$isAPP;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
