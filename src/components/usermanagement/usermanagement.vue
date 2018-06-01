<template>
    <div class="main-system">
        <div class="menu">
            <el-menu :default-active="activeIndex"  mode="horizontal" active-text-color='#409EFF'>
                <el-menu-item index="1">我的问卷</el-menu-item>
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

</style>


