<template>
    <div class="main-system">
        <div class="contain">
            <div class="head clrfix">
                <div class="logo fl">
                    <router-link to="/">
                        <h2 class="fm logo-text">问卷管家</h2>
                    </router-link>
                </div>
                <el-menu :default-active="activeIndex"  mode="horizontal" active-text-color='#409EFF' class="fr menu-bar">
                    <el-menu-item index="1"><i class="fa fa-home menu-icon"></i>我的问卷</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">用户中心</template>
                        <el-menu-item index="2-1">个人信息</el-menu-item>
                        <el-menu-item index="2-2">意见反馈</el-menu-item>
                        <el-menu-item index="2-3">退出</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">消息</el-menu-item>
                    <el-menu-item index="4">帮助</el-menu-item>
                </el-menu>
            </div>
            <div class="mian">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1'
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.contain{
    width: $minwidth;
    margin: 0 auto;
}
.logo{
    height: 75px;
    margin-left: 15px;
}
.logo-text{
    padding-top: 25px;
}
.menu-bar{
border-bottom: 0px;
}
.menu-icon{
    font-size: 28px;
    padding-right: 8px;
   line-height: 40px;
}
</style>


