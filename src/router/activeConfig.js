export function getMenuIcon (name) {
  const icons = {
    '消息': 'el-icon-bell menu-icon',
    '权限管理': 'el-icon-setting menu-icon',
    '用户管理': 'fa fa-user-circle-o menu_icon',
    '角色管理': 'el-icon-setting menu_icon',
    '菜单管理': 'el-icon-menu menu_icon'
  }
  return icons[name]
}

export function getMenuRelation (name) {
  const relat = {
    '消息': 3, // 路由添加在管理主页的内部子路
    '权限管理': false // 添加在外部
  }
  return relat[name]
}
