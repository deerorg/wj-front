<template>
    <div class="user">
        <div class="user-contain">
            <div class="user-info">
                <div class="info">
                    <p class="title">账号信息</p>
                    <table class="info-table">
                        <tr>
                            <td>用户名:</td>
                            <td>{{infor.username}} </td>
                        </tr>
                        <tr>
                            <td>邮箱:</td>
                            <td>{{infor.email}} <el-button type="text" style="padding: 0" @click="dialogFormchangEmail = true">修改</el-button></td>
                        </tr>
                        <tr>
                            <td>手机号:</td>
                            <td>{{infor.mobile}} <el-button type="text" style="padding: 0" @click="dialogFormchangMobile = true">修改</el-button></td>
                        </tr>
                        <tr>
                            <td>密码:</td>
                            <td><el-button type="text" style="padding: 0" @click="dialogFormchangPsd = true">修改</el-button></td>
                        </tr>
                    </table>
                </div>
                <div class="info">
                    <p class="title">基本信息<el-button type="text" style="padding: 0 14px; ">修改</el-button></p>
                    <table class="info-table">
                        <tr>
                            <td>姓名:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>城市:</td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div class="info">
                    <p class="title">第三方账号</p>
                    <table class="info-table">
                        <tr>
                            <td>微信:</td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormchangPsd" class="dialog">
            <el-form :model="psdForm" :rules="rulesPsd" ref="psdForm">
                <el-form-item label="旧密码" :label-width="formLabelWidth"  prop="oldPwd">
                    <el-input type="password" v-model="psdForm.oldPwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth"  prop="newPwd">
                    <el-input type="password" v-model="psdForm.newPwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth"  prop="comfigpsd">
                    <el-input type="password" v-model="psdForm.comfigpsd" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormchangPsd = false">取 消</el-button>
                <el-button type="primary"  @click="changePsd">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改邮箱" :visible.sync="dialogFormchangEmail" class="dialog">
            <el-form :model="emailForm" :rules="rulesEmail" ref="emailForm">
                <el-form-item label="邮箱" :label-width="formLabelWidth"  prop="email">
                    <el-input type="text" v-model="emailForm.email" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormchangEmail = false">取 消</el-button>
                <el-button type="primary"  @click="changeEmail">确 定</el-button>
            </div>
        </el-dialog>
         <el-dialog title="修改手机号" :visible.sync="dialogFormchangMobile" class="dialog">
            <el-form :model="mobileForm" :rules="rulesMobile" ref="mobileForm">
                <el-form-item label="手机号" :label-width="formLabelWidth"  prop="mobile">
                    <el-input type="text" v-model="mobileForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormchangMobile = false">取 消</el-button>
                <el-button type="primary"  @click="changeMobile">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { REG } from 'common/js/validat'
