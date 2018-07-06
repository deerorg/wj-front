<template>
    <div class="sentwj">
        <!-- 问卷管理：对于已发布（正在运行）的试卷进行管理
        管理项(子路由)： 返回管理中心，发送问卷(对于开启运行,因此要提示是否开启运行问卷)（链接，二维码发送），分析（对于有回收到问卷的试卷才可跳转）:答卷列表，单个答卷情况（更多分析等待后台开发）
                编辑问卷（只能编辑没有正在运行的，而对于已有回收答卷的要提醒：xxxxxx） -->
        <div class="send-box">
            <h3 class="title">链接发送</h3>
            <div class="url">
                 <el-input v-model="wjurl">
                      <el-button slot="append" @click="copy">复制</el-button>
                      <el-button slot="append" @click="open">打开</el-button>
                 </el-input>
            </div>
             <h3 class="title">二维码 <span class="qrtip">扫一扫</span></h3>
             <div class="qrcode">
                <vue-qr :logoSrc="qrcodeconfig.imagePath" :text="qrcodeconfig.value" height="200" width="200"></vue-qr>
            </div>
        </div>
    </div>
</template>

<script>
import VueQr from 'vue-qr'
const IMAGEPATH = '../../common/img/logo.png'
export default {
    data() {
        return {
            wjurl: 'http://localhost:8000/#/wjmanagement/sentwj',
            qrcodeconfig: {
                value: 'http://localhost:8000/#/wjmanagement/sentwj',
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
</style>