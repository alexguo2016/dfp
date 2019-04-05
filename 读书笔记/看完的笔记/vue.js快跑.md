# vue.js 快跑

本书适合对 HTML 和 JavaScript 有一定了解, 正在准备或者已经使用 vue.js 进行 web 应用开发的从业者. 也就是说, 是一个“深入浅出” 类型的书, 前面可能比较基础, 里面可能有一些比较少见的用法和窍门.

## 1. vue.js 基础

如果不实用框架, 项目最终会成为一团不可维护的代码, 而绝大部分代码所要处理的工作, 框架都已经为我们抽象出来了.

为什么不能在 body 上面初始化 vue 实例??

如果将整个数组或对象输出到页面上, vue 会输出 JSON 编码后的值.

如果使用 v-if, 图片会直到需要显示时才开始加载.

注意, 使用 v-for 的时候, index 是正整数(除非自己改动), 也就是说, v-for=“n in 10”--> 1, 2, 3..., v-for="n in 0"--> 没有显示.

vue.set()可用将一个属性设置为响应式的.

使用 v-model 的时候, 需要注意 input type=“radio”的情况, 需要这样设置

```html
<div>
  <label><input type="radio" v-model="value" value="一"/>一</label>
  <label><input type="radio" v-model="value" value="二"/><二/label>
  <label><input type="radio" v-model="value" value="三"/>三</label>
</div>
```

methods 是一个对象.
任何可以使用 JavaScript 表达式的地方都可以使用 methods 里面的函数.

过滤器里面不能使用 this, 它是一个纯函数.

使用 ref 可以直接访问元素.

```js
this.$ref.xxx;
```

自定义指令. 有自己的钩子函数, bind, inserted, update, componentUpdated, unbind.

## 2. vue.js 组件

prop 绑定的时候可以使用.sync 修饰符来设置为双向绑定. 其实是绑定了 update 方法.
而 v-model 绑定的是 input 方法.

## 3. 使用 vue 添加样式

使用 v-bind:class 可以使用数组格式和对象格式.

出了 scoped 之外, 还可以使用 vue-loader 实现 css modules.

## 4. render 函数和 JSX

render 函数优于 template 的一个方面是, 可以动态设置标签名(tagName).
使用 render 函数的时候, 不再使用 v-bind 了, 直接可以通过 this.来访问 data 和 props 等等属性.
...操作符, 可以将 props 展开合并到元素里里面.

## 5. 使用 vue-router 实现客户端路由

## 6. 使用 vuex 实现状态管理

mutation 必须是同步函数.
如果是异步的, 可以使用 action.

## 7. 对 vue 组件进行测试

## 附录 A 搭建 vue 开发环境

## 附录 B vue 与 react
