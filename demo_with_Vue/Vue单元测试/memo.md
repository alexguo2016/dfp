### Vue的单元测试
- 似乎可以使用Karma进行自动化测试
- 不需要在组件中加入其他操作, 测试文件和代码文件是分离的
- 可以使用任何断言苦或测试工具, 例如Jasmine2.0
- 如果组件的渲染是由它的props决定的, 这样的组件更加便于测试, 相当于测试一个纯函数
- 由于Vue进行异步更新DOM, 一些这类的断言, 必须在Vue.nextTick回调中进行


### Vue组件的单元测试
- Vue的单文件组件, 便于测试, 尤其是在开发新特性的时候, 不会破坏现有的实现
- 单元测试应该
  1. 可以快速运行
  1. 易于理解
  1. 只测试一个独立单元的工作
- 可以引入一个工厂函数, 函数内有
  1. 提示信息
  1. 提示操作
  1. 错误信息以及反馈
- 单元测试只是整个测试流程中最简单的一部分, 也是很有效的一部分
- 其他测试有, 快照对比测试, 端到端测试, 等等

### Vue Test Utils
Vue.js官方的单元测试工具库

- 安装
  git clone https://github.com/vuejs/vue-test-utils-getting-started
  cd vue-test-utils-getting-started
  npm install
- 挂载组件
  Vue Test Utils 测试的流程是, 将组件隔离挂载(加载??), 模拟必要的输入(prop, 注入和用户事件), 对输出的结果进行断言(expect)
- 记住, Vue关注视图层, Vue的单元测试必然也是注重视图层, 所以, 挂载组件进行测试, 第一件事, 就是测试渲染出来的HTML是否符合预期
- 模拟用户交互
  var a = wrapper.find()可以用于找到元素, a.trigger('click')可以模拟一次click事件
- nextTick(异步的情况)
  Vue是数据驱动的, 如果有一系列由异步数据更新而带来的的DOM更新, Vue会等待所有数据更新完毕之后再更新DOM
  如果确实需要改进回调, 则在事件循环中使用Vue.nextTick
  注意, 由于测试运行器内部使用了Promise, 在使用nextTick的时候, 可能其内部错误不会被捕获, 解决办法1. 全局done回调, 2. 作为一个不带参数的Promise返回

#### 常用技巧, 注意, 提示
要测试的是什么
- 不需要太琐碎的, 过于关注内部实现的测试
- 和其他语言的测试类似, 断言组件的接口, 输入和输出正确即可, 黑盒测试, 关注接口
https://www.youtube.com/watch?v=OIpfWTThrK8, 关于测试的演讲

浅渲染
可以使用shallowMount(Component), 来选择性加载所需的组件, 加快测试

断言触发事件
- 可以使用wrapper.vm.$emit('func', args)来触发事件
- wrapper.emitted()取回事件记录
- 可以调用 wrapper.emittedByOrder() 获取一个按触发先后排序的事件数组

操作组件状态
- wrapper.setData({ count: 10 })
- wrapper.setProps({ foo: 'bar' })

仿造 Prop
你可以使用 Vue 在内置 propsData 选项向组件传入 prop：
```javascript
import { mount } from '@vue/test-utils'
mount(Component, {
  propsData: {
    aProp: 'some value'
  }
})
```
