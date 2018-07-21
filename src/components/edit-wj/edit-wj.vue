<template>
    <div class="edit-wj">
        <el-header height="60px" style="width: 100%;background-color: rgb(84, 92, 100);" >
            <div class="operat_area">
                <el-button icon="el-icon-plus" @click="preOperatSingle(1)">单选题</el-button>
                <el-button type="success" round class="fr" icon="el-icon-check" @click="finishEdit"> 完成编辑</el-button>
                <el-button type="info" icon="el-icon-view" class="fr" @click="preView">预览</el-button>
            </div>
        </el-header>
        <div class="edit-area" v-loading="loading" element-loading-text="拼命加载中...">
            <div class="area-contain">
                <div class="wj_head">
                    <p class="title">{{wj.paperName}}</p>
                    <p class="description">说明：{{wj.description}}</p>
                    <el-button type="text" class="fr" @click="dialogWjHead=true" size="small">修改标题/说明</el-button>
                </div>
                <div class="wj_main">
                    <div class="question-list">
                        <div class="question-item" v-for="(que,index) in wj.testList" :key="index">
                            <div class="q_head" @mouseover="showoperat(index)" @mouseout="noshowoperat(index)">
                                <span class="requir" v-show="que.required=='1'">*</span>
                                <span class="q_description">{{index+1}}.{{que.testName}}</span>
                                <span class="q_operat_btn fr" ref="operatbtn">
                                    <el-button type="text" size="mini" @click="preOperatSingle(2, index)">修改</el-button>
                                    <el-button type="text" size="mini" @click="_deletQue(que,index)">删除</el-button>
                                </span>
                            </div>
                            <div class="option">
                                <el-radio-group>
                                    <el-radio :label="index"  class="option" :class="[que.viewControl=='0' ? 'crosswise' : 'vertical']"  v-for="(op,index) in que.optionList" :key="index">
                                        <span v-if="op.optionType=='1'">
                                            {{op.content}}
                                        </span>
                                        <span v-if="op.optionType=='2'">
                                            <img :src="op.img" class="opimg" @click="magnifyImg(op.img)">
                                        </span>
                                    </el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
        <el-dialog title="创建问卷" :visible.sync="dialogWjHead">
            <el-form :model="wjHead" :rules="rulesWj" ref="wjHeadForm">
                <el-form-item label="标题" prop="paperName">
                    <el-input type="text" v-model="wjHead.paperName"></el-input>
                </el-form-item>
                <el-form-item label="问卷说明" prop="description">
                    <el-input type="textarea" :rows="4" v-model="wjHead.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogWjHead = false">取 消</el-button>
                <el-button type="primary"  @click="modify">确 定</el-button>
            </div>
        </el-dialog>
        <single-q></single-q>
    </div>
    
</template>

<script>
import { getWjInfor, UpdateWj, addQuestion, updataQuestion, deleteQue, addOption, updataOption, deletOp } from 'api/wj'
import { fliter, fliterTag } from 'common/js/validat'
import { getId, getToken, getIdfromUrl } from 'store/store'
import { checkLoginState } from 'api/login'
import SingleQ from './singleQ'
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
    beforeRouteLeave(to, from, next) {
        // 是否离开编辑的页面，提示数据如果没有保存将丢失即清空bus.wj的内容
        next()
    },
    data() {
        let validitTitle = (rule, value, callback) => {
            if (fliter(value) === '') {
                callback(new Error('此内容不能为空！'));
            }else {
                callback();
            }
        }
        return{
            loading: true,
            wj: {},
            wjHead:{
                paperName: '',
                description: ''
            },
            dialogWjHead: false,
            rulesWj: {
                paperName: [
                    {validator: validitTitle, trigger: 'blur'}
                ]
            }
        }
    },
    created() {
        this._getWjInfor()
    },
    mounted(){
        this.clientHeight()
    },
    components: {
        SingleQ
    },
    methods: {
        showoperat(index) { 
           document.getElementsByClassName("q_operat_btn")[index].style.display="inline"
        },
        noshowoperat(index) {
            document.getElementsByClassName("q_operat_btn")[index].style.display="none"
        },
        clientHeight(){
           let screenH = document.documentElement.clientHeight || document.body.clientHeight
           let headH = document.getElementsByClassName("el-header")[0].offsetHeight
           let h = screenH - headH - 2
           document.getElementsByClassName("edit-area")[0].style.minHeight = h + 'px' 
        },
        handleImg(file, fileList) {
            let that = this
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                that.imgList = []
                that.$message.error('上传头像图片大小不能超过 2MB!');
            } else {
                    fetch(file.url).then(data => {
                    let blob = data.blob()
                    return blob
                }).then(blob => {
                    let reader = new window.FileReader()
                    reader.onloadend = function () {
                        that.wjOption.img = reader.result
                    }
                    reader.readAsDataURL(blob)
                }) 
            }
        },
        magnifyImg(data){
            this.$alert(`<img src="${data}" style="width:auto;height:auto;max-width:910px;max-height:620px;">`, '', {
                dangerouslyUseHTMLString: true,
                showCancelButton: false,
                showConfirmButton: false,
                closeOnClickModal:true
                
            })
        },
        _getWjInfor() {
            getWjInfor(getIdfromUrl(), getId()).then((res) => {
                if(res.success) {
                    this.wj = res.data
                    this.wjHead.paperName = this.wj.paperName
                    this.wjHead.description = this.wj.description
                    this.loading = false
                } else{
                    this.$message.error(res.msg)
                }
            })
        },
        modify() {
            this.$refs.wjHeadForm.validate((valid) => {
                if (valid) {
                      let wjinfor = {
                        description: this.wjHead.description,
                        id: this.wj.id,
                        paperName: this.wjHead.paperName,
                        paperType: this.wj.paperType,
                        remark: '',
                        status: '0',
                        updateUser: getId() 
                    }
                    UpdateWj(wjinfor).then((res) => {
                        if(res.success){
                            this.wj.paperName = this.wjHead.paperName
                            this.wj.description = this.wjHead.description 
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                } else {
                     return false
                }
            })
        },
        _deletQue(item, index){
            this.$confirm('是否删除该试题?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteQue(item.id, getId()).then((res) =>{
                   if(res.success) {
                       this.wj.testList.splice(index, 1)
                    } else {
                        this.$message.error(res.msg)
                   }
                })
            }).catch(() => {
                return
            })
        },
        preOperatSingle(status, index){
            if(status === 2 ) {
                this.$bus.singleque = this.wj.testList[index]
            }
            this.$bus.singleq = status
        },
        preView() {
            let routeData = this.$router.resolve({ path: `/wjpreview:${getIdfromUrl()}`})
            window.open(routeData.href, '_blank')
        },
        finishEdit() {
            this.$router.push(`/wjmanagement/sentwj:${getIdfromUrl()}`)
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
body{
    background-color: #efefef !important;
}
.edit-wj{
    width: 100%;
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
    padding: 6px 20px;
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
.op_btn{
    display: inline;
}
.el-radio + .el-radio {
    margin-left: 0px !important;
}

</style>

