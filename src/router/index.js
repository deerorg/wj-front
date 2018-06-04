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
      path: '/edit',
      name: 'edit',
      meta: {
        title: '编辑_问卷管家'
      },
      component: EditWj
    }
  ]
})
