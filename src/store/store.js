import Vue from 'vue';
import Vuex from 'vuex';
import { loadVuexstate, destoryModVuexValue, destoryAllVuex } from './util';
import moduleCom from './index';

Vue.use(Vuex);
//使用的vuex模块，每个模块各自包含state, mutations, getters, actions
if (!moduleCom.NAME) {
	throw Error('moduleCom 模块缺少NAME定义')
}
var MOD = {};
MOD[moduleCom.NAME] = moduleCom;
function myPlugin(store) {
	// 当 store 初始化后调用
	loadVuexstate(MOD);//初始化state，从内存中取数据进行初始化
	// store.subscribe((mutation, state) => {
	// updateVuexstate(mutation, state)
	// 每次 mutation 之后调用
	// mutation 的格式为 { type, payload }
	// });
}

//这里要注意，如果有多个模块，需要提供多个方法来删除对应的对应的key
/***********************************************
 *
 * key:String,该值即为Vue的 state的key
***********************************************/
function destoryVuexValue(key) {
	destoryModVuexValue(key, moduleCom.NAME);
}


const store = new Vuex.Store({
	plugins: [myPlugin],
	modules: MOD
})
store.destoryVuexValue = destoryVuexValue;
store.destoryAllVuex = destoryAllVuex; //连同vuex跟本地都一并清理
export default store
