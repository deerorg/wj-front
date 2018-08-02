<template>
    <div class="role">
        <div class="rolelist">
            <div class="listhead clrfix">
                <span class="p-table-name">角色列表</span>
                <el-button type="primary" class="fr" size="medium" @click="isShowAddDialog = true">添加</el-button>
            </div>
            <div class="table">
                <el-table 
                    element-loading-text="拼命加载中" 
                    empty-text="暂无数据"
                    :data="rolelist" stripe
                    border fit highlight-current-row
                >
                    <el-table-column label="ID" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.id }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="角色名称" align="center">
                          <template slot-scope="scope">
                            <span>{{ scope.row.roleName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="备注" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.remarks }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="280" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>                        
                            <el-button  size="mini" @click="handleMenu(scope.$index, scope.row)">分配菜单</el-button>
                            <el-button  size="mini" @click="deleRole(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--添加角色-->
        <el-dialog title="添加角色信息" :visible.sync="isShowAddDialog">
            <el-form ref="addForm" label-width="200px" label-position="left"   :model="addForm" :rules="rules">
                <el-form-item label="名称" prop="roleName" >
                    <el-input v-model="addForm.roleName" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks" >
                    <el-input v-model="addForm.remarks" placeholder="说点什么"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowAddDialog = false">取消</el-button>
                <el-button type="primary"  @click="_addRole">保存</el-button>
            </div>
        </el-dialog>
        <!--修改角色-->
        <el-dialog title="修改角色信息" :visible.sync="isShowEditDialog">
            <el-form ref="modifyForm" label-position="left"  label-width="200px"  :model="modifyForm" :rules="rules">
                <el-form-item label="名称" prop="roleName" >
                    <el-input v-model="modifyForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks" >
                    <el-input v-model="modifyForm.remarks"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShowEditDialog = false">取消</el-button>
                <el-button type="primary"  @click="_modifyRole">保存</el-button>
            </div>
        </el-dialog>
        <!--分配菜单-->
         <el-dialog title="角色功能菜单分配" :visible.sync="isShowTree" width="70%">
            <el-form label-position="left"  label-width="200px"  :inline="true">
                <el-form-item label="当前角色">
                    <el-input v-model="currentRole.roleName" readonly disabled></el-input>
                </el-form-item>
            </el-form>
            <menu-tree :control="myControl" v-if="isShowTree" :role-id="currentRole.id"></menu-tree>
        </el-dialog>
    </div>
</template>

<script>
import { getId, getToken, getRoleId, getUserInfor} from 'store/store'
import { checkLoginState } from 'api/login'
import { getAllRoles, addRole, modifyRole, deletRole } from 'api/admin'
import MenuTree from './menu-tree'
export default {
    components: {
        MenuTree
    },
    data() {
        return {
            rolelist: [],
            isShowAddDialog: false,
            isShowEditDialog: false,
            isShowTree: false,
            addForm: {},
            modifyForm: {},
            currentRole: {},
            myControl: {
                showCheckbox: true,
                showRight: false
            },
            rules: {
                roleName: [
                    { required: true, message: "角色名称", trigger: "blur" },
                    { min: 1, message: "长度在 1 字符以上", trigger: "blur" },
                    { max: 20, message: "长度在 20 字符以内", trigger: "blur" }
                ]
            }
        }
    },
    mounted(){
        this._getRoles()
    },
    methods: {
        _getRoles() {
            getAllRoles().then((res) => {
                if(res.success) {
                    this.rolelist = res.data
                } else {
                    me.$message.error(msg)
                }
            })
        },
        handleCurrentChange (num) {
            this.currentpage = num
            this._getRoles()
        },
        handleEdit(index, row) {
            this.modifyForm = row
            this.isShowEditDialog = true
        },
        handleMenu(index, row) {
            this.isShowTree = true
            this.currentRole = row
        },
        deleRole(index, row) {
            deletRole(row.id).then((res) => {
                if(res.success) {
                    this.$message.success("删除成功")
                    this._getRoles()
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        _addRole() {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    addRole(this.addForm).then((res) => {
                        if(res.success) {
                            this.$message.success("添加成功")
                            this._getRoles()
                            this.isShowAddDialog = false
                        } else {
                            this.$message.error(res.msg)
                        }
                    }) 
                }
            })
        },
        _modifyRole() {
            this.$refs.modifyForm.validate(valid => {
                if (valid) {
                    modifyRole(this.modifyForm).then((res) => {
                        if(res.success) {
                            this.$message.success("修改成功")
                            this._getRoles()
                            this.isShowEditDialog = false
                        } else {
                            this.$message.error(res.msg)
                        }
                    }) 
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
