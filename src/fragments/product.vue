<template>
    <div class="product">
        <div class="search">
            <div class="search-btn" @click="search(searchAsin)">搜 索</div>
            <div class="search-body">
                <i class="icon iconfont icon-sousuo"></i><input class="search-input" v-model="searchAsin" placeholder="请输入要查找的产品asin码...">
            </div>
            <div class="common-btn edit" @click="edit">{{editStatus?'完 成':'编 辑'}}</div>
        </div>
        <ul class="product-list">
            <li class="product-item" v-for="(item,idx) of list" :key="idx">
                <div class="img-warp"><img class="item-img" :src="imgSrv+item.pic"></div>
                <div class="cont">
                    <div class="item">添加时间：{{creatTime(item.ct)}}</div>
                    <div class="item" v-if="item.price">产品价值：{{item.price}}</div>
                    <div class="item">ASIN：{{item.asin}}</div>
                    <div class="item" v-if="upc">{{getUPC(item.upc)}}</div>
                </div>
                <ul class="gift-list">
                    <li class="gift-item" v-for="(it,indx) of item.gift" :key="indx">
                        <div class="img-warp1"><img class="item-img1" :src="imgSrv+it.pic"></div>
                    </li>
                </ul>
                <div class="delete" v-if="editStatus" @click.stop="deleteFunc(item,idx)"><i class="icon iconfont icon-cha "></i></div>
                <!-- <div class="delete" v-if="editStatus" @click.stop="editProduct(item,idx)"><i class="icon iconfont icon-cha "></i></div> -->
            </li>
        </ul>
        <van-pagination 
            v-model="currentPage" 
            :page-count="pageCnt"
            :show-page-size="10" 
            force-ellipses
            @change="pgChange"/>
         <!-- 添加/编辑产品 -->
        <van-popup v-model="addProductModel" position="center">
            <div class="pop-win">
                <div class="title"> 添加产品<i class="icon iconfont icon-cha" @click="addProductModel=false"></i></div>
                <div class="pop-cont">
                    <div class="input-item">
                        <div>请选择 400X400 的产品主图片</div><span class="input-import">*</span>
                        <input type="file" accept="image/*" @change="change">
                    </div>
                    <div class="input-item">
                        <div >ASIN码</div><span class="input-import">*</span>
                        <input v-model="asin" placeholder="请输入ASIN码...">
                    </div>
                    <div class="input-item">
                        <div >UPC码</div><span class="input-import">*</span>
                        <input v-model="upc" placeholder="请输入UPC码(选填)...">
                    </div>
                    <div class="input-item">
                        <div >产品标题</div><span class="input-import">*</span>
                        <input v-model="tit" placeholder="请输入产品标题...">
                    </div>
                    <div class="input-item">
                        <div >产品价值</div><span class="input-import">*</span>
                        <input v-model="price" placeholder="请输入产品价值...">
                    </div>
                    <!-- <div class="input-item">
                        <div >产品对应的评论链接：LINK (如何获取该链接：<br/>1、点击某个产品详情，然后拖到最下面（Write a customer review）；<br/>2、通过谷歌后台检查元素，可以看到该产品的评论链接)</div>
                        <span class="input-import">*</span>
                        <input v-model="link" placeholder="请输入产品评论链接...">
                    </div> -->
                    <div class="input-item">
                    <div><span class="input-import">*</span> 请选择产品对应的赠品.</div></div>
                    <ul class="giftlst">
                        <li class="gift-item" :class="{select:gift.indexOf(item.id)!=-1}" v-for="(item,idx) of giftList" :key="idx" @click="chooseGift(item)">
                            <div class="img-warp"><img class="img" :src="imgSrv+item.pic"></div>
                            <div class="descri">{{item.descri}}</div>
                            <div class="choose-circle">
                                <div class="choose-solid"></div>
                            </div>
                        </li>
                    </ul>
                    <div class="input-item">
                        <div><span class="input-import">*</span>描述</div>
                        <textarea v-model="descri" placeholder="请输入产品描述..."></textarea>
                    </div>
                </div>
                <div class="btn-body">
                    <div class="common-btn" @click="addProduct">保 存</div>
                    <div class="common-btn btn1" @click="addProductModel=false">取 消</div>
                </div>
            </div>
		</van-popup>

        <!-- 添加/编辑产品 -->
        <!-- <van-popup v-model="editProductModel" position="center">
            <div class="pop-win">
                <div class="title"> 编辑产品<i class="icon iconfont icon-cha" @click="editProductModel=false"></i></div>
                <div class="pop-cont">
                    <div class="input-item">
                        <div>请选择 400X400 的产品主图片</div><span class="input-import">*</span>
                        <input type="file" accept="image/*" @change="change">
                    </div>
                    <div class="input-item">
                        <div >UPC码</div><span class="input-import">*</span>
                        <input v-model="upc" placeholder="请输入UPC码(选填)...">
                    </div>
                    <div class="input-item">
                        <div >产品标题</div><span class="input-import">*</span>
                        <input v-model="tit" placeholder="请输入产品标题...">
                    </div>
                    <div class="input-item">
                        <div >产品价值</div><span class="input-import">*</span>
                        <input v-model="price" placeholder="请输入产品价值...">
                    </div>
                    <div class="input-item">
                        <div >产品对应的评论链接：LINK (如何获取该链接：<br/>1、点击某个产品详情，然后拖到最下面（Write a customer review）；<br/>2、通过谷歌后台检查元素，可以看到该产品的评论链接)</div>
                        <span class="input-import">*</span>
                        <input v-model="link" placeholder="请输入产品评论链接...">
                    </div>
                    <div class="input-item">
                    <div><span class="input-import">*</span> 请选择产品对应的赠品.</div></div>
                    <ul class="giftlst">
                        <li class="gift-item" :class="{select:gift.indexOf(item.id)!=-1}" v-for="(item,idx) of giftList" :key="idx" @click="chooseGift(item)">
                            <div class="img-warp"><img class="img" :src="imgSrv+item.pic"></div>
                            <div class="descri">{{item.descri}}</div>
                            <div class="choose-circle">
                                <div class="choose-solid"></div>
                            </div>
                        </li>
                    </ul>
                    <div class="input-item">
                        <div><span class="input-import">*</span>描述</div>
                        <textarea v-model="descri" placeholder="请输入产品描述..."></textarea>
                    </div>
                </div>
                <div class="btn-body">
                    <div class="common-btn" @click="editProduct">保 存</div>
                    <div class="common-btn btn1" @click="editProductModel=false">取 消</div>
                </div>
            </div>
		</van-popup> -->
    </div>
