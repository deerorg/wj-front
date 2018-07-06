<template>
    <div class="wjmanagement">
        <!-- 问卷管理：对于已发布（正在运行）的试卷进行管理
        管理项(子路由)： 返回管理中心，发送问卷(对于开启运行的问卷)（链接，二维码发送），分析（对于有回收到问卷的试卷才可跳转）:答卷列表，单个答卷情况（更多分析等待后台开发）
                编辑问卷（只能编辑没有发布的） -->
        <el-container class="container">
            <el-aside width="200px" style="height: 100%; background-color: rgb(84, 92, 100);">
                 <el-menu :default-openeds="['5']"    
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    default-active='3'>
                    <el-menu-item index="1" @click="back">
                        <i class="fa fa-home menu_icon"></i>我的管理中心
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-edit menu_icon"></i>编辑问卷
                    </el-menu-item>
                    <el-menu-item index="3" @click="send">
                        <i class="el-icon-message menu_icon"></i>发送问卷
                    </el-menu-item>
                     <el-menu-item index="4">
                        <i class="el-icon-view menu_icon"></i>预览问卷
                    </el-menu-item>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-setting"></i>答卷分析</template>
                        <el-menu-item-group>
                        <el-menu-item index="5-1">答卷</el-menu-item>
                        <el-menu-item index="5-2">数据分析</el-menu-item>
                        </el-menu-item-group>
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
export default {
    data() {
        return{
           
        }
    },
    created() {
      
    },
    methods: {
        back(){
            this.$router.push('/usermanagement/mywj')
        },
        send() {
            this.$router.push('/wjmanagement/sentwj')
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.wjmanagement{
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