import { updataPsd, updataInfor } from 'api/user'
import { getId, deleUser, getUserInfor, getName } from 'store/store'
import md5 from 'md5'
export default {
    data(){
        let validatePsd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入旧密码'));
            }else if (!REG.PSD.test(value)) {
                callback(new Error('密码应为6-20位字母，数字，减号，下划线'))
            }else {
                callback();
            }
        }
        let validatenewPwd =  (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新密码'));
            }else if (!REG.PSD.test(value)) {
                callback(new Error('密码应为6-20位字母，数字，减号，下划线'))
            }else {
                callback();
            }
        }
        let validateComfigPsd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次确认新密码'));
            }else if (!REG.PSD.test(value)) {
                callback(new Error('密码应为6-20位字母，数字，减号，下划线'))
            }else if(value !== this.psdForm.newPwd){
                 callback(new Error('两次输入密码不一致'))
            }else {
                callback();
            }
        }
        let validateEmail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入您的邮箱号'));
            }else if (!REG.EMAILE.test(value)) {
                callback(new Error('请输入正确的邮箱号'))
            }else {
                callback();
            } 
        }
        let validateMobile = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入您的手机号'));
            }else if (!REG.MOBILE.test(value)) {
                callback(new Error('请输入11位有效的手机号'))
            }else {
                callback();
            } 
        }
        return {
            dialogFormchangEmail: false,
            dialogFormchangMobile: false,
            dialogFormchangPsd : false,
            formLabelWidth: '70px',
            psdForm: {
                oldPwd: '',
                newPwd: '',
                comfigpsd: ''
            },
            rulesPsd: {
                oldPwd: [
                    {validator: validatePsd, trigger: 'blur' }
                ],
                newPwd:[
                    {validator: validatenewPwd, trigger: 'blur' }
                ],
                comfigpsd: [
                    {validator: validateComfigPsd, trigger: 'blur' }
                ]
            },
            infor: {
                username: '',
                email: '',
                mobile: ''
            },
            emailForm: {
                email: ''
            },
            rulesEmail:{
                email: [
                    {validator: validateEmail, trigger: 'blur' } 
                ]
            },
            mobileForm: {
                mobile: ''
            },
            rulesMobile: {
                mobile: [
                    {validator: validateMobile, trigger: 'blur' }
                ]
            }

        }
    },
    created (){
        this.getInfor()
    },
    methods: {
       changePsd (){
            this.$refs.psdForm.validate((valid) => {
                if (valid) {
                    let obj = {}
                    for(let i in this.psdForm) {
                        obj[i] = this.psdForm[i]
                    }
                    updataPsd(md5(obj.oldPwd), md5(obj.newPwd), getId()).then((res) => {
                        if(res.data === null && res.success) {
                            this.dialogFormchangPsd = false
                            this.$message({
                                message: '密码修改成功,请重新登录！',
                                type: 'success',
                                duration: 3 * 1000
                            })
                            deleUser()
                            this.$router.push('/login')
                            window.location.reload(true)   
                        } else {
                        this.$message.error(res.msg)
                        }
                    }) 
                } else {
                return false
            }
         })
       },
       changeEmail() {
            this.$refs.emailForm.validate((valid) => {
                if (valid) {
                    let obj = getUserInfor()
                    obj.email = this.emailForm.email
                    console.log(obj)
                    updataInfor(obj).then((res) => {
                        if(res.data === null && res.success) {
                            this.dialogFormchangEmail = false
                            this.$message({
                                message: '邮箱修改成功！',
                                type: 'success',
                                duration: 3 * 1000
                            })
                          // 更新邮箱信息 显示及本地
                        } else {
                        this.$message.error(res.msg)
                        }
                        
                    }) 
                } else {
                return false
            }
         })
       },
       changeMobile (){
             this.$refs.mobileForm.validate((valid) => {
                if (valid) {
                    let obj = getUserInfor()
                    obj.mobile = this.mobileForm.mobile
                    updataInfor(obj).then((res) => {
                        if(res.data === null && res.success) {
                            this.dialogFormchangEmail = false
                            this.$message({
                                message: '手机号修改成功！',
                                type: 'success',
                                duration: 3 * 1000
                            })
                          // 更新手机号信息  显示及本地
                        } else {
                        this.$message.error(res.msg)
                        }
                        
                    }) 
                } else {
                return false
            }
         })
       },
       getInfor() {
           this.infor.username = getName()
           let obj = getUserInfor()
           this.infor.email = obj.email
           this.infor.mobile = obj.mobile
       }
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.user{
    width: 100%;
    min-height: 300px;
    margin-top: $topmargin;
    min-width: 990px;
    z-index: 888;
}
.user-contain{
    width: 990px;
    min-height: 440px; 
    margin: 0 auto; 
    border: 2px solid #dedfe0;
    border-radius: 20px;
}
.user-info{
    padding: 20px 30px;
}
.info{
    margin-bottom: 30px;
}
.title{
    font-size: 18px;
    line-height: 2em;
    border-bottom: 1px  solid #dedfe0;
}
.info-table tr td{
    padding-top: 10px;
}
.info-table td{
    text-align: left;
}
.dialog{
    width: 50%;
    margin-right: auto;
    margin-left: auto;
}
</style>
