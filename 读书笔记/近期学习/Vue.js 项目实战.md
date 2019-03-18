# vue.js 项目实战

## 第二章

使用下面这个库, 可以方便地将 markdown 格式转换成 html 格式

```html
<script src="https://unpkg.com/marked"></script>
```

属性侦听器还有另外的参数, deep 和 immediately, 第一个表示是不是深入到对象内部的属性变化, 第二个是表示是否一变化就触发函数, 例如

```js
watch: {
  target: {
    handler(val, oldval) {},
    deep: false,
    immediately: false,
    // 默认都是false, 平时可以不管直接使用
  },

  // 如果在methods里面有一些方法被调用, 可以这样简写
  simpleTarget: 'onUse',

  // 平时的写法
  test: (val, oldval) => {}

},

methods: {
  onUse(val, oldval) {}
}
```

写网页的时候, 要注意 title 等等属性, 规范化.

v-for 的时候, 可以 in, 也可以 of

注意, 用了 computed 或者 watch 之后, 其实需要将思维转到数据驱动上面去.

注意, 数组方法 sort 也会改变原数组.

## 第三章

可复用的组件, 组件之间的相互通信.

开始将 data 分开来写, 单独写成一个 state.js 文件, 里面有一个 state 对象.

注意 click.native 的使用, 如果是想点击组件而不想使用 emit 等通信, 需要这样设置, 因为 Vue 的自定义事件与浏览器事件系统是完全分开的.

因为 css 等等原因, 构建的时候, 元素无法被点击, 也可能是我代码有误吧? 不过这章的重点在于组件, 组件的通信和 transition 动画效果, 看懂就行了.

## 第四章

开始使用 vue-cli.

vue init webpack-simple demo, 可以创建一个 webpack 的简单 demo 脚手架, 不过更加常用的是 vue init webpack demo

虽然现在写 vue 使用的是模版, 但是, jsx 语法才是更加灵活的.

渲染函数可以直接使用 import Vue 文件, ...该文件, 这样的方法来替代, 好处是: 没有了多余的上层结构, 直接就是我们的 Vue 文件内容.

Pug, 以前被称为 Jade, 可以编译到 HTML 的语言, 在 template 里面设置 lang 即可使用这种语言.
似乎挺好用, 看看, 学学.

stylus 也是, 比起 sass 更加年轻的预处理器, 也可以看看

JSX 渲染函数

如果使用了 router-view, 必须在渲染函数里面导入 router, 例如 main.js 这样写

```js
import Vue from "vue";
import "babel-polyfill";
import AppLayout from "./components/AppLayout.vue";
import router from "./router";

new Vue({
  el: "#app",
  render: h => h(AppLayout),
  router
});
```

router-link, 使用的时候, 可能 home 页面对应的是/, 那么所有页面都是可以匹配的, 可能会有一些 bug, 如果这样写

```html
<router-link :to="{name: home}" exact>homme</router-link>
```

就只能是精确匹配

mixin 的本质其实就是一个对象, 我们可以带参数来使用这个对象.

所谓插件, 就是依附到 Vue 的 prototype 上面去.
