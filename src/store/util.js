/******************************************************************************************
 * 本模块用来提供:makeState/makeMatution用于动态生成vuex的state和matution
 * 通过配置文件的形式，辅助vuex做缓存
 * 
 * 条件：
 * 1、定义单个模块名字:NAME
 * 2、配置DEFINESTATE、DEFINEMUTATION对象；
 * 3、在创建store的时候以plugins的形式调用loadVuexstate,对所有的store模块初始化
 * 4、[可选]实现destoryModVuexValue，用于删除vuex对应模块下的key
 * 
 * 功能:
 * 1、参考配置文件index下面的：DEFINESTATE、DEFINEMUTATION
 * 
 * 想要使用缓存的方法有2个
 * 1、将需要缓存的state与type绑定在一起，type事件来的时候，同步更新state数据到缓存中；
 * 方法：
 * 通过plugins其中一方法中 store.subscribe每次mutation的时候回调，统一处理，
 * 但是由于返回参数只有 mutation,state 格式为 mutation{ type, payload },state则为声明 vuex传入的多个state
 * type就是type.js中定义的各个静态字符串，用于作为matution的方法名来更新状态。
 * 
 * 2、在matution的所有的对象方法中，对需要缓存的参数进行额外调用方法缓存，方法由统一提供，该方式灵活，一个type可以更新多个state，
 * 不需要额外绑定state跟type，但是需要多次调用缓存方法。
 *******************************************************************************************/

 /**********************************************************************
  *								配置state说明
  * *********************************************************************/
 /* DEFINESTATE：定义state参数的格式要求,定，义后，里面的参数只作为初始配置，在后续的state更新中，并不会更新DEFINESTATE内部的参数
 * 即将支持以下规则
 * 配置参数规则,
 * save:{
 * 		rem:"是否缓存该参数，用以定义对应的state是否自动更新到缓存中去，次参数不会影响state即时触发的页面刷新重新渲染",
 * 		type:bool,
 * 		def:false,//所有参数默认都不使用缓存，需要缓存，只需要去配置DEFINESTATE
 * }
 * type:{
 * 		rem:'基于save参数有true时，配置vuex的参数持久化的方式localStorage,sessionStorage',
 * 		default:'local'
 * 		enum:['sess','local'],//仅支持2中方式，默认是localStorage储存方式
 * },
 * def:{
 * 		rem:"参数默认值"
 * },
 * ttl:{
 * 		rem:"过期时间设置,以本机时间为准",//ms为单位
 * 		type:"int",
 * 		range:"[0,null]",//null表示无过期时间
 * 		def:null
 * },
************************************************************************/


 /**********************************************************************
  *								配置mutation说明
  * *********************************************************************/
 /* 定义mutation跟state的映射关系,
 * state:{
 * 		rem:"state的key名字",
 * 		type:"string",
 * 		need:true //该参数必传，否则会报错
 * }
 * hook:{
 * 		rem:"钩子函数",//该mutation执行后的回调，允许用户做自己的逻辑处理,当用户传了此参数时，DEFINE的save属性仍然会自动生效,但不会自动更新state,需要用户自己更新
 * 		type:"function",
 * }
 * 使用举例:
 * eg:{
 * 		setTest:'test',//这里的test对应到state中，故，如果state的名字变了，这里同样需要变更，否则会无法同步更新数据
 * }
 * eg:{
 * 		setTest:{state:'test',hook:function(state.payload){
 * 			//do something...
 * 		}}
 * }
 *  ***************************************************************/
import _ from "lodash";

export const prefix = 'vxs';
let MODs;
/**
 * 初始化，读取缓存的state
 * MOD:Object 次值为vuex的modules参数
 * */
export function loadVuexstate(MOD){
	MODs = MOD; //配置本地缓存模块
	let mk = Object.keys(MOD), def, saveObj;
	for(let i of mk){
		let s = Object.keys(MOD[i].state);
		for(let it of s){ //拿到所有的key
			def = getDefine(it, MOD[i].NAME);
			saveObj = getStorage(def);
			let c = saveObj.getItem(`${prefix}-${MOD[i].NAME}-${it}`);
			if(c != null){
				try{
					c = JSON.parse(c);
				}catch(err){

				}
				MOD[i].state[it] = c;
			}
		}
	}
}

