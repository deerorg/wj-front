<template>
    <div class="sentwj">
        <el-alert title="该问卷还未发布，发布后才可发送" type="warning" v-show="wj.status==='0'||wj.status==='2'"></el-alert>
        <div class="send-box" >
            <div v-show="wj.status==='1'">
                <h3 class="title">链接发送</h3>
                <div class="url">
                    <el-input v-model="wjurl">
                        <el-button slot="append" @click="copy">复制</el-button>
                        <el-button slot="append" @click="open">打开</el-button>
                    </el-input>
                </div>
            </div>
            <div v-show="wj.status==='1'">
                <h3 class="title">二维码 <span class="qrtip">扫一扫</span></h3>
                <div class="qrcode">
                    <vue-qr :logoSrc="qrcodeconfig.imagePath" :text="qrcodeconfig.value" height="200" width="200"></vue-qr>
                </div>
            </div>
            <div v-show="wj.status==='0'||wj.status==='2' ">
                <h3 class="title">问卷发布</h3>
                <el-button class="publish_btn" type="primary" @click="publish">发布</el-button>
            </div>
        </div>
    </div>
</template>

<script>
const IMAGEPATH = '../../common/img/logo.png'
import VueQr from 'vue-qr'
import { getWjInfor, UpdateWj} from 'api/wj'
import { getId, getToken, getIdfromUrl } from 'store/store'
import { checkLoginState } from 'api/login'
import bus from 'store/bus'
export default {
    created() {
        this._getWjInfor()
    },
    data() {
        return {
            wj: {},
            wjurl: '',
            qrcodeconfig: {
                value: '',
                imagePath: require('../../common/img/logo.png'),
                filter: 'color'
            }
        }
    },
    components: {
        VueQr
    },
    methods: {
        copy(e) {
            let that = this
            this.$copyText(this.wjurl).then(function (e) {
                    that.$message({
                        message: '已复制到剪贴板',
                        type: 'success',
                        duration: 1 * 1000
                    })
                }, function (e) {
                alert('浏览器不支持，无法复制，请手动复制')
            })
        },
        open() {
            let routeData = this.$router.resolve({ path: `/wjforanswer/pc:${getIdfromUrl()}?crid=${this.wj.createUser}`})
            window.open(routeData.href, '_blank')
        },
        _getWjInfor() {
            getWjInfor(getIdfromUrl(), getId()).then((res) => {
                if(res.success) {
                    this.wj = res.data
                    this.wjurl = window.location.href.split('#')[0] + '#/wjforanswer/pc:' + getIdfromUrl() + encodeURI(`?crid=${this.wj.createUser}`)
                    this.qrcodeconfig.value = this.wjurl
                } else{
                    this.$message.error(res.msg)
                }
            })
        },
        publish(){
            let wjinfor = {
                description: this.wj.description,
                id: this.wj.id,
                paperName: this.wj.paperName,
                paperType: '1',
                remark: '',
                status: '1',
                updateUser: getId() 
            }
            if(this.wj.status == '0') {
                this.$confirm('确定开始运行该问卷？问卷开启运行后将不能修改', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    UpdateWj(wjinfor).then((res) => {
                        if(res.success){
                        this.wj.status = '1'
                        this.$message({
                                message: '问卷开启运行成功',
                                type: 'success',
                                duration: 1 * 1000
                        })
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                }).catch(() => {
                    return
                })
            } else if(this.wj.status == '2') {
                UpdateWj(wjinfor).then((res) => {
                    if(res.success){
                    this.wj.status = '1'
                        this.$message({
                                message: '问卷开启运行成功',
                                type: 'success',
                                duration: 1 * 1000
                        })
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        }
    }

}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.send-box{
    width: 80%;
    min-height: 440px;
    margin: $topmargin auto 0;
    padding: 20px;
    border: 2px solid #dedfe0;
    border-radius: 20px; 
}
.title{
    color: #666666;
    line-height: 2em;
    border-bottom: 1px  solid #dedfe0;    
}
.url{
    width: 60%;
    margin: 20px 0;
}
.qrcode{
    margin-top: 20px;
}
.qrtip{
    font-weight: lighter;
    font-size: 14px;
}
.publish_btn{
    margin-top: 20px;
}
</style>