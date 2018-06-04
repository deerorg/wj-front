<template>
    <div class="login">
        <div class="logo">
            <router-link to="/">
                <h2 class="fm logo-text">问卷管家</h2>
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
                    <el-button type="primary" round @click.native.prevent="login" class="login-btn"  :loading="logining">登录</el-button>
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
import { Login, checkLoginState } from 'api/login'
import { setUser, getToken, storeUserInfor } from 'store/store'
export default {
    beforeRouteEnter (to, from, next) {
        if(getToken()) {
          checkLoginState().then((res) => {
            if(res.data.data === null && res.data.success) {
                next('/')
            } else { next() }
          })
        } else {
            next()
        }  
    },
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
                callback(new Error('无效用户名'))
                } else {
                    callback();
                }
        }
        return{
            labelPosition: 'top',
            isRememberPsd: true,
            logining: false,
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
                this.logining = true
                Login(this.loginForm).then((res) => {
                    this.logining = false
                    const { success, msg, data } = res
                    if (success) {
                        if (data.user.roleIds.length <= 0) {
                            me.$message.info("用户无权登录系统, 请联系管理员")
                        }
                        else{
                            // 本地记住密码（cookie）待开发
                            this.$message({
                                message: '登录成功',
                                type: 'success',
                                duration: 2 * 1000
                            })
                            setUser(data.user.userName, data.token, data.user.id)
                            storeUserInfor(data.user) 
                            // loding
                            // 跳转路由
                            this.$router.push('/usermanagement')
                         }
                    } else {
                       this.$message.error(res.msg)
                    }
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
.login-btn{
    width: 400px;
}
.text-wrap{
    text-align: center;
}
</style>
