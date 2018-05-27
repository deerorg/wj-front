<template>
    <div class="login">
        <div class="logo">
            <router-link to="/">
                <h2 class="fm">问卷管家</h2>
            </router-link>
        </div>
        <div class="form">
            <el-form :label-position="labelPosition" label-width="100px" status-icon :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item label="用户名" prop="loginName">
                    <el-input v-model="loginForm.loginName"></el-input>
                </el-form-item>
                 <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="loginForm.pwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="isRememberPsd" label="记住密码"></el-checkbox>
                    <span class="login-text fr">忘记密码？</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" round @click.native.prevent="login" class="login-btn">登录</el-button>
                </el-form-item>
                <div class="text-wrap"> 
                    还没账号？
                    <router-link to="/register">
                       <span class="login-text">立即注册</span>       
                    </router-link>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { REG } from 'common/js/validat'
import { Login } from 'api/login'
export default {
    data() {
        let validatePsd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }else if (!REG.PSD.test(value)) {
                callback(new Error('无效密码'))
            }else {
                callback();
            }
        }
        let validateName = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入用户名'));
                }else if (!REG.NAME.test(value)) {
                callback(new Error('无效密码'))
                } else {
                    callback();
                }
        }
        return{
            labelPosition: 'top',
            isRememberPsd: true,
            loginForm: {
                loginName:'',
                pwd:''
            },
            rules: {
                 loginName: [
                    {validator: validateName, trigger: 'blur' }
                ],
                pwd:[
                    {validator: validatePsd, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        login(){
            this.$refs.loginForm.validate((valid) => {
            if (valid) {
                Login(this.loginForm).then((res) => {
                    console.log(res.msg)
                })  
            } else {
                return false
            }
         })
        } 
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.logo{
    margin-left: 75px;
    margin-top: 35px;
}
.form{
     @include center(400px, 400px); 
}
.login-text{
    cursor: pointer;
    color: $maincolor;
}
.login-btn{
    width: 400px;
}
.text-wrap{
    text-align: center;
}
</style>
