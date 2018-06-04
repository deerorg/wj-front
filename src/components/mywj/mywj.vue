<template>
    <div class="mywj">
        <div class="seach">
            <el-input placeholder="请输入问卷名进行搜索" v-model="query" class="input-with-select input_search">
                 <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input> 
            <el-button type="primary" class="add" icon="el-icon-plus" @click="add">创建问卷</el-button>
        </div>
        <div class="nowj" v-show="!list.length">
            <i class="fa fa-file-o" style="padding-right:10px;"></i>当前无问卷
            <p class="tip">点击右上角按钮创建问卷</p>
        </div>
        <div class="list">
            <div class="wj-item">
                <div class="wjinfor fl">
                    <span class="infor_title textcut">质量调查</span>
                    <span>ID: 12</span>
                    <span>答卷：0</span>
                    <span>创建于：2018/7/6 13:00</span>
                    <span>草稿</span>
                </div>
                <div class="operate fr">
                    <el-button class="operate_btn" type="text"><i style="padding-right:5px;" class="fa fa-play"></i>运行</el-button>
                    <el-button class="operate_btn" type="text" icon="el-icon-edit">编辑</el-button>
                    <el-button class="operate_btn" type="text" icon="el-icon-view">预览</el-button>
                    <el-button class="operate_btn" type="text" icon="el-icon-document">分析/管理</el-button>
                    <el-button class="operate_btn" type="text"  icon="el-icon-delete">删除</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getWjList } from 'api/wj'
import { fliter } from 'common/js/validat'
import { getId, } from 'store/store'
const PAGESIZE = 20
export default {
    data() {
        return {
            query:'',
            currentpage: 1,
            pagesize: PAGESIZE,
            list:[]

        }
    },
    created(){
        this._getWjList()
    },
    methods:{
        _getWjList() {
            getWjList(this.currentpage, getId(), this.query, this.pagesize).then((res) => {
                console.log(res.data)
            })
        },
        add(){
            let validitTitle = (value) => {
                if (fliter(value) === '') {
                    return '问卷标题不能为空！'
                }else {
                   return true
                }
            }
            this.$prompt('请输入标题', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValidator: validitTitle,
                inputErrorMessage: '标题不能为空'
            }).then(({ value }) => {
                value = fliter(value)
                
                // 保存标题到bus
                // 页面跳转至编辑页
            }).catch(() => {
                return
            })
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
    @include center(300px, 100px); 
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
