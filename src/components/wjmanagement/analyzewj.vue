<template>
    <div class="analyzewj">
        <div class="analyzewj-contain">
            <h3 class="title">统计列表</h3>
            <div class="analyze-item" v-for="(item, index) in list" :key="index">
                <span style="word-break:break-all;">第{{index + 1}}题：{{item.testName}}</span>
                <div class="option-list">
                    <el-table style="border-radius: 20px"  :data="item.options" element-loading-text="拼命加载中" empty-text="暂无数据" stripe border highlight-current-row>
                        <el-table-column label="选项" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.optionType === '1'">{{ scope.row.content }}</span>
                                <img  v-if="scope.row.optionType === '2'" :src="scope.row.img" class="img_option">
                            </template>
                        </el-table-column>
                        <el-table-column label="比例" align="center">
                            <template slot-scope="scope">
                                <el-progress :text-inside="true" :stroke-width="22" :percentage="scope.row.ratio ? parseInt(scope.row.ratio): 0"></el-progress>
                            </template>
                        </el-table-column>
                        <el-table-column label="小计" align="center"  width="100">
                            <template slot-scope="scope">
                                <span>{{ scope.row.answerCount}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getWjInfor, getAnswerCount, getAnswerReport, UpdateWjStatus} from 'api/wj'
import { getId, getToken, getIdfromUrl } from 'store/store'
import { checkLoginState } from 'api/login'
export default {
    beforeRouteEnter (to, from, next) {
        if(getToken()) {
            checkLoginState().then((res) => {
                if(res.data.data === null && res.data.success) {
                    if(getIdfromUrl()) {
                            // 答卷数判断是否可以进行分析
                           getAnswerCount(getIdfromUrl()).then((res) => {
                                if(res.success) {
                                    if(res.data.length ===0 ) {
                                         alert('此问卷还未收到答卷, 无法分析答卷')
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
    data(){
        return {
            list: []
        }
    },
    mounted() {
         this._getWjInfor()
        // this._getAnswerReport()
    },
    methods:{
         _getWjInfor() {
            getWjInfor(getIdfromUrl(), getId()).then((res) => {
                if(res.success) {
                   if(res.data.status === '0'){
                       alert('该问卷未发布无法进行问卷分析')
                   } else if(res.data.status === '1') {
                       let id =  res.data.id
                        this.$confirm('该问卷还在启动中，请先暂停再查看试卷分析?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                 let wjinfor = {
                                    id: id,
                                    status: '4',
                                    createUser: getId()
                                }
                                UpdateWjStatus(wjinfor).then((res) => {
                                    if(res.success){
                                        this.$message({
                                                message: '问卷已暂停',
                                                type: 'success',
                                                duration: 1 * 1000
                                        })
                                    window.location.reload(true)
                                    } else {
                                        this.$message.error(res.msg)
                                    }
                                })
                            }).catch(() => {
                                this.$router.back()
                            });
                   } else {
                       this._getAnswerReport() // 开始进行统计
                   }
                } else{
                    this.$message.error(res.msg)
                }
            })
        },
        _getAnswerReport() {
            getAnswerReport(getIdfromUrl(), getId()).then(res => {
                this.list = res.data
            })
        }
    }

}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.analyzewj-contain{
    width: 80%;
    margin: 0 auto ;
    // border: 2px solid #dedfe0;
}
.title{
    color: #666666;
    line-height: 2em;
    border-bottom: 1px  solid #dedfe0;    
}
.analyze-item{
    margin: 30px 0 20px;
}
.img_option{
    width: 70px;
    height: 70px;
}
.option-list{
    width: 100%;
    height: auto;
    margin: 10px 0;
}
</style>