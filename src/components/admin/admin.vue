<template>
    <div class="admin">
           <el-container class="container">
               <el-aside width="200px" style="height: 100%; background-color: rgb(84, 92, 100);">
                    <el-menu    
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        :default-active='this.$route.path'
                        router 
                    >
                        <el-menu-item index="/usermanagement/mywj" >
                            <i class="fa fa-home menu_icon"></i>我的管理中心
                        </el-menu-item>
                        <!-- <el-menu-item index="/admin/user" >
                            <i class="fa fa-user-circle-o menu_icon"></i>用户管理
                        </el-menu-item>
                        <el-menu-item index="/admin/role" >
                            <i class="el-icon-setting menu_icon"></i>角色管理
                        </el-menu-item>
                        <el-menu-item index="/admin/menu" >
                            <i class="el-icon-menu menu_icon"></i>菜单管理
                        </el-menu-item> -->
                        <el-menu-item :index="item.url" v-if="!item.children" v-for="(item, index) in menulist" :key="index">
                                <i :class="item.icon" style="font-size: 22px"></i>{{item.name}}
                        </el-menu-item>
                        <el-submenu :index="item.url" v-if="item.children" v-for="(item, index) in menulist" :key="index">
                            <template slot="title" ><i :class="item.icon"></i><span>{{item.name}}</span></template>
                            <el-menu-item v-for="(subitem, subindex) in item.children" :index="subitem.url" :key="index+'-'+subindex">
                                {{subitem.name}}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
               </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
           </el-container>
    </div>
</template>

<script>
import { getId, getToken, getRoleId, getUserInfor } from 'store/store'
import { checkLoginState } from 'api/login'
import { getMenuByRoleArr } from 'api/admin'
import { getMenuIcon } from '@/router/activeConfig'
export default {
    data() {
        return {
            menulist: [],
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
    created() {
        this.getMenu()
    },
    methods: {
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
                    menuobj = menuobj.filter(x => {
                        if(x.url === '/admin') return x
                    })
                    this.menulist = menuobj
                    // console.log(this.menulist)
                    // console.log(this.$router)
                }
            })
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

