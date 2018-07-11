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
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="registerForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="validateCode">
                    <el-input v-model="registerForm.validateCode" class="shortinput"></el-input>
                    <!-- <el-button v-show="!validateImg"  @click="getImg">获取验证码</el-button> -->
                    <span class="validatimg" @click="getImg">
                        <img id="vImg" src="">
                    </span>
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
import { getKaptchaImage } from 'api/register'
export default {
    data () {
         return{
            labelPosition: 'top',
            isRememberPsd: true,
            registering: false,
            registerForm: {
                userName:'',
                pwd:'',
                mobile:'13143372091',
                validateCode:''
            },
            rules: {
               
            },
            validateImg: ''
        }
    },
    methods:{
        getImg(){
            getKaptchaImage(this.registerForm.mobile).then((res) => {
                // this.validateImg = res
                this.handleImg(res)
                // return 'data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => {
                //         data + String.fromCharCode(byte), ''
                //     }).then(data => {
                //         console.log(data)
                //     })
                // )
            })
        },
        handleImg (data){
            // let img =  document.getElementById("vImg")
            // img.src = window.URL.createObjectURL(data)
            // console.log(imgObj)
            // img.onload = function(){
            //      window.URL.revokeObjectURL(this.src)
            //     //  console.log(imgObj)
            // }
            var blob = new Blob([data], {type: 'image/jpeg'})
            // var reader = new FileReader()
            // reader.onload = function(evt){  
            //     if(evt.target.readyState == FileReader.DONE){  
            //         var url = evt.target.result; 
            //         console.log(url) 
            //         document.getElementById('vImg').src=url
            //     }  
            //    // console.log(reader.result) 
            // }  
            // reader.readAsDataURL(blob)
            var url = window.URL.createObjectURL(blob);
            document.getElementById('vImg').src=url
            console.log(url)
           
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
    border: 1px solid #b3d8ff;
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
    border-radius: 4px;
    border: none;
}
</style>
