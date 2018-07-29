<template>
    <div class="wj-pc">
        <div class="header" v-if="!submited"></div>
        <div class="anwser-area"  v-loading="loading" :element-loading-text="loadingtext" v-if="!submited">
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
                                <el-radio-group v-model="answer[index].opindex">
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
                <div class="submit-area">
                    <el-button type="primary" class="sub_btn" @click="_submitWj" :loading="submiting">提交答卷</el-button>
                </div>
             </div>
        </div>
        <div class="submit-success" v-if="submited">
            <h2><i class="el-icon-success" style="padding-right: 20px"></i>成功提交答卷！</h2>
            <p> <router-link to="/">去创建自己的问卷 <i class="el-icon-d-arrow-right"></i></router-link> </p>
        </div>
    </div>
</template>

<script>
import { getUserAgent, getIPs } from 'common/js/userAgent'
import { getId, getToken, getIdfromUrl, getCreatUserId } from 'store/store'
import { checkLoginState } from 'api/login'
import { getWjInfor, submitWj } from 'api/wj'
export default {
    data(){
        return {
            loadingtext: '拼命加载中......',
            channel: '3', // 1 手机微信 2 手机qq 3 pc 9其他
            answerIp: '',
            loading: true,
            wj:{},
            answer:[],
            submiting: false,
            submited: false,
            status: '0'
        }
    },
    created() {
      this.beforeanswer()
      this.getIPs()
    },
    mounted() {
        this._getWjInfor()
        this.clientHeight()
    },
    methods:{
        beforeanswer() {
            if(getUserAgent() !== '3') {
                    this.$router.push(`/wjforanswer/ph:${getIdfromUrl()}?crid=${getCreatUserId()}`)
                }
            if(getToken()) {
                checkLoginState().then((res) => {
                    if(res.data.data === null && res.data.success) {
                        if(getIdfromUrl() && getCreatUserId()) {
                            return  
                        } else {
                            this.$message.error('链接参数有误')
                            return
                        }
                    } else { 
                        this.$message.error('请先登录再答卷')
                        this.$router.push({
                            path: '/login',
                            query: {redirect: `/wjforanswer/pc:${getIdfromUrl()}`}
                        })
                    }
                })
            } else {
                this.$message.error('请先登录再答卷')
                this.$router.push({
                    path: '/login',
                    query: {redirect: `/wjforanswer/pc:${getIdfromUrl()}`}
                })
            }  
        },
        _getWjInfor() {
            getWjInfor(getIdfromUrl(), getCreatUserId()).then((res) => {
                if(res.success && res.data.status === '1') {
                    this.wj = res.data
                    for(let i = 0; i < this.wj.testList.length; i++) {
                        this.answer.push({
                            opindex: '',
                            required: this.wj.testList[i].required,
                            testId: this.wj.testList[i].id,
                            testIndex: i
                        })
                    }
                    console.log(this.answer)
                    this.loading = false
                } else if(res.success && res.data.status === '0'){
                    this.$message.error('该问卷还未发布')
                    return
                } else if(res.success && res.data.status === '2'){
                    this.$message.error('该问卷已暂停发布')
                    return
                }
            })
        },
        _submitWj() {
            this.submiting = true
            if(!this.validataSingleQ()) {
                this.$message.error('带星号的为必选题，您还有必选题未选。')
            } else{
                let answerinfor = {
                    answerIp: this.answerIp,
                    channel: this.channel,
                    paperId: getIdfromUrl(),
                    remark: '',
                    status: this.status,
                    userId: getId(),
                    tAnswerVos: []
                }
                for(let i = 0; i < this.answer.length; i++) {
                    let am = {}
                    let key = this.answer[i].opindex
                   // console.log(this.wj.testList[this.answer[i].testIndex])
                    let val = this.wj.testList[this.answer[i].testIndex].optionList[key].optionType === '1' ? this.wj.testList[this.answer[i].testIndex].optionList[key].content : this.wj.testList[this.answer[i].testIndex].optionList[key].img
                    console.log(key)
                    console.log(val)
                    am[key] = val
                    answerinfor.tAnswerVos.push({
                        answerMap: am,
                        paperId: getIdfromUrl(),
                        required: this.answer[i].required,
                        testId: this.answer[i].testId,
                        userId: getId()
                    })
                }
               // console.log(answerinfor)
                this.loadingtext = '正在提交......'
                this.loading = true
                submitWj(answerinfor).then((res) => {
                    if(res.success) {
                        this.$message({
                            message: '问卷提交成功',
                            type: 'success',
                            duration: 2 * 1000
                        })
                        this.submiting = false
                        this.loading  = false
                        this.submited = true
                    }
                })
            }
        },
        validataSingleQ(){ // 检验单选题必答是否已选
            for(let i = 0; i < this.answer.length; i++){
                if(this.answer[i].required === '1' && this.answer[i].opindex === ''){
                    this.submiting = false
                    return false
                } else if(this.answer[i].required === '0' && this.answer[i].opindex === ''){
                    this.status = '0'
                }
            }
            return true
        },
        clientHeight(){
            let screenH = document.documentElement.clientHeight || document.body.clientHeight
            let headH = document.getElementsByClassName("header")[0].offsetHeight
            let h = screenH - headH - 2;
            console.log(h)
            document.getElementsByClassName("anwser-area")[0].style.minHeight = h + 'px' 
        },
        magnifyImg(data){
                this.$alert(`<img src="${data}" style="width:auto;height:auto;max-width:910px;max-height:620px;">`, '', {
                dangerouslyUseHTMLString: true,
                showCancelButton: false,
                showConfirmButton: false,
                closeOnClickModal:true
            })
        },
         getIPs () {
            // compatibility for firefox and chrome
            var that = this
            var MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
            var pc = new MyPeerConnection({
                iceServers: []
            })
            var noop = function () {}
            var localIPs = {}
            var ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g

            function iterateIP (ip) {
                if (!localIPs[ip]) {
                    that.answerIp = ip
                    console.log(that.answerIp)
                }
                localIPs[ip] = true
            }

            // create a bogus data channel
            pc.createDataChannel('')

            // create offer and set local description
            pc.createOffer().then(function (sdp) {
                sdp.sdp.split('\n').forEach(function (line) {
                if (line.indexOf('candidate') < 0) return
                line.match(ipRegex).forEach(iterateIP)
                })
                pc.setLocalDescription(sdp, noop, noop)
            }).catch(function (reason) {
                // An error occurred, so handle the failure to connect
            })

            // sten for candidate events
            pc.onicecandidate = function (ice) {
                if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return
                ice.candidate.candidate.match(ipRegex).forEach(iterateIP)
            }
        }

    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.wj-pc{
    width: 100%;
    background-color: #efefef; 
}
.header{
    height: $topmargin;
    width: 100%;
}
.anwser-area{
    background-color: #ffffff;
    min-height: 600px;
    width: $minwidth;
    margin: 0 auto; 
}
.submit-success{
    padding: 20px;
    background-color: #ffffff;
    @include center(500px, 200px);
    border: 2px solid #dedfe0;
    border-radius: 20px;
    & > h2{
        padding: 10px;
        color: $maincolor;
        line-height: 2em;
    }
    & > p {
        font-size: 16px;
        padding: 10px;
    }
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
.submit-area{
    width: 100%;
    margin:  80px 0 20px;
}
.sub_btn{
    display: block;
    width: 30%;
    margin: 0 auto;
}

</style>