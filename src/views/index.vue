<template>
	<div class="home">
		<div :class="['title',{isApp:$isAPP}]">
			Homesprit
			<div class="describe">深圳市晨高科技有限公司<br/>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;———致力于汽车配件，汽车用品以及智能家居用品的开发以及销售，专注打造高品质的产品，有多年的C端用户服务经验，深入了解市场对产品的需要，与时俱进，开发更符合市场要求的产品。</div>
		</div>
		<div :class="['content',{isApp:$isAPP}]">
			<div class="box" @click="toDetail(0)"><img class="s-box-1" src="@/assets/imgs/small-box/1.png"/></div>
			<video v-if="!$isAPP" class="box-video" controls="controls" webkit-playsinline="webkit-playsinline" playsinline="playsinline" :autoplay="false" poster="" src="http://cloud.video.taobao.com/play/u/1006794339/p/2/e/6/t/1/232901126539.mp4" type="video/mp4"></video>

			<video v-if="!$isAPP" class="box-video" controls="controls" webkit-playsinline="webkit-playsinline" playsinline="playsinline" :autoplay="false" poster="" src="http://cloud.video.taobao.com/play/u/1006794339/p/2/e/6/t/1/226161490212.mp4" type="video/mp4"></video>
			<div class="box" @click="toDetail(1)"><img class="s-box-1" src="@/assets/imgs/gap/1.jpg"/></div>

			<div class="box" @click="toDetail(2)"><img class="s-box-1" src="@/assets/imgs/glass/1.jpg"/></div>
			<video v-if="!$isAPP" class="box-video" controls="controls" webkit-playsinline="webkit-playsinline" playsinline="playsinline" :autoplay="false" poster="" src="http://cloud.video.taobao.com/play/u/1006794339/p/2/e/6/t/1/230335732886.mp4" type="video/mp4"></video>

			<div class="box" @click="toDetail(4)"><img class="s-box-1" src="@/assets/imgs/ashtray/1.jpg"/></div>
			<div class="box" @click="toDetail(5)"><img class="s-box-1" src="@/assets/imgs/ag3/1.png"/></div>

			<video v-if="!$isAPP" class="box-video" controls="controls" webkit-playsinline="webkit-playsinline" playsinline="playsinline" :autoplay="false" poster="" src="http://cloud.video.taobao.com/play/u/2698135680/p/2/e/6/t/1/231469421534.mp4" type="video/mp4"></video>
			<div class="box" @click="toDetail(6)"><img class="s-box-1" src="@/assets/imgs/flash1/1.png"/></div>

		</div>
	</div>
</template>
<script>
export default {
	name:'home',
	methods:{
		toDetail(num){
			this.$router.push({name:'detail',query:{index:num}});
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
	.content{
		
		width:100%;
		display:flex;
		align-items: center;
		flex-wrap: wrap;
		padding-left: 20px;
		padding-right: 20px;
		box-sizing: border-box;
		.box{
			width:50%;
			padding: 20px;
			box-sizing: border-box;
			.s-box-1{
				height: 375px;
				transition: all 0.5s;
			}
			&:hover,&:active{
				background-color: #f7f7f7;
				.s-box-1{
    				transform: scale(1.05);
				}
			}
		}
		&.isApp{
			flex-direction: column;
			flex-wrap: nowrap;
			.box {
				width: 100%;
				.s-box-1{
					max-width: 100%;
					height: inherit;
				}
			}
		}
		.box-video{
			width: 50%;
			height: 325px;
		}
	}
}
</style>
