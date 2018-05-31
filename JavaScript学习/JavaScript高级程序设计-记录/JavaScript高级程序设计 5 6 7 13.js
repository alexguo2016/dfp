chapter 5
引用类型
{
    主要包括：
    {
        1、Object类型
        2、Array类型
        3、Date类型
        4、RegExp类型
        5、Function类型
        6、基本包装类型
        7、单体内置对象
    }

    Object类型
    JavaScript对象,万物的根本
    {
        1、定义的方法有
            1、使用构造函数
            var a = new Object()
            2、使用对象字面量的方法
            var a = {
                name: 'a',
                talk: function() {console.log('meow!!')},
            }
        2、给Object类型增加或者修改属性或者方法,只要直接赋值即可,例如
            a.name = 'Cat'
            a.talk = function() {console.log('meow!!')}
        3、访问Object的属性或者方法有两种方式
            1、'.'点运算符
            2、‘[]’方括号语法
            一般来说,方括号语法有可以拼接字符串,可以使用变量,可以使用关键字或者保留字等等方便的特性
            注意：除非必须使用方括号语法,否则尽量使用点运算符
    }

    Array类型
    数组类型,非常常用的类型
    {
        1、和Java等语言的数组类型相比,JavaScript中的数组特点有
            1、可以近乎无限延伸,length属性不需要维护,自动变更
            2、数组元素可以是不同的类型
        2、定义的方法有
            1、使用构造函数
            var a = new Array('arr')
            也可以省略new
            var a = Array('arr')
            2、使用字面量的方式
            var a = [1, 2, 3]
        3、由于数组类型是Object派生出来的,所以var a = new Array('arr');console.log(typeof a)输出的是object,如果需要准确判断类型,需要使用以下的方式
        Array.isArray(a)方法,返回true,a就是数组类型
        当然,更加准确的方法是Object.prototype.toString.call(a),如果a是数组,返回的是"[object Array]"
        4、数组类型的转换
            toString(),toLocalString()和valueOf()
            例如
            var a = [1, 2, 3]
            a.toString()-->"1,2,3"  字符串
            a.toLocalString()-->"1,2,3"  字符串
            a.valueOf()-->[1, 2, 3] 数组对象
            当然,这些方法都可以自己手动修改
        5、栈方法
            用于模拟出栈这种数据结构的方法
            push(),pop()
            var a = [1, 2, 3]
            a.push(4)-->输出数组长度 4, a变成[1, 2, 3, 4]
            a.pop()-->输出 4, a变成[1, 2, 3]
        6、队列方法
            用于模拟队列这种数据结构的方法
            shift(),unshift()
            var a = [1, 2, 3]
            a.shift()-->输出1, a变成[2, 3]
            a.unshift('test')-->输出数组长度3,a变成['test', 2, 3]
        7、重排序方法
            返回的都是数组,重排序之后的数组
            1、reverse()
            var a = [1, 2, 3]
            a.reverse()-->[3, 2, 1]
            2、sort()
            不带参数,则为升序排列

            如果接收一个函数,则可以自定义排列,例如
            var a = [5, 2, 3, 8]
            //降序排列
            var upSort = function(value1, value2) {
                if (value1 < value2) {
                    return 1
                } else if (value1 > value2) {
                    return -1
                } else {
                    return 0
                }
            }
            a.sort(upSort) -->[8, 5, 3, 2]
        8、操作方法
            1、concat() 返回拼接之后的数组
            a.concat(b),将a数组和b数组拼接在一起
            2、splice()	返回原数组中被删除的部分
            删除操作,a.splice(0, 3) 删除前3个元素
            插入操作,a.splice(3, 0, 'xxx', 'yyy')在index为3开始,删除0个元素,插入'xxx'和'yyy'
            替换,a.splice(3, 1, 'xxx')在index为3的位置上,将原来的元素替换为'xxx'
        9、位置方法
            1、indexOf()
            返回第一个符合条件的index,如果没有,返回-1
            var a = [5, 2, 3, 8, 8, 8]
            a.indexOf(8)--> 3
            2、lastIndexOf()
            返回最后一个符合条件的index,如果没有,返回-1
            var a = [5, 2, 3, 8, 8, 8]
            a.lastIndexOf(8)--> 5
        10、迭代方法
            every()
            map()
            filter()
            forEach()
            some()
            都不会修改原数组的元素,基本上都是对数组每个元素进行一系列的操作,例如
            var a = [5, 2, 3, 8, 8, 8]
            var newa = a.map(function(item, index, array) {
                return item * 2
            })
            console.log(newa)-->[10, 4, 6, 16, 16, 16]
        11、归并方法
            用于数组求和或者折叠数组,返回一个值
            reduce()和reduceRight()
            例如
            var a = [5, 2, 3, 8, 8, 8]
            var sum = a.reduce(function(prev, cur, index, array) {
                return prev + cur
            })
            console.log(sum)-->34
    }

    Date类型
    和Java一样,基于1970.1.1 零点的计时方法,毫秒数
    {
        1、创建
            可以使用Date构造函数,例如
            var d = new Date()-->Thu May 31 2018 17:34:42 GMT+0800 (中国标准时间)
            或者使用
            Date.parse()方法,接收一个特定格式的日期字符串
        2、Date类型也有toString(),toLocalString()和valueOf()方法,前两个返回日期的字符串,valueOf()返回毫秒数
        3、日期格式化
            和toString()方法一样,返回特定格式的日期字符串
        4、日期方法
            getTime()-->获得毫秒数
            setTime()-->设置毫秒数
            getMonth()-->获得月份信息,0表示1月
            getDay()-->获取日期信息,00表示星期日
            getHours()-->小时数0-23
            等等
    }

    RegExp类型
    正则类型,用于模式匹配
    {
        暂时不写
    }

    Function类型
    函数实际上是对象。函数名是指向对象的指针。
    {
        1、JavaScript函数没有重载的概念
            只要同名的函数,一定是后面定义的函数覆盖前面定义的函数
        2、函数声明与函数表达式
            函数声明类似于
            function a() {}
            函数表达式类似于
            var a = function() {}

            函数声明有函数声明提升的特质
            一般来说,都使用函数表达式
        3、由于函数是对象,所以,函数也可以作为一个值传入到其他函数里
        4、函数的内部属性
            主要的内部属性是
            1、arguments 传入的所有参数组成的一个类似数组的对象
            2、this
            3、callee和caller callee指向被调用的函数,caller指向调用者
        5、函数的属性和方法
            主要是
            1、call()
            2、apply()
            3、bind()
            都是改变函数的作用域,前两个区别在于第二个参数,call后面的参数是完整的参数列表,apply则是由参数构成的一个数组。
            a.talk.bind(xx),表示由xx来调用talk方法。
    }

    基本包装类型
    Boolean,Number,String,类似于Java的自动装箱
    {
        这样包装一下,使得这些对应的基本数据类型和对象看起来一样了。
        例如
        var a = new String('aaa')
        这个对象只存在于这一行代码执行的瞬间
        也可以用于转型,例如
        var a = '11'
        var b = Number(a)
        console.log(b)-->11
        特别需要注意的是,如果不是非常需要,禁止使用Boolean对象。
        Number类型有一些方法比较好用,例如
        toString(arg),可以根据参数的不同,得到不同进制的结果
        toFixed(n),返回指定小数位的结果
        toExponenetial(n),返回指定保留位的科学计数表示

        String类型也有比较常用的方法
        charCodeAt(n)
        charAt(n)
        等等
    }

    单体内置对象
    由ECMAScript提供的,不依赖宿主的对象。在ECMAScript程序执行之前已经存在。
    {
        1、内置对象Global,全局对象
        2、Math对象

    }
}


