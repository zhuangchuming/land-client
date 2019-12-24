<template>
    <div class="gift">
        <ul class="list">
            <li class="item" v-for="(item,idx) of list" :key="idx">
                <img class="img" :src="imgSrv+item.pic">
                <div class="descri">{{item.descri}}</div>
                <div>Price：{{item.price}}</div>
                <div v-if="edit" class="btn" @click="deleteItem(item,idx)">delete</div>
            </li>
        </ul>
         <!-- 添加礼物 -->
        <van-popup v-model="addGiftmodel" position="center">
            <div class="pop-win">
                <div class="title"> 添加礼物<i class="icon iconfont icon-cha" @click="addGiftmodel=false"></i></div>
                <div class="input-item">
                    <div>请选择 300X400 的图片</div>
                    <input type="file" accept="image/*" @change="change">
                </div>
                <div class="input-item">
                    <div >价格（请输入带币种结尾）</div>
                    <input v-model="price" placeholder="请输入礼品价值...">
                </div>
                <div class="input-item">
                    <div>描述</div>
                    <input v-model="descri" placeholder="请输入礼品描述...">
                </div>
                <div class="btn-body">
                    <div class="btn" @click="addGift">保 存</div>
                    <div class="btn btn1" @click="addGiftmodel=false">取 消</div>
                </div>
            </div>
		</van-popup>
    </div>
</template>

<script>
import {imgSrv} from '@/config';
import {dataURItoBlob,inputChange} from '@/utils/common';
export default {
    name:'gift',
    data(){
        return{
            list:[],
            imgSrv:imgSrv,
            addGiftmodel:false,
            blob:null,
            price:null,
            descri:null,
            edit:false
        }
    },
    created(){
        this.getGiftLst();
    },
    methods:{
        async change(e) {
			let params = await inputChange(e);
            this.blob = dataURItoBlob(params.base64);
		},
        showAddGift(){
            this.addGiftmodel=true;
        },
        setEditState(s){
            this.edit=s;
        },
        async getGiftLst(){
            let {data,error} = await this.$request({url:'/gift/query'});
            if(data){
                this.list=data.data;
                console.log('data',data)
            }else{
                this.$toast("获取礼物列表失败")
            }
        },
        async deleteItem(item,idx){
            let params={
                id:item.id
            }
            let {data,error} = await this.$request({url:'/gift/del',method:'POST',params:params});
            if(data){
                this.list.splice(idx,1);//移除一个
            }else{
                this.$toast("删除礼物失败!")
            }
        },
        async addGift(){
            if(!this.price){
                return this.$toast('价值不能为空')
            }
            if(!this.blob){
                return this.$toast('请选择礼品图片')
            }
            if(!this.descri){
                return this.$toast('请添加产品描述')
            }
            if(!/(\d+)(\.\d+){0,1}(.)$/.test(this.price)){
                return this.$toast('请输入正确的价格')
            }
            let formData=new FormData();
            formData.append('price',this.price);
            formData.append('descri',this.descri);
            formData.append("pic", this.blob, "a.jpg");
            formData.enctype = "multipart/form-data";
            let {data,error} = await this.$request({url:'/gift/add',method:'POST',params:formData});
            if(data){
                this.addGiftmodel=false;
                this.$toast('添加成功');
                this.getGiftLst();
                this.blob=null;
                this.descri=null;
                this.price=null;
            }else{
                this.$toast(error.msg||'添加失败请稍后重试');
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.gift{
    .list{
        display: flex;
        flex-wrap: wrap;
        padding: 30px;
        .item{
            width: 240px;
            height: 380px;
            box-shadow:0px 0px 6px 0px rgba(16,41,108,0.18);
            margin-right: 20px;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 12px;
            box-sizing: border-box;
            border-radius: 8px;
            .img{
                width: 180px;
            }
            .descri{
                margin-top: 20px;
                margin-bottom: 10px;
            }
            .btn{
                width:130px;
                height:34px;
                font-size: 16px;
                line-height: 34px;
                text-align: center;
                background:#2B4EC2;
                border-radius:4px;
                color: white;
                margin-top: 10px;
                &:active{
                    opacity: .9;
                }
            }
        }
    }
    .pop-win{
        width:400px;
        height:415px;
        background:#fff;
        box-shadow:0px 0px 40px 0px rgba(0, 0, 0, 0.5);
        border-radius:8px;
        position: relative;
        .title{
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            border-bottom: 1PX solid #ccc;
            margin-bottom: 30px;
        }
        .input-item{
            padding-left: 20px;
            margin-bottom: 19px;
            div{
                color: #555;
                font-size: 14px;
                margin-bottom: 11px;
            }
            input{
                border:1PX solid #ccc;
                width:359px;
                height:40px;
                color: #333;
                font-size: 14px;
                padding-left: 13px;
                box-sizing: border-box;
            }
        }
        .btn-body{
            width:100%;
            height:50px;
            background:#F4F4F4;
            border-radius:0px 0px 8px 8px;
            display: flex;
            position: absolute;
            bottom: 0;
            align-items: center;
            justify-content: center;
            .btn{
                width:130px;
                height:34px;
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