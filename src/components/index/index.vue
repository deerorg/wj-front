<template>
    <div class="index">
        <div class="home bg_layer">
            <div class="header">
                <div class="header-wrapper clrfix">
                    <div class="logo fl">
                        <router-link to="/">
                            <h2 class="fc">问卷管家</h2>
                        </router-link>
                    </div>
                    <ul class="nav"></ul>
                    <ul class="user-entry fr" v-if="!isLogin">
                        <li class="entry-btn btn fl">
                            <router-link to="/login">
                                <span class="fc">登录</span>
                            </router-link>
                        </li>
                        <li class="entry-btn btn fl">
                            <router-link to="/register">
                                <span class="fc">注册</span>
                            </router-link>
                        </li>
                    </ul>
                    <div class="user-entry fr" v-if="isLogin">
                        <div class="entry-btn btn">
                            <router-link to="/usermanagement">
                                <span class="fc">进入管理系统</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="banner">
                <div class="banner-btn btn">
                    <router-link to="/login">
                        <span class="fc">免费使用</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { checkLoginState } from 'api/login'
import { getToken } from 'store/store'
export default {
    created() {
        if (getToken()) {
          checkLoginState().then((res) => {
            if(res.data.data === null && res.data.success) {
                this.isLogin = true
            } 
          })
        }
    },
    data () {
        return {
            isLogin: false
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.index {
    height: 100%;
    width: 100%;
    background: url($bgimgurl+'bg.jpg') no-repeat center;
    background-size: cover;
    color: $color ;
}
.bg_layer{
    height: 100%;
    width: 100%;
    position: relative;
    background-color: rgba(25, 24, 24, 0.62); 
}
.header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 16px;
    z-index: 99;
    transition: all .4s ease;
    height: 70px;
}
.header-wrapper{
    margin: 0 auto;
    width: 1200px; 
}
.logo{ 
    margin: 15px 40px 0 0;
}
.user-entry{
    margin: 15px 0 0 15px;
}
.btn{
   font-size: 18px;
   border-radius: 50px;
   display: block; 
   text-align: center;
}
.entry-btn{
    margin-left: 10px;
    font-size: 18px;
    padding: 0 30px;
    line-height: 36px;
    border: 2px  $maincolor solid;
    &:hover{background-color: $maincolor;}
}
.banner{
    @include center;
}
.banner-btn{
    font-size: 24px;
    line-height: 36px;
    background-color: $maincolor;
    padding: 14px 50px;
     &:hover{
        background-color: #ffffff;
    }
    &:hover span{color: $maincolor; }
}
</style>

