<template>
    <div class="login">
        <div class="body">
            <div class="input">
                <i class="icon iconfont icon-zhanghao"></i>
                <input v-model="account" placeholder="account...">
            </div>
             <div class="input">
                <i class="icon iconfont icon-suo"></i>
                <input type="password" v-model="pwd" placeholder="password..." @keyup.enter="login">
            </div>
            <div class="btn" @click="login">登 录</div>
            <div class="register">HOMESPRIT<sup>®️</sup></div>
        </div>
    </div>
</template>
<script>
export default {
    //1600:900
    //750:1334
    name:"login",
    data(){
        return {
            account:'',
            pwd:'',
        }
    },
    methods:{
        //登录
        async login(){
            let params={
                account:this.account,
                pwd:this.pwd
            }
            let {data,error} = await this.$request({url:'/user/login',method:'POST',params});
            if(data){
                this.$store.commit('setUserInfo',data.data);
                let qry = this.$router.query;
                if(qry&&qry.redirect==-1){
                    this.$router.pop();
                }else{
                    this.$router.replace({name:'manage'});
                }
            }else{
                this.$toast(error.msg||'login fail.')
            }
        }
    },
    created(){
        setHtmlFontSizeID(null,1344);//将设计稿更改为1344
        
    }
}
</script>
<style lang="scss" scoped>
.login{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .body{
        width: 600px;
        height: 450px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .input{
            display: flex;
            margin-bottom: 20px;
            align-items: center;
            .iconfont{
                font-size: 19px;
                color:#888;
            }
            input{
                height: 30px;
                width:200px;
                border-bottom: 1PX solid #ccc;
                font-size: 16px;
                color:#555;
                margin-left: 12px;
            }
        }
        .btn{
            width:226px;
            height:36px;
            font-size: 16px;
            line-height: 36px;
            text-align: center;
            background:#2B4EC2;
            border-radius:4px;
            color: white;
            margin-top: 30px;
            &:active{
                opacity: .9;
            }
        }
        .register{
            margin-top: 130px;
            font-size: 14px;
            color:#888;
        }
    }
}
</style>