<template>
	<div class="home">
		<div :class="['title',{isApp:$isAPP}]">
			{{netInfo&&netInfo.brand}}
			<div class="describe">{{netInfo&&netInfo.introduce}}</div>
		</div>
		<ul :class="['product-list',{isApp:$isAPP,WAP:!$isAPP}]">
			<li class="product-item" v-for="(item,idx) of list" :key="idx" @click="toDetail(item)">
				<div class="box"><img class="s-box-1" :src="imgSrv+item.pic"/></div>
				<div class="tit">{{item.tit}}</div>
				<div class="price">{{item.price}}</div>
			</li>
		</ul>
	</div>
</template>
<script>
import {imgSrv} from '@/config';
// 手机设计比例是 1334*750
// 电脑设计比例是 1600:900
export default {
	name:'home',
	data(){
		return{
			netInfo:null,//网站信息
			list:null,
			pageCnt:0,//页码数
            imgSrv:imgSrv,
		}
	},
	created(){
		this.getNetUrl();
		this.getProductLst();
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
		async getProductLst(page){
			let params={};
			if(!this.pageCnt){
                params.total=1;//返回总页数
			}
			if(page){
				params.page=page;
			}
			let {data,error} = await this.$request({url:'/product/query',params});
            if(data){
                this.list=data.data;
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
		border-bottom: 10px solid #f7f7f7;
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
}
</style>
