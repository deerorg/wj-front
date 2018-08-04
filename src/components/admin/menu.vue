<template>
    <div class="menu">
        <menu-tree></menu-tree>
    </div>
</template>

<script>
import MenuTree from './menu-tree'
import { getId, getToken, getRoleId, getUserInfor } from 'store/store'
import { checkLoginState } from 'api/login'
export default {
    components: {
        MenuTree
    },
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
}
</script>
