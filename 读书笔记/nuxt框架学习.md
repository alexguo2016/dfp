### nuxt.js 是一个基于 Vue.js 的通用应用框架

主要关注的是应用的 UI 渲染
nuxt generate, 基于 vue.js 的应用提供生成对应的静态站点的功能, 这个功能, 是向开发微服务的 web 应用的一个帮助
集成了 vue2, vue-router, vuex, vue-meta

### nuxt.js 中, 一个完整的服务器请求到渲染流程如下

1. 请求
1. nuxt 服务器初始化
1. 中间件
1. validate
1. asyncData() fetch
1. render

静态化(预渲染)

## 资源文件, assets 文件夹

默认情况下, 系统使用 vue-loader, file-loader 以及 url-loader 来处理文件的加载和引用, 如果不需要通过 webpack 处理的静态资源文件, 可以放置在 static 目录中

#### webpack 构建

在默认情况下, vue-loader 自动使用 css-loader 和 vue 模版编译器来编译处理文件中的样式和模版, 这个时候, 所有的资源 url, 例如<img src=“...”> 和 css 中的 import 都会被解析成模块, 通过 require 引用
需要注意的是, 从 nuxt2.0 开始, ~/alias 无法在 css 文件中正确解析, 必须使用~assets 或者@别名, 例如 background: url("~assets/banner.svg")

#### 静态文件

如果静态资源文件需要 webpack 做构建编译处理, 可以放到 assets 目录, 否则, 可以放到 static 目录中去
nuxt 服务器启动的时候, static 目录下的文件会映射到应用的根路径 / 下

## 布局目录, layouts 文件夹

#### 默认布局

例如 layouts/default.vue, 里面是这样的结构

```vue
<template>
  <nuxt />
</template>
```

其中的 nuxt 组件, 用于显示页面的主体内容

#### 错误页面

可以通过新建一个 layouts/error.vue 来定制自己的错误页面

#### 个性化布局

可以自己写个性化的布局, 例如在 layouts/myDiv 文件内

```vue
<template>
  <div>
    <div class="header">header</div>
    <nuxt />
  </div>
</template>
```

#### 页面, page 文件夹下面的.vue 文件

页面组件其实是 vue 组件, 只不过 nuxt.js 为这些组件添加了一些特殊的配置项(对应 nuxt.js 提供的功能特性)

- asyneData, 最重要的一个键, 支持异步数据处理, 该方法的第一个参数为当前页面组件的上下文对象, context
- fetch 与 asyneData 类似, 用于在渲染页面之前, 获取数据填充应用的状态树 store, 不同的是, fetch 不会设置组件的数据
- head 配置当前页面的 Meta 标签, 用于 seo?
- layout 制定当前页面使用的布局, (layouts 根目录下的布局文件)
- loading 如果设置为 false, 则阻止页面自动调用 this.$nuxt.$loading.finish()和 this.$nuxt.$loading.start(), 仅适用于 nuxt.config.js 中设置 loading 的情况
- transition 指定页面切换的过渡动效
- scrollToTop boolean, 默认 false, 用于判定渲染页面前, 是否需要将当前页面滚动至顶部, 这个配置用于 嵌套路由的应用场景
- validate 校验方法, 用于校验动态路由的参数
- middleware 制定页面的中间件, 中间件会在页面渲染之前被调用

#### 插件目录, plugins

可以配置需要在 根 vue.js 应用 实例化之前需要运行的 JavaScript 插件, 例如自己写的库或者第三方模块
需要注意的是, 任何 vue 组件的生命周期内, 只有 beforeCreate 和 created 这两个钩子方法会在客户端和服务器端均被调用, 其他钩子方法仅在客户端被调用

##### 使用第三方模块

一般来说, 如果我们在页面上面使用第三方的模块, 可以 npm install 然后在需要的页面上面 import 即可, 但是, 如果多个页面都需要使用这个第三方模块, 那么, 在打包的时候, 这个模块会被打包多次
我们可以在 nuxt.config.js 里面配置 build.vendor 来解决, 例如

```js
module.exports = {
  build: {
    vendor: ["axios"]
  }
};
```

##### 使用 vue 插件

如果多个页面都使用同一个插件, 我们可以这样做

1. 增加文件 pluins/vue-notifications.js

   ```js
   import Vue from "vue";
   import VueNotifications from "vue-notifications";

   Vue.use(VueNotifications);
   ```

2. 在 nuxt.config.js 内配置 plugins

   ```js
   module.exports = {
     plugins: ["~/plugins/vue-notifications"]
   };
   ```

3. 由于应用代码比第三方库文件修改频繁, 我们应该将第三方库文件打包到单独的文件中去, 在 nuxt.config.js 文件中这样设置

   ```js
   module.exports = {
     build: {
       vendor: ["~/plugins/vue-notifications"]
     },
     plugins: ["~/plugins/vue-notifications"]
   };
   ```

#### 注入\$root 和 context

可以将一些变量注入 vue 实例(客户端), context(服务器端)甚至存储在 vuex 中, 在 nuxt.js 使用前缀\$为这些函数添加注入

##### 注入 vue 实例

