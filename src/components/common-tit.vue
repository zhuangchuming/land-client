<template>
	<div class="common-tit">
        <i class="icon iconfont iconxiangzuojiantou" @click="back"></i>
        <div class="tit">
            {{tit}}
        </div>
        <div class="right"></div>
	</div>
</template>

<script>
export default {
    name:'common-tit',
    props:{
        tit:{
            type:String,
            default:"title"
        },
    },
	methods:{
        back(idx){
            this.$emit('back')
        }
    }
}
</script>
<style scoped lang="scss">
.common-tit{
    height:88px;
    width:100%;
    color:#333;
    display:flex;
    align-items: center;
    border-bottom: 1PX solid #ddd;
    .tit{
        font-size: 36px;
        flex:1;
        text-align: center;
    }
    .iconxiangzuojiantou{
        width: 80px;
        text-align: center;
        font-size: 30px;
        color:#aaa;
        padding: 20px 0;
    }
    .right{
        width:80px;
    }
}
</style>