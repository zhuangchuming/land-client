<template>
    <div class="manage">
        <div class="head">
            <div class="logo">{{getUserInfo&&getUserInfo.brand}}</div>
            <div class="item" :class="{select:select==0}" @click="itemClick(0)">
                <i class="icon iconfont icon-product"></i>
                产品</div>
            <div class="item" :class="{select:select==1}" @click="itemClick(1)">
                <i class="icon iconfont icon-order"></i>
                订单</div>
            <div class="item" :class="{select:select==2}" @click="itemClick(2)">
                <i class="icon iconfont icon-gift"></i>
                礼品</div>
            <div class="item" :class="{select:select==3}" @click="itemClick(3)">
                <i class="icon iconfont icon-buywebhostingstep1domain"></i>
                买家信息</div>
            <div class="item" :class="{select:select==4}" @click="itemClick(4)" v-if="getUserInfo&&getUserInfo.role=='admin'">
                <i class="icon iconfont icon-zhanghao"></i>
                账号管理</div>
            <div class="item user-center" :class="{select:select==5}" @click="itemClick(5)">
                <i class="icon iconfont icon-user"></i>
                个人中心</div>
        </div>
        <div class="body">
            <ul class="sider-bar">
                <li class="sider-item" :class="{select:siderSelect==idx}" v-for="(item,idx) of leftLst" :key="idx" @click="siderbarClick(idx)">{{item}}</li>
            </ul>
            <div class="fragment">
                <product ref="product" v-if="fragmentList[0]" v-show="select==0"/>
                <order ref="order" v-if="fragmentList[1]" v-show="select==1"/>
                <gift v-if="fragmentList[2]" ref="gift" v-show="select==2"/>
                <buyer v-if="fragmentList[3]" v-show="select==3"/>
                <admin v-if="fragmentList[4]" v-show="select==4"/>
                <user-center v-if="fragmentList[5]" ref="manage" v-show="select==5"/>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Admin from '@/fragments/admin';
import Buyer from '@/fragments/buyer';
import Gift from '@/fragments/gift';
import Order from '@/fragments/order';
import Product from '@/fragments/product';
import UserCenter from '@/fragments/user-center';
export default {
    computed:{
        ...mapGetters(['getUserInfo'])
    },
    data(){
        return{
            select:1,//头部选中的位置
            siderSelect:-1,//默认侧边栏选中第一位
            //2
            editState:false,//编辑礼物

            list:[
                [
                    '列表',
                    '添加产品'
                ],
                [
                    '添加订单',
                ],
                [
                    '添加礼物',
                    '编辑',
                ],
                [],
                [],
                [
                    '编辑',
                ]
            ],
            fragmentList:[0,0,0,0,0,0],//渲染的list
            leftLst:null,
        }
    },
    methods:{
        siderbarClick(idx){
            this.siderSelect=idx;
            switch(this.select){
                case 0:
                    if(idx==0){
                        this.$refs.product&&this.$refs.product.query();
                    }else if(idx==1){
                        this.$refs.product&&this.$refs.product.showAddProduct();
                    }
                    break;
                case 1:
                    switch(idx){
                        case 0:
                            this.$refs.order&&this.$refs.order.showAddOrder();
                            break;
                    }
                    break;
                case 2:
                    if(idx==0){
                        this.$refs.gift&&this.$refs.gift.showAddGift();
                    }else if(idx==1){
                        this.editState=!this.editState;
                        this.$set(this.leftLst,1,(this.editState?'取消':'编辑'));
                        this.$refs.gift&&this.$refs.gift.setEditState(this.editState);
                    }
                    break;
                case 5:
                    if(idx==0){
                        this.$refs.manage&&this.$refs.manage.setEditState();
                    }
                    break;
            }
        },
        itemClick(index){
            console.log('itemClick',index)
            this.leftLst=this.list[index];
            this.select=index;
            this.editState=false;
            this.$set(this.fragmentList,index,1);
            this.siderSelect=-1;
        }
    },
    created(){
        this.leftLst=this.list[this.select];
        setHtmlFontSizeID(null,1344);//将设计稿更改为1344
        this.fragmentList[this.select]=1;
        console.log('getUserInfo',this.getUserInfo)
    },
    components:{
        Admin,Buyer,Gift,Order,Product,UserCenter
    }
}
</script>
<style lang="scss" scoped>
.manage{
    height: 100%;
    width:100%;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    .head{
        height: 62px;
        background-color: #0F1C30;
        display: flex;
        align-items: center;
        position: relative;
        .logo{
            font-size: 26px;
            color: #0C86E3;
            margin-left: 20px;
            font-weight: bold;
            margin-right: 100px;
        }
        .item{
            color: #fff;
            font-weight: bold;
            padding:14px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            &:not(:last-child){
                margin-right: 50px;
            }
            &.select{
                color:#0C86E3;
                border-bottom: 4px solid #0C86E3;
                border-top: 4px solid transparent;
            }
            .iconfont{
                margin-right: 12px;
            }
            .iconfont{
                font-size: 22px;
                color: #576c8c;
            }
        }
        .user-center{
            position: absolute;
            right: 30px;
        }
        
    }
    .body{
        height: 0;
        flex:1;
        width: 100%;
        display: flex;
        .sider-bar{
            height: 100%;
            width: 220px;
            overflow-y: auto;
            box-shadow:0px 0px 6px 0px rgba(16,41,108,0.18);
            padding-top: 30px;
            box-sizing: border-box;
            .sider-item{
                height: 50px;
                line-height: 50px;
                padding-left: 22px;
                font-size: 18px;
                font-weight: bold;
                &.select{
                    border-left: 5px solid #0C86E3;
                }
            }
        }
        .fragment{
            flex:1;
            overflow: auto;
            display: flex;
        }
    }
}
</style>