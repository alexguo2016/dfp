基础部分
===

## Vue实例 ##
### 创建一个新实例 ###
所有的Vue应用都是Vue实例, 所有的Vue组件都是Vue的实例  
```javascript
var vm = new Vue({
    //选项对象的内容
})
```

### 数据与方法 ###
Vue实例中, data对象的属性是响应式的, 这个值发生改变的时候, 视图将会产生改变  
- 后面添加的data的属性, 并不是响应式的
- 如果设置了Object.freeze(obj), 则这个obj会被阻止改变, 不再是响应式的了

### 实例生命周期钩子 ###
自动执行的一些函数, 用法和__main()类似

## 模版语法 ##
- 插值  {{ 变量或者表达式 }}
- 原始HTML <div v-html="变量或者表达式"></div>
- 特性 <div v-bind:'特性名'='变量或者表达式'></div>
- 指令 例如下面几种:  
    - v-if, 代表该元素是否被显示
    - v-show, 类似于css里面的visiblity
    - v-for, 迭代输出
    - v-bind, 缩写为:
    - v-on, 缩写为@

## 计算属性, 侦听器 ##
### 计算属性 ###
计算属性都在Vue实例中的computed对象中, 写法如下:  
```javascript
//假设依赖于data中的time属性
computed: {
    myTime: function() {
        var res = this.time * 1000
        return res
    }
}
```
后面只需要{{ myTime }}即可使用  
计算属性依赖于data对象中的相应属性, 自动更新  

### 改写计算属性的getter和setter ###
类似ES5, 计算属性可以被写成getter和setter的形式, 例如  
```javascript
//假设依赖于data中的firstName和lastName属性
computed: {
    name: {
        get: function() {
            var res = firstName + " " + lastName
            return res
        },
        set: function(newName) {
            var n = newName.split(' ')
            this.firstName = n[0]
            this.lastName = n[1]
        }
        //这里set的效果是: 如果set("John Tatto"), 那么data中的firstName会变成"John", lastName则是"Tatto"
    }
}
```

### 侦听器 ###
更加通用的观察和响应Vue实例上的数据变动  
侦听器和计算属性类似, 写在Vue实例中的watch对象中,例如  
```javascript
data: {
    firstName: 'a',
    lastName: 'A',
    fullName: 'a A'
},
watch: {
    firstName: function(val) {
        this.fullName = val + ' ' + this.lastName
    },
    lastName: function(val) {
        this.fullName = this.firstName + ' ' + val
    }
}
```  
一般比计算属性繁琐, 但是当数据变化大, 耗资源, 或者异步的时候, 使用侦听器比较合适  

## Class与Style绑定 ##
一般使用v-bind  

### 绑定HTML Class ###
绑定的class可以是一个对象字符串, 例如  
```html
<div v-bind:class='{ show: isShow}'></div>
//取决于isShow的truthiness-->转换之后的boolean值  
...
data: {
    isShow: true,
},
...
```

可以是数组字符串, 例如  
```html
<div v-bind:class="[classOne, classTwo]"></div>

...
data: {
    classOne: 'text-red',
    calssTwo: 'font-size-big',
}
...
//渲染的结果是
<div class='text-red font-size-big'></div>
```

### 绑定内联样式 ###
可以是对象字符串语法, 例如  
```html
<div v-bind:style="{ color: goodColor, fontSize: fs + 'px' }"></div>

...
data: {
    goodColor: 'red',
    fs: 30,
}
...
//渲染的结果是
<div style="color: red; font-size: 30px"></div>
```

也可以使用数组语法  


## 条件渲染 ##
v-if 和 v-show, 类似于display: none和visiblity: false

## 列表渲染 ##
v-for  
只要能迭代的对象都可以使用  

## 事件处理 ##
v-on监听DOM事件, 触发时运行JavaScript代码  
类似于原生JavaScript的事件机制  

需要注意的是, 当一个ViewModel被销毁的时候, 所有的事件处理器都会自动被删除  

### 事件修饰符 ###
- .stop
- .prevent
- .capture
- .self  

等等
### 按键修饰符 ###
例如 v-on:keydown.enter="sumit"

### 系统的修饰键 ###
- .ctrl
- .alt
- .shift
- .meta--> 如果是window系统, 对应window键, mac对应command键  

在和keyup事件一起用时, 表示例如 按下ctrl键同时松开keyup设定的键, 事件才会被触发  

### 鼠标按钮修饰符 ###
- .left
- .right
- . middle

