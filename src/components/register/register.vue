<template>
    <div class="register">
        <div class="logo">
            <router-link to="/">
                <h2 class="fm logo-text">问卷管家</h2>
            </router-link>
        </div>
        <div class="form">
            <el-form :label-position="labelPosition" label-width="60px" status-icon :model="registerForm" :rules="rules" ref="registerForm">
                <el-form-item label="用户名" prop="loginName">
                    <el-input v-model="registerForm.loginName"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="registerForm.pwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" round @click.native.prevent="login" class="register-btn"  :loading="registering">注册</el-button>
                </el-form-item>
                <div class="text-wrap"> 
                    已有账号？
                    <router-link to="/login">
                       <span class="login-text">立即登录</span>       
                    </router-link>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { REG } from 'common/js/validat'
export default {
    data () {
         return{
            labelPosition: 'top',
            isRememberPsd: true,
            registering: false,
            registerForm: {
                loginName:'',
                pwd:'',
                email:''
            },
            rules: {
               
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.logo{
    height: 75px;
    margin-left: 75px;
}
.logo-text{
    padding-top: 35px;
}
.form{
     @include center(400px, 400px); 
}
.login-text{
    cursor: pointer;
    color: $maincolor;
}
.register-btn{
  width: 400px;
}
.text-wrap{
    text-align: center;
}
</style>
