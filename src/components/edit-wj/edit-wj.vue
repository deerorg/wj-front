<template>
    <div class="edit-wj">
        <el-header height="60px" style="width: 100%;background-color: rgb(84, 92, 100);" >
            <div class="operat_area">
                <el-button icon="el-icon-plus" @click="preAddque">单选题</el-button>
                <el-button type="success" round class="fr" icon="el-icon-check"> 完成编辑</el-button>
            </div>
        </el-header>
        <div class="edit-area">
            <div class="area-contain">
                <div class="wj_head">
                    <p class="title">{{wj.paperName}}</p>
                    <p class="description">说明：{{wj.description}}</p>
                    <el-button type="text" class="fr" @click="dialogWjHead=true" size="small">修改标题/说明</el-button>
                </div>
                <div class="wj_main">
                    <div class="question-list" v-for="(que,index) in wj.testList" :key="index">
                        <div class="question-item">
                            <div class="q_head" @mouseover="showoperat(index)" @mouseout="noshowoperat(index)">
                                <span class="requir" v-show="que.required">*</span>
                                <span class="q_description">{{index+1}}.{{que.testName}}</span>
                                <span class="q_operat_btn fr" ref="operatbtn">
                                    <el-button type="text" size="mini" @click="premodifyQue(que,index)">修改</el-button>
                                    <el-button type="text" size="mini" @click="_deletQue(que,index)">删除</el-button>
                                    <el-button type="text" size="mini" @click="preAddOption">添加选项</el-button>
                                </span>
                            </div>
                            <div class="option">
                                <el-radio-group >
                                    <el-radio :label="1">备选项</el-radio>
                                    <el-radio :label="2">备选项</el-radio>
                                    <el-radio :label="3">备选项</el-radio>
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
        <el-dialog :title="wjSingleQue.curOperaQue" :visible.sync="dialogWjSingleQue">
            <el-form :model="wjSingleQue" :rules="rulesWj" ref="WjSingleQueForm">
                <el-form-item label="题目" prop="testName">
                    <el-input type="textarea" v-model="wjSingleQue.testName"></el-input>
                </el-form-item>
                <el-form-item prop="required">
                    <el-checkbox v-model="wjSingleQue.required" label="必答"></el-checkbox>
                </el-form-item>
                <el-form-item prop="control" label="选项排列">
                        <el-radio-group v-model="wjSingleQue.optioncontrol">
                            <el-radio :label="'0'">横向</el-radio>
                            <el-radio :label="'1'">竖向</el-radio>
                        </el-radio-group>
                </el-form-item>
            </el-form>
             <div slot="footer" class="dialog-footer">
                <el-button @click="dialogWjSingleQue = false">取 消</el-button>
                <el-button type="primary"  @click="queComfig">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="wjOption.curOperaOp" :visible.sync="dialogWjOption">
            <el-form :model="wjOption" :rules="wjOptionrules" ref="wjOptionForm">
                <el-form-item label="选项类型">
                    <el-radio-group v-model="wjOption.optionType">
                            <el-radio :label="'1'">文字</el-radio>
                            <el-radio :label="'2'">图片</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="选项内容" prop="content">
                    <el-input type="text" v-model="wjOption.content"></el-input>
                </el-form-item>
                <el-form-item prop="img">
                    <el-upload
                        action="/"
                        :multiple="false"
                        accept=".jpg,.jpeg,.png,.gif"
                        :auto-upload="false"
                        :file-list="imgList"
                        list-type="picture"
                        :limit="1"
                        :on-change="handleImg">
                        <el-button slot="trigger" size="small" type="primary" :disabled="wjOption.optionType=='1'">选择图片</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogWjOption = false">取 消</el-button>
                <el-button type="primary"  @click="optionComfig">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getWjInfor, UpdateWj, addQuestion, updataQuestion, deleteQue } from 'api/wj'
