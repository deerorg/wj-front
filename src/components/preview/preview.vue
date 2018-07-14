<template>
    <div class="edit-wj">
        <div class="header">
            <el-alert class="tip" title="您正在预览该问卷，预览时不能答题" type="warning"></el-alert>
        </div>
        <div class="edit-area"  v-loading="loading" element-loading-text="拼命加载中...">
            <div class="area-contain">
                <div class="wj_head">
                    <p class="title">{{wj.paperName}}</p>
                    <p class="description">说明：{{wj.description}}</p>
                </div>
                <div class="wj_main">
                    <div class="question-list" v-for="(que,index) in wj.testList" :key="index">
                        <div class="question-item">
                            <div class="q_head">
                                <span class="requir" v-show="que.required=='1'">*</span>
                                <span class="q_description">{{index+1}}.{{que.testName}}</span>
                            </div>
                            <div class="option">
                                <el-radio-group>
                                    <el-radio :label="index"  class="option" :class="[que.viewControl=='0' ? 'crosswise' : 'vertical']"  v-for="(op,index) in que.optionList" :key="index">
                                        <span  v-if="op.optionType=='1'">
                                            {{op.content}}
                                        </span>
                                        <span v-if="op.optionType=='2'">
                                            <img :src="op.img" class="opimg"  @click="magnifyImg(op.img)">
                                        </span>
                                    </el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    </div>
</template>

<script>
import { getWjInfor } from 'api/wj'
import { fliter } from 'common/js/validat'
import { getId, getToken, getIdfromUrl } from 'store/store'
import { checkLoginState } from 'api/login'
import bus from 'store/bus'
export default {
    beforeRouteEnter (to, from, next) {
        if(getToken()) {
            checkLoginState().then((res) => {
                if(res.data.data === null && res.data.success) {
                    if(getIdfromUrl()) {
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
    data() {
        return{
            wj: {},
            loading: true
        }
    },
    created() {
        this._getWjInfor()
    },
    mounted(){
        this.clientHeight()
    }, 
    methods: {
        _getWjInfor() {
            getWjInfor(getIdfromUrl(), getId()).then((res) => {
                if(res.success) {
                    this.wj = res.data
                    this.loading = false
                }
            })
        },
        clientHeight(){
            let screenH = document.documentElement.clientHeight || document.body.clientHeight
            let headH = document.getElementsByClassName("header")[0].offsetHeight
            let h = screenH - headH - 2;
            console.log(h)
            document.getElementsByClassName("edit-area")[0].style.minHeight = h + 'px' 
        },
        magnifyImg(data){
                this.$alert(`<img src="${data}" style="width:auto;height:auto;max-width:910px;max-height:620px;">`, '', {
                dangerouslyUseHTMLString: true,
                showCancelButton: false,
                showConfirmButton: false,
                closeOnClickModal:true
            })
        },
    }
    
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.edit-wj{
    width: 100%;
    background-color: #efefef; 
}
.header{
    height: $topmargin;
    width: 100%;
}
.edit-area{
    background-color: #ffffff;
    min-height: 600px;
    width: $minwidth;
    margin: 0 auto; 
}
.area-contain{
    padding: $topmargin 50px;
}
.operat_area{
    padding-top: 12px;
    width: $minwidth;
    margin: 0 auto;
}
.wj_head{
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #dedfe0;
}
.title{
    width: 100%;
    text-align: center;
    font-size: 18px;
    word-wrap:break-word;
    word-break:break-all;
}
.description{
    padding-top: 10px;
    width: 100%;
    font-size: 13px;
    color: #333333;
    word-wrap:break-word;
    word-break:break-all;
}
.wj_main{
    margin-top: $topmargin;
    width: 100%;
}
.q_head{
    width: 100%;
    height: auto;
    text-align: left;
}
.requir{
    color:#f51e1e;
    font-size: 20px;
}
.q_description{
    width: 100%;
    overflow: hidden;
    word-wrap:break-word;
    word-break:break-all; 
    padding: 10px;
    font-size: 14px;
}
.option{
    padding: 10px 0; 
}
.q_operat_btn{
    display: none;
}
.crosswise{
    display: inline-block;
    padding: 0 20px;
}
.vertical{
    display: block;
    padding: 6px 20px;
}
.opimg{
    width: 160px;
    height: 120px;
}
.option_op{
    padding-left: 10px;
}
.el-radio + .el-radio {
    margin-left: 0px !important;
}
</style>

