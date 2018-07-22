<template>
    <div class="singleQ">
        <el-dialog :visible.sync="dialogWjSingleQue">
            <el-form :model="singleque"  :rules="Singleqrules" ref="singlequeForm" size="mini"> 
                <el-form-item label="题目" prop="testName" class="quedescription queitem">
                    <el-input type="textarea" v-model="singleque.testName"></el-input>
                </el-form-item>
                <el-form-item prop="required" class="queitem">
                    <el-checkbox v-model="singleque.required" label="必答"></el-checkbox>
                </el-form-item>
                 <el-form-item prop="control" label="选项排列" class="queitem">
                        <el-radio-group v-model="singleque.viewControl">
                            <el-radio :label="'0'" class="radio">横向</el-radio>
                            <el-radio :label="'1'" class="radio">竖向</el-radio>
                        </el-radio-group>
                </el-form-item>
                <p style="font-size:14px; padding-bottom: 10px">选项</p>
                <div class="options" v-for="(item, index) in singleque.optionList" :key="index">
                    <el-form-item label="选项类型" class="queitem">
                        <el-radio-group v-model="item.optionType">
                                <el-radio :label="'1'" class="radio">文字</el-radio>
                                <el-radio :label="'2'" class="radio">图片</el-radio>
                        </el-radio-group>
                    </el-form-item>
                     <el-form-item label="选项内容" prop="content" class="queitem">
                        <el-input type="text" v-model="item.content"></el-input>
                    </el-form-item>
                    <el-form-item class="queitem">
                        <input type="file" class="upload_btn" @change="handleImg($event, index)"  accept="image/jpeg,image.jpg,image/png," />
                        <div class="upload__tip">支持jpg/jpeg/png格式的图片且大小不超过 2MB</div>
                        <div class="uploadimg-box" v-show="item.imgbase64">
                            <img :src="item.imgbase64">
                            <i class="el-icon-close" @click="removeImg(index)"></i>
                        </div>
                    </el-form-item>
                    <el-button type="text" size="mini" class="fr" @click="deletOption(index)">删除</el-button>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="text" size="mini" class="fl" @click="addOption()">添加选项</el-button>
                <el-button @click="dialogWjSingleQue = false">取 消</el-button>
                <el-button type="primary"  @click="comfigSingleQ">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { addQuestion, updataQuestion, updateQuewithOptions, deleteQue, updataOption, deletOp, addQuewithOptions, imgUpload } from 'api/wj'
