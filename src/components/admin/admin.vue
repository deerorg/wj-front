<template>
    <div class="admin">
           <el-container class="container">
               <el-aside width="200px" style="height: 100%; background-color: rgb(84, 92, 100);">
                    <el-menu    
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        default-active='2'
                    >
                        <el-menu-item index="1" @click="back">
                            <i class="fa fa-home menu_icon"></i>我的管理中心
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="fa fa-user-circle-o menu_icon"></i>用户管理
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-setting menu_icon"></i>角色管理
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-menu menu_icon"></i>菜单管理
                        </el-menu-item>
                    </el-menu>
               </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
           </el-container>
    </div>
</template>

<script>
import { getId, getToken, getRoleId } from 'store/store'
import { checkLoginState } from 'api/login'
export default {
    data() {
        return {

        }
    },
    // beforeRouteEnter (to, from, next) {
    //     if(getToken()) {
    //         checkLoginState().then((res) => {
    //             if(res.data.data === null && res.data.success) {
    //                 if(getIdfromUrl()) {
    //                     next() 
    //                 } else{
    //                     next(from.path)
    //                 }
    //             } else { next('/login') }
    //         })
    //     } else {
    //        next('/login')
    //     }  
    // },
    methods: {
        back(){
            this.$router.push('/usermanagement/mywj')
        },
    }

}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.admin {
    width: 100%;
    height: 100%;
}
.container{
    height: 100%;
}
.menu_icon{
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 20px; 
    color: #ffffff;
}
</style>

