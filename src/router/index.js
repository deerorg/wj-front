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
      name: 'usermanagement',
      meta: {
        title: '我的管理中心_问卷管家'
      },
      children: [

      ],
      component: UserManagement
    }
  ]
})
