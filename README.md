### questionnaire_system

#### config
生产地址baseUrl定义：

```bash
文件：src->api->config

BASE_API: 'http://120.79.11.68:8099/api/',
```
打包生产目录定义：

```bash
文件： config->index

build: {
    assetsPublicPath: './'  // 相对路径,若部署到子目录设置为： '/根目录名/' 
}

```

> A Vue.js project


```bash
生产环境: node v6.11.4 
node下载：https://nodejs.org/en/
```

#### Build Setup

``` bash
# 项目代码下载
git clone https://github.com/deerorg/wj-front.git

# install dependencies(安装依赖)
npm install
若安装失败可采用阿里npm镜像  https://npm.taobao.org/
> npm install -g cnpm --registry=https://registry.npm.taobao.org
> cnpm install 

# serve with hot reload at localhost:8080(本地node服务器运行)
npm run dev

# build for production with minification(项目打包，打包前请确定打包生产目录等配置正确)
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


#### 项目相关说明

```
App.vue 程序根组件
main.js 程序入口
store 全局存储
```

```
build webpack的相关配置 请勿随意修改 
build.js build 文件  
webpack.base.conf.js 基本配置 
webpack.dev.conf.js 开发配置 
webpack.prod.conf.js 生产配置
```

