import Vue from 'vue'
import Router from 'vue-router'

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
  import('components/mywj/mywj').then((module) => {
    resolve(module)
  })
}
const User = (resolve) => {
  import('components/user/user').then((module) => {
    resolve(module)
  })
}
const Message = (resolve) => {
  import('components/message/message').then((module) => {
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

const Preview = (resolve) => {
  import('components/preview/preview').then((module) => {
    resolve(module)
  })
}

export default new Router({
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
        },
        {
          path: 'message',
          name: 'message',
          meta: {
            title: '消息_问卷管家'
          },
          component: Message
        }
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
    }
  ]
})
