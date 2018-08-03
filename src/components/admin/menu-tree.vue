<template>
<div class="menu-tree clrfix">
    <div class="menuhead clrfix"  v-show="control.showRight">
        <el-button type="primary" @click="isShowAdd = true" size="medium" class="fr">添加菜单</el-button>
    </div>
    <div class="info-tree fl">
        <el-tree
            ref="eMenuTree"
            :data="treeData"
            :props="defaultProps"
            :expand-on-click-node="true"
            :indent = "8"
            node-key = "id"
            :default-checked-keys="defaultCheckedIds"
            :show-checkbox="control.showCheckbox"
            :check-strictly="control.showCheckbox"
            :default-expand-all="true"
            :highlight-current="true"
            @check-change = "onCheckChange"	
            @node-click="handleNodeClick">
        </el-tree>
    </div>
    <section class="fl menueditform" v-show="control.showRight">
        <el-form ref="addForm" label-position="left"  label-width="100px"  :model="addForm" v-show="isShow">
            <el-form-item label="类型" prop="type" >
                <el-radio-group v-model="addForm.type">
                    <el-radio :label="1">编辑菜单</el-radio>
                    <el-radio :label="2">添加子菜单</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单名称" prop="name" v-show="addForm.type==1" >
                <el-input v-model="addForm.menuName"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="nameEn"  v-show="addForm.type==1" >
                <el-input v-model="addForm.menuPath"></el-input>
            </el-form-item>
                <el-form-item label="子菜单名称" v-show="addForm.type==2">
                <el-input v-model="addForm.subMenuName"></el-input>
            </el-form-item>
            <el-form-item label="地址" v-show="addForm.type==2" >
                <el-input v-model="addForm.subMenuPath"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="addForm.remarks"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirmAdd">保存</el-button>
                <el-button  @click="confirmDeleteMenu">删除菜单</el-button>
            </el-form-item>
        </el-form> 
    </section>
    <el-dialog title="添加菜单" :visible.sync="isShowAdd" width="50%">
        <el-form ref="addPFrom" :model="addPFrom" label-position="left" label-width="100px">
            <el-form-item label="菜单名称" prop="name">
                <el-input v-model="addPFrom.menuName"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="menuPath">
                <el-input v-model="addPFrom.menuPath"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input v-model="addPFrom.remarks"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isShowAdd = false">取消</el-button>
            <el-button type="primary"  @click="addPMenu">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>


<script>
import { getTree, getMenuByRole, allocateOrCancleMenuRole, delMenu, editMenu, addMenu } from 'api/admin'
export default {
  name: "MenuTree",
  props: {
    control: {
        type: Object,
        default: function() {
            return {
                showCheckbox: false,
                showRight: true
            }
        }
    },
    roleId: {
      type: Number | String
    }

  },
  data() {
    // 声明保存当前操作分类node对象
    this.__currentNode = null
    return {
      currentChooseNode: null,
      currentSelf: null,
      currentData: null,
      treeData: [],
      // 当前的选择的菜单
      defaultCheckedIds: [],

      isShow: false,
      // 是否可以发送请求 1s之内不能发送请求
      isSendCheckedRequest: false,
      isShowAdd: false,
      addPFrom: {},
      addForm: {
        type: 1,
        remarks: ''
      },
      // 默认tree-node的字段名
      defaultProps: {
        children: "children",
        label: "name"
      }
    }
  },

  mounted() {
    if (this.control.showCheckbox) {
        getMenuByRole(this.roleId).then(res => {
            if(res.success) {
                this.defaultCheckedIds = res.data.map(x => x.id)
            } else {
                this.$message.error(msg)
            }
        })
    }

    this._getTree()
  },
  methods: {
    _getTree() {
        const me = this
        getTree().then((res) => {
            if(res.success) {
                if (typeof res.data === 'string') {
                    me.treeData = JSON.parse(res.data)
                    if(me.control.showCheckbox) {
                        me.isSendCheckedRequest = false
                        me.$refs.eMenuTree.setCheckedKeys(me.defaultCheckedIds)
                        setTimeout(function() {
                            // debugger;
                            me.isSendCheckedRequest = true
                        }, 1000)
                    }
                }else {
                  me.$message.error(msg)
                }
            }
        })
    },
    confirmDeleteMenu() {
        const me = this
        delMenu(me.currentData.id).then(res => {
            if(res.success) {
                me._getTree()
                me.$message.success("菜单删除成功")
            } else {
                me.$message.error(res.msg)
            }
        })
    },
    onCheckChange(data, nodeselfCheck, subNodeCheck) {
      const me = this
      // console.log(data, nodeselfCheck, subNodeCheck);
      // 当前ID 选中或没有选中
        const url = nodeselfCheck ? '/menu-role/allocate' : '/menu-role/cancel'
        // 屏蔽掉首次勾选的请求
        if (!me.isSendCheckedRequest) {
            return
        }
        const item = {
            roleId: me.roleId,
            menuIds: [data.id]
        }
        allocateOrCancleMenuRole(url, item).then(res => {
            if (res.success) {
                if (nodeselfCheck) {
                    me.$message.success("分配菜单成功")
                } else {
                    me.$message.success("取消分配成功")
                }
            } else {
            me.$message.error(res.msg)
            }
        })
    },
    confirmAdd() {
      const me = this
      // 编辑
      if (me.addForm.type == 1) {
        const editItem = {
          name: me.addForm.menuName,
          url: me.addForm.menuPath,
          remarks: me.addForm.remarks,
          type: 1,
          id: me.addForm.id,
          pid: me.addForm.pid
        }
        editMenu(editItem).then(res => {
            if(res.success) {
                me._getTree()
                me.$message.success("编辑菜单成功")
            } else {
                me.$message.error(res.msg)
            }
        })
      } else {
        const addItem = {
          name: me.addForm.subMenuName,
          url: me.addForm.subMenuPath,
          remarks: me.addForm.remarks,
          type: 1,
          pid: me.addForm.id
        }
        addMenu(addItem).then(res => {
            if(res.success) {
                me._getTree()
                me.$message.success("添加子菜单成功")
            } else {
                me.$message.error(res.msg)
            }
        })
      }
      me.isShow = false
    },
   addPMenu() {
        const me = this
        const addPItem = {
            name: me.addPFrom.menuName,
            url: me.addPFrom.menuPath,
            remarks: me.addPFrom.remarks,
            type: 1,
            pid: 0
        }
        addMenu(addPItem).then(res => {
            if(res.success) {
                me._getTree()
                me.$message.success("添加菜单成功")
                me.isShowAdd = false
            } else {
                me.$message.error(res.msg)
            }
        })

   },
    handleNodeClick(item, node, self) {
      const me = this
      me.currentData = item
      me.currentChooseNode = node
      me.currentSelf = self
      me.isShow = true

      me.addForm = {
        type: 1,
        id: item.id,
        menuName: item.name,
        menuPath: item.url,
        subMenuName: '',
        subMenuPath: '',
        remarks: item.remarks,
        pid: item.pid
      }

      me.$emit("node-click", item, node, self)
    }

  }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/common.scss';
.info-tree{
    width: 60%;
}
.menueditform{
    margin: 0 30px;
    width: 30%;
}
.menuhead{
    margin-bottom: 10px;
}
</style>
