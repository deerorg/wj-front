<template>
    <div class="mywj">
        <div class="seach">
            <el-input placeholder="请输入问卷名进行搜索" v-model="query" class="input-with-select input_search">
                 <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input> 
            <el-button type="primary" class="add" icon="el-icon-plus" @click="dialogAddWj = true">创建问卷</el-button>
        </div>
        <div class="nowj" v-show="!list.length">
            <i class="fa fa-file-o" style="padding-right:10px;"></i>当前无问卷/查找不到相应问卷
            <p class="tip">点击右上角按钮创建问卷</p>
        </div>
        <div class="list" v-for="(item, index) in list" :key="index">
            <div class="wj-item" >
                <div class="wjinfor fl">
                    <span class="infor_title textcut">{{item.paperName}}</span>
                    <span>ID: {{item.id}}</span>
                    <span>答卷：0</span>
                    <span>创建于：{{item.createTime}}</span>
                    <span v-if="item.status==0">草稿</span>
                    <span v-if="item.status==1">运行中</span>
                    <span v-if="item.status==2">停运中</span>
                </div>
                <div class="operate fr">
                    <el-button v-show="item.status==0||item.status==2" class="operate_btn" type="text" @click="operate(item, index)"><i style="padding-right:5px;" class="fa fa-play"></i>运行</el-button>
                    <el-button v-show="item.status==1" class="operate_btn" type="text"  @click="stop(item, index)"><i style="padding-right:5px;" class="fa fa-pause"></i>停止</el-button>
                    <el-button class="operate_btn" type="text" icon="el-icon-edit" @click="edit(item)">编辑</el-button>
                    <el-button class="operate_btn" type="text" icon="el-icon-view" @click="preview(item)">预览</el-button>
                    <el-button class="operate_btn" type="text" icon="el-icon-document" @click="manage(item)">发送/分析</el-button>
                    <el-button class="operate_btn" type="text"  icon="el-icon-delete" @click="delet(item,index)">删除</el-button>
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
        <el-dialog title="创建问卷" :visible.sync="dialogAddWj" class="dialog">
            <el-form :model="wjForm" :rules="rulesWj" ref="wjForm">
                <el-form-item label="标题" prop="paperName">
                    <el-input type="text" v-model="wjForm.paperName"></el-input>
                </el-form-item>
                <el-form-item label="问卷说明" prop="description">
                    <el-input type="textarea" :rows="4" v-model="wjForm.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddWj = false">取 消</el-button>
                <el-button type="primary"  @click="add">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getWjList, addWj, deletWj, UpdateWj } from 'api/wj'
import { fliter } from 'common/js/validat'
import { getId } from 'store/store'
const PAGESIZE = 10
export default {
    data() {
        let validitTitle = (rule, value, callback) => {
            if (fliter(value) === '') {
                callback(new Error('问卷标题不能为空！'));
            }else {
                callback();
            }
        }
        return {
            query:'',
            currentpage: 1,
            total: 0,
            totalpages: 1,
            pagesize: PAGESIZE,
            list:[],
            dialogAddWj: false,
            wjForm:{
                paperName: '',
                description: ''
            },
            rulesWj: {
                paperName: [
                    {validator: validitTitle, trigger: 'blur'}
                ]
            }

        }
    },
    created(){
        this._getWjList()
    },
    watch: {
        query: function(newQuery) {
            if(newQuery ==='') {
                this._getWjList()
            }
        }
    },
    methods:{
        _getWjList() {
            getWjList(this.currentpage, getId(), this.query, this.pagesize).then((res) => {
               if(res.success) {
                   this.list = res.data.list
                   this.totalpages = res.data.pages
                   this.total = res.data.total
               }
            })
        },
        add(){
            this.$refs.wjForm.validate((valid) => {
                if (valid) {
                   let wjinfor = {
                       createUser: getId(),
                       description: fliter(this.wjForm.description),
                       paperName: fliter(this.wjForm.paperName),
                       paperType: '1',
                       remark: '',
                       status: '0'
                    }
                    addWj(wjinfor).then((res) => {
                        if(res.success === true) {
                            this.$message({
                                message: '问卷创建成功！',
                                type: 'success',
                                duration: 1 * 1000
                            })
                            this.$router.push(`/edit:${res.data.id}`) 
                        } else {
                             this.$message.error(res.msg)
                        }
                    })
                } else {
                    return false
                }
            })
        },
        edit(item) {
            if(item.status === '0') {
                this.$router.push({path: `/edit:${item.id}`})
            } else {
                this.$message.error('问卷已发布，无法编辑问卷')
            }
            
        },
        manage(item){
            this.$router.push(`/wjmanagement/sentwj:${item.id}`)
           
        },
        delet(item, index) {
            this.$confirm('是否删除该问卷?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deletWj(item.id, getId()).then((res) =>{
                   if(res.success) {
                        this.$message({
                            message: '问卷删除成功',
                            type: 'success',
                            duration: 1 * 1000
                        })
                        this.list.splice(index, 1)
                    } else {
                        this.$message.error(res.msg)
                   }
                })
            }).catch(() => {
                return
            })
        },
        operate(item, index) {
            let wjinfor = {
                description: item.description,
                id: item.id,
                paperName: item.paperName,
                paperType: '1',
                remark: '',
                status: '1',
                updateUser: getId() 
            }
            if(item.status == '0') {
                this.$confirm('确定开始运行该问卷？问卷开启运行后将不能修改', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    UpdateWj(wjinfor).then((res) => {
                        if(res.success){
                        this.list[index].status = '1'
                            this.$message({
                                    message: '问卷开启运行成功，可发布问卷',
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
            } else if(item.status == '2') {
                UpdateWj(wjinfor).then((res) => {
                    if(res.success){
                    this.list[index].status = '1'
                        this.$message({
                                message: '问卷开启运行成功，可发布问卷',
                                type: 'success',
                                duration: 1 * 1000
                        })
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
           
               
        },
        stop(item, index) {
            let wjinfor = {
                description: item.description,
                id: item.id,
                paperName: item.paperName,
                paperType: '1',
                remark: '',
                status: '2',
                updateUser: getId() 
            }
            UpdateWj(wjinfor).then((res) => {
                if(res.success){
                    this.list[index].status = '2'
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        preview(item){
            let routeData = this.$router.resolve({ path: `/wjpreview:${item.id}`})
            window.open(routeData.href, '_blank')
        },
        handleCurrentChange(num) {
            this.currentpage = num
            this._getWjList()
        },
        search() {
           this._getWjList()
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.mywj{
    width: 100%;
    margin-top: $topmargin;
    min-width: 990px;
}
.input_search{
    width: 60%;
}
.nowj{
    @include center(400px, 100px); 
    color: #b9b9b9;
    text-align: center;
    font-size: 26px;
}
.tip{
    font-size: 16px;
    padding-top: 10px;
}
.add{
    margin-left: 30px;
}
.list{
    margin-top: $topmargin;
}
.wj-item{
    height: 60px;
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
.infor_title{
    font-size: 18px;
    max-width: 500px;
    color: #333333;
    vertical-align: middle;
}
.operate{
    line-height: 60px;
}
.operate_btn{
    padding-right: 6px;
    font-size: 14px;
}


</style>