chapter 6
面向对象的程序设计
{
    1、对象详解
        除了之前Object的特性之外,还有一些详细的属性需要注意,例如
        1、数据属性,例如o.name,它有一系列的属性
            可配置 Configurable
            可枚举 Enumerable
            可写 Writable
            属性的数据值 Value
            这些值可以使用Object.defineProperty(obj, key, {...})来设定
        2、访问器属性
            将Value替代成
            Get和Set
            分别对应读取和写入数据的操作,getter和setter函数
            设定的方法同上
        可以使用Object.defineProperties()来一次性设定多个属性
        3、读取属性值
            使用Object.getOwnPropertyDescriptor(obj, key)来读取key的属性值
    2、创建对象
        1、字面量
        2、工厂模式
            例如之前用于清洗数据的函数就是一个工程模式
            var clearedObj = function(name, num, height) {
                var o = {}
                o.name = name
                o.num = num
                o.height = height
                return o
            }
            其缺点是,返回的o都是Object,并不知道其具体类型。
        3、构造函数模式
            var Person = function(name, age) {
                this.name = name
                this.age = age
                this.talk = function() {
                    console.log('Meow!!')
                }
            }
            var p1 = new Person('kitty', 33)
            优点是可以知道p1的类型就是Person,p1 instanceof Person -->true
            其缺点最主要是talk方法每一个对象都有,很浪费。
        4、原型模式
            所有的实例共享属性和方法
            var Person = function() {}
            Person.prototype.name = 'Nick'
            Person.prototype.age = '25'
            Person.prototype.talk = function() {
                console.log('Meow!!')
            }
            var p1 = new Person()
            p1.name = 'Clack'
            p1.age = '55'--> p1 是 Person {name: "Clack", age: "55"}
            使用原型模式时,每个对象一开始都有共享的属性和方法,而且修改的时候按需修改即可,并没有太大的浪费。

            需要注意的是,在查询实例的属性或者方法的时候,如果实例上面有(即自己复写了属性或者方法),直接读取实例的,否则向原型找,这里是Person

            可以有更加简单的原型模式写法
            var Person = function() {}
            Person.prototype = {
                name: 'Nick',
                age: '25',
                talk: function() {
                    console.log('Meow!!')
                },
            }
            这样写,constructor属性被重置,并不是指向Person了,需要手动设置,例如
            var Person = function() {}
            Person.prototype = {
                constructor: Person,
                name: 'Nick',
                age: '25',
                talk: function() {
                    console.log('Meow!!')
                },
            }
            这样写带来的问题是,原来一开始constructor属性是不可枚举的,现在手动更改之后变成可枚举了。

            原型模式最大的问题是原型污染。
            如果原型中某个属性是引用数据类型,例如Array,Person.house = ['bigHouse', 'littleHouse']这样,一旦某个实例改变了这个属性,全部有关的实例以及原型上的house属性都会被更改。

        5、组合模式
            组合使用构造函数以及原型模式,是目前最广泛使用的模式。例如
            var Person = function(name, age, house) {
                this.name = name
                this.age = age
                this.house = house
            }
            Person.prototype = {
                constructor: Person,
                talk: function() {
                    console.log('Meow!!')
                }
            }
            var p1 = new Person('nick', '25', ['bigHouse', 'littleHouse'])
            var p2 = new Person('kate', '33', ['bigHouse'])
            p1-->Person {name: "nick", age: "25", house: Array[2]}
            p2-->Person {name: "kate", age: "33", house: Array[1]}
            这个模式的好处是,每个实例初始化的时候,共用的方法都只有一个,私有的属性例如age等等都是互不干扰的

        6、动态原型模式
            一种看起来比较OO的方法。其实就是在内部加一次判断,看看是否需要创建共有方法或者属性,减少了浪费
            var Person = function(name, age) {
                this.name = name
                this.age = age
                if (typeof this.talk != 'function') {
                    Persion.prototype.talk = function() {
                        console.log('Meow!!')
                    }
                }
            }

        7、寄生构造函数模式
            类似工厂模式
        8、稳妥构造函数模式
            于寄生构造函数类似,但是不使用new,不使用this

    3、继承
        1、原型链
            原型和实例之间的联系在于原型链。
            创建的时候,需要注意一些问题
            Sub.prototype = new Sup()
            1、不要忘记默认的原型,即constructor被重写的时候记得指向回原来的原型
            2、使用instanceof 确定原型和实例之间的关系
            3、在原型中定义方法,一定要放在替换原型的语句之后
            原型链的问题和原型模式一样。如果共有属性是引用数据类型,会被污染

        2、借用构造函数
            例如
            var Sup = function() {
                this.colors = ['red', 'blue']
            }
            var Sub = function() {
                Sup.call(this)
            }
            Sub构造函数借用了Sup的
            其问题在于复用困难

        3、组合继承
            使用构造函数实现实例属性初始化
            使用原型链实现公有方法

        4、原型式继承
        5、寄生式继承
        6、寄生组合式继承

}

