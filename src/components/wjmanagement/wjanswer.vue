<template>
    <div class="wjanswer">
        <h3>答卷列表——{{wj.paperName}}</h3><span style="color: #666">答卷数： {{total}}</span>
        <div class="answerlist">
            <div class="answer-item" v-for="(item, index) in answerList" :key="index">
                <div class="wjinfor fl">
                    <span>答题用户ID: {{item.userId ? item.userId : '匿名用户'}}</span>
                    <span>答题来源: {{item.answerIp}}</span>
                    <span>答卷渠道: {{item.channel === '1'? '手机微信':(item.channel === '2'?'手机qq': (item.channel === '3'?'pc网页':'其他' ))}}</span>
                    <span>完成情况: {{item.status === '1'?'全部完成':'未答完'}}</span>
                    <span>下载次数: {{item.downloadNum}}</span>
                </div>
                <div class="operate fr">
                    <el-button type="text" icon="el-icon-tickets" @click="getDetail(item.id)">答卷详情</el-button>
                </div>
            </div>
        </div>
        <el-pagination
            v-show="totalpages>1"
            @current-change="handleCurrentChange"
            :current-page.sync="currentpage"
            layout="total, prev, pager, next"
            :page-size=10
            :total="total">
        </el-pagination>
        <answer-detail></answer-detail>
    </div>
</template>

<script>
import { getWjInfor, getAnswerCount, getAnswerWjList } from 'api/wj'
import { getId, getToken, getIdfromUrl } from 'store/store'
import { checkLoginState } from 'api/login'
import AnswerDetail from './answerDetail'
const PAGESIZE = 10
export default {
    components: {
        AnswerDetail
    },
    beforeRouteEnter (to, from, next) {
        if(getToken()) {
            checkLoginState().then((res) => {
                if(res.data.data === null && res.data.success) {
                    if(getIdfromUrl()) {
                           getAnswerCount(getIdfromUrl()).then((res) => {
                                if(res.success) {
                                    if(res.data.length === 0 ) {
                                        alert('此问卷还未收到答卷, 无法查看答卷')
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
    data() {
        return{
            wj:{},
            answerList: [],
            currentpage: 1,
            total: 0,
            totalpages: 1,
            pagesize: PAGESIZE
        }
    },
    created(){
        this._getWjInfor()
        this._getAnswerWjList()
    },
    methods: {
        handleCurrentChange (num) {
            this.currentpage = num
            this._getAnswerWjList()
        },
        _getAnswerWjList () {
            getAnswerWjList(getIdfromUrl(), this.currentpage, this.pagesize).then((res) => {
                if(res.success) {
                    this.total = res.data.total
                    this.totalpages = res.data.pages
                    this.answerList = res.data.list
                    // console.log(this.answerList)
                }
            })
        },
        _getWjInfor() {
            getWjInfor(getIdfromUrl(), getId()).then((res) => {
                if(res.success) {
                    this.wj = res.data
                } else{
                    this.$message.error(res.msg)
                }
            })
        },
        getDetail(id){
            this.$bus.answerId = id
            this.$bus.wj = this.wj
            this.$bus.showdetail = true   
        }
    }

}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.wjanswer{
    padding: 20px;
    & > h3{
        display: inline-block;
        margin-right: 10px;
        color: #666666;
    }
}
.answerlist{
   // margin-top: $topmargin;
    width: 90%;
    margin:  $topmargin auto 0;
}
.answer-item{
    height: 50px;
    border: #dddddd 1px solid;
    margin-bottom: 20px;
    border-radius: 10px;
    padding: 0 10px;
    &:hover { 
        border-color: $maincolor;
        box-shadow: 0 0 4px rgba(48, 166, 245, 1);
    }
}
.wjinfor{
    line-height: 60px;
    color: $lightcolor;
    font-size: 14px;
   
}
.wjinfor > span {
    padding: 0 5px;
    display: inline-block;
}
.operate{
    line-height: 60px;
}
.operate_btn{
    padding-right: 6px;
    font-size: 14px;
}
</style>