import { fliter } from 'common/js/validat'
import { getBase64 } from 'common/js/imgbase'
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
        let validitContent = (rule, value, callback) => {
            if (this.wjOption.optionType === '1') {
                if (fliter(value) === '') {
                    callback(new Error('此内容不能为空！'))
                } else callback()
            } else callback()
        }
        let validitImg = (rule, value, callback) => {
            if (this.wjOption.optionType === '2') {
                if (!this.wjOption.img) {
                    callback(new Error('请上传图片!'))
                } else callback()
            } else callback()
        }
        return{
            wj: {},
            wjHead:{
                paperName: '',
                description: ''
            },
            dialogWjHead: false,
            rulesWj: {
                paperName: [
                    {validator: validitTitle, trigger: 'blur'}
                ],
                testName: [
                    {validator: validitTitle, trigger: 'blur'}
                ]
            },
            dialogWjSingleQue: false,
            wjSingleQue: {
                curOperaQue: '添加单选试题',
                queid: 0,
                queindex: 1,
                testName: '',
                required: true,
                optioncontrol:'0'
            },
            dialogWjOption: false,
            wjOption: {
                curOperaOp: '添加选项',
                optionType: '1',
                content: '',
                img: '',
            },
            wjOptionrules: {
                content: [
                    {validator: validitContent, trigger: 'blur'}
                ],
                img: [
                    {validator: validitImg, trigger: 'blur'}
                ]
            },
            imgList: []  
        }
    },
    created() {
        this._getWjInfor()
    },
    methods: {
        showoperat(index) { 
           document.getElementsByClassName("q_operat_btn")[index].style.display="inline"
        },
        noshowoperat(index){
            document.getElementsByClassName("q_operat_btn")[index].style.display="none"
        },
        _getWjInfor() {
            getWjInfor(getIdfromUrl(), getId()).then((res) => {
                if(res.success) {
                    this.wj = res.data
                    this.wjHead.paperName = this.wj.paperName
                    this.wjHead.description = this.wj.description
                    this.dialogWjHead = false
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
        queComfig() {
            this.wjSingleQue.curOperaQue === '添加单选试题'? this.addSingleQue() : this.modifyQue()
        },
        preAddque() {
            this.wjSingleQue.curOperaQue = '添加单选试题'
            this.wjSingleQue.queid = 0
            this.wjSingleQue.queindex = 0
            this.wjSingleQue.testName = ''
            this.wjSingleQue.required = true
            this.wjSingleQue.optioncontrol = '0'
            this.dialogWjSingleQue = true
        },
        addSingleQue () {
            this.$refs.WjSingleQueForm.validate((valid) => {
                let req = this.wjSingleQue.required ? '1' : '0'
                if (valid) {
                    let queinfor = {
                       createUser: getId(),
                       description: '',
                       jumpId: 0,   
                       optionControl: '', // 多选控制
                       paperId: this.wj.id, 
                       relationTest: '', // 关联试题
                       remark: '',
                       required: req,
                       testName: this.wjSingleQue.testName,
                       testType: '1', // 1为单选
                       viewControl: this.wjSingleQue.optioncontrol // 0为横向排列，1为竖向
                    }
                    addQuestion(queinfor).then((res) => {
                        if(res.success){
                           this.dialogWjSingleQue = false
                           this.wj.testList.push(res.data)
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                } else {
                     return false
                }
            })
        },
        premodifyQue(item,index) {
            let req = item.required === 0 ? false : true
            this.wjSingleQue.queid = item.id
            this.wjSingleQue.queindex = index
            this.wjSingleQue.testName = item.testName
            this.wjSingleQue.required = req
            this.wjSingleQue.optioncontrol = item.viewControl
            this.wjSingleQue.curOperaQue = '修改试题'
            this.dialogWjSingleQue = true
        },
        modifyQue() {
            this.$refs.WjSingleQueForm.validate((valid) => {
                let req = this.wjSingleQue.required ? '1' : '0'
                if (valid) {
                    let queinfor = {
                        description:'',
                        id: this.wjSingleQue.queid,
                        jumpId: 0,
                        optionControl: '',
                        relationTest: '',
                        remark: '',
                        required: req,
                        testName: this.wjSingleQue.testName,
                        testType: '1', 
                        updateUser: getId(),
                        viewControl: this.wjSingleQue.optioncontrol
                    }
                    updataQuestion(queinfor).then((res) => {
                        if(res.success){
                           this.dialogWjSingleQue = false
                           this.wj.testList[this.wjSingleQue.queindex] = queinfor
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
        preAddOption() {
            this.wjOption.curOperaOp = '添加选项'
            this.wjOption.optionType = '1'
            this.content = ''
            this.img = ''
            this.dialogWjOption = true
        },
        optionComfig() {
            this.wjOption.curOperaOp === '添加选项' ? this.AddOption() : this.modifyOption()
        },
        handleImg(file) {
            getBase64(file.url).then((imgdata) => {
               // console.log(imgdata)
                this.wjOption.img = imgdata
            })
        },
        AddOption (){
            this.$refs.wjOptionForm.validate((valid) => {
                if (valid) {
                   // 验证正确
                } else return false
            })
        },
        modifyOption (){

        }
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
    margin: 20px 0; 
}
.q_operat_btn{
    display: none;
}
</style>

