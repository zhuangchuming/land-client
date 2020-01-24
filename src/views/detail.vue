<template>
	<div class="home">
		<div class="title">
			{{getNetInfo.brand}}
		</div>
		<div v-if="$isAPP" class="content isApp">
			<div class="tit">{{product.tit}}</div>
			<div class="box"><img class="s-box-1" :src="imgSrv+product.pic"/></div>
			<div class="price">{{product.price}}</div>
			<div class="descri">{{product.descri}}</div>
		</div>
		<div v-else class="content WAP">
			<div class="box"><img class="s-box-1" :src="imgSrv+product.pic"/></div>
			<div>
				<div class="tit">{{product.tit}}</div>
				<div class="price">{{product.price}}</div>
				<div class="descri">{{product.descri}}</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import {imgSrv} from '@/config';

export default {
	name:'home',
	data(){
		return {
			product:null,
			userInfo:null,
            imgSrv:imgSrv,
		}
	},
	computed:{
        ...mapGetters(['getNetInfo'])
    },
	created(){
		let data = this.$route.query.data;
		let userInfo = this.$route.query.userInfo;
		this.product = JSON.parse(data);
	}

}
</script>

<style scoped lang="scss">
.home{
	width:100%;
	.title{
		height: 140px;
		background-color: white;
		width:100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #555;
		font-size: 34px;
		font-weight: bold;
		border-bottom: 10px solid #f7f7f7;
		.sub-tit{
			font-size: 22px;
			color:#999;
			margin-top: 10px;
		}
	}
	.content{
		width:100%;
		display:flex;
		align-items: center;
		flex-wrap: wrap;
		box-sizing: border-box;
		flex-direction: column;
		padding: 0 16px;
		padding-top: 20px;
		.tit{
			font-size: 20px;
			color: #555;
			margin-bottom: 12px;
			font-weight: bold;
		}
		.box{
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20px;
			.s-box-1{
				transition: all 0.5s;
			}
			&:hover,&:active{
				.s-box-1{
					transform: scale(1.05);
				}
			}
		}
		.price{
			font-size: 40px;
			font-weight: bold;
			margin-top: 16px;
		}
		.descri{
			font-size: 14px;
			align-self: baseline;
			padding-left: 10px;
			white-space: pre;
			width: 100%;
    		overflow: auto;
		}
		&.WAP{
			flex-direction: row;
			flex-wrap: nowrap;
			align-items: end;
			.box{
				width: 600px;
				height: 600px;
				.s-box-1{
					max-width: 600px;
					max-height: 600px;
				}
			}
		}
		&.isApp{
			flex-direction: column;
			flex-wrap: nowrap;
			.box {
				width: 700px;
				height: 700px;
				.s-box-1{
					max-width: 700px;
					max-height: 700px;
				}
			}
		}
	}
}
</style>
