<template>
    <div class="edit-wj">
        <div class="heder"></div>
        <div class="edit-area">
             <div class="area-contain">
                编辑问卷： 新建问卷/已有问卷
             </div>
        </div>
    </div>
</template>

<script>
import { getWjList } from 'api/wj'
import { fliter } from 'common/js/validat'
import { getId, getToken } from 'store/store'
import { checkLoginState } from 'api/login'
import bus from 'store/bus'
export default {
    beforeRouteEnter (to, from, next) {
        if(getToken()) {
            checkLoginState().then((res) => {
                if(res.data.data === null && res.data.success) {
                    if(bus.wj.id) {  // 这里还要判断是否已发布才可以进来
                        next() 
                    } else{
                        next(from.path)
                    }
                } else { next('/login') }
            })
        } else {
           next('/login')
        }  
    },
    beforeRouteLeave(to, from, next) {
        // 是否离开编辑的页面，提示数据如果没有保存将丢失即清空bus.wj的内容
        next()
    },
    data() {
        return{
            wj: {}
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.edit-wj{
    width: 100%;
    height: 100%;
    background-color: #efefef; 
}
.heder{
    height: $topmargin;
    width: 100%;
}
.edit-area{
    background-color: #ffffff;
    min-height: 200px;
    width: $minwidth;
    margin: 0 auto; 
}
.area-contain{
    padding: $topmargin 50px;
}
</style>

