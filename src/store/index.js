import { makeState, makeMatution } from './util';
/******************
 * 定义模块的名字
 * *****************/
const NAME = 'cm';
/**
 * DEFINESTATE：定义state参数的格式要求，定义后，里面的参数只作为初始配置，在后续的state更新中，并不会更新DEFINESTATE内部的参数
 * 配置参数规则：
 * save: {
 * 		rem: "是否缓存该参数，用以定义对应的state是否自动更新到缓存中去，此参数不会影响state即时触发导致页面重新渲染",
 * 		type: boolean,
 * 		def: false //所有参数默认都不使用缓存
 * }
 * type: {
 * 		rem: "当save参数为true时，配置vuex的参数持久化的方式为localStorage或sessionStorage",
 * 		default: 'local'
 * 		enum: ['sess', 'local'] //仅支持两种方式，默认是localStorage储存方式
 * },
 * def: {
 * 		rem: "参数默认值"
 * },
 * ttl: {
 * 		rem: "过期时间设置，以本机时间为准", //单位为ms
 * 		type: "int",
 * 		range: "[0, null]", //null表示无过期时间
 * 		def: null
 * }
*/
//注意：请确保每个state只负责一件事情，避免多件不同的事情共用同一个state，并记得及时清除state
//注意：请确保每个state只负责一件事情，避免多件不同的事情共用同一个state，并记得及时清除state
//注意：请确保每个state只负责一件事情，避免多件不同的事情共用同一个state，并记得及时清除state
const DEFINESTATE = {
	showLoading: false, //是否显示loading图
	userInfo: {def: null, save: true}, //字号大小
	netInfo:{def: null, save: true},//访问的域名信息
};

//这里的state使用makeState生成
var state = makeState(DEFINESTATE);
/*******************************************************************
 * 定义mutation跟state的映射关系,
 * state: {
 * 		rem: "state的key名字",
 * 		type: string,
 * 		need: true //该参数必传，否则会报错
 * }
 * hook: {
 * 		rem: "钩子函数", //该mutation执行后的回调，允许使用者做自己的逻辑处理，当使用者传了此参数时，DEFINESTATE的save属性仍然会生效，但不会自动更新state，需要用户自己更新
 * 		type: function,
 * }
 * 使用举例：
 * eg: {
 * 		setTest: 'test' //这里的test对应到state中，故，如果state的名字变了，这里同样需要变更，否则会无法同步更新数据
 * }
 * eg: {
 * 		setTest: {state: 'test', hook: function(state.payload){
 * 			//do something...
 * 		}}
 * }
 *  ***************************************************************/
const DEFINEMUTATION = {
	showLoading: {state: 'showLoading',
		hook: (s, payload) => { //这是一个钩子方法
			s.showLoading = true; //显示loading图
		}},
	hideLoading: {state: 'showLoading',
		hook: (s, payload) => {
			s.showLoading = false; //隐藏loading图
		}},
	setUserInfo:'userInfo',
	setNetInfo:'netInfo',
};

const mutations = makeMatution(DEFINEMUTATION, NAME);

var actions = {
	showLoadingAct({commit}) {
		commit('showLoading');
	},
	hideLoadingAct({commit}) {
		commit('hideLoading');
	}
};

//供外部访问state的计算属性
var getters = {
	showLoading(state){
		return state.showLoading;
	},
	getUserInfo(state){
		return state.userInfo;
	},
	getNetInfo(state){
		return state.netInfo
	}
};

export default { state, mutations, getters, actions, DEFINESTATE, NAME }; //注意这里需要申明一个名字，作为缓存的时候的一个key