</template>

<script>
import {imgSrv} from '@/config';
import {dataURItoBlob,inputChange} from '@/utils/common';
import Vue from 'vue';
export default {
    name:'product',
    data(){
        return{
            addProductModel:false,//添加
            editProductModel:true,//
            list:[],
            giftList:[],//礼物列表
            pageCnt:0,
            imgSrv:imgSrv,
            currentPage:1,
            searchAsin:'',
            blob:null,//添加的产品图片
            descri:null,//添加的产品描述
            asin:null,//添加的asin码
            gift:[],//添加的礼物列表
            link:null,//评论的链接
            tit:null,//产品标题
            price:null,//产品价值
            upc:null,//upc码
            editStatus:false,//
        }
    },
    methods:{
        //获取upc或者
        getUPC(upc){
            if(!upc)return;
            if(upc.length==13){
                return `ean：${upc}`;
            }else{
                return `upc：${upc}`;
            }
        },
        creatTime(ct){
            let t = new Date(ct);
            return `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
        },
        //编辑保存产品
        editProduct(item,idx){

        },
        //编辑
        edit(){
            this.editStatus=!this.editStatus;
        },
        //选择礼物
        chooseGift(item){
            let idx= this.gift.indexOf(item.id);
            if(idx!=-1){//存在
                this.gift.splice(idx,1) ;//删除
            }else{
                this.gift.push(item.id);
            }
        },
        search(asin){
            if(!asin){
                return this.$toast("请输入asin码")
            }
            this.query(0,asin);
        },
        async change(e) {
			let params = await inputChange(e);
            this.blob = dataURItoBlob(params.base64);
		},
        pgChange(page){
            console.log('change',page)
            this.query(page);
        },
        async query(page,asin){
            console.log('query',page)
            let params={};
            if(asin){
                params.asin=asin;
            }else{
                if(page){
                    params.page=page;
                }
            }
            if(!this.pageCnt){
                params.total=1;//返回总页数
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
        async getGiftLst(){
            let {data,error} = await this.$request({url:'/gift/query'});
            if(data){
                this.giftList=data.data;
            }else{
                this.$toast(error.msg||"获取礼物列表失败")
            }
        },
        async addProduct(){
            if(!this.gift){
                return this.$toast('该产品必须选择一个赠送的礼品。')
            }
            if(!this.asin){
                return this.$toast('请为该产品添加一个asin码。')
            }
            // if(!this.link){
            //     return this.$toast('输入产品评论时对应的链接。')
            // }else{
            //     if(!/^https:\/\/www\.amazon\.com(.)*$/.test(this.link)){
            //         this.link='https://www.amazon.com'+this.link;
            //     }
            // }
            this.link = 'https://www.amazon.com/review/create-review/ref=cm_cr_othr_d_wr_but_top?ie=UTF8&channel=glance-detail&asin='+this.asin;
            if(!this.blob){
                return this.$toast('请选择产品图片。')
            }
            let formData=new FormData();
            formData.append('link',this.link);
            formData.append('gift',JSON.stringify(this.gift));
            formData.append('asin',this.asin);
            formData.append('descri',this.descri);
            formData.append('tit',this.tit);
            formData.append('price',this.price);
            formData.append("pic", this.blob, "a.jpg");
            formData.append('upc',this.upc)
            formData.enctype = "multipart/form-data";
            let {data,error} = await this.$request({url:'/product/add',method:'POST',params:formData});
            if(data){
                this.addProductModel=false;
                this.$toast('添加成功');
                this.blob=null;
                this.descri=null;
                this.link=null;
                this.asin=null
                this.gift=[];
                this.tit=null;
                this.price=null;
                this.query();
            }else{
                this.$toast(error.msg||'添加失败请稍后重试');
            }
        },
        //删除某个产品
        async deleteFunc(item,idx){
            let {data,error} = await this.$request({url:'/product/del',method:'POST',params:{asin:item.asin}});
            if(data){
                this.list.splice(idx,1);
                this.$toast("删除成功。")
            }else{
                this.$toast(error.msg||"删除失败。")
            }
        },
        showAddProduct(){
            this.addProductModel=true;
        }
    },
    created(){
        this.query();
        this.getGiftLst();
    },
}
</script>

<style lang="scss" scoped>
.product{
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex:1;
    .search{
        display: flex;
        margin-bottom: 20px;
        position: relative;
        margin-top: 10px;
        .search-btn{
            width:100px;
            height:36px;
            font-size: 16px;
            line-height: 34px;
            text-align: center;
            background:#2B4EC2;
            border-radius:4px;
            color: white;
            border: 1PX solid #2B4EC2;
            &:active{
                opacity: .9;
            }
        }
        .search-body{
            border-radius: 6px;
            border: 1PX solid #ccc;
            display: flex;
            margin-left: 12px;
            .search-input{
                width: 400px;
            }
        }
        .edit{
            position: absolute;
            right: 10px;
            font-size: 18px;
        }
    }
    .product-list{
        .product-item{
            height: 274px;
            box-shadow:0px 0px 6px 0px rgba(16,41,108,0.18);
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            padding: 12px;
            box-sizing: border-box;
            border-radius: 8px;
            position: relative;
            .img-warp{
                width: 250px;
                height: 250px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 20px;
                .item-img{
                    max-width: 250px;
                    max-height: 250px;
                }
                .item{
                    font-size: 16px;
                }
            }
            .cont{
                width: 300px;
                margin-right: 20px;
            }
            .gift-list{
                display: flex;
                .gift-item{
                    border:1PX solid #ccc;
                    border-radius: 6px;
                    margin-right: 18px;
                    padding: 10px;
                    .img-warp1{
                        width: 150px;
                        height:200px;
                        .item-img1{
                            max-width: 150px;
                            max-height: 200px;
                        }
                    }
                }
            }
            .delete{
                position: absolute;
                left: -5px;
                top: -5px;
                height: 30px;
                width: 30px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                .icon-cha{
                    color:white;
                }
                &:active{
                    opacity: 0.7;
                }
            }
        }
    }
    .pop-win{
        width:650px;
        height:650px;
        background:#fff;
        box-shadow:0px 0px 40px 0px rgba(0, 0, 0, 0.5);
        border-radius:8px;
        display: flex;
        flex-direction: column;
        .title{
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            border-bottom: 1PX solid #ccc;
        }
        .pop-cont{
            flex:1;
            overflow-y: auto;
            padding-top: 20px;
            padding-left: 20px;
            padding-right: 10px;
        }
        .input-item{
            margin-bottom: 10px;
            textarea{
                width: 380px;
                height: 100px;
                padding: 8px;
                font-size: 14px;
                border: 1PX solid  #ccc;
                border-radius: 4px;
            }
            div{
                color: #555;
                font-size: 12px;
                margin-bottom: 6px;
            }
            input{
                border:1PX solid #ccc;
                width:450px;
                height:38px;
                color: #555;
                font-size: 14px;
                padding-left: 13px;
                box-sizing: border-box;
            }
            .input-import{
                color:red;
            }
        }
        .giftlst{
            display: flex;
            overflow-x: auto;
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 10px;
            .gift-item{
                border-radius: 4px;
                border: 1PX solid #ccc;
                margin-right: 15px;
                padding: 6px;
                position: relative;
                font-size: 13px;
                .img-warp{
                    width: 160px;
                    height: 160px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .img{
                        max-width: 160px;
                        max-height: 160px;
                    }
                    .item{
                        font-size: 16px;
                    }
                }
                .choose-circle{
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    border: 1PX solid #555;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    .choose-solid{
                        height: 0px;
                        width: 0px;
                        background-color: #39D492;
                        border-radius: 50%;
                        transition: .3s;
                    }
                }
            }
            .select{
                border-color: #39D492;
                .choose-circle{
                    border-color: #39D492;
                    .choose-solid{
                        height: 12px;
                        width: 12px;
                    }
                }
            }
        }
        .btn-body{
            width:100%;
            height:50px;
            background:#F4F4F4;
            border-radius:0px 0px 8px 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            .btn1{
                color: #2B4EC2;
                background: #fff;
                margin-left: 20px;
                &:active{
                    background:#2B4EC2;
                    color:#fff;
                }
            }
        }
    }
}
</style>