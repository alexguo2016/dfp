Class与Style绑定

Class绑定
1. 绑定HTML class
类似classList的toggle操作, 可以使用v-bind:class='{{active: isActive}}'指令来实现, class的存在与否, 取决于isActive的boolean值

可以有多个class属性同时存在, 例如v-bind:class='{{active: isActive, 'text-danger': hasError}}'
当这些boolean值变化的时候,  class列表将相应地变化

也可以和计算属性结合使用

2. 数组语法
<div v-bind:class="[activeClass, errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}


Style绑定
1. 类似react, 绑定的是一个对象, 里面类似css的属性
和Class绑定一样, 有数组语法, 用于绑定多个样式