chapter 7
函数表达式
{
    使用之前先声明
    不要在语句中使用函数声明,可以使用函数表达式
    1、递归
        递归需要设定结束条件
        注意使用的函数名改变的情况
    2、闭包
        可能是原型链和变量生命周期的关系？并没有完全搞懂。反正是函数内部的函数可以访问外层函数的变量,并且可以作为储存数据的一种方式。
    3、this
        指向调用者
    4、模仿块级作用域
        (function() {这里是块级作用域})() 实际上(function() {})是一个函数表达式,只是被立刻调用而且里面的变量在调用后失效。
    5、私有变量
        JavaScript没有私有成员的概念,但是可以模仿。
        类似于访问器属性getter和setter的方法

        静态私有变量

        模块模式(单例模式)

        增强的模块模式
}

chapter 13
事件
{
    1、事件流
        事件捕获与事件冒泡
        区别在于前者是从根节点开始向内寻找,后者是从触发点向根节点扩散

    2、事件处理程序
        DOM0级
        var btn = document.querySelector('button')
        btn.onclick = function() {}
        DOM2级
        btn.addEventListener('click', function(evnet) {}, boolean)最后一个参数如果是true,表示在捕获阶段处理事件,false则是在冒泡阶段,默认false

        IE
        略

    3、事件对象event
        有多种属性,例如target,value,key等等
        特别需要注意的是它的几个方法,例如
        1、阻止默认事件
            event.preventDefault()
        2、停止冒泡
            event.stopPropagation()
        IE
        略

    4、事件类型
        UI,焦点,鼠标,滚轮等等
        用的时候再查。

    5、事件委托
        利用事件冒泡，在父元素上面绑定一个addEventListener实现

    6、模拟事件
        使用document.createEvent()创建event对象
}
