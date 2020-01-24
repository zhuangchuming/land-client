<template>
	<div class="service">
        <common-tit v-if="state>1" :tit="getTit" @back="back"/>
		<div class="content" :class="{'wab-css':$isWap}">
            <div v-if="state==0" class="win1">
                <div class="title">Get Your Free Gift!</div>
                <div class="cont">{{alarm}}</div>
                <div class="btn" @click="next(1)">NEXT</div>
                <div class="cont1">*Terms & Conditions Apply</div>
            </div>
            <div v-if="state==1" class="win2">
                <div class="title">Dear Customers!</div>
                <div class="cont1">{{alarm}}</div>
                <div class="limit">Offer Limited to Existing Customers</div>
                <div class="sub-tit">Order ID<sup>*</sup></div>
                <input placeholder="Enter Your Order ID..." v-model="orderID">
                <div class="sub-tit">Email<sup>*</sup></div>
                <input placeholder="Enter Your Email..." v-model="mail">
                <div class="sub-tit">NAME</div>
                <input placeholder="Enter Your Name..." v-model="name">
                <div class="sub-tit">Your Facebook ID</div>
                <input placeholder="Enter Your Facebook ID..." v-model="facebook">
                <div class="btn" @click="checkOrder">SUBMIT</div>
                <div class="orderID">*How to find you Order ID?</div>
                <div>*We don't share you personal info with anyone.Check out our Privacy Policy for more information.</div>
            </div>
            <div v-if="state==2" class="win3">
                <div class="body">
                    <div class="title">
                        <div class="circle">
                            <i class="icon iconfont icon-duigou"></i>
                        </div>
                        <div >
                            <div class="cont1">Congratulation!</div>
                            <div class="cont2">You can get your free gift!</div>
                        </div>
                    </div>
                    <div class="product">
                        <img class="img" :src="getImgPic(product.pic)">
                        <div class="price-cont price">Price：<span class="worth">{{product.price}}</span></div>
                        <div class="price-cont"><span class="worth">{{product.tit}}</span></div>
                    </div>
                    <div class="cont3">Selected to Get Our Exclusive Gift</div>
                    <div class="gift-list">
                        <li class="gift-item" :class="{'gift-choose':giftIdx==idx}" v-for="(item,idx) of product.gift" :key="idx" @click="giftchoose(item,idx)">
                            <img class="img" :src="getImgPic(item.pic)">
                            <div class="gift-cont">
                                <div>WORTH：<span class="worth">{{item.price}}</span></div>
                                <div>DESC：<span>{{item.descri}}</span></div>
                            </div>
                            <div v-if="giftIdx==idx" class="choose">
                                <i class="icon iconfont icon-duigou"></i>
                            </div>
                        </li>
                    </div>
                </div>
                <div class="btn">
                    <div class="btn-cont" @click="wantIt">I WANT IT</div>
                </div>
            </div>
            <div v-if="state==3" class="win4">
                <div class="body">
                    <div class="title">
                        <div class="circle">
                            <i class="icon iconfont icon-duigou"></i>
                        </div>
                        <div >
                            <div class="cont1">Congratulation!</div>
                            <div class="cont2">You can get your free gift!</div>
                        </div>
                    </div>
                    <li v-if="gift" class="gift-item gift-choose">
                        <img class="img" :src="getImgPic(gift.pic)">
                        <div class="gift-cont">
                            <div>price:{{gift.price}}</div>
                            <div>description:{{gift.descri}}</div>
                        </div>
                        <div class="choose">
                            <i class="icon iconfont icon-duigou"></i>
                        </div>
                    </li>
                    <div class="cont4">Overall rating?<sup>*</sup></div>
                    <van-rate class="star" v-model="star" void-icon="star" size="30px" color="#FE952D" void-color="rgba(221,221,221,1)"/>
                    <div class="comment">Tell us the real experience of the product.<sup>*</sup></div>
                    <div class="comment">We will give you better service.</div>
                    <textarea class="textarea" v-model="comment" placeholder="Enter your experience of the product..."></textarea>
                </div>
                <div class="btn">
                    <div class="btn-cont" @click="next(2)">PREV STEP</div>
                    <div class="btn-cont btn-cont1" @click="commit">NEXT STEP</div>
                </div>
            </div>
            <div v-if="state==4" class="win5">
                <div class="circle">
                    <i class="icon iconfont icon-duigou"></i>
                </div>
                <div class="contact">Thank you for submitting the new product experience. </div>
                <div class="contact">We will contact you as soon as possible.</div>
                <div class="contact">Please check the email.</div>
                <div class="email" v-if="mails">Seller e-mail：{{mails}}</div>
            </div>
        </div>
	</div>
