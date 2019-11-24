<template>
	<div class="home">
		<div class="title">
			Homesprit
			<div class="sub-tit" v-if="product.title">{{product.title}}</div>
		</div>
		<div class="content">
            <div class="cont">
				<div v-if="product.brand" :class="['item',{isApp:$isAPP}]"><div class="key">品牌</div>{{product.brand}}</div>
				<div v-if="product.Material" :class="['item',{isApp:$isAPP}]"><div class="key">材质</div>{{product.Material}}</div>
				<div v-if="product.color" :class="['item',{isApp:$isAPP}]"><div class="key">颜色</div>{{product.color}}</div>
				<div v-if="product.origin" :class="['item',{isApp:$isAPP}]"><div class="key">产地</div>{{product.origin}}</div>
				<div v-if="product.Size" :class="['item',{isApp:$isAPP}]"><div class="key">尺寸规格</div>{{product.Size}}</div>
				<div v-if="product.application" :class="['item',{isApp:$isAPP}]"><div class="key">适用范围</div>{{product.application}}</div>
				<div v-if="product.weight" :class="['item',{isApp:$isAPP}]"><div class="key">重量</div>{{product.weight}}</div>
				<div v-if="product.Volume" :class="['item',{isApp:$isAPP}]"><div class="key">容积</div>{{product.Volume}}</div>
				<div v-if="product.foldHeight" :class="['item',{isApp:$isAPP}]"><div class="key">折叠高度</div>{{product.foldHeight}}</div>

				<div v-if="product.Craftsmanship" :class="['item',{isApp:$isAPP}]"><div class="key">制作工艺</div>{{product.Craftsmanship}}</div>
				<div v-if="product.grade" :class="['item',{isApp:$isAPP}]"><div class="key">等级</div>{{product.grade}}</div>
				<div v-if="product.price" :class="['item',{isApp:$isAPP}]"><div class="key">售价</div>{{product.price}}</div>
			</div>
			<video v-if="product.video" :class="['box-video',{isApp:$isAPP}]" controls="controls" webkit-playsinline="webkit-playsinline" playsinline="playsinline" :autoplay="false" poster="" :src="product.video" type="video/mp4"></video>
			<ul class="img">
				<img :class="['img-item',{isApp:$isAPP}]" v-for="(item,idx) of product.img_list" :key="idx" :src="item">
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	//http://cloud.video.taobao.com/play/u/1006794339/p/2/e/6/t/1/226161490212.mp4
	name:'home',
	data(){
		return {
			products:[
				{
					brand:'Homesprit',//品牌
					Material:'PP材质',//材质	
					color:'黑红',//颜色
					origin:'深圳',//产地
					Size:'42cm*28cm*23.5cm',//产品尺寸
					application:'车内或家居',//适用
					weight:'1.5kg',//重量
					Volume:'55升',//容积
					foldHeight:'5.5cm',//折叠高度
					video:'http://cloud.video.taobao.com/play/u/1006794339/p/2/e/6/t/1/232901126539.mp4',
					title:'汽车后背收纳箱30L',
					price:'32.99$',
					img_list:[
						'https://cbu01.alicdn.com/img/ibank/2019/308/818/11721818803_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/044/548/11721845440_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/538/678/11689876835_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/336/728/11721827633_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/011/909/11689909110_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/554/665/11653566455_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/899/078/11689870998_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/575/198/11689891575_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/226/888/11689888622_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/515/365/11653563515_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/066/798/11689897660_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/715/965/11653569517_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/523/758/11721857325_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/204/158/11721851402_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/131/875/11653578131_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/217/338/11721833712_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/234/009/11689900432_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/316/848/11721848613_796475287.jpg'
					]
				},
				{
					brand:'Homesprit',//品牌
					Material:'PP材质',//材质	
					Volume:'1升',//容积
					color:'黑红',//颜色
					origin:'深圳',//产地
					Size:'20.0 cm * 12.0 cm * 5.0 cm',//产品尺寸
					weight:'1.0kg',//重量
					video:'http://cloud.video.taobao.com/play/u/1006794339/p/2/e/6/t/1/226161490212.mp4',
					title:'汽车座椅缝隙收纳盒',
					price:'18$',
					img_list:[
						'https://cbu01.alicdn.com/img/ibank/2019/687/521/11438125786_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/793/585/11468585397_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/781/851/11438158187_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/669/075/11468570966_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/008/675/11468576800_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/005/594/11403495500_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/873/195/11468591378_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/846/341/11438143648_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/733/495/11468594337_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/262/306/11468603262_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/145/015/11403510541_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/087/641/11438146780_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/855/885/11468588558_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/610/071/11438170016_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/626/585/11468585626_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/151/906/11468609151_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/717/285/11468582717_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/834/851/11438158438_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/917/195/11468591719_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/429/341/11438143924_796475287.jpg'

					]
				},
				{
					brand:'Homesprit',//品牌
					Material:'ABS',//材质	
					color:'米色,灰色,黑色,酒红',//颜色
					origin:'深圳',//产地
					Size:'19.5 cm * 9.5 cm * 11.6 cm',//产品尺寸
					application:'遮阳挡',
					weight:'0.5kg',//重量
					video:'http://cloud.video.taobao.com/play/u/1006794339/p/2/e/6/t/1/230335732886.mp4',
					title:'多功能通用汽车眼镜收纳盒',
					price:'10$',
					img_list:[
						'https://cbu01.alicdn.com/img/ibank/2019/420/114/11391411024_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/771/804/11391408177_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/289/393/11391393982_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/213/480/11456084312_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/871/387/11425783178_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/850/987/11425789058_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/424/870/11456078424_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/588/657/11425756885_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/594/960/11456069495_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/625/570/11456075526_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/499/840/11456048994_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/221/414/11391414122_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/438/750/11456057834_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/354/477/11425774453_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/864/777/11425777468_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/519/450/11456054915_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/911/390/11456093119_796475287.jpg'
					],

				},
				{
					brand:'Homesprit',//品牌
					Material:'PP材质',//材质	
					Volume:'55升',//容积
					color:'黑红',//颜色
					origin:'深圳',//产地
					Size:'51.0 cm * 35.0 cm * 8.0 cm',//产品尺寸
					foldHeight:'6.5cm',//折叠高度
					weight:'2.5kg',//重量
					video:'http://cloud.video.taobao.com/play/u/1006794339/p/2/e/6/t/1/230335732886.mp4',
					title:'汽车后背收纳箱50L',
					price:'39.99$',
					img_list:[
						'https://cbu01.alicdn.com/img/ibank/2019/308/818/11721818803_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/044/548/11721845440_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/538/678/11689876835_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/336/728/11721827633_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/011/909/11689909110_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/554/665/11653566455_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/899/078/11689870998_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/575/198/11689891575_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/226/888/11689888622_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/515/365/11653563515_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/066/798/11689897660_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/715/965/11653569517_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/523/758/11721857325_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/204/158/11721851402_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/131/875/11653578131_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/217/338/11721833712_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/234/009/11689900432_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/316/848/11721848613_796475287.jpg'
					],

				},
				{
					brand:'Homesprit',//品牌
					Material:'PP材质',//材质	
					color:'黑,红,蓝,金',//颜色
					Craftsmanship:"熔铸",//制作工艺
					grade:'A',//等级
					price:'8$',//零售价
					origin:'深圳',//产地
					Size:'12.0 cm * 5.0 cm * 8.0 cm',//产品尺寸
					weight:'0.3kg',//重量
					application:'车内',//应用场景Scope of application
					title:'车载烟灰缸',//
					img_list:[
						'https://cbu01.alicdn.com/img/ibank/2019/243/434/10718434342_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/312/732/10689237213_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/488/328/10744823884_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/919/028/10744820919_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/990/254/10718452099_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/960/554/10718455069_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/689/012/10689210986_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/521/342/10689243125_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/317/822/10689228713_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/366/134/10718431663_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/215/148/10744841512_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/090/074/10718470090_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/021/268/10744862120_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/793/254/10718452397_796475287.jpg',
						'https://cbu01.alicdn.com/img/ibank/2019/483/554/10718455384_796475287.jpg',
					]
				},
				{
					brand:'Tianqiu',//品牌
					Material:'碱性',//材质	
					Volume:'30mA',//容积
					color:'gray',//颜色
					origin:'深圳',//产地
					Size:'7.9mm * 7.9mm * 3.6mm',//产品尺寸
					weight:'0.7g',//重量
					price:'2$',
					video:"https://cloud.video.taobao.com/play/u/1736817003/p/1/e/6/t/1/222147881781.mp4",
					img_list:[
						require('@/assets/imgs/ag3/2.png'),
						require('@/assets/imgs/ag3/3.png'),
						require('@/assets/imgs/ag3/4.png'),
						require('@/assets/imgs/ag3/5.png')
					]
				},
				{
					brand:'Homesprit',//品牌
					Material:'塑料',
					video:'http://cloud.video.taobao.com/play/u/2698135680/p/2/e/6/t/1/231469421534.mp4',
					weight:'0.983kg',
					Size:'28cm*18cm*10.5cm',
					price:'30.99$',
					title:'荧光棒闪光套装154pcs+20 batteris',
					origin:'深圳',//产地
					img_list:[
						require('@/assets/imgs/flash1/2.png'),
						require('@/assets/imgs/flash1/3.png'),
						require('@/assets/imgs/flash1/4.png'),
						require('@/assets/imgs/flash1/5.png'),
						require('@/assets/imgs/flash1/6.png'),
						require('@/assets/imgs/flash1/7.png'),
						require('@/assets/imgs/flash1/8.png'),
						require('@/assets/imgs/flash1/9.png'),
					]
				}
			],
			product:{},
		}
	},
	created(){
		let index = this.$route.query.index;
		this.product = this.products[index];
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
		// padding-left: 20px;
		// padding-right: 20px;
		box-sizing: border-box;
		flex-direction: column;
		.img{
			width:100%;
			padding:0;
			margin:0;
			padding-top: 50px;
			font-size:0;
			.img-item{
				max-width: 790px;
				&.isApp{
					max-width: 100%;
				}
			}
		}
		.cont{
			display: flex;
			flex-wrap: wrap;
			margin-top: 20px;
			margin-bottom: 20px;
			border-bottom: 1px solid #f7f7f7;
			.item{
				color:#333;
				font-size: 14px;
				margin-bottom: 15px;
				display: flex;
				width: 33.3%;
				&.isApp{
					width: inherit;
				}
				.key{
					min-width: 100px;
					color:#999;
				}
			}
		}
		.box-video{
			height: 375px;
			max-width: 100%;
			&.isApp{
				height: inherit;
			}
		}
	}
}
</style>
