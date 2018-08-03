<template>
    <div class="main-system">
        <div class="head clrfix">
            <div class="head-contain">
                <div class="logo fl">
                    <router-link to="/">
                        <h2 class="fc logo-text">问卷管家</h2>
                    </router-link>
                </div>
                <el-menu :default-active="activeIndex"  mode="horizontal" active-text-color='#fff' text-color='#fff' background-color='#409EFF' class="fr menu-bar">
                    <el-menu-item index="1">
                        <router-link to="/usermanagement/mywj">
                            <i class="fa fa-home menu-icon"></i><span>我的问卷</span>
                        </router-link>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title" ><i class="fa fa-user-circle-o menu-icon"></i><span>{{username}}</span></template>
                        <router-link to="/usermanagement/user"><el-menu-item index="2-1" >个人信息</el-menu-item></router-link>
                        <li class="childmenubutton" @click="feedbackDialog = true">意见反馈</li>
                        <el-menu-item index="2-2">帮助</el-menu-item>
                    </el-submenu>
    
                    <el-menu-item :index="index+3+''" v-if="!item.children" v-for="(item, index) in menulist" :key="index">
                        <router-link :to="item.url">
                            <i :class="item.icon" style="font-size: 22px"></i><span>{{item.name}}</span>
                        </router-link>
                    </el-menu-item>
                    <el-submenu :index="index+3+''" v-if="item.children" v-for="(item, index) in menulist" :key="index">
                        <template slot="title" ><i :class="item.icon"></i><span>{{item.name}}</span></template>
                        <el-menu-item v-for="(subitem, subindex) in item.children" :index="index+'-'+subindex" :key="index+'-'+subindex">
                            <router-link :to="subitem.url">
                               <span style="color: #fff">{{subitem.name}}</span>
                            </router-link> 
                        </el-menu-item>
                    </el-submenu>
                    <li  @click="_logout" class="logout"><i class="fa fa-power-off menu-icon"></i><span>退出</span></li>
                </el-menu>
            </div>
        </div>
        <div class="contain">
            <div class="mian">
                <router-view></router-view>
            </div>
        </div>
        <el-dialog title="意见反馈" :visible.sync="feedbackDialog" :modal=false>
            <el-form :model="feedbackForm" :rules="rulesFeedback" ref="feedbackForm">
                <el-form-item prop="feedback">
                    <el-input type="textarea" v-model="feedbackForm.feedback"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="feedbackDialog = false">取 消</el-button>
                <el-button type="primary"  @click="feedback">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getName, getToken, getId, deleUser, getUserInfor } from 'store/store'
import { getMenuIcon } from '@/router/activeConfig'
import { checkLoginState, logout } from 'api/login'
import { getMenuByRoleArr } from 'api/admin'
export default {
    beforeRouteEnter (to, from, next) {
        if(getToken()) {
          checkLoginState().then((res) => {
            if(res.data.data === null && res.data.success) {
                next()
            } else { next('/login') }
          })
        } else {
           next('/login')
        }  
    },
    data() {
        return {
            activeIndex: '1',
            username: '',
            feedbackDialog: false,
            feedbackForm: {
                feedback: ''
            },
            menulist: [],
            rulesFeedback: {
                feedback: [
                    { required: true, message: '请输入您的意见或遇到的问题', trigger: 'blur' },
                ]
            }
        }
    },
    created() {
        this.getMenu()
        this.username = getName()
    },
    methods:{
        getMenu() {
            getMenuByRoleArr(getUserInfor().roleIds).then(res => {
                if(res.success) {
                    let menuobj
                    if (typeof res.data === 'string') {
                        menuobj = JSON.parse(res.data)
                    } else {
                        menuobj = res.data
                    }
                    menuobj.forEach(ele => {
                        ele.icon = getMenuIcon(ele.name)
                    })
                    this.menulist = menuobj
                    // console.log(this.menulist)
                    // console.log(this.$router)
                }
            })
        },
        _logout(){
            this.$confirm('您即将退出, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               // 退出并回到主页及刷新及删除存储的数据
                let id = getId()
                logout(id).then((res) => {
                    console.log(res)
                    if(res.data === null && res.success) {
                        deleUser()
                        this.$router.push('/')
                        window.location.reload(true)  
                    }else { 
                        this.$message.error('退出失败，请重试！')
                    }
                })
            }).catch(() => {
                return
            })
        },
        feedback(){
            this.$refs.feedbackForm.validate((valid) => {
                if (valid) {
                    this.feedbackDialog = false
                    // 此处需要有接口
                    this.$message({
                        type: 'success',
                        message: '提交成功，我们会尽快处理',
                        duration: 3 * 1000
                    });
                } else {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });       
                }
            })
        },

    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
$colorbybg: #ffffff;
.contain{
    width: $minwidth;
    margin: 0 auto;
}
.head{
    width: 100%;
    background: $maincolor;
}
.head-contain{
    width: $minwidth;
    margin: 0 auto;
}
.logo{
    height: 60px;
    margin-left: 15px;
}
.logo-text{
    line-height: 60px;
}
.menu-bar{
border-bottom: 0px;
}
.menu-icon{
   font-size: 24px;
   margin-right: 5px;
   line-height: 60px;
   color: $colorbybg;
   vertical-align: middle;
}
.el-submenu__icon-arrow{ 
    color: #ffffff;
}
.logout{
    float: left;
    height: 60px;
    line-height: 60px;
    margin: 0;
    color: $colorbybg;
    padding: 0 20px;
    cursor: pointer;
    &:hover {background-color: rgb(51, 126, 204); }
}
.childmenubutton{
    float: none;
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    color: $colorbybg;
    background-color: rgb(64, 158, 255);
    cursor: pointer;
    &:hover {background-color: rgb(51, 126, 204); }
}
</style>


