<template>
    <div class="user-center">
        <div class='info-row'>
            <div class="row-left">账  号</div>
            <div class="row-middle">:</div>
            <div class="row-right">{{getUserInfo.account}}</div>
            <div class="common-btn" @click="changepwd">修改密码</div>
        </div>
        <div class='info-row'>
            <div class="row-left">公司名字</div>
            <div class="row-middle">:</div>
            <div class="row-right">{{company}}</div>
        </div>
        <div class='info-row'>
            <div class="row-left">备案号</div>
            <div class="row-middle">:</div>
            <div class="row-right">{{beian}}</div>
        </div>
        <div class='info-row'>
            <div class="row-left">公司简介</div>
            <div class="row-middle">:</div>
            <div class="row-right">{{getUserInfo.introduce}}</div>
        </div>
        <div class='info-row'>
            <div class="row-left">品牌名字</div>
            <div class="row-middle">:</div>
            <div class="row-right">{{brand}}</div>
        </div>
        <div class='info-row'>
            <div class="row-left">邮 箱</div>
            <div class="row-middle">:</div>
            <div class="row-right">{{getUserInfo.mail}}</div>
        </div>
        <div class='info-row'>
            <div class="row-left">账号过期时间</div>
            <div class="row-middle">:</div>
            <div class="row-right">{{parseDateStr(getUserInfo.date)}}</div>
        </div>
        <div class='info-row'>
            <div class="row-left">landing page首页描述的提示文本</div>
            <div class="row-middle">:</div>
            <div class="row-right">{{getUserInfo.descri}}</div>
        </div>

        <!-- 添加礼物 -->
        <van-popup v-model="showEditModal" position="center">
            <div class="pop-win">
                <div class="title"> 编辑个人信息<i class="icon iconfont icon-cha" @click="showEditModal=false"></i></div>
                <div class="input-item">
                    <div >邮箱</div>
                    <input v-model="mail" placeholder="请输入新的邮箱...">
                </div>
                <div class="input-item">
                    <div>过期时间</div>
                    <el-date-picker
                        v-model="date"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                </div>
                <div class="input-item">
                    <div>公司名字</div>
                    <input v-model="company" placeholder="请输入新的公司名字.."/>
                </div>
                <div class="input-item">
                    <div>备案号</div>
                    <input v-model="beian" placeholder="请输入新的备案号..">
                </div>
                <div class="input-item">
                    <div>公司简介</div>
                    <textarea v-model="introduce" placeholder="请输入新的公司简介.."></textarea>
                </div>
                <div class="input-item">
                    <div>landing page首页描述的提示文本</div>
                    <textarea v-model="descri" placeholder="请输入新的描述.."></textarea>
                </div>
                <div class="btn-body">
                    <div class="common-btn" @click="editInfo">保 存</div>
                    <div class="common-btn btn1" @click="showEditModal=false">取 消</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
export default {
    name:"user-center",
    data(){
        return{
            showpwd:false,
            showEditModal:false,
            mail:null,
            brand:null,
            company:null,//公司
            introduce:null,
            descri:null,
            date:null,
            beian:null,//备案
        }
    },
    computed:{
        ...mapGetters(['getUserInfo'])
    },
    
    methods:{
        //修改信息
        async editInfo(){
            if(!this.mail){
                return this.$toast("请输入邮箱");
            }
            if(!this.date){
                return this.$toast("请选择账号的过期时间");
            }
            if(!this.introduce){
                return this.$toast("公司简介不能为空")
            }
            if(!this.descri){
                return this.$toast("用户测评首页描述不能为空")
            }
            
            let params={
                mail:this.mail,
                date:this.date.contructor==Date?this.date.getTime():this.date,
                introduce:this.introduce,
                descri:this.descri,
                beian:this.beian,
                company:this.company,
            }
            let {data,error} = await this.$request({url:'/user/edit',method:'POST',params:params});
            if(data){
                this.$toast("修改成功");
                this.$store.commit('setUserInfo',data.user);
                this.showEditModal=false;
            }
            
        },
        //显示编辑信息
        setEditState(){
            this.showEditModal=true;
        },
        showpwdfunc(){
            this.showpwd=!this.showpwd;
        },
        changepwd(){

        },
        parseDateStr(t){
            let date = new Date(t);
            return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        },
    },
    created(){
        this.mail=this.getUserInfo.mail;
        this.brand=this.getUserInfo.brand;
        this.introduce=this.getUserInfo.introduce;
        this.descri=this.getUserInfo.descri;
        this.date=this.getUserInfo.date;
        this.company=this.getUserInfo.company;
        this.beian=this.getUserInfo.beian;
    }

}
</script>

<style lang="scss" scoped>
.user-center{
    padding: 16px;
    .info-row{
        display: flex;
        font-size: 18px;
        margin-bottom: 15px;
        .row-left{
            width: 170px;
        }
        .row-right{
            margin-left: 12px;
            flex: 1;
        }
    }
    .pop-win{
        width:500px;
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
                font-size: 15px;
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