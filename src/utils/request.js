import axios from 'axios';
import eventBus from './eventBus';
import store from '@/store/store';

const defaultTimeout = 45000
//网络请求提示语
const timeOutStr = 'The request timed out. Please try again later！';
const requestError = 'Request exception, please try again later！';
const refreshErr = 'Network error, please refresh after confirming that the network is normal!';
var baseUrl="";
export function initRequest(burl){
    baseUrl=burl;
}
var isLoading=false;
const service = axios.create({
    timeout: defaultTimeout, //请求超时时间
});
//请求拦截器
service.interceptors.request.use(
    function (config) {
        store.dispatch('showLoadingAct');
        // eventBus.$emit('networkLoading', true);
        //发送请求之前
        return config;
    },
    function (error) {
        if(isLoading){
            store.dispatch('hideLoadingAct');
        }
        // eventBus.$emit('networkLoading', false);
        //请求错误
        return Promise.reject(error);
    }
);
//响应拦截器
service.interceptors.response.use(
    function (response) {
        if(isLoading){
			store.dispatch('hideLoadingAct');
		}
        // eventBus.$emit('networkLoading', false);
        //添加默认的请求失败返回文本
        if (response.data && response.data.no && response.data.no !== 200 && !response.data.msg) {
            response.data.msg = requestError;
        }
        if(response.data&&!response.data.no){
            //这里会把所有不带no返回的请求，统一封装为带no返回
            let r = {no:200,data:response.data}; 
            if(response.data&&response.data.constructor==Object){
                r = {no:200,...response.data};
            }
            return r;
        }
        return response.data;
    },
    function (error) {
        if(isLoading){
			store.dispatch('hideLoadingAct');
		}
        // eventBus.$emit('networkLoading', false);
        let msg = requestError,no;
        if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) { //超时
            msg = timeOutStr;
        } else if (!error.code && !error.response) { //无网络响应
            msg = "当前无网络连接，请确认网络状态后重试。";
        } else if (error.response) {
            no = error.response.status;
            switch (no) {
                case 404:
                    msg = "找不到该资源。";
                    break;
            }
        }
        //响应错误
        return Promise.reject({error: {msg,no}});
    }
);

/***
 * 支持所有的方法请求
 * url: @param {String} 请求地址,
 * params: @param {Object} 请求参数,
 * method: @param {String} 请求方法类型，默认为get请求,
 */
export function request({url, params=null,method="GET",loading=true} = {}){
    isLoading = loading;
    method=method.toLowerCase();
    let Ser ;
    if(service[method]){
        Ser=service[method];
    }else{
        return {no:400,msg:"请求方法错误"}
    }
    let pa ={};
    if(method=="get"){
        pa.params=params;
    }else{
        pa=params;
    }
    if(url.indexOf('http')===-1){
		url = baseUrl + url;
    }
	return new Promise((resolve, reject) => {
		Ser(url,pa).then(async (response) => {
            let ret = response;
			if(!ret){
				resolve({error: 'error'});
			}else if(ret.no !== 200){
				resolve({error: ret});
			}else{
				resolve({data: ret});
			}
		}).catch((error) => {
			resolve(error);
		})
	})
}
export default service;
