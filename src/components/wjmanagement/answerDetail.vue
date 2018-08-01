<template>
    <div class="answerdetail">
        <el-dialog title="问卷详情" :visible.sync="showdetailDialog">
              <div class="area-contain" v-loading="loading" element-loading-text="拼命加载中...">
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
                                <el-radio-group v-model="answer[index].opindex">
                                    <el-radio :label="index"  class="option" :class="[que.viewControl=='0' ? 'crosswise' : 'vertical']"  v-for="(op,index) in que.optionList" :key="index">
                                        <span  v-if="op.optionType=='1'">
                                            {{op.content}}
                                        </span>
                                        <span v-if="op.optionType=='2'">
                                            <img :src="op.img" class="opimg">
                                        </span>
                                    </el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getAnswerDtail } from 'api/wj'
import { getIdfromUrl } from 'store/store'
export default {
    data(){
        return {
            wj:{},
            answer: [],
            loading: true,
            showdetailDialog: false
        }
    },
    computed:{
        showdetail(){
            return this.$bus.showdetail
        },
        originWj(){
            return this.$bus.wj
        },
        answerId() {
            return this.$bus.answerId
        },
    },
    watch:{
        showdetail(newshow){
            if(newshow === true) {
                for(let i = 0; i < this.originWj.testList.length; i++) {
                    this.answer.push({
                        opindex: '',
                        required: this.originWj.testList[i].required,
                        testId: this.originWj.testList[i].id,
                        testIndex: i
                    })
                }
                this._getAnswerDtail()
            }
            this.showdetailDialog = newshow
        },
        showdetailDialog(newshowdetailDialog) {
            if(newshowdetailDialog === false) {
                this.$bus.showdetail = false
            }
        }
    },
    methods:{
        _getAnswerDtail () {
            getAnswerDtail(this.answerId).then((res) => {
                if (res.success) {
                    let am = res.data.answerDto
                    for(let i = 0; i < am.length; i++){
                       let obj = JSON.parse(am[i].answer)
                       // console.log(obj)
                       this.answer[i].opindex = Number(Object.keys(obj)[0])
                       // console.log(this.answer[i].opindex)
                    }
                    this.wj = this.originWj
                    this.loading = false
                } else if(!res.success) {
                    this.$message.error(res.msg)
                    this.loading = false
                }
            })
        },
        close() {
            this.$bus.showdetail = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.anwser-area{
    background-color: #ffffff;
    min-height: 600px;
    width: $minwidth;
    margin: 0 auto; 
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