/*********************** 
 * 返回定义的配置文件
 * key:string,该值即为Vue的 state的key值
 * modname:string,store模块的名字NAME
***********************/
function getDefine(key, modname){
	if(MODs[modname]){ //获取指定模块的配置
		let s = Object.keys(MODs[modname].DEFINESTATE);
		if(s.indexOf(key) !== -1){ //找到对应的key，获取其配置信息
			return MODs[modname].DEFINESTATE[key];
		}
		return null;
	}
}
/*************
 * 根据DEFINESTATE配置的内容，返回储存的对象
 * define:object,
 *************/
function getStorage(define){
	let saveObj = localStorage;
	if(define && define.type==='sess'){
		saveObj = sessionStorage;
	}
	return saveObj;
}
/*****************
 * 发生状态更新的时候，刷新响应的状态到页面缓存中
 * key:string,该值即为Vue的 state的key
 * name:string,state的值
 * val:string|object,需要保存的值
****************/
export function updateVuexstate(key, val, name){
	if(typeof val==='object'){
		val = JSON.stringify(val);
	}
	let def = getDefine(key, name);
	let saveObj = getStorage(def);
	saveObj.setItem(`${prefix}-${name}-${key}`, val);
}

/*********************** 
 * key:string,该值即为Vue的 state的key值
 * modname:string,store模块的名字NAME
***********************/
export function destoryModVuexValue(key, modname){
	let def = getDefine(key, modname)
	let saveObj = getStorage(def);
	saveObj.removeItem(`${prefix}-${modname}-${key}`);
	//同时清除该state
	if(def != null && typeof def==='object'){
		MODs[modname].state[key] = def.def;
	}else{
		MODs[modname].state[key] = def;
	}
	//这里需要对默认值可能存在对象的索引，进行新建引用，否则会因为索引的改变导致默认值的改变
	if(typeof MODs[modname].state[key]==='object' && MODs[modname].state[key] != null){
		try{
			MODs[modname].state[key] = _.cloneDeep(MODs[modname].state[key]);
		}catch(err){
			
		}
	}
}
/**
 * 清空vuex的缓存，并恢复所有的vuex状态
 */
export function destoryAllVuex(){
	let mk = Object.keys(MODs), def, saveObj;
	for(let i of mk){
		let s = Object.keys(MODs[i].state);
		for(let it of s){ //拿到所有的key
			def = getDefine(it, MODs[i].NAME);
			saveObj = getStorage(def);
			saveObj.removeItem(`${prefix}-${MODs[i].NAME}-${it}`);
			if(def != null && typeof def==='object'){
				MODs[i].state[it] = def.def;
			}else{
				MODs[i].state[it] = def;
			}
			if(typeof MODs[i].state[it]==='object' && MODs[i].state[it] != null){
				try{
					MODs[i].state[it] = _.cloneDeep(MODs[i].state[it]);
				}catch(err){

				}
			}
		}
	}
}

/**
 * 功能：生成默认state
 * obj:object,为define定义的state要求
 */
export function makeState(obj){
	let mk = Object.keys(obj),
		ro = {}
	for(let i of mk){
		let val = obj[i];
		if(obj[i] != null && typeof obj[i]==='object' && Object.keys(obj[i]).indexOf('def') !== -1){
			val = obj[i].def;
		}
		ro[i] = val;
		//这里需要对默认值可能存在对象的索引，进行新建引用，否则会因为索引的改变导致默认值的改变
		if(typeof val==='object' && val != null){
			try{
				ro[i] = _.cloneDeep(val);
			}catch(err){

			}
		}
	}
	return ro;
}

/****************
 * 功能：生成matution
 * obj:object,为DEFINEMUTATION定义的matution要求
 * modname:string,模块定义的NAME
 ***************/
export function makeMatution(obj, modname){
	let mkey = Object.keys(obj),
		ro = {};
	for(let i of mkey){
		ro[i] = function(state, payload){
			if(!obj[i]){
				throw Error("makeMatution key %s 不能为空", i)
			}
			let sName = obj[i];
			if(typeof obj[i]==='object'){
				sName = obj[i].state; 
			}
			if(!sName){
				throw Error("makeMatution key %s 的state定义错误", i)
			}
			let def = getDefine(sName, modname);
			
			if(obj[i].hook){ //使用钩子
				let cb = obj[i].hook(state, payload);
				if(cb != null){
					payload = cb; //hook处理数据后返回,覆盖原有的state
				}else{
					return;
				}
			}
			if(def && def.save){ //更新缓存
				updateVuexstate(sName, payload, modname)
			}
			state[sName] = payload; //更新state
		}
	}
	return ro;
}