<template>
    <div class="user">
        <div class="userlist">
            <div class="listhead clrfix">
                <span class="p-table-name">用户列表</span>
                <el-button type="primary" class="fr">添加</el-button>
            </div>
            <div class="table">
                <el-table 
                    element-loading-text="拼命加载中" 
                    empty-text="暂无数据"
                    :data="userList" stripe
                    border fit highlight-current-row
                >

                </el-table>

            </div>
        </div>
    </div>
</template>

<script>
import { getId, getToken, getRoleId, getUserInfor } from 'store/store'
import { checkLoginState } from 'api/login'
import { getAllUsers } from 'api/admin'
export default {
    mounted() {

    },
    data() {
        return {
            userList: [],

        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.listhead{
    padding: 6px 0;
}
</style>
