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
                        <el-menu-item index="1"><i class="fa fa-home menu-icon"></i><span>我的问卷</span></el-menu-item>
                        <el-submenu index="2">
                            <template slot="title" ><i class="fa fa-user-circle-o menu-icon"></i><span>{{username}}</span></template>
                            <el-menu-item index="2-1">个人信息</el-menu-item>
                            <el-menu-item index="2-2">意见反馈</el-menu-item>
                            <el-menu-item index="2-3">帮助</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="3"><i class="fa fa-bell menu-icon" style="font-size: 22px"></i><span>消息</span></el-menu-item>
                        <li  @click="_logout" class="logout"><i class="fa fa-power-off menu-icon"></i><span>退出</span></li>
                    </el-menu>
                </div>
            </div>
            <div class="contain">
                <div class="mian">
                    <router-view></router-view>
                </div>
            </div>
    </div>
</template>

<script>
import { getName, getToken, getId, deleUser} from 'store/store'
import { checkLoginState, logout } from 'api/login'
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
            username: ''
        }
    },
    created() {
        this.username = getName()
    },
    methods:{
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
                    }else { 
                        this.$message.error('退出失败，请重试！')
                    }
                })
            }).catch(() => {
                return
            })
        }
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
</style>