特定响应鼠标的按钮


## 表单输入绑定 ##
可以使用v-model在input和textarea元素上创建双向绑定.  

需要注意的是, v-model会忽略所有表单元素的value, checked, selected特性的初始值而总将Vue市里的数据作为数据来源.  
另外, 在使用一些输入法的时候, v-model并不会实时更新, 请使用的input事件.  

### input ###
常规用法

### textarea ###
注意, 在textarea内使用{{ msg }}这种插值并不会生效, 应该用v-model代替  

### 复选框 ###
单个复选框, 绑定到布尔值, 例如  
```html
<input type='checkbox' v-model='checked'>
//现在是false状态
data: {
    checked: false
}
```

多个复选框, 绑定到同一个数组, 例如  
```html
<div id='checkboxes'>
    <input type="checkbox" id='apple' value='apple' v-model-'checkedNames'>
    <label for="apple">Apple</label>
    <input type="checkbox" id='pear' value='pear' v-model-'checkedNames'>
    <label for="apple">Pear</label>
    <input type="checkbox" id='melon' value='melon' v-model-'checkedNames'>
    <label for="apple">Melon</label>
    <hr>
    <span>your choice is: {{ checkedNames }}</span>
</div>
<script type="text/javascript">
    var app1 = new Vue({
        el: '#checkboxes',
        data: {
            checkedNames: []
        }
    })
</script>
```

### 单选框 ###
类似多个复选框  

### 选择框 ###
注意, 如果选择框的表达式v-model的初始值未能匹配任何选项, select 元素将渲染为未选中状态, 在ios中, 会导致用户无法选择第一个选项, 规避的办法是, 将第一个选项设置为禁用  

单选例子  
```html
<div class="" id = 'sel-1'>
    <select class="" name="" v-model='selected'>
        <option disabled value=''>请选择</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
    </select>
    <hr>
    <span>your selected is : {{ selected }}</span>
</div>
<script type="text/javascript">
    var sel1 = new Vue({
        el: '#sel-1',
        data: {
            selected: ''
        }
    })
</script>
```

多选的例子  
```html
<div class="" id = 'sel-2'>
    <select class="" name="" multiple v-model='selected'>
        <option disabled value=''>请选择</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
    </select>
    <hr>
    <span>your selected is : {{ selected }}</span>
</div>
<script type="text/javascript">
    var sel1 = new Vue({
        el: '#sel-2',
        data: {
            selected: ''
        }
    })
</script>
```

### 值绑定 ###
如上面的例子, 选中的时候, 显示的是对应的value的字符串.  
其实可以自定义成其他类型, 需要使用v-bind, 例如  
```html
<input type="checkbox" name="" value="" v-model='toggle' true-value='yes' false-value='no'>
<!-- 当选中的时候, 显示yes, 反之no -->
<input type="radio" v-model='pick' v-bind:value='a'>
<!-- 当选中时, vm.pick === vm.a -->
<select class="" name="" v-model='selected'>
    <option v-bind:value="{ number: 123} ">123</option>
</select>
<!-- 当选中时, typeof vm.selected == 'object'
    vm.selected.number == 123
 -->
```

### 修饰符 ###
- .lazy 在默认的情况下, v-model在每次input事件触发后引起数据同步, 如果添加.lazy修饰符, 会转变为使用change事件进行同步  
- .number 自动将用户的输入值转换为数值类型, 可以给v-model添加number修饰符
    ```html
    <input type="text" v-model:myNumber.number='age'>
    ```
- .trim 将自动过滤用户输入的首尾空白字符, 可以给v-model添加trim修饰符  

## 组件基础 ##
### 组件的定义 ###
- 对象, 例如  
    ```html
    <div class="com1" id = 'com1'>
        <div class="">
            {{ test }}
        </div>
        <Mycomponent></Mycomponent>
    </div>
    <script type="text/javascript">
        //定义了一个全局组件, 注意, 组件第一个字母必须大写
        Vue.component('Mycomponent', {
            data: function() {
                var d = {
                    count: 0
                }
                return d
            },
            template: `
            <div>
                <button v-on:click='plus'>You have click {{ count }} times. </button>
            </div>
            `,
            methods: {
                plus: function() {
                    this.count++
                }
            }
        })

        var com1 = new Vue({
            el: '#com1',
            data: {
                test: 'test'
            }
        })
    </script>
    ```
- extends

也可以在Vue实例中定义组件, 这样的组件只能在这个实例中使用, 是局部的  