</template>
<script>
import {serviceUrl} from '@/config';
import CommonTit from '@/components/common-tit';
import {copyText,delayTime} from '@/utils/common';
export default {
    name:'service',
    data(){
        return {
            orderID:null,//买家输入订单号
            mail:null,//买家输入邮箱
            facebook:null,//买家输入faceboo
            name:null,//名字
            state:0,//当前装调
            star:0,//星级
            gift:null,//用户选择的礼品，默认选择第一个
            comment:'',//评论
            comment_url:'',//评论地址，跟产品相关
            alarm:"Activate Your Warranty and Receive Your FREE Gift Now!",
            product:null,//产品详情
            order:null,//订单详情
            mails:null,//订单对应的卖家信息
            giftIdx:-1,//选择礼物
        }
    },
    computed:{
        getTit(){
            if(this.state==2||this.state==3){
                return 'Finish Your Free Gift Apply!';
            }
            if(this.state==4){
                return 'Thank You!'
            }
        }
    },
	methods:{
        getDescription(descri){
            let list = descri
        },
        getImgPic(pic){
            return serviceUrl+pic;
        },
        wantIt(){
            if(this.giftIdx==-1){
                return this.$toast("please choose the gift which what you want.")
            }
            this.next(3);
        },
        //选择礼物的点击事件
        giftchoose(item,idx){
            this.gift=item;//用户选择的礼物
            this.giftIdx=idx;//用户选择礼物的索引
        },

        next(idx){
            this.state=idx;
            if(idx==4){//跳转到最后一步
                delayTime(2000).then(()=>{
                    window.location.href='/'
                });
            }
        },
        //获取当前域名，并用这个域名去后端换取code
        async getNetUrl(){
            let {data,error} = await this.$request({url:'/netinfo'});
            if(data){
                this.alarm=data.descri;
            }
        },
        //确定订单是否有效，如果有效，则进入下一步
        async checkOrder(){
            if(!this.orderID){
                return this.$toast("Please input your order Number!");
            }
            if(!this.mail){
                return this.$toast("Please input the e-mail")
            }
            let params={
                mail:this.mail,
                facebook:this.facebook,
                orderID:this.orderID,
                name:this.name
            }
            let {data,error} = await this.$request({url:'/order/query',params});
            if(data){
                if(data.product){
                    this.product=data.product;
                    this.comment_url=this.product.link;
                }
                if(data.mails){
                    this.mails=data.mails.join(',');
                }
                if(data.order){
                    if(data.order.status==0){//卖家添加的订单状态
                        return this.next(2);
                    }
                    if(data.order.status==1){//买家提交请求
                        if(!data.order.review){//未评论则进入评论
                            return this.next(2);
                        }else{//已经评论则提醒用户等待
                            return this.next(4);
                        }
                    }
                    if(data.order.status==2){//卖家已经接受请求，很快会
                        return this.next(4);
                    }
                    if(data.order.status==3){
                        this.$toast("Thank you.This order is conclude.")
                    }
                }
            }else{
                this.$toast(error.msg)
            }
            
        },
        //返回按钮
        back(){
            this.giftIdx=-1;
            this.state=1;
            this.gift=null;
        },
        //完成跳转判断是不是3星以下评论则跳转到完成。
        async commit(){
            if(!this.star){
                return this.$toast("please choose the rate.")
            }
            if(!this.comment){
                return this.$toast("please write the experience of product.")
            }
            copyText(this.comment);
            let params={
                orderID:this.orderID,
                rate:this.star,
                review:this.comment,
                giftID:this.gift.id
            }
            //提交评论
            let {data,error} = await this.$request({url:'/order/review',method:'POST',params});
            if(error){
                return this.$toast({message:error.msg,duration:3000})
            }
            if(this.star>=4){//4星及以上，需要跳转到亚马逊评论地址
                this.$toast({message:'comment had copy!',duration:3000})
                window.location=this.comment_url;
            }else{
                await delayTime(1000);
                return this.next(4);//跳转到完成页面
            }
        }
    },
    created(){
        this.getNetUrl();
        if(this.$isWap){
            setHtmlFontSizeID(null,1344);//将设计稿更改为1344
        }
    },
    components:{
        CommonTit
    }
}
</script>
<style scoped lang="scss">
.service{
    height:100%;
    width:100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content{
        max-width: 770px;
        flex:1;
        display: flex;
        overflow: auto;
        &.wab-css{
            border:1PX solid #999;
        }
        .gift-item{
            display: flex;
            padding: 8px;
            border: 1PX solid #eee;
            border-radius: 10px;
            position: relative;
            margin-bottom: 20px;
            .gift-cont{
                margin-left: 20px;
                font-size: 30px;
                div{
                    margin-top: 15px;
                    font-weight: bold;
                    .worth{
                        font-size: 65px;
                    }
                }
            }
            .img{
                height: 400px;
                width: 300px;
                border-radius: 10px;
            }
            .choose{
                position: absolute;
                bottom: 10px;
                right: 18px;
                height: 60px;
                width: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                background-color: #39d492;
                color: white;
            }
            &.gift-choose{
                border: 1PX solid #39D492;
                border-radius: 10px;
            }
        }
        .win2{
            padding:0 30px;
            background-color: white;
            color:#333;
            font-size: 30px;
            border-radius: 20px;
            .title{
                margin-top: 41px;
                margin-bottom: 27px;
                font-weight: bold;
                font-size: 36px;
            }
            .cont1{
                margin-bottom: 27px;
                font-weight: bold;
                font-size: 36px;
            }
            .limit{
                margin-bottom: 30px;
            }
            .sub-tit{
                font-size: 14px;
                color:black;
                font-weight: bold;
            }
            .btn{
                border-radius: 10px;
                height:90px;
                width:690px;
                background-color: #2B4EC2;
                line-height: 90px;
                text-align: center;
                color: white;
                font-weight: bold;
                margin-top: 10px;
                &:active{
                    opacity: 0.7;
                }
            }
            input{
                width: 690px;
                height: 90px;
                border: 1PX solid #ccc;
                border-radius: 10px;
                margin-bottom: 20px;
                padding-left: 20px;
                margin-top: 10px;
                box-sizing: border-box;
                font-size: 30px;
            }
            .orderID{
                margin-top: 30px;
                margin-bottom: 20px;
                color:#FE952D;
                font-weight: bold;
            }
        }
        .win1{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding:0 30px;
            .title{
                color:#333;
                font-size: 46px;
                margin-top: 271px;
                font-weight: bold;
            }
            .cont{
                margin-top: 54px;
                color:#555;
                font-size: 30px;
                text-align: left;
                line-height: 1.5;
            }
            .btn{
                margin-top: 95px;
                font-size: 36px;
                color: white;
                background-color: #2B4EC2;
                height: 90px;
                width: 510px;
                border-radius: 10px;
                font-weight: bold;
                line-height: 90px;
                text-align: center;
                &:active{
                    opacity: 0.7;
                }
            }
            .cont1{
                margin-top: 36px;
                color:#aaa;
                font-size: 26px;
            }
        }
        .win3{
            display: flex;
            flex-direction: column;
            flex: 1;
            width: 100%;
            .body{
                padding:0 30px;
                flex:1;
                overflow: auto;
            }
            .title{
                width:690px;
                height:181px;
                margin-top: 27px;
                border:1px solid rgba(221,221,221,1);
                box-shadow:0px 3px 20px rgba(0,0,0,0.16);
                display: flex;
                align-items: center;
                border-radius: 10px;
                .circle{
                    height:90px;
                    width:90px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #39D492;
                    border-radius:50%;
                    margin-left: 20px;
                    margin-right: 30px;
                    .icon-duigou{
                        color: white;
                        font-size: 30px;
                    }
                }
                .cont1{
                    font-size: 36px;
                    color: #333;
                    margin-bottom: 10px;
                    font-weight: bold;
                }
                .cont2{
                    font-size: 30px;
                    color: #555;
                }
            }
            .product{
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 30px;
                .img{
                    width: 500px;
                }
                .price-cont{
                    &.price{
                        font-size: 36px;
                    }
                    font-size: 30px;
                    margin-top: 10px;
                    .worth{
                        font-weight: bold;
                    }
                }
            }
            .cont3{
                margin-top: 30px;
                margin-bottom: 20px;
                color:#333;
                font-size: 36px;
                font-weight: bold;
            }
            .gift-list{
                display: flex;
                flex-direction: column;
                
            }
            .btn{
                background: #fff;
                height: 120px;
                box-shadow:0px 0px 30px rgba(6,0,1,0.2);
                display: flex;
                justify-content: center;
                align-items: center;
                .btn-cont{
                    height: 90px;
                    width: 690px;
                    background-color: #2B4EC2;
                    line-height: 90px;
                    text-align: center;
                    font-size: 36px;
                    color: white;
                    font-weight: bold;
                    border-radius: 10px;
                    &:active{
                        opacity: 0.7;
                    }
                }
            }
        }
        .win4{
            display: flex;
            flex-direction: column;
            flex: 1;
            .body{
                padding:0 30px;
                flex:1;
                overflow-y: auto;
                .title{
                    width:690px;
                    height:181px;
                    margin-top: 27px;
                    margin-bottom: 20px;
                    border:1px solid rgba(221,221,221,1);
                    box-shadow:0px 3px 20px rgba(0,0,0,0.16);
                    display: flex;
                    align-items: center;
                    border-radius: 10px;
                    .circle{
                        height:90px;
                        width:90px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #39D492;
                        border-radius:50%;
                        margin-left: 20px;
                        margin-right: 30px;
                        .icon-duigou{
                            color: white;
                            font-size: 30px;
                        }
                    }
                    .cont1{
                        font-size: 36px;
                        color: #333;
                        margin-bottom: 10px;
                        font-weight: bold;
                    }
                    .cont2{
                        font-size: 30px;
                        color: #555;
                    }
                }
                .img{
                    max-height: 470px;
                    max-width: 690px;
                }
                .cont4{
                    margin-top: 40px;
                    font-size: 46px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                .star{
                    margin-bottom: 50px;
                }
                .comment{
                    font-size: 30px;
                    color:#555;
                }
                .textarea{
                    width: 690px;
                    height: 200px;
                    border: 1PX solid #ddd;
                    padding-top: 23px;
                    padding-left: 30px;
                    font-size: 30px;
                    box-sizing: border-box;
                    margin-top: 30px;
                    border-radius: 10px;
                    margin-bottom: 40px;
                }
            }
            .btn{
                background: #fff;
                height: 120px;
                box-shadow:0px 0px 30px rgba(6,0,1,0.2);
                display: flex;
                justify-content: center;
                align-items: center;
                .btn-cont{
                    height: 90px;
                    width: 325px;
                    background-color: #E8EDFE;
                    border: 1PX solid #839AE5;
                    line-height: 90px;
                    text-align: center;
                    font-size: 32px;
                    color: #2B4EC2;
                    font-weight: bold;
                    border-radius: 10px;
                    &:active{
                        opacity: 0.7;
                    }
                }
                .btn-cont1{
                    margin-left: 20px;
                    color: white;
                    background-color: #2B4EC2;
                }
            }
        }
        .win5{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 30px;
            font-size: 30px;
            .circle{
                height:180px;
                width:180px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #39D492;
                border-radius:50%;
                margin-top: 290px;
                margin-bottom: 40px;
                .icon-duigou{
                    color: white;
                    font-size: 60px;
                }
            }
            .contact{
                margin-top: 15px;
                width:100%;
            }
            .email{
                width: 100%;
                margin-top: 40px;
                color:red;
                font-weight: bold;
            }
        }
    }
}
</style>