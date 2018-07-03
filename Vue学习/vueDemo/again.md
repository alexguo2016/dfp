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
```html
<div class="" id='com2'>
    <div class="" :style="{fontSize: postFontSize + 'em'}">
        <blog-test v-for='d in props'
        v-bind:k='d'
        v-on:larger="function() {postFontSize += 0.1}"
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
