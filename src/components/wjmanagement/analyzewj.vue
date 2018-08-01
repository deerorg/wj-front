<template>
    <div class="wjmanagement">
        问卷管理：对于已发布（正在运行）的试卷进行管理
        管理项(子路由)： 返回管理中心，发送问卷(对于开启运行的问卷)（链接，二维码发送），分析（对于有回收到问卷的试卷才可跳转）:答卷列表，单个答卷情况（更多分析等待后台开发）
                编辑问卷（只能编辑没有正在运行的，而对于已有回收答卷的要提醒：xxxxxx）
    </div>
</template>

<script>
import { getWjInfor, getAnswerCount } from 'api/wj'
import { getId, getToken, getIdfromUrl } from 'store/store'
import { checkLoginState } from 'api/login'
export default {
    beforeRouteEnter (to, from, next) {
        if(getToken()) {
            checkLoginState().then((res) => {
                if(res.data.data === null && res.data.success) {
                    if(getIdfromUrl()) {
                           getAnswerCount(getIdfromUrl()).then((res) => {
                                if(res.success) {
                                    if(res.data.length ===0 ) {
                                         alert('此问卷还未收到答卷, 无法分析答卷')
                                        next(from.path)
                                    } else{
                                        next()
                                    }
                                }
                            }) 
                    } else{
                        next(from.path)
                    }
                } else { next('/login') }
            })
        } else {
           next('/login')
        }
    },
    data(){
        return {

        }
    },
    methods:{

    }

}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
</style>