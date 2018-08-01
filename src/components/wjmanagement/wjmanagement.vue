<template>
    <div class="wjmanagement">
        <!-- 问卷管理：对于已发布（正在运行）的试卷进行管理
        管理项(子路由)： 返回管理中心，发送问卷(对于开启运行的问卷)（链接，二维码发送），分析（对于有回收到问卷的试卷才可跳转）:答卷列表，单个答卷情况（更多分析等待后台开发）
                编辑问卷（只能编辑没有发布的） -->
        <el-container class="container">
            <el-aside width="200px" style="height: 100%; background-color: rgb(84, 92, 100);">
                 <el-menu :default-openeds="['4']"    
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    default-active='3'>
                    <el-menu-item index="1" @click="back">
                        <i class="fa fa-home menu_icon"></i>我的管理中心
                    </el-menu-item>
                    <el-menu-item index="2" @click="edit">
                        <i class="el-icon-edit menu_icon"></i>编辑问卷
                    </el-menu-item>
                    <el-menu-item index="3" @click="send">
                        <i class="el-icon-message menu_icon"></i>发送问卷
                    </el-menu-item>
                     <li  @click="preview" class="menu_item">
                        <i class="el-icon-view menu_icon"></i>预览问卷
                    </li>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-setting"></i>答卷分析</template>
                        <el-menu-item-group>
                        <el-menu-item index="4-1" @click="answerwj">答卷</el-menu-item>
                        <el-menu-item index="4-2" @click="analyzewj">数据分析</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { getWjInfor, getAnswerCount } from 'api/wj'
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
    data() {
        return{
            wj:{}
        }
    },
    created() {
        this._getWjInfor()
    },
    methods: {
        back(){
            this.$router.push('/usermanagement/mywj')
        },
        send() {
            if(this.wj.status === '2') {
                this.$message({
                    message: '此问卷已被禁用，无法发送',
                    type: 'warning'
                });
                return
            } else {
                this.$router.push(`/wjmanagement/sentwj:${getIdfromUrl()}`)
            }           
        },
        preview() {
            let routeData = this.$router.resolve({ path: `/wjpreview:${getIdfromUrl()}`})
            window.open(routeData.href, '_blank')
        },
        edit() {
            if(this.wj.status === '0') {
               this.$router.push({path: `/edit:${getIdfromUrl()}`})
            } else {
                this.$message.error('问卷已发布，无法编辑问卷')
            }   
        },
        answerwj() {
            if(this.wj.status === '0') {
                this.$message({
                    message: '此问卷还未发布, 无法查看答卷',
                    type: 'warning'
                });
            } else {
                getAnswerCount(getIdfromUrl()).then((res) => {
                    if(res.success) {
                        if(res.data === 0 ) {
                        this.$message({
                            message: '此问卷还未收到答卷, 无法查看答卷',
                            type: 'warning'
                        });
                        } else {
                            this.$router.push({path: `/wjmanagement/wjanswer:${getIdfromUrl()}`})
                        }
                    }
               })
            }
        },
        analyzewj(){
            if(this.wj.status === '0') {
                this.$message({
                    message: '此问卷还未发布, 无法分析答卷',
                    type: 'warning'
                });
            } else {
                getAnswerCount(getIdfromUrl()).then((res) => {
                    if(res.success) {
                        if(res.data === 0 ) {
                        this.$message({
                            message: '此问卷还未收到答卷，无法分析答卷',
                            type: 'warning'
                        });
                        } else {
                            this.$router.push({path: `/wjmanagement/analyzewj:${getIdfromUrl()}`})
                        }
                    }
                })
            }
        },
        _getWjInfor() {
            getWjInfor(getIdfromUrl(), getId()).then((res) => {
                if(res.success) {
                    this.wj = res.data
                } else{
                    this.$message.error(res.msg)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.wjmanagement{
    width: 100%;
    height: 100%;
}
.container{
    height: 100%;
}
.menu_icon{
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 20px; 
    color: #ffffff;
}
.menu_item{
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #303133;
    padding: 0 20px;
    list-style: none;
    cursor: pointer;
    position: relative;
    -webkit-transition: border-color .3s, background-color .3s, color .3s;
    transition: border-color .3s, background-color .3s, color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
    padding-left: 20px;
    color: rgb(255, 255, 255);
    background-color: rgb(84, 92, 100);
    &:hover{
        background-color: rgb(67, 74, 80);
    }
}
</style>