在组件的可被使用的范围内, 组件可以被复用, 每个组件的data不相干扰  

### 组件的组织 ###
树状结构  

### 通过prop向子组建传递数据 ###
```html
<div class="" id='com2'>
    <div class="">
        <blog-test v-for='d in props'
        v-bind:k='d'></blog-test>
        <!-- bind后面的k指的是组件的props -->
    </div>
    <div class="">
        {{ test }}
    </div>
</div>
<script type="text/javascript">
    Vue.component('blog-test', {
        data: function() {

        },
        props: ['k'],
        template: `
        <div>
            id: {{ k.id }} and content: {{ k.content }}
        </div>
        `
    })

    var com2 = new Vue({
        el: '#com2',
        data: {
            test: 'test',
            props: [
                {
                    id:1,
                    content: 'firstBlog',
                },
                {
                    id:2,
                    content: 'secondBlog',
                },
                {
                    id:3,
                    content: 'thridBlog',
                },
            ]
        },
    })
</script>
```

### 通过事件向父级组件发送消息 ###
$emit方法, 向父组件触发一个事件, 属于Vue实例的自定义事件系统的一个方法, 例子如下  
总的来说, 就是子组件$emit父组件的方法, 父组件的这个方法监听子组件, 改变父组件中的属性  
```html
<div class="" id='com2'>
    <div class="" :style="{fontSize: postFontSize + 'em'}">
        <blog-test v-for='d in props'
        v-bind:k='d'
        v-on:larger="postFontSize += 0.1"
        ></blog-test>
        <!-- bind后面的k指的是组件的props -->
        <br>

    </div>
    <div class="">
        {{ test }}
        {{ postFontSize }}
    </div>
</div>
<script type="text/javascript">
    Vue.component('blog-test', {
        data: function() {

        },
        props: ['k'],
        template: `
        <div>
            id: {{ k.id }} and content: {{ k.content }}
            <br>
            <button type="button" name="button"
            v-on:click="$emit('larger')"
            >larger</button>
        </div>
        `,
    })

    var com2 = new Vue({
        el: '#com2',
        data: {
            test: 'test',
            postFontSize: 1,
            props: [
                {
                    id:1,
                    content: 'firstBlog',
                },
                {
                    id:2,
                    content: 'secondBlog',
                },
                {
                    id:3,
                    content: 'thridBlog',
                },
            ],
        },
    })
</script>
```

### 使用事件抛出一个值 ###
$emit的第二个参数, 可以提供被emit的函数的参数, 这个参数被$event在父组件中被访问  
```html
<!-- 父组件 -->
<blog-test v-for='d in props'
v-bind:k='d'
v-on:larger="postFontSize += $event"
></blog-test>
<!-- 子组件 -->
<button type="button" name="button"
v-on:click="$emit('larger', 0.2)"
>larger</button>
```

### 在组件上使用v-model ###
v-model是一个语法糖, 内部原理如下  
```html
<input v-model='myText'>
<!-- 等价于 -->
<input
v-bind:value='myText'
v-on:input='myText = $event.target.value'
>
```

如果在组件中使用v-model, 则相当于下面  
```html
<custom-input
v-bind:value='myText'
v-on:input='myText = $event'
></custom-input>
```
```javascript
Vue.component('custom-input', {
    props: ['value'],
    template: `
        <input
            v-bind:value='value'
            v-on:input='$emit("input", $event.target.value)'
        >
    `
})
```
```html
<!-- 使用组件 -->
<div class="" id='com5'>
    <custom-input v-model='myText'></custom-input>
    <h2>输入的内容是</h2>
    <span>{{myText}}</span>
</div>
<script type="text/javascript">
    Vue.component('custom-input', {
        props: ['value'],
        template: `
            <input
                v-bind:value='value'
                v-on:input='$emit("input", $event.target.value)'
                //关键在这里
            >
            <br>

        `
    })

    var com5 = new Vue({
        el: '#com5',
        data: {
            // myText: 'sss'
        },
        props: ['myText']
    })
</script>
```  

### 通过插槽分发内容 ###
使用Vue自定义的 slot 元素  
```javascript
Vue.component('alert-box', {
    template: `
        <div class='demo-alert-box'>
            <strong>Error</strong>
            <slot></slot>
        </div>
    `
})
```

### 动态组件 ###
组件切换, 使用 component 元素的 特殊的 is 特性来实现  
```html
<component v-bind:is="currentTabComponent"></component>
<!-- 组件会在currentTabComponent改变时改变 -->
```

