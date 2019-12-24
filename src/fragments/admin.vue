<template>
    <div class="admin">
        <div class="btn" @click="addUserModel=true">添加用户</div>
        <ul class="user-list">
            <li class="user-item">
                <div>账号</div>
                <div>域名</div>
                <div class="mail">邮箱</div>
                <div>过期时间</div>
                <div>角色</div>
            </li>
            <li class="user-item" v-for="(item,idx) of list" :key="idx">
                <div>{{item.account}}</div>
                <div>{{item.domain}}</div>
                <div class="mail">{{item.mail}}</div>
                <div>{{item.date}}</div>
                <div>{{item.role}}</div>
                <div v-if="item.role!='admin'" class="btn" @click="del(item,idx)">删除</div>
            </li>
        </ul>
         <!-- 添加用户 -->
        <van-popup v-model="addUserModel" position="center">
            <div class="pop-win">
                <div class="title"> 添加用户<i class="icon iconfont icon-cha" @click="addUserModel=false"></i></div>
                <div class="pop-cont">
                    <div class="input-item">
                        <div>账号：</div>
                        <input v-model="account" placeholder="请输入用户账号...">
                    </div>
                    <div class="input-item">
                        <div>密码：</div>
                        <input v-model="pwd" placeholder="请输入用户密码...">
                        <input v-model="pwd1" placeholder="请再次输入密码...">
                    </div>
                    <div class="input-item">
                        <div>邮箱：</div>
                        <input v-model="mail" placeholder="请输入邮箱...">
                    </div>
                    <div class="input-item">
                        <div>公司简介：</div>
                        <input v-model="introduce" placeholder="请输入公司简介...">
                    </div>
                    <div class="input-item">
                        <div>公司品牌名：</div>
                        <input v-model="brand" placeholder="请输入公司品牌名...">
                    </div>
                    <div class="input-item">
                        <div>域名：（格式：https://www.homesprit.cn）</div>
                        <input v-model="domain" placeholder="请输入域名...">
                    </div>
                    <div class="input-item">
                        <div>过期时间：</div>
                        <input v-model="date" placeholder="请输入过期时间...">
                    </div>
                    <div class="input-item">
                        <div>请输入用户测评首页描述：</div>
                        <textarea class="descri" v-model="descri" placeholder="请输入首页描述..."></textarea>
                    </div>
                </div>
                <div class="btn-body">
                    <div class="btn" @click="addUser">保 存</div>
                    <div class="btn btn1" @click="addUserModel=false">取 消</div>
                </div>
            </div>
		</van-popup>
    </div>
</template>

<script>
export default {
    name:'admin',
    data(){
        return{
            list:null,
            addUserModel:false,
            //描述
            descri:'Thank you for purchasing our products. Congratulations on your access to our new product experience!',
            account:null,
            pwd:null,
            pwd1:null,
            mail:null,
            domain:null,
            date:null,
            introduce:null,
            brand:null,//品牌名
        }
    },
    methods:{
        
        async del(item,idx){
            let params={
                uID:item.uID
            }
            let {data,error} = await this.$request({url:'/user/del',method:'POST',params});
            if(data){
                this.list.splice(idx,1);
                this.$toast('删除成功')
            }
        },
        async addUser(){
            if(!this.account){
                return this.$toast("请输入账号");
            }
            if(!this.pwd){
                return this.$toast("请输入密码");
            }
            if(!this.pwd1){
                return this.$toast("请再次输入密码");
            }
            if(this.pwd!=this.pwd1){
                return this.$toast("2次输入密码不一致");
            }
            if(!this.mail){
                return this.$toast("请输入邮箱");
            }
            if(!this.domain){
                return this.$toast("请输入账号绑定的域名");
            }
            if(!this.date){
                return this.$toast("请选择账号的过期时间");
            }
            if(!this.introduce){
                return this.$toast("公司简介不能为空")
            }
            if(!this.brand){
                return this.$toast("公司品牌不能为空")
            }
            if(!this.descri){
                return this.$toast("用户测评首页描述不能为空")
            }
            let params={
                account:this.account,
                pwd:this.pwd,
                pwd1:this.pwd1,
                mail:this.mail,
                domain:this.domain,
                date:this.date,
                introduce:this.introduce,
                brand:this.brand,
                descri:this.descri
            }
            let {data,error} = await this.$request({url:'/user/register',method:'POST',params});
            if(data){
                this.addUserModel=false;
                this.list=data.data;
                this.account=null;
                this.pwd=null;
                this.pwd1=null;
                this.mail=null;
                this.domain=null;
                this.date=null;
                this.introduce=null;
                this.brand=null;
                this.queryUser();
            }else{
                this.$toast(error.msg||"添加用户失败");
            }
        },
        async queryUser(){
            let {data,error} = await this.$request({url:'/user/query'});
            if(data){
                this.list=data.data;
            }else{
                this.$toast("获取礼物列表失败")
            }
        },
    },
    created(){
        this.queryUser();
    }
}
</script>

<style lang="scss" scoped>
.admin{
    padding: 20px;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
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
    .user-list{
        .user-item{
            border-bottom: 1PX solid #ddd;
            display: flex;
            align-items: center;
            >div{
                width: 160px;
                min-height: 40px;
                display: flex;
                align-items: center;
                border-right: 1PX solid #ddd;
            }
            .btn{
                width: 120px;
                height: 26px;
                min-height: 0;
                justify-content: center;
                font-size: 13px;
            }
            .mail{
                width: 220px;
            }
            &:first-child{
                >div{
                    justify-content: center;
                }
            }
        }
    }
    .pop-win{
        width:500px;
        height:600px;
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
            .descri{
                width: 380px;
                height: 100px;
                padding: 8px;
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