将内容注入 vue 实例, 在 vue 原型上挂载注入一个函数, 所有组件内都可以访问(不包含服务器端)
需要注意的是, 如果修改了 nuxt.config.js 等等文件, 需要重新开启 dev 服务器

##### 注入 context

将内容注入 context, 在 app 上面挂载一个函数, 所有组件内都可以访问(不包含客户端)
注意, 如果函数 console 出来东西, 其实是在服务器端 console 的, 客户端(浏览器)是看不到的

##### 联合注入

如果需要在 context, vue 实例, 甚至可能在 vuex store 这, 都需要运行自己的插件函数, 那么, 可以使用 inject 方法, 接受 2 个参数, \$将自动添加到该函数中

##### 只在浏览器里使用插件

可以加一个 ssr:false 即可
同样地, 如果有些脚本库只想在服务端使用, 可以咋 webpack 打包 serve.bundle.js 的时候, 将 process.server 变量设置为 true

### store 目录, vuex 状态树

对于每个大项目来说, 使用状态树 store 管理状态 state 十分必要, nuxt.js 内核实现了 vuex
使用状态树有两种方式

1. 普通方式
2. 模块方式

#### 普通方式

需要添加一个 store/index.js 文件, 对外暴露一个 vuex.store 实例
注意, 是 index.js 文件
这样, 在所有组件里面, 都可以使用 this.\$store 来访问这个 store

#### 模块方式

store 目录下的每个.js 文件都会被转换成为状态树的指定命名的子模块
store/login.js 不需要返回 Vuex.Store 实例, 而是应该直接将 state, mutations, actions 暴露出来
注意, 这个时候, store/index.js 不能是普通方式的 store, 只能是模块方式的写法

#### 模块文件

也可以将模块文件分解为 state.js, actions.js, mutations.js 和 getters.js, 使用 index.js 维护这些文件, 同事具有单个单独的操作文件, 仍然可以正确识别该文件

#### 插件

可以将其他插件添加到 store(在模块模式下), 将其放入 store/index.js 文件中

#### fetch 方法

fetch 方法会在渲染页面前被调用, 作用是填充 store 数据, 与 asyncData 方法类似, 不过, 不会设置组件的数据

#### nuxtServerInit 方法 -->暂时不看..精力不足了

如果状态树中指定了 nuxtServerInit 方法, Nuxt.js 调用它的时候会讲页面的上下文对象作为第二个参数传给它(只有服务端调用的时候才会, 因为只有这个时候, 才有 context), 当我们想将服务端的一些数据传到客户端的时候, 这个方法是非常好用的

### 别名

~ 或者 @ 表示 src 目录
~~ 或者 @@ 表示根目录
默认情况下, src 目录和根目录相同

### 配置

在 nuxt.config.js 文件里面, 有一系列的配置, 例如打包配置 build, loading 动画等等

### 路由

nuxt.js 依据 pages 目录结构自动生成 vue-router 模块的路由配置, 页面之间使用路由, 建议使用/<nuxt-link/> 标签

#### 动态路由

在 nuxt 里面定义带参数的动态路由, 需要创建对应的 以下划线作为前缀的 vue 文件或者目录
注意: generate 命令会忽略动态路由

#### 路由参数校验

可以在动态路由组件里面定义参数校验方法, 例如 pages/users/\_id.vue, 这里需要的参数是:id

```js
export default {
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id);
  }
};
```

如果校验方法不返回 true 或者 Promise 中 resolve 解析为 false 或者抛出 Error, nuxt 会自动加载显示 404 或者 500 页面

#### 嵌套路由

可以通过 vue-router 的子路由创建 nuxt.js 应用的嵌套路由
注意, 父组件里面需要增加一个 nuxt-child 用于显示子视图的内容

### 过渡动效

nuxt.js 使用 vue.js 的 transition 组件来实现路由切换时的过渡动效

#### 全局过渡动效设置

注意, nuxt.js 默认使用的过渡动效名称为 page
如果想每一个页面的切换都有 fade 淡入淡出效果, 需要创建一个所有路由共用的 CSS 文件, 可以在 assets 目录下新建一个文件, 例如 assets/main.css

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
```

然后, 在 nuxt.config.js 文件里面,

```js
module.exports = {
  css: ["assets/main.css"]
};
```

#### 某个特定页面的过渡动效

我们可以在 main.css 上面加

```css
.test-enter-active,
.test-leave-active {
  transition: opacity 0.5s;
}
.test-enter,
.test-leave-active {
  opacity: 0;
}
```

然后, 在需要的页面上面这样写(.vue 文件)

```js
export default {
  transition: "test"
};
```

## 异步数据

nuxt.js 扩展了 vue.js, 增加一个叫 asyncData 的方法, 可以在设置组件的数据之前能异步获取或者处理数据

### asyncData 方法

会在组件(仅限于页面组件)每次加载之前被调用, 可以在服务端或路由更新之前被调用
由于这个方法是在组件 初始化之前被调用的, 所以在这个方法内不可以使用 this 来引用组件的实例对象, 只能使用上下文对象
nuxt.js 会将 asyncData 返回的数据融合组件 data 方法返回的数据一并返回给当前组件