### 解析DOM模版时的注意事项 ###
注意表单元素内部的元素, 如果需要变通, 可以使用is特性  

---

深入了解组件
==
## 组件注册 ##
### 组件名 ###
强烈建议遵循W3C的规范: 字母全小写, 必须包含一个连字符  

### 全局注册 ###
```javascript
Vue.component('xxx-yyy', {

})
```

### 局部注册 ###
如果使用webpack类似的构建系统, 使用全局注册的组件会导致用户下载了不必要的JavaScript  
可以通过一个普通的JavaScript对象来定义组件  
```javascript
var ComponentA = {
    // 内容
}
var ComponentB = {
    // 内容
}
var ComponentC = {
    // 内容
}
```
然后在Vue实例中的components选项中定义你自己想要使用的组件  
```javascript
new Vue({
    el: '#app',
    data: {},
    components: {
        'component-a': ComponentA,
        'component-b': ComponentB,
    }
})
```

需要注意的是, <b>局部注册的组件在其子组件中</b>不可用, 如果需要嵌套使用, 那么需要这样  
```javascript
var ComponentA = { /* ... */ }
var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
```

### 模块系统 ###
暂时略过  

## Prop ##
### prop的大小写 ###
由于HTML的特性名是大小写不敏感的, 在使用DOM中的模版时, 驼峰命名法要换成短横线分隔命名  

### prop类型 ###
之前使用的prop都是字符串类型, 如果需要指定类型, 可以这样  
```javascript
props: {
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
}
```

### 传递静态或动态prop ###
```html
<my-blog title='this is a blog'></my-blog>
<!-- 传递静态的值 -->
```

```html
<my-blog v-bind:title='post.title'></my-blog>
<!-- 通过v-bind传递一个变量的值, 动态赋值 -->
```

上面都是传入字符串的情况, 如果需要传入其他类型的值, 有一些细微的不同  
- 传入数字
    ```html
    <my-blog v-bind:likes='42'></my-blog>
    <my-blog v-bind:likes='post.likes'></my-blog>
    <!-- 无论是静态或者动态, 都需要使用v-bind -->
    ```

- 传入布尔值
    ```html
    <my-blog is-published></my-blog>
    <!-- 包含该prop没有值的情况, 都表示 true -->

    <!-- 如果使用v-bind, 则需要表明 'false', 这是一个表达式, 不是一个字符串, 来表示 false -->
    <my-blog v-bind:is-published='false'></my-blog>

    <!-- 变量版本 -->
    <my-blog v-bind:is-published='post.isPublished'></my-blog>
    ```

- 传入一个数组
    ```html
    <!-- 和传入数字的情况类似, 一定要使用v-bind -->
    ```

- 传入一个对象
    ```html
    <!-- 和数组类似, 使用v-bind, 特别地, 如果是数组或者对象, 静态的例如'[1, 2, 3]'或者'{ age: 33, name: "Alex" }' 都不是字符串, 而是一个表达式 -->
    ```

- 传入一个对象的所有属性
    ```html
    <script type="text/javascript">
        post: {
            id: 1,
            title: 'myFirstBlog'
        }
    </script>

    <my-blog v-bind='post'></my-blog>
    <my-blog v-bind:id='post.id' v-bind:title='post.title'></my-blog>
    <!-- 上面两个组件完全等价, 有点类似于结构赋值 -->
    ```

### 单向数据流 ###
Vue设计为父组件的prop单向下行, 子组件不能反过来影响父组件  
所以不应该改变子组件中的prop, 如果需要接收prop并且作一系列的操作, 可以有以下两种对应的情形  
1. prop传递一个初始值, 子组件接下来希望将其作为一个本地的prop数据来使用, 这时候, 最好定义一个子组件的data, 并且复制为prop
    ```javascript
    // 子组件的内部设置
    props: ['initCounter'],
    data: function() {
        return {
            counter: this.initCounter
        }
    }
    ```

2. prop作为原始的值传入并且需要进行转换, 一般使用计算属性
    ```javascript
    // 子组件的内部设置
    props: ['initCounter'],
    computed: {
        // 注意, 和子组件的data一样, 都需要返回一个函数, 函数内返回对象
        formatCounter: function() {
            return this.initCounter.trim().toLowerCase()
        }
    }
    ```

### props验证 ###
```javascript
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 匹配任何类型)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```
