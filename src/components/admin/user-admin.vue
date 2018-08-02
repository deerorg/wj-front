<template>
    <div class="user">
        <div class="userlist">
            <div class="listhead clrfix">
                <span class="p-table-name">用户列表</span>
                <el-button type="primary" class="fr" size="medium" @click="isShowAddDialog = true">添加</el-button>
            </div>
            <div class="table">
                <el-table 
                    element-loading-text="拼命加载中" 
                    empty-text="暂无数据"
                    :data="userList" stripe
                    border fit highlight-current-row
                >
                    <el-table-column label="ID" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="用户名" align="center">
                          <template slot-scope="scope">
                            <span>{{ scope.row.userName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="email"  label="邮箱" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.email }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="手机" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.mobile }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="pwdLastDate"  label="上次登录时间" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.pwdLastDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="280" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>                        
                            <el-button  size="mini" @click="handlePsd(scope.$index, scope.row)">修改密码</el-button>
                            <el-button  size="mini" @click="handleRole(scope.$index, scope.row)">分配角色</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
         <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentpage"
            layout="total, prev, pager, next"
            :page-size=15
            :total="total">
        </el-pagination>
        <!--添加用户-->
        <el-dialog :visible.sync="isShowAddDialog" title="添加用户">
            <el-form ref="addForm" label-position="left"  label-width="200px" :model="addForm" :rules="rules">
                <el-form-item label="用户名称" prop="userName" >
                    <el-input v-model="addForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" >
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" >
                    <el-input  type="password" v-model="addForm.password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowAddDialog = false">取消</el-button>
                <el-button type="primary"  @click="_addUser">保存</el-button>
            </div>
        </el-dialog>
        <!--修改用户信息-->
        <el-dialog title="修改用户信息" :visible.sync="isShowEditDialog">
            <el-form ref="modifyForm" label-position="left"  label-width="200px"  :model="modifyForm" >
                 <el-form-item label="用户名"  prop="userName">
                    <el-input v-model="modifyForm.userName" readonly disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="modifyForm.email"></el-input>
                </el-form-item>
                 <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="modifyForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowEditDialog = false">取消</el-button>
                <el-button type="primary"  @click="_modifyUser">保存</el-button>
            </div>
        </el-dialog>
        <!--修改密码 -->
        <el-dialog title="修改密码" :visible.sync="isShowEditPassDialog">
            <el-form ref="modifyForm" label-position="left"  label-width="200px"  :model="modifyForm" :rules="modifyFormRules">
                <el-form-item label="原密码" prop="oldPwd">
                    <el-input type="password" v-model="modifyForm.oldPwd" placeholder="请输入原来的密码"></el-input>
                </el-form-item>
                 <el-form-item label="新密码" prop="newPwd">
                    <el-input type="password" v-model="modifyForm.newPwd" placeholder="请设置新密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowEditPassDialog = false">取消</el-button>
                <el-button type="primary"  @click="_modifyPsd">保存</el-button>
            </div>
        </el-dialog>
        <!--分配角色-->
        <el-dialog title="修改用户角色" :visible.sync="isShowEditRoleDialog">
            <el-form ref="modifyRoleForm" label-position="left"  label-width="200px"  :model="modifyRoleForm">
                 <el-form-item label="原角色">
                    <el-checkbox-group v-model="currentChooseRolesLables" >
                        <el-checkbox disabled v-for="item in currentChooseRoles" :label="item.roleName" :key="item.id">{{item.roleName}} - [{{item.id}}]</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="分配角色">
                    <el-checkbox-group v-model="chooseRoles" >
                        <el-checkbox v-for="item in roleList"  :label="item.roleName"  :key="item.id" >{{item.roleName}} - [{{item.id}}]</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowEditRoleDialog = false">取消</el-button>
                <el-button type="primary"  @click="_modifyRoles">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getId, getToken, getRoleId, getUserInfor } from 'store/store'
