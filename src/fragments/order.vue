<template>
    <div class="order">
        <div class="search">
            <div class="search-btn" @click="search(1)">搜 索</div>
            <div class="search-body">
                <i class="icon iconfont icon-sousuo"></i><input class="search-input" v-model="searchInput" :placeholder="inputTxt">
            </div>

            <el-dropdown @command="handleCommand" trigger="hover">
                <el-button type="primary">
                    {{type==1?'产品asin码':'订单编号'}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="1">产品asin</el-dropdown-item>
                    <el-dropdown-item :command="0">订单编号</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown @command="handleClick" trigger="hover">
                <el-button type="primary">
                    {{getOrderStatus}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="0">{{this.orderStatus[0]}}</el-dropdown-item>
                    <el-dropdown-item :command="1">{{this.orderStatus[1]}}</el-dropdown-item>
                    <el-dropdown-item :command="2">{{this.orderStatus[2]}}</el-dropdown-item>
                    <el-dropdown-item :command="3">{{this.orderStatus[3]}}</el-dropdown-item>
                    <el-dropdown-item :command="null">{{this.orderStatus[4]}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <div class="common-btn edit" @click="edit">{{editStatus?'完 成':'编 辑'}}</div>
        </div>
        <ul class="order-list">
            <li class="order-item" v-for="(item,idx) of orderList" :key="idx">
                <div class="img-warp"><img class="item-img" :src="imgSrv+item.product.pic"></div>
                <div class="cont">
                    <div class="item">添加时间：{{creatTime(item.ct)}}</div>
                    <div class="item">
                        ASIN：<el-tooltip class="item" effect="dark" content="点击复制" placement="top-start">
                            <el-button @click="copyText(item.orderID)" type="text">{{item.asin}}</el-button>
                        </el-tooltip>
                    </div>
                    <div class="item">
                        卖家订单编号：<el-tooltip class="item" effect="dark" content="点击复制" placement="top-start">
                            <el-button @click="copyText(item.orderID)" type="text">{{item.orderID}}</el-button>
                        </el-tooltip>
                    </div>
                    <div class="item">商品小计：{{item.product.price}}</div>
                    <div class="item">订单状态：{{orderStatus[item.status]}}</div>
                </div>
                <div class="cont" v-if="item.buyer">
                    <div class="item">用户创建时间：{{creatTime(item.buyer.ct)}}</div>
                    <div class="item">买家姓名：{{item.buyer.name}}</div>
                    <el-tooltip class="item" effect="dark" content="点击复制" placement="top-start">
                        <el-button @click="copyText(item.buyer.mail)" type="text">邮箱：{{item.buyer.mail}}</el-button>
                    </el-tooltip>
                    <div class="item">facebook：{{item.buyer.facebook}}</div>
                </div>
                <div class="rate" v-if="item.review">
                    <div class="item">评论时间：{{creatTime(item.review.ct)}}</div>
                    <div class="item">评论内容：{{item.review.cont}}</div>
                    <div class="item">评分：</div>
                    <el-rate
                        disabled
                        text-color="#ff9900"
                        :colors="colors"
                        :value="item.review.rate">
                    </el-rate>
                </div>
                <div class="delete" v-if="editStatus" @click.stop="deleteFunc(item,idx)"><i class="icon iconfont icon-cha "></i></div>

                <!-- <div class="delete" v-if="editStatus" @click.stop="editProduct(item,idx)"><i class="icon iconfont icon-cha "></i></div> -->
            </li>
        </ul>

        <van-pagination 
            v-model="currentPage" 
            :page-count="pageCnt"
            :show-page-size="cnt" 
            force-ellipses
            @change="search"/>
                 <!-- 添加/编辑产品 -->
        <van-popup v-model="addOrderModel" position="center">
            <div class="pop-win">
                <div class="title"> 添加产品<i class="icon iconfont icon-cha" @click="addOrderModel=false"></i></div>
                <div class="pop-cont">
                    <div class="input-item">
                        <div >订单号</div><span class="input-import">*</span>
                        <input v-model="orderID" placeholder="请输入订单号...">
                    </div>
                    <div class="input-item">
                        <div><span class="input-import">*</span> 请选择订单对应产品.</div>
                    </div>
                    <ul class="productlst">
                        <li class="product-item" :class="{select:asin==item.asin}" v-for="(item,idx) of productList" :key="idx" @click="chooseProduct(item)">
                            <div class="img-warp"><img class="img" :src="imgSrv+item.pic"></div>
                            <div class="descri">ASIN:{{item.asin}}</div>
                            <div class="choose-circle">
                                <div class="choose-solid"></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="btn-body">
                    <div class="common-btn" @click="addOrder">保 存</div>
                    <div class="common-btn btn1" @click="addOrderModel=false">取 消</div>
                </div>
            </div>
		</van-popup>
    </div>
</template>

<script>
import {imgSrv} from '@/config';
import Vue from 'vue'
import { Rate,Tooltip,Button} from 'element-ui';
Vue.component(Rate.name,Rate);
Vue.component(Tooltip.name,Tooltip);
Vue.component(Button.name,Button);
import {copyText} from '@/utils/common';
export default {
    name:"order",
    data(){
        return{
            addOrderModel:false,
            asin:null,//asin码
            orderID:null,//订单号
            status:0,//状态 //0:默认是未处理状态（卖家新增订单）,1:买家已请求，但卖家未处理,2:已接受请求,但未完成处理(用户等待返款，卖家等待评论出现),3:已完成处理（返款）
            productList:[],//产品列表
            orderList:[],//订单列表
            imgSrv:imgSrv,
            page:1,//页码

            pageCnt:0,//总页数
            currentPage:1,//当前页码
            searchInput:null,
            editStatus:false,//

            type:0,//
            searchStatus:['order','asin'],//搜索状态
            inputTxt:"请输入要查找的订单号...",
            //0卖家添加，暂无买家请求           1买家已请求，但卖家未处理
            //2 已联系，等待买家评论出现，或者不评论直接跳过去          3已返款
            orderStatus:['已添加订单','待处理','待返款','已完成','全部状态'],
            chgStatus:true,//改变了状态
            cnt:50,//每页长度
            copyText:copyText,
            colors:{ 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: false }, 5: '#FF9900' }
        }
    },
    computed:{
        getOrderStatus(){
            return this.orderStatus[this.status];
        }
    },
    methods:{
        creatTime(ct){
            let t = new Date(ct);
            return `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
        },
        handleClick(cmd){
            if(cmd!=this.status){
                this.chgStatus=true;//状态发生了改变
            }
            this.status=cmd;//更改状态
        },
        //
        handleCommand(cmd){
            this.type=this.searchStatus[cmd];
            this.inputTxt=`请输入要查找的${this.type==this.searchStatus[0]?'订单号':'产品asin码'}...`;
        },
        //搜索
        search(page){
            console.log('page',page)
            if(page==null){
                page=1;
            }
            this.queryOrder(page,this.status);
        },
        //删除某个订单
        async deleteFunc(item,idx){
            let {data,error} = await this.$request({url:'/order/del',method:'POST',params:{orderID:item.orderID}});
            if(data){
                this.orderList.splice(idx,1);
                this.$toast("删除成功。")
            }else{
                this.$toast(error.msg||"删除失败。")
            }
        },
        //编辑
        edit(){
            this.editStatus=!this.editStatus;
        },
        showAddOrder(){
            this.addOrderModel=true;
            if(!this.productList||!this.productList.length){
                this.queryProduct();
            }
        },
        //选择对应的产品
        chooseProduct(item){
            this.asin=item.asin;//asin码
        },
        //添加订单号
        async addOrder(){
            if(!this.orderID){
                return this.$toast("订单号不能为空")
            }
            if(!this.asin){
                return this.$toast("请选择订单号对应的产品")
            }
            let params={
                asin:this.asin,
                orderID:this.orderID,
                needGift:0
            }
            let {data,error} = await this.$request({url:'/order/add',method:'POST',params});
            if(data){
                this.asin=null;
                this.orderID=null;
                this.addOrderModel=false;
                this.$toast("添加成功")
            }else{
                this.$toast(error.msg||"添加失败")
            }
        },
        async queryProduct(page){
            console.log('query',page)
            let params={};
            if(page){
                params.page=page;
            }
            let {data,error} = await this.$request({url:'/product/query',params});
            if(data){
                this.productList=this.productList.concat(data.data);
                console.log('this.productList',this.productList)
            }else{
                this.$toast(error.msg||"获取产品列表失败")
            }
        },
        //查询订单
        //0:默认是未处理状态（卖家新增订单）,1:买家已请求，但卖家未处理,2:已接受请求,但未完成处理(用户等待返款，卖家等待评论出现),3:已完成处理（返款）；
        async queryOrder(page,status){
            let params={
                status:this.status,
                cnt:this.cnt
            }
            if(this.type == 0){
                params.orderID=this.searchInput;
            }else{
                params.asin=this.searchInput;
            }
            //搜索订单，则忽略状态
            if(params.orderID!=null){
                delete params.status
            }
            if(page!=null){
                params.page=page;//指定页码
            }
            if(this.chgStatus){//当改变状态的时候，需要重新获取页码总数
                params.total=1;
            }
            let {data,error} = await this.$request({url:'/order/get',params:params});
            if(data){
                this.chgStatus=false;//恢复状态
                if(params.total){
                    this.pageCnt=data.len;
                }
                this.orderList=data.data;
            }else{
                this.$toast(error.msg||"获取订单信息失败");
            }
        },

    },
    created(){
        console.log('create order')
        this.queryOrder(1,this.status);//获取买家已添加订单
    }
}
</script>

<style lang="scss" scoped>
.order{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .search{
        display: flex;
        margin-bottom: 20px;
        margin-top: 10px;
        position: relative;
        .search-btn{
            width:80px;
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
    .order-list{
        padding:0 10px;
        .order-item{
            padding: 10px 5px;
            box-shadow:0px 0px 6px 0px rgba(16,41,108,0.18);
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            border-radius: 8px;
            position: relative;
            .img-warp{
                width: 100px;
                height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 20px;
                .item-img{
                    max-width: 100px;
                    max-height: 100px;
                }
            }
            .item{
                font-size: 13px;
            }
            .cont{
                margin-right: 30px;
            }
            .rate{
                width: 300px;
            }
            .gift{
                
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
        .productlst{
            display: flex;
            overflow-x: auto;
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 10px;
            .product-item{
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
    .el-dropdown {
        vertical-align: top;
    }
    // .el-dropdown + .el-dropdown {
    //     margin-left: 15px;
    // }
    .el-dropdown {
        margin-left: 15px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .el-button--text{
        padding:0;
    }
}
</style>