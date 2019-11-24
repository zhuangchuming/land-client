import Vue from 'vue'
import Router from 'vue-router'
const Home = ()=> import( /* webpackChunkName:'chapter-report' */ '@/views/index');//首页
const Detail = () => import(/* webpackChunkName:'welcome' */ '@/views/detail');//产品详情页面
const Service = () => import(/* webpackChunkName:'welcome' */ '@/views/service');//产品详情页面
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/detail',
			name: 'detail',
			component: Detail
		},
		{
			path: '/service',
			name: 'service',
			component: Service
		}
	]
})
