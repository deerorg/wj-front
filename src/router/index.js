import Vue from 'vue'
import Router from 'vue-router'
// import { getMenuRelation } from './activeConfig'
import { getMenuByRoleArr } from 'api/admin'
import { getUserInfor } from 'store/store'
Vue.use(Router)

const Index = (resolve) => {
  import('components/index/index').then((module) => {
    resolve(module)
  })
}
const Login = (resolve) => {
  import('components/login/login').then((module) => {
    resolve(module)
  })
}
const Register = (resolve) => {
  import('components/register/register').then((module) => {
    resolve(module)
  })
}
const UserManagement = (resolve) => {
  import('components/usermanagement/usermanagement').then((module) => {
    resolve(module)
  })
}
const MyWj = (resolve) => {
  import('components/usermanagement/mywj').then((module) => {
    resolve(module)
  })
}
const User = (resolve) => {
  import('components/usermanagement/user').then((module) => {
    resolve(module)
  })
}
const Message = (resolve) => {
  import('components/usermanagement/message').then((module) => {
    resolve(module)
  })
}
const EditWj = (resolve) => {
  import('components/edit-wj/edit-wj').then((module) => {
    resolve(module)
  })
}
const WjManagement = (resolve) => {
  import('components/wjmanagement/wjmanagement').then((module) => {
    resolve(module)
  })
}
const SentWj = (resolve) => {
  import('components/wjmanagement/sentwj').then((module) => {
    resolve(module)
  })
}
const AnalyzeWj = (resolve) => {
  import('components/wjmanagement/analyzewj').then((module) => {
    resolve(module)
  })
}
const WjAnswer = (resolve) => {
  import('components/wjmanagement/wjanswer').then((module) => {
    resolve(module)
  })
}

const Preview = (resolve) => {
  import('components/preview/preview').then((module) => {
    resolve(module)
  })
}
const WjPC = (resolve) => {
  import('components/wj/wj-pc').then((module) => {
    resolve(module)
  })
}
const WjPh = (resolve) => {
  import('components/wj/wj-ph').then((module) => {
    resolve(module)
  })
}
const Admin = (resolve) => {
  import('components/admin/admin').then((module) => {
    resolve(module)
  })
}
const UserAdmin = (resolve) => {
  import('components/admin/user').then((module) => {
    resolve(module)
  })
}
const RoleAdmin = (resolve) => {
  import('components/admin/role').then((module) => {
    resolve(module)
  })
}
const MenuAdmin = (resolve) => {
  import('components/admin/menu').then((module) => {
    resolve(module)
  })
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        title: '问卷管家'
      },
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录_问卷管家'
      },
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册_问卷管家'
      },
      component: Register
    },
    // {
    //   path: '/admin',
    //   name: '/admin/user',
    //   redirect: '',
    //   meta: {
    //     title: '权限管理_问卷管家'
    //   },
    //   component: Admin,
    //   children: [
    //     {
    //       path: 'user',
    //       name: 'user',
    //       meta: {
    //         title: '用户管理_问卷管家'
    //       },
    //       component: UserAdmin
    //     },
    //     {
    //       path: 'role',
    //       name: 'role',
    //       meta: {
    //         title: '角色管理_问卷管家'
    //       },
    //       component: RoleAdmin
    //     },
    //     {
    //       path: 'menu',
    //       name: 'menu',
    //       meta: {
    //         title: '菜单管理_问卷管家'
    //       },
    //       component: MenuAdmin
    //     }
    //   ]
    // },
    {
      path: '/usermanagement',
      redirect: '/usermanagement/mywj',
      name: 'usermanagement',
      meta: {
        title: '我的管理中心_问卷管家'
      },
      children: [
        {
          path: 'mywj',
          name: 'mywj',
          meta: {
            title: '我的问卷_问卷管家'
          },
          component: MyWj
        },
        {
          path: 'user',
          name: 'user',
          meta: {
            title: '个人中心_问卷管家'
          },
          component: User
        }
        // {
        //   path: 'message',
        //   name: 'message',
        //   meta: {
        //     title: '消息_问卷管家'
        //   },
        //   component: Message
        // }
      ],
      component: UserManagement
    },
    {
      path: '/edit:id',
      name: 'edit',
      meta: {
        title: '编辑_问卷管家'
      },
      component: EditWj
    },
    {
      path: '/wjmanagement',
      name: 'wjmanagement',
      redirect: '/wjmanagement/sentwj:id',
      meta: {
        title: '问卷管理_问卷管家'
      },
      children: [
        {
          path: 'sentwj:id',
          name: 'sentwj',
          meta: {
            title: '问卷发送_问卷管家'
          },
          component: SentWj
        },
        {
          path: 'analyzewj:id',
          name: 'analyzewj',
          meta: {
            title: '答卷分析_问卷管家'
          },
          component: AnalyzeWj
        },
        {
          path: 'wjanswer:id',
          name: 'answer',
          meta: {
            title: '答卷_问卷管家'
          },
          component: WjAnswer
        }
      ],
      component: WjManagement
    },
    {
      path: '/wjpreview:id',
      name: 'wjpreview',
      meta: {
        title: '问卷预览_问卷管家'
      },
      component: Preview
    },
    {
      path: '/wjforanswer/pc:id',
      name: 'wjforanswer',
      meta: {
        title: '问卷填写_问卷管家'
      },
      component: WjPC
    },
    {
      path: '/wjforanswer/ph:id',
      name: 'wjforanswer',
      meta: {
        title: '问卷填写_问卷管家'
      },
      component: WjPh
    }
  ]
})

const dynamicRoutes = [
  {
    path: '/usermanagement/message',
    name: 'message',
    meta: {
      title: '消息_问卷管家'
    },
    component: Message
  },
  {
    path: '/admin',
    name: '/admin/user',
    redirect: '',
    meta: {
      title: '权限管理_问卷管家'
    },
    component: Admin,
    children: [
      {
        path: '/admin/user',
        name: 'user',
        meta: {
          title: '用户管理_问卷管家'
        },
        component: UserAdmin
      },
      {
        path: '/admin/role',
        name: 'role',
        meta: {
          title: '角色管理_问卷管家'
        },
        component: RoleAdmin
      },
      {
        path: '/admin/menu',
        name: 'menu',
        meta: {
          title: '菜单管理_问卷管家'
        },
        component: MenuAdmin
      }
    ]
  }
]

let flag = false
router.beforeEach((to, from, next) => {
  let menulist = []
  if (!flag) {
    let newRouters = []
    getMenuByRoleArr(getUserInfor().roleIds).then(res => {
      if (res.success) {
        if (typeof res.data === 'string') {
          menulist = JSON.parse(res.data)
        } else {
          menulist = res.data
        }
        newRouters = menulist.map((x, index) => {
          if (x.url === dynamicRoutes[index].path) {
            if (x.children && x.children.length === dynamicRoutes[index].children.length) {
              return dynamicRoutes[index]
            } else if (x.children && x.children.length !== dynamicRoutes[index].children.length) {
              dynamicRoutes[index].children = dynamicRoutes[index].children.fliter(e => {
                if (e.path === x.children.url) {
                  return e
                }
              })
              return dynamicRoutes[index]
            } else {
              return dynamicRoutes[index]
            }
          }
          // router.options.routes[x.in].children.push(dynamicRoutes[index])
        })
        newRouters = newRouters.filter(x => {
          return x
        })
        if (newRouters.length !== 0) {
          router.addRoutes(newRouters)
        }
        // console.log(newRouters)
        // console.log('添加完后的router')
        // console.log(router)
        flag = true
        next()
      }
    })
  } else {
    next()
  }
})

export default router
