JavaScript 忍者秘籍
6-18
6-23 60min+70min

10:30-11:00 11:18-11:38 11:48-12:08
1-111

函数是根基

回调的概念: 我们定义一个函数, 以便其他一些代码在适当的时机回头再调用他.

java的this依赖于函数的声明, JavaScript的this, 依赖于函数的调用.
JavaScript的this称为调用上下文(invocation context).

函数调用的4种方式
1. 作为函数调用, this是window
2. 作为一个方法进行调用, 是对象上进行调用, 支持面向对象编程
3. 作为构造器调用, 创建一个新对象, 我觉得这个纯粹就是学java, 没有其他别的好处
4. 通过apply()或者call()方法调用


构造器其实就是对象字面量的一个写法…

函数可以即用即弃—匿名函数

callee 指向当前所执行的函数, 不过最好不要使用, 即将废弃.

因为函数也是对象, 也可以有自己的属性和方法!!!
缓存“耗费性能的大型计算结果”, 例如计算大素数

7-7
22:38--22:51 精力不足, 明天继续
第五章
闭包是什么, 他是如何工作的?
闭包就是一个函数在创建的时候, 允许该自身函数访问并操作该自身函数之外的变量时, 所创建的作用域.
需要特别记住的一点是, 声明函数在后续什么时候都可以被调用, 即使是声明时的作用域消失之后--其实是因为闭包保存了一系列的“作用域链”.

利用闭包简化开发
利用闭包提高性能???
利用闭包解决常见的作用域问题

闭包
只要是函数式编程语言, 就会有闭包.
如果是面向对象的非函数式语言, 可以使用类来直接拥有闭包的功能, 但是, 闭包远远不止于存储数据和状态.

