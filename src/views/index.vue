<template>
	<div class="home infinite-list-wrapper" :class="{isApp:$isAPP,WAP:!$isAPP}">
		<div :class="['title',{isApp:$isAPP}]">
			{{netInfo&&netInfo.brand}}
			<div class="describe">{{netInfo&&netInfo.introduce}}</div>
		</div>
		<div class="contact">
			<div>If you like these products, please contact us for a <b class="coupon">coupon</b>.If you can leave a real user experience review, you will get a bigger deal.</div>
			<a v-if="netInfo" class="mail" :href="'mailto:'+netInfo.mail">Email:{{netInfo.mail}}</a>
		</div>
		<!-- <ul :class="['product-list',{isApp:$isAPP,WAP:!$isAPP}]"> -->
		<!-- <van-list v-model="isLoading" :class="['product-list',{isApp:$isAPP,WAP:!$isAPP}]" :offset="100" :finished="finished" finished-text="没有更多数据了" @load="loadMore">
			<li class="product-item" v-for="(item,idx) of list" :key="idx" @click="toDetail(item)">
				<div class="box"><img class="s-box-1" :src="imgSrv+item.pic"/></div>
				<div class="tit">{{item.tit}}</div>
				<div class="price">{{item.price}}</div>
			</li>
		</van-list> -->
			<ul 
				:class="['product-list',{isApp:$isAPP,WAP:!$isAPP}]"
				v-infinite-scroll="loadMore"
				:infinite-scroll-disabled="isLoading||finished">
				<li class="product-item" v-for="(item,idx) of list" :key="idx" @click="toDetail(item)">
					<div class="box"><img class="s-box-1" :src="imgSrv+item.pic"/></div>
					<div class="tit">{{item.tit}}</div>
					<div class="price">{{item.price}}</div>
				</li>
			</ul>
			<p class="list-bottom" v-if="isLoading">加载中...</p>
			<p class="list-bottom" v-if="finished">没有更多数据了</p>
		<!-- </ul> -->
		<div class="bottom" v-if="netInfo&&netInfo.beian">
			<div class="name">{{netInfo.brand}}</div>
			<div class="beian">{{netInfo.company}}版权所有 <a class="link" href="http://www.beian.miit.gov.cn">{{netInfo.beian}}</a> </div>
		</div>
	</div>
</template>
<script>
import {imgSrv} from '@/config';
import Vue from 'vue';
import { List } from 'vant';
Vue.use(List);
import { InfiniteScroll } from 'element-ui';
Vue.use(InfiniteScroll);
// 手机设计比例是 1334*750
// 电脑设计比例是 1600:900
export default {
	name:'home',
	data(){
		return{
			netInfo:null,//网站信息
			list:[],
			pageCnt:0,//页码数
			imgSrv:imgSrv,
			isLoading:false,
			finished: false,
			loadPage:0,
		}
	},
	created(){
		this.getNetUrl();
		// this.getProductLst();
	},
	methods:{
		 //获取当前域名，并用这个域名去后端换取code
        async getNetUrl(){
            let {data,error} = await this.$request({url:'/netinfo'});
            if(data){
				this.netInfo=data;
				this.$store.commit('setNetInfo',data)
            }
		},
		loadMore(){
			console.log('loadMore')
			if(this.finished){return;}
			this.loadPage++;
			this.getProductLst(this.loadPage);
		},
		async getProductLst(page){
			this.isLoading=true;
			let params={};
			if(!this.pageCnt){
                params.total=1;//返回总页数
			}
			if(page){//指定页码
				params.page=page;
			}
			let cnt=10;
			if(!this.$isAPP){
				cnt=12;
				params.cnt=cnt;
			}
			let {data,error} = await this.$request({url:'/product/query',params});
			this.isLoading=false;
            if(data){
				this.list=this.list.concat(data.data);
				if(data.data&&data.data.length<cnt){
					this.finished=true;
				}
                if(params.total){
                    this.pageCnt=data.len;
                }
            }else{
                this.$toast(error.msg||"获取产品列表失败")
            }
		},
		toDetail(item){
			this.$router.push({name:'detail',query:{data:JSON.stringify(item)}});
		}
	}

}
</script>

<style scoped lang="scss">
.home{
	width:100%;
	height: 100%;
	overflow: auto;
	.title{
		background-color: white;
		width:100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #555;
		font-size: 50px;
		font-weight: bold;
		border-bottom: 6px solid #f7f7f7;
		box-sizing: border-box;
		padding-top: 20px;
		padding-bottom: 30px;
		&.isApp{
			flex-direction: column;
			margin-right: 0px;
			.describe{
				width: inherit;
				padding-left: 20px;
				padding-right: 20px;
				box-sizing:  border-box;
				margin-left: 0;
			}
		}
		.describe{
			color:#999;
			font-size: 16px;
			margin-top: 30px;
			align-self: flex-end;
			width: 400px;
			text-align: left;
			margin-left: 150px;
		}
	}
	.contact{
		font-size: 15px;
		color: #0066c0;
		padding: 10px 0;
		border-bottom: 10px solid #f7f7f7;
		padding-left: 25px;
		.mail{
			color:#2c3e50;
			font-weight: bold;
		}
		.coupon{
			font-size: 18px;
			color: red;
		}
	}
	.list-bottom{
		width:100%;
		text-align: center;
		font-size: 26px;
		padding: 10px 0;
		color: #999;
	}
	&.WAP .list-bottom{
		font-size:16px;
	}
	.product-list{
		width:100%;
		display:flex;
		align-items: center;
		flex-wrap: wrap;
		padding-left: 20px;
		padding-right: 20px;
		box-sizing: border-box;
		.product-item{
			display: flex;
			flex-direction: column;
			align-items: center;
			.box{
				width: 300px;
				height: 300px;
				display: flex;
				justify-content: center;
				align-items: center;
				.s-box-1{
					max-width: 240px;
					max-height: 240px;
					transition: all 0.5s;
				}
				&:hover,&:active{
					.s-box-1{
						transform: scale(1.05);
					}
				}
			}
			.tit{
				color:#0066c0;
				font-size: 14px;
				margin-top: 18px;
				@include ellipsis(2);
				align-self: baseline;
			}
			.price{
				font-size: 18px;
				font-weight: bold;
				align-self: baseline;
			}
		}
		&.WAP{
			background-color: #f7f7f7;
			.product-item{
				width: 300px;
				height: 400px;
				background-color: #fff;
				margin-right: 4px;
				margin-bottom: 4px;
				padding: 8px;
				box-sizing: border-box;
			}
		}
		&.isApp{
			flex-direction: column;
			flex-wrap: nowrap;
			padding-top: 10px;
			.product-item{
				.box {
					width: 500px;
					height: 500px;
					.s-box-1{
						max-width: 500px;
						max-height: 500px;
					}
				}
				.tit{
					color:#0066c0;
					font-size: 26px;
					margin-top: 25px;
				}
				.price{
					font-size: 36px;
					margin-top: 15px;
				}
			}
		}
		
	}
	.bottom{
		background-color: #283e56;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 180px;
		.beian{
			font-size: 14px;
			color:#D6D6D6;
			.link{
				color:#428bca;
				text-decoration:none;
			}
		}
		.name{
			color:white;
			font-size: 20px;
			margin-bottom: 30px;
			font-weight: bold;
		}
		
	}
}
</style>