import { fliter } from 'common/js/validat'
import { getId, getIdfromUrl } from 'store/store'
export default {
    data(){
        let validitTitle = (rule, value, callback) => {
            if (fliter(value) === '') {
                callback(new Error('此内容不能为空！'));
            }else {
                callback();
            }
        }
        return {
            dialogWjSingleQue: false, 
            currentStatus: 0,
            Singleqrules: {
                testName: [
                    {validator: validitTitle, trigger: 'blur'}
                ]
            },
            singleque: {
                testName: '',
                required: true,
                viewControl: '0',
                optionList: [
                    {   
                        createUser: getId(),
                        relationOption: '0',
                        remark: '',
                        viewControl:'0',
                        optionType: '1',
                        content: '',
                        img: '',
                        imgbase64: ''
                    },
                    {
                       createUser: getId(),
                        relationOption: '0',
                        remark: '',
                        viewControl:'',
                        optionType: '1',
                        content: '',
                        img: '',
                        imgbase64: ''
                    }
                ]      
            },
            imgList: []
        }
    },
    computed: {
        status() {
            return this.$bus.singleq
        },
        modifyque() {
            return this.$bus.singleque
        }
    },
    watch:{
        status(newstatus) {
            console.log(newstatus)
            if(newstatus === 1) {
                this.preAddsingle()
                this.currentStatus = 1
            }
            else if(newstatus === 2) {
                this.preModifySingle()
                this.currentStatus = 2
            }
        }
    },
    methods:{
        preAddsingle(){
            this.singleque = {
                testName: '',
                required: true,
                viewControl: '0',
                optionList : []
            }
            for( let i = 0; i < 2; i++) {
                this.singleque.optionList.push({
                    createUser: getId(),
                    relationOption: '0',
                    remark: '',
                    viewControl:'',
                    optionType: '1',
                    content: '',
                    img: '',
                    imgbase64: ''
                })
            }
            this.dialogWjSingleQue = true
            this.$bus.singleq = 0
        },
        preModifySingle () {
           // 拷贝而非关联
         //   let tempObj = Object.assign({}, this.modifyque) 
           let tempObj = JSON.parse(JSON.stringify(this.modifyque)) // 但是这样原来的数据双向绑定也失效了
          // console.log('原对象')
          // console.log(tempObj)
            this.singleque.testName = tempObj.testName
            this.singleque.id = tempObj.id
            this.singleque.required = tempObj.required
            this.singleque.viewControl = tempObj.viewControl
            // this.singleque.optionList = this.modifyque.optionList
            for(let i =0; i < tempObj.optionList.length; i++){
                if(tempObj.optionList[i].img) {
                    tempObj.optionList[i].imgbase64 = tempObj.optionList[i].img
                    tempObj.optionList[i].img = ''
                } else  tempObj.optionList[i].imgbase64 = ''
            }
            this.singleque.optionList = tempObj.optionList
            // console.log(this.singleque)
            this.dialogWjSingleQue = true
            this.$bus.singleq = 0
        },
        handleImg(e, index){
            console.log(index)
            console.log(e.target.files)
            let that = this
            let img = e.target.files[0]
            console.log(img.size)
            let isLt2M = img.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                return false
            } else {
                let reader = new FileReader()
                reader.onload = function (file) {  
                   // console.info(reader.result)
                    imgUpload(getId(), reader.result).then((res) => {
                        if(res.success) {
                            that.singleque.optionList[index].img = res.data
                            that.singleque.optionList[index].imgbase64 = reader.result
                            // 清空 
                            let fileinput = document.getElementsByClassName("upload_btn")[index]
                            if (fileinput.outerHTML) {
                                fileinput.outerHTML = fileinput.outerHTML
                            } else { 
                                fileinput.value = ""
                            }
                            console.log(that.singleque.optionList[index])
                        }
                    })
                }
                reader.readAsDataURL(img)
            }
        },
        removeImg(index) {
            console.log(index)
            this.singleque.optionList[index].img = ''
            this.singleque.optionList[index].imgbase64 = ''
        },
        deletOption(index){
            this.singleque.optionList.splice(index, 1)
        },
        addOption(){
            this.singleque.optionList.push({
                createUser: getId(),
                relationOption: '0',
                remark: '',
                viewControl:'',
                optionType: '1',
                content: '',
                img: '',
                imgbase64: ''
            })
        },
        comfigSingleQ(){
            if(this.currentStatus === 1) {
                // 添加试题
                this._addQuewithOptions()
            } else this._updateQuewithOptions() // 修改试题
        },
        _addQuewithOptions (){
            this.$refs.singlequeForm.validate((valid) => {
                console.log(this.singleque)
                if (valid) {
                    let req = this.singleque.required ? '1': '0'
                    const queinfor = {
                        test: {
                            createUser: getId(),
                            description: '',
                            jumpId: 0,
                            optionControl: '',
                            paperId: getIdfromUrl(),
                            relationTest: '',
                            remark: '',
                            required: req,
                            testName: this.singleque.testName,
                            testType: '1',
                            viewControl: this.singleque.viewControl
                        },
                        options:[]
                    }
                    for(let i=0; i < this.singleque.optionList.length; i++) {
                        if(this.singleque.optionList[i].optionType === '1' &&  this.singleque.optionList[i].content != ''){
                            this.singleque.optionList[i].img = '' 
                            delete this.singleque.optionList[i].imgbase64
                            queinfor.options.push(this.singleque.optionList[i])
                          
                        } else if(this.singleque.optionList[i].optionType === '2' &&  this.singleque.optionList[i].img != ''){
                            this.singleque.optionList[i].content = '' // 文字或图片
                            let tempimg = this.singleque.optionList[i].imgbase64
                            delete this.singleque.optionList[i].imgbase64
                            queinfor.options.push(this.singleque.optionList[i])
                            this.singleque.optionList[i].imgbase64 = tempimg
                        }
                    }
                    console.log(this.singleque)
                    addQuewithOptions(queinfor).then((res) => {
                        if(res.success) {
                            for(let i=0; i < this.singleque.optionList.length; i++) {
                                if((this.singleque.optionList[i].optionType === '1'&&this.singleque.optionList[i].content === '')||(this.singleque.optionList[i].optionType === '2' &&  this.singleque.optionList[i].img === '')){
                                  this.singleque.optionList.splice(i,1)   
                                } else if(this.singleque.optionList[i].optionType === '2' && this.singleque.optionList[i].img !== ''){
                                    this.singleque.optionList[i].img = this.singleque.optionList[i].imgbase64
                                    delete this.singleque.optionList[i].imgbase64
                                }
                            }
                            // console.log('之后')
                            // console.log(this.singleque)
                            let tempqueinfor  = JSON.parse(JSON.stringify(this.singleque)) 
                            tempqueinfor.testType = '1'
                            this.$emit('pushSingle', tempqueinfor)
                            this.dialogWjSingleQue = false
                            this.$message({
                                message: '已保存草稿',
                                type: 'success',
                                duration: 1 * 1000
                            })
                            // 和父组件的wj对比一下然后传值给wj去push这道题
                        }
                    })
                } else{
                    return false
                }
            })
        },
        _updateQuewithOptions() {
            // 循环把有imgbase64但没有img的拿到它的img,然后再更新，更新的和添加的类似，然后到父组件的问卷那里去修改，但是要知道是哪道题
            this.$refs.singlequeForm.validate((valid) => {
                if (valid) {
                     let req = this.singleque.required ? '1': '0'
                        const queinfor = {
                        test: {
                                id: this.singleque.id,
                                updateUser: getId(),
                                description: '',
                                jumpId: 0,
                                optionControl: '',
                                relationTest: '',
                                remark: '',
                                required: req,
                                testName: this.singleque.testName,
                                testType: '1',
                                viewControl: this.singleque.viewControl
                            },
                        options:[]
                    }
                    for(let i=0; i < this.singleque.optionList.length; i++) {
                            if(this.singleque.optionList[i].optionType === '1' &&  this.singleque.optionList[i].content != ''){
                                this.singleque.optionList[i].img = '' 
                                delete this.singleque.optionList[i].imgbase64
                                this.singleque.optionList[i].updateUser = getId()
                                queinfor.options.push(this.singleque.optionList[i])
                                
                            } else if(this.singleque.optionList[i].optionType === '2' &&  this.singleque.optionList[i].imgbase64 != ''){
                                if(this.singleque.optionList[i].img === '') {
                                    imgUpload(getId(), this.singleque.optionList[i].imgbase64 ).then((res) => {
                                        if(res.success) {
                                            this.singleque.optionList[i].img = res.data
                                        }
                                    }) 
                                }
                                this.singleque.optionList[i].content = '' // 文字或图片
                                let tempimg = this.singleque.optionList[i].imgbase64
                                delete this.singleque.optionList[i].imgbase64
                                this.singleque.optionList[i].updateUser = getId()
                                queinfor.options.push(this.singleque.optionList[i])
                                this.singleque.optionList[i].imgbase64 = tempimg
                            }
                    }
                    console.log(queinfor)
                    updateQuewithOptions(queinfor).then((res) => {
                        if(!res.success){ // 这里有点问题，成功后怎么返回的是不成功？
                            for(let i=0; i < this.singleque.optionList.length; i++) {
                                if((this.singleque.optionList[i].optionType === '1'&&this.singleque.optionList[i].content === '')||(this.singleque.optionList[i].optionType === '2' &&  this.singleque.optionList[i].img === '')){
                                  this.singleque.optionList.splice(i,1)   
                                } else if(this.singleque.optionList[i].optionType === '2' && this.singleque.optionList[i].img !== ''){
                                    this.singleque.optionList[i].img = this.singleque.optionList[i].imgbase64
                                    delete this.singleque.optionList[i].imgbase64
                                }
                            }
                            console.log(this.singleque)
                            let tempqueinfor  = JSON.parse(JSON.stringify(this.singleque)) 
                            tempqueinfor.testType = '1'
                            this.$emit('modifySingle', tempqueinfor)
                            this.dialogWjSingleQue = false
                            this.$message({
                                message: '已保存草稿',
                                type: 'success',
                                duration: 1 * 1000
                            })
                        }
                    })
                } else {
                    return false
                }
            })
            console.log(this.singleque)

        }
    }    
}
</script>


<style lang="scss" scoped>
@import 'common/scss/common.scss';
.queitem{
    display: inline-block;
    padding-right: 10px;
    font-size: 12px;
}
.quedescription{
    width: 70%;
}
.radio{
    padding: 0;
    margin: 10px 2px;
}
.upload__tip{
    padding-left: 4px;
    font-size: 12px;
}
.upload_btn{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    font-size: 12px;
    border-radius: 4px;
    width: 200px;
}
.uploadimg-box{
    position: relative;
    padding: 4px 4px 4px 90px;
    height: 70px;
    width: 80%;
    border-radius: 6px;
    border: 1px solid #c0ccda;
}
.uploadimg-box > img{
    width: 100px;
    height: 70px;
    float: left;
    position: relative;
    z-index: 1;
    margin-left: -80px;
}
.uploadimg-box > i{
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
}
</style>
