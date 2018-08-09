<template>
    <div class="register">
        <div class="logo">
            <router-link to="/">
                <h2 class="fm logo-text">问卷管家</h2>
            </router-link>
        </div>
        <div class="form">
            <el-form :label-position="labelPosition" label-width="60px" status-icon :model="registerForm" :rules="rules" ref="registerForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="registerForm.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="registerForm.mobile" placeholder="请输入11位有效手机号码"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="validateCode">
                    <el-input v-model="registerForm.validateCode" class="shortinput" placeholder="请输入正确的手机号后获取验证码"></el-input>
                    <el-button v-show="!validateImg"  @click="getImg">获取验证码</el-button>
                    <span class="validatimg" @click="getImg" v-show="validateImg">
                        <img id="vImg" :src="validateImg">
                    </span>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" placeholder="请输入6-20位字母，数字，减号，下划线的密码" v-model="registerForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" round @click.native.prevent="_register" class="register-btn"  :loading="registering">注册</el-button>
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
import { getKaptchaImage, check, register } from 'api/register'

export default {
    data () {
        let validatUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
              }else {
                this.checkValue('userName', this.registerForm.userName).then((res) => {
                    if(res.data) {
                        callback(new Error('该用户名已经存在'))
                    } else {
                        callback();
                    }
                })
              }
        }
        let validatMobile = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号码'));
              } else if(!REG.MOBILE.test(value)) {
                callback(new Error('请输入有效的手机号码'));
              } else {
                this.checkValue('mobile', this.registerForm.mobile).then((res) => {
                    if(res.data) {
                        callback(new Error('该手机号已被注册'))
                    } else {
                        callback();
                    }
                })
            }
        }
        let validatValidateCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            }else {
                callback()
            }
        }
        let validatePsd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }else if (!REG.PSD.test(value)) {
                callback(new Error('请输入6-20位字母，数字，减号，下划线的密码'))
            }else {
                callback();
            }
        }
        return{
            labelPosition: 'top',
            isRememberPsd: true,
            registering: false,
            registerForm: {
                userName:'',
                password:'',
                mobile:'',
                validateCode:''
            },
            rules: {
               userName: [
                    {validator: validatUsername, trigger: 'blur' }
                ],
               mobile: [
                    {validator: validatMobile, trigger: 'blur' }
                ],
               validateCode: [
                    {validator: validatValidateCode, trigger: 'blur' }
                ],
               password: [
                    {validator: validatePsd, trigger: 'blur' }
                ]
            },
            validateImg: ''
        }
    },
    methods:{
        getImg(){
            if(this.registerForm.mobile=='' || !REG.MOBILE.test(this.registerForm.mobile)) {
                this.$message.error("请输入有效的手机号")
            } else {
                this.checkValue('mobile', this.registerForm.mobile).then((res) => {
                    if(res.data) {
                        this.$message.error("该手机号已被注册")
                    } else {
                        getKaptchaImage(this.registerForm.mobile).then((res) => {
                                this.validateImg = res
                        })
                    }
                })
            }
        },
        checkValue(checkname,checkvalue) {
            return check(checkname, checkvalue).then((res) => {
                return  Promise.resolve(res)
            })
        },
        _register() {
            this.$refs.registerForm.validate((valid) => {
            if (valid) {
                this.registering = true
                console.log(this.registerForm)
               // this.registerForm.password = md5(this.registerForm.password)
                let obj = {}
                for(let i in this.registerForm) {
                    obj[i] = this.registerForm[i]
                }
                register(obj).then((res) => {
                    console.log(res)
                    this.registering = false
                    const { success, msg, data } = res
                    if (success) {
                        this.$message({
                            message: '注册成功，请在登录页登录',
                            type: 'success',
                            duration: 3 * 1000
                        })
                       this.$router.push('/login')
                         
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
     @include center(400px, 550px); 
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
.shortinput{
    width: 70%;
}
.validatimg{
    display: inline-block;
    margin-left: 5px;
    width: 25%;
    height: 40px;
    vertical-align: middle;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;

}
.validatimg > img{
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
}
</style>