import { checkLoginState } from 'api/login'
import { getAllUsers, addUser, modifyUser, updataPsd, getAllRoles, getRoles, setRoles } from 'api/admin'
import { REG } from 'common/js/validat'
export default {
    mounted() {
        this._getAllUsers()
        this._getRoles()
    },
    data() {
        let validatePsd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }else if (!REG.PSD.test(value)) {
                callback(new Error('请输入6-20位字母，数字，减号，下划线的密码'))
            }else {
                callback()
            }
        }
        let validatMobile = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号码'));
              } else if(!REG.MOBILE.test(value)) {
                callback(new Error('请输入有效的手机号码'));
              } else {
                callback()
            }
        }
        return {
            userList: [],
            currentpage: 1,
            pagesize: 15,
            total: 1,
            totalpages: 1,
            isShowAddDialog: false,
            isShowEditDialog: false,
            isShowEditPassDialog: false,
            isShowEditRoleDialog: false,
            addForm: {},
            modifyForm: {},
            roleList: [],
            currentChooseRoles: [],
             // 新选择的角色
            chooseRoles: [],
            modifyRoleForm: {},
            rules: {
                userName: [
                    { required: true, message: "请输入用户名称", trigger: "blur" },
                    { min: 1, message: "长度在 1 字符以上", trigger: "blur" },
                    { max: 20, message: "长度在 20 字符以内", trigger: "blur" }
                ],
                mobile: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    {validator: validatMobile, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {validator: validatePsd, trigger: 'blur' }
                ]
            },
            modifyFormRules: {
                oldPwd: [
                    { required: true, message: "请输入旧密码", trigger: "blur" },
                    {validator: validatePsd, trigger: 'blur' }
                ],
                newPwd:[
                    { required: true, message: "请输入新密码", trigger: "blur" },
                    {validator: validatePsd, trigger: 'blur' }
                ],
            }
        }
    },
    computed:{
        currentChooseRolesLables() {
            return this.currentChooseRoles.map(x => {
                return x.roleName
            })
        }
    },
    methods: {
        _getAllUsers(){
            getAllUsers(getUserInfor(), this.currentpage, this.pagesize).then((res) => {
                if(res.success) {
                    this.total = res.data.total
                    this.totalpages = res.data.pages
                    this.userList = res.data.list
                }
            })
        },
        _getRoles() {
            getAllRoles().then((res) => {
                if(res.success) {
                    this.roleList = res.data.map(x => {
                        x.isChoose = false
                        return x
                    })
                } else {
                    me.$message.error(msg)
                }
            })
        },
        handleCurrentChange (num) {
            this.currentpage = num
            this._getAllUsers()
        },
        handleEdit (index, row) {
            this.modifyForm = JSON.parse(JSON.stringify(row))
            this.isShowEditDialog = true
        },
        handlePsd(index, row){
            this.modifyForm.uid = (JSON.parse(JSON.stringify(row))).id
            this.isShowEditPassDialog = true
        },
        handleRole (index, row) {
            this.modifyRoleForm = {
                userId: row.id,
                roleIds: []
            }
            getRoles(row.id).then((res) => {
                if(res.success) {
                    this.currentChooseRoles = res.data || []
                    this.chooseRoles = this.currentChooseRolesLables
                    this.isShowEditRoleDialog = true
                } else {
                    me.$message.error(res.msg)
                }
            })

        },
        _modifyPsd() {
            this.$refs.modifyForm.validate(valid => {
                if(valid) {
                    updataPsd(this.modifyForm).then((res) => {
                        if(res.success) {
                            this.$message({
                                message: '修改密码成功',
                                type: 'success',
                                duration: 2 * 1000
                            })
                            this.isShowEditPassDialog = false
                        } else {
                             this.$message.error(res.msg)
                        }
                    })
                } else {
                    this.$message.error("请提交正确的数据")
                }
            })
        },
        _addUser() {
            this.$refs.addForm.validate(valid => {
                if(valid) {
                    addUser(this.addForm).then((res) => {
                        if(res.success) {
                            this.$message({
                                message: '添加用户成功',
                                type: 'success',
                                duration: 2 * 1000
                            })
                            this._getAllUsers()
                            this.isShowAddDialog = false
                        }
                    })
                } else {
                    this.$message.error("请提交正确的数据")
                }
            })
        },
        _modifyUser() {
            this.$refs.modifyForm.validate(valid => {
                if(valid) {
                    modifyUser(this.modifyForm).then((res) => {
                        if(res.success) {
                            this.$message({
                                message: '修改用户信息成功',
                                type: 'success',
                                duration: 2 * 1000
                            })
                            this._getAllUsers()
                            this.isShowEditDialog = false
                        }
                    })
                } else {
                    this.$message.error("请提交正确的数据")
                }
            })
        },
        _modifyRoles() {
            let currents = this.roleList.filter(x => {
                return this.chooseRoles.includes(x.roleName)
            })
            let ids = currents.map(x => x.id) || []
            setRoles(this.modifyRoleForm.userId, ids).then((res) => {
                if(res.success) {
                      this.$message({
                            message: '用户角色分配成功',
                            type: 'success',
                            duration: 2 * 1000
                        })
                    this.isShowEditRoleDialog = false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.listhead{
    padding: 6px 0;
}
</style>
