# 你不知道的 JavaScript 上卷

## 第一部分 作用域和闭包

这套书的目的是: 知其然而知其所以然

13:50--14:34
P1--10

### 第一章, 作用域是什么

变量, 将状态带给了程序.
这里会讲到的是, 变量储存在哪里? 程序需要它们的时候, 如何找到它们?

#### 编译原理

事实上 javascript 是一门编译语言.
它不是提前编译的, 编译结果也不能在分布式系统中进行移植.

在编译语言的流程中, 源代码在执行之前的三个步骤--编译:

1. 分词/词法分析(Tokenizing/Lexing)
   将字符串分解成对语言来说有意义的代码块--词法单元(token), 例如: var a = 2-->var, a, =, 2, 空格

2. 解析/语法分析(Parsing)
   讲词法单元流(数组)转换成逐级嵌套组成的程序语法结构的树, 抽象语法树(AST).

3. 代码生成
   将 AST 转换成可执行的代码, 即转化成一族机器指令.

JavaScript 引擎比起上面的步骤要复杂. 例如在词法分析和代码生成阶段都有特定的步骤进行性能优化, 例如对冗余元素进行优化等等.
js 和其他编译语言不同的是, 他的编译在代码执行前的几微秒内完成, 所以它使用了例如 JIT 等等技术来保证性能最佳. 几乎是编译程序之后马上就执行.

#### 理解作用域

需要理解的角色

1. 引擎, 整个 js 程序的编译和执行过程
1. 编译器, 服装语法分析和代码生成等等
1. 作用域, 负责收集并维护所以声明的标识符, 确定标识符的访问权限

##### 例子, var a = 2

这个程序的伪代码是: 为一个变量分配内存, 命名为 a, 然后将值 2 保存进这个变量.

事实上, 编译器是这样做的

1. 遇到 var a, 先询问作用域中是否有一个 a 的变量, 如果有, 进行下一步, 如果没有, 会在 当前作用域 中声明一个新的变量, 命名为 a
2. 处理 a = 2, 这个赋值操作.引擎先问作用域, 当前的作用域集合里面是否有 a 变量, 有, 就使用它, 没有, 就继续查找 a

##### 编译器的工作

在刚刚的例子中, 引起执行程序的时候, 会通过查找变量 a 是否已经声明过, 这个过程中, 会对 a 进行 LHS 查询.
当变量在 赋值操作符的左侧的时候, 对其进行 LHS 查询, 在右侧的时候, 进行 RHS 查询.

- LHS, 试图找到变量的容器本身, 从而可以对其进行赋值, 例如 a = 2, 我们不关心 a 当前是什么, 只是取得他的地址
- RHS, “非左侧”, 就是简单地查找某个变量的值, retrieve his source value, 例如 console.log(a), 这里只是查找并取得 a 的值

##### 引擎和作用域之间的交互

```js
function foo(a) {
  console.log(a);
}
foo(2);
```

既有 LHS 也有 RHS
注意, foo(2)里面隐含了一个 a = 2 的 LHS

22:00--22:30
22:51--23:11
P10-20

#### 作用域嵌套

在实际情况中, 通常需要同时顾及几个作用域. 可能会出现作用域嵌套的情况.
如果在当前作用域无法找到某个变量, 就会去外层作用域中查找, 直到抵达最外层的作用域为止.

#### 异常

LHS 和 RHS 是不同的.
在非严格模式下, 如果 LHS 找不到变量名, 引擎会在全局作用域里面声明该变量.
但是, 如果 RHS, 当找不到对应的变量, 引擎就会抛出一个异常, ReferenceError, 如果对该变量进行不合理操作, 就会抛出 TypeError.

### 第二章 词法作用域

js 使用的是词法作用域, 也是大多数编程语言使用的, 其他语言例如 Bash 脚本, 使用的是动态作用域.

#### 词法阶段

编译器的第一个工作阶段是词法化, 对源代码中的字符进行检查.
词法作用域就是定义在词法阶段的作用域.
相当于一个个嵌套的“作用域气泡”, 但是不存在交叉.
作用域查找的时候, 会在找到第一个匹配的标识符时停止.(遮蔽效应)
当然, 如果内层有一个变量, 同时这个变量在全局作用域里面也有定义, 那么, 可以通过 window.a 来对其进行访问.

#### 欺骗词法

欺骗词法作用域会导致性能下降.

##### eval

setTimeout, setInterval 的第一个参数如果是字符串, 也可以达到 eval 的效果, new Function()也是, 不过, 这些应该尽量避免使用.

##### with

##### 性能

js 引擎会在编译阶段对代码进行优化, 优化的是静态分析之后的代码. 如果使用了 eval 等等欺骗手段, js 的优化将不太有效率, 甚至引擎会完全不做优化.

### 第三章 函数作用域和块作用域

10:17--11:03
p21--36

究竟是什么生成了一个新的气泡? 只有函数会生成新的气泡吗? js 中其他结构能生成作用域气泡吗?

#### 函数中的作用域

常见的答案: js 具有给予函数的作用域, 只有函数会生成作用域气泡.
这个答案不完全正确.
函数作用域的含义是指, 属于这个函数的全部变量, 都会在整个函数的范围内使用以及复用.

#### 隐藏内部实现

最小特权原则.
规避冲突, 例如循环的时候, 不要修改 i, 但是, var i = 3 就可以, 因为有遮蔽效应.
规避变量冲突的方法有:

1. 全局命名空间,通常是一个变量, 其他需要的变量都在这个命名空间内, 而不是在全局变量内
2. 模块管理

#### 函数作用域

如果在 function 中 var 再次定义全局作用域中的变量, 会“污染”全局作用域中的变量, 解决方法是使用立即执行函数表达式, 例如

```js
var a = 2(function foo() {
  var a = 3;
  console.log(a); // 3
})();
console.log(a); // 2
```

这里其实就是一个表达式, 不会“污染”, foo 变量也不会在全局作用域中被访问到.

##### 具名和匿名

匿名函数写起来比较简便, 但是有一些缺点:

1. 在栈追踪的时候, 不会显示函数名
2. 如果需要引用自身, 那么只能使用 argumengs.callee
3. 可读性可能不佳

#### 块作用域

try/catch 是一种块作用域, 声明的变量只在 catch 里面有效, 例如

```js
try {
  undefined(); // 制造一个异常
} catch (err) {
  console.log(err); // 可以访问err
}
console.log(err); // 不可以访问err
```

let 也可以, 通常是将变量作用域定义在{}内部.
同时, let 和 var 的区别在于, 例如

```js
console.log(a); // undefined
var a = 2;

console.log(b); // ReferenceError
let b = 3; // 可能是所谓的 暂时性死区
```

const 和 let 类似

13:30--14:20
p37-44

### 第四章 提升

任何生命在某个作用域内的变量, 都将附属于这个作用域.
同时, 作用域和变量声明出现的位置有一些联系.

#### js 程序的执行顺序

js 并不总是一行一行地顺序执行的, 例如

```js
a = 2;
var a;
console.log(a); // 2, 如果是顺序执行, 应该是undefined
```

#### 从编译器的角度来解析

总的来说, 由于 js 程序运行前会编译, 编译的时候会先找到所有的声明, 确定它们的作用域, 所以, js 程序运行的时候, 都是先有声明(提升), 后有赋值, 上面的例子可以这样理解:

```js
var a;
a = 2;
console.log(a);
```

但是, 这个提升是 一个作用域 里面的, 并不会穿透, 只会在自己的作用域气泡里面提升, 例如, 函数里面的 var, 不会在全局作用域里面有效.

注意, 函数声明也是会提升的, 比变量提升优先级高, 同时, 如果有多个一样的函数声明(函数名相同) 后面的声明会覆盖前面的.

### 第五章 作用域闭包

#### 什么是闭包

js 中, 闭包无处不在, 我们只需要能够识别并拥抱它.
闭包是给予词法作用域书写代码时候所产生的自然结果.

#### 实质问题

当函数可以记住并且访问所在的词法作用域时, 就产生了闭包, 函数是在当前词法作用域之外执行的.

```js
function foo() {
  var a = 2;
  function bar() {
    console.log(a);
  }
  return bar;
}
var baz = foo();
baz(); // 2, 闭包
```

foo()返回的其实是 bar 函数, baz 其实是 bar 函数的一个引用, baz()这样调用的时候, 相当于 bar(), 但是, 需要特别注意的是, bar 的词法作用域是在 foo 里面的, 现在由于有一个 baz 引用它, 它可以在 baz 所在的词法作用域发挥作用, 而且不会被垃圾回收程序回收.

闭包使得函数可以继续访问定义时的词法作用域.

22:40-23:21
p45-50

```js
var fn;
function foo() {
  var a = 2;
  function baz() {
    console.log(a);
  }
  fn = baz;
}

function bar() {
  fn(); // 闭包
}

foo();
bar(); // 2
```

#### 理解闭包

```js
function wait(message) {
  setTimeout(function timer() {
    console.log(message);
  }, 1000);
}
// 这个就是闭包
```

只要使用了回调函数, 实际上就是使用了闭包.

#### 循环和闭包

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}

for (var i = 1; i <= 5; i++) {
  (function() {
    setTimeout(function timer() {
      console.log(i);
    }, i * 1000);
  })();
}
// 这里的IIFE只是一个什么都没有的作用域, 最后引用的i, 仍然是6

for (var i = 1; i <= 5; i++) {
  (function() {
    var j = i;
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })();
}
```

11:23--11:52
20:27--21:31
p50-64

#### 重新以块作用域的角度思考

上面 IIFE 在迭代的时候, 都创建了一个新的作用域, 也就是说, 我们需要的是一个 块作用域 , 所以用 let 也是可以的.

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, 1000);
}
```

如果如上图一样, 在 for 里面使用 let 定义 i, 那么, 每次循环的时候, 其实都是重新定义 i.

#### 模块

模块其实就是闭包的应用!! module.export 出来的东西就是闭包里面 return 的 function, 里面有一些状态变量, 这样就可以保存状态!

模块模式需要两个必要条件:

1. 必须有外部的封闭函数, 改函数必须被调用一次(每次调用都会创建一个新的模块)
2. 封闭函数必须返回至少一个内部函数, 注意内部函数才能在私有作用域中形成闭包, 同时可以访问或者修改私有状态

模块模式的应用:

1. 模块函数也是函数, 可以传入参数
2. export 一个修改模块内部属性的 api, 类似 vuex, 应该说, vuex 等等状态管理, 其实就是模块模式的应用.

##### 现代的模块机制

##### 未来的模块机制

上面两个并不是十分明白, 先忽略, 看其他先
2019-2-18

### 附录 A 动态作用域

```js
function foo() {
  console.log(a); // 由于所有都是先声明后调用, 其实在bar中, 调用foo的时候, 引用的是全局的a, a=2
}

function bar() {
  var a = 3;
  foo();
}

var a = 2;
bar(); // 词法作用域, 2

function x() {
  var a = 3;
  function y() {
    console.log(a);
  }
  return y();
}

var a = 2;
x(); // 闭包, 3
```

js 只具有词法作用域, 没有动态作用域. 但是, this, 在某种程度上, 很像动态作用域, 而动态作用域关心的是函数从何处调用.

### 附录 B 块作用域的替代方案

es6 下, 使用 let 可以完美实现块作用域, 但是, 如果是前面的版本, 那么, 可能需要使用 try/catch 这样的方式来实现, 例如:

```js
{
  let a = 2;
  console.log(a); // 2
}

console.log(a); // ReferenceError

try {
  throw 3;
} catch (b) {
  console.log(b); // 3, 因为catch是块作用域
}
console.log(b); // ReferenceError
```

#### Traceur

一些 es6 语法转换的项目, 其实都是使用 try/catch 来模拟块作用域的

#### 使用显式 let 块作用域的好处

```js
// 注意, 并不是所有浏览器都支持这种写法
let (a = 2) {
  console.log(a) // 2
}
console.log(a) // ReferenceError
```

1. 更加突出
2. 代码重构的时候也表现得更加健壮

#### 代码性能

其实不需要担心了, 而且, 如果有需要使用块作用域的时候, 就使用 let, 不然, 继续使用 var 也是可以的

### 附录 C this 词法

es6 的箭头函数

1. function 的简写
2. 解决 this 的绑定问题(以往的实现方法是 var self = this)

es6 的箭头函数引入了 this 词法的行为.

```js
var obj = {
  count: 0,
  cool: function coolFn() {
    console.log("outer", this.count);
    if (this.count < 1) {
      setTimeout(() => {
        this.count++;
        console.log("awesome?!");
      }, 100);
    } else {
      setInterval(() => {
        console.log("this.count", this.count);
      }, 500);
    }
  }
};

obj.cool(); // 输出awesome?!, 箭头函数并不是普通的this绑定规则(谁调用指向谁), 而是使用了当前的词法作用域覆盖了this本来的值
```

箭头函数是将程序员们经常范的一个错误(混淆 this 绑定规则和词法作用域规则)给标准化了.

## 第二部分 this 和对象原型

10:16--11:00 44min
11:39--13:00 81min
p74--81--87

### 第一章 关于 this

this 关键字是 js 中最复杂的机制之一, 它被自动定义在所有函数的作用域中.

#### 为什么要用 this

如果不使用 this, 有时候我们就需要显式传入一个对象引用, 而使用了 this, 则可以隐式传递一个对象引用, 可以将 API 设计得更加简洁并且易于使用.

#### 对 this 的误解

##### this 并不像我们所想象中的那样, 指向函数本身

```js
function foo(num) {
  console.log("foo:", num);
  this.count++;
}

window.count = 233;

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}

console.log("*****", foo.count);
console.log("window.count", window.count); // window.count的初始值是undefined, window.count++, 输出自然是NaN
```

可以通过一些方法来达到我们想要的效果, 例如, 创建一个 data 对象, 将 this.count++改为 data.count++, 或者, 在 foo 函数中这样写 foo.count++, 可是, 这两个方法都是回避了 this 的使用, 用的是词法作用域的规则, 我觉得挺好的, 书里认为这样是“躲回舒适区”.

另外一种使用 this 技术而解决问题的方法是, 通过使用 call 来强制绑定 this 的引用函数对象

```js
function foo(num) {
  console.log("foo:", num);
  this.count++;
}

window.count = 233;

foo.count = 0;

var i;

for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo.call(foo, i);
  }
}

console.log("*****", foo.count);
```

##### this 指向函数的作用域吗? 其实并不是, 只是有时候, 可能表现出来是指向函数的作用域而已

```js
function foo() {
  var a = 2;
  console.log(this); // window
  this.bar(); // 其实是window.bar
}

function bar() {
  console.log(this.a); // 应该是undefined, window.a
}

foo();
```

上面试图让 bar 引用 foo 内部的 a=2, 但是, 这个是将 this 和词法作用域混合使用, 是无法实现的.

#### this 到底是什么?

this 是在运行时(即被调用时)进行绑定的, 并不是在编写是绑定的(对比词法作用域, 它是在编译的时候绑定的), this 的绑定和函数声明的位置没有任何关系, 只取决于函数的调用方式.

一个函数被调用的时候, 会创建一个活动记录(context, 上下文), 包括函数在哪里被调用, 函数的调用方法, 传入的参数等信息, this 就是记录的其中一个属性, 会在函数执行的过程中用到.

### 第二章 this 全面解析

this 是在函数调用的时候被绑定的, 完全取决于函数的调用位置

#### 什么是调用位置?

this 到底引用的是什么?

最重要的是, 要分析调用栈(就是为了达到当前执行位置所调用的所有函数), 而调用位置就在当前正在执行的函数的前一个“调用”中.

#### 绑定规则

##### 默认绑定, 如果没有其他规则, 就默认这个

```js
function foo() {
  console.log(this.a);
}

var a = 2;
foo(); // 相当于window.foo(), 所以, this就是window, 2
```

但是, 如果使用默认模式, 全局对象无法使用默认绑定, this 会被绑定到 undefined

```js
function foo() {
  "use strict";
  console.log(this);
  console.log(this.a);
}

var a = 2;
foo();
// undefined
// this is undefined, TypeError
```

只有函数运行在非严格模式的时候, 默认绑定才可以绑定到全局对象, 严格模式下, this 和 foo()的调用位置无关.

代码中不要混用严格模式和非严格模式, 使用第三方库的时候, 也需要注意他们用的是哪个模式.

##### 隐式绑定

```js
function foo() {
  console.log(this.a);
}
var a = 4;
var obj = {
  a: 2,
  foo: foo
};
foo(); // 和上面默认的情况一致
obj.foo(); // 2, 这里调用foo的是obj, this自然就指向obj, obj.a = 2, 所以结果是2, 对象属性引用链中, 只有最后一层会影响调用位置, 也就.前面的对象
```

在平时使用的时候, 需要注意调用的到底是谁, 尤其是在使用回调函数的时候.

```js
function foo() {
  console.log(this.a);
}
function doFoo(fn) {
  fn();
}
var obj = {
  a: 2,
  foo: foo
};
var a = "global!!";

doFoo(obj.foo); // 特别需要注意的是, obj.foo并没有调用foo, 而是一个函数, doFoo才是真正调用了foo()
```

需要注意的是, 如果是 setTimeout 等等的时候, 其实和这里的 doFoo 是一样的

##### 显式绑定

如果我们不想在对象内部包含函数引用 而想在某个对象上强制调用函数, 应该怎么做? -- call 和 apply 直接绑定 this

```js
function foo() {
  console.log(this.a);
}
var obj = {
  a: 233
};
foo.call(obj); // 233, this被显式绑定了
```

8:28--9:28
9:50--11:50
p87--101

需要注意的是, 如果传入的不是对象, 而是基本数据类型, 原始值会被装箱, 例如 new String().

###### 硬绑定

```js
function foo() {
  console.log(this.a);
}
var obj = { a: 2 };
var bar = function() {
  foo.call(obj); // 无论谁调用bar, foo都被内部手动绑定到obj上面了
};
bar(); // 2, 一般情况
setTimeout(bar, 200); // 2, 因为内部手动绑带了, 所以this并不会失效
bar.call(window); // 2, 同上
```

硬绑定的典型应用场景有:

1. 创建一个包裹函数, 传输所有的参数并返回接收到的所有值.

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}
var obj = { a: 2 };
var bar = function() {
  return foo.apply(obj, arguments);
};
var b = bar(3); // 2 3
console.log(b); // 5
```

可能函数柯里化有点相关吧?

2. 创建一个可以重复使用的辅助函数

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}
// 简单的辅助绑定函数
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments);
  };
}
var obj = { a: 2 };
var bar = bind(foo, obj);
var b = bar(3); // 2 3
console.log(b); // 5
```

es5 中的 Function.prototype.bind 可能可以用于硬绑定

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}
var obj = { a: 2 };
var bar = foo.bind(obj);
var b = bar(3); // 2 3
console.log(b); // 5
```

其实 bind 的使用就是上面示例的官方版

###### API 调用的上下文

例如数组的 forEach 函数等等, 都有一些上下文, 实际上就是使用了 call()或者 apply()实现了显式绑定

```js
function foo(el) {
  console.log(el, this.id);
}
var obj = { id: "myId" };
var b = [1, 2, 4];
b.forEach(foo, obj); // 第二个参数是“this”
```

##### new 绑定

最后一条 this 的绑定规则

首先需要了解的是, js 的 new 可能和其他语言, 例如 java 等等面向类的语言的不一样.

在 js 中, 构造函数只是一些使用 new 操作符时被调用的函数, 只是一个普通函数.

实际上, 并不存在所谓的“构造函数”, 只有对于函数的“构造调用”

使用 new 来调用函数, 发生构造函数调用的时候, 会自动执行如下操作:

1. 创建一个全新的对象
2. 对象会被执行[[原型]]连接
3. 对象会绑定到函数调用的 this
4. 如果函数没有返回其他对象, 那么 new 表达式中的函数调用会自动返回这个新对象

```js
function Foo(a) {
  this.a = a;
}
var bar = new Foo(233);
console.log(bar.a);
```

#### 优先级

默认绑定的优先级肯定是最低的
显式绑定比隐式绑定优先级更高
new 绑定比隐式绑定优先级高

new 每次都是一个新对象, 这个需要注意
new 中其实使用了硬绑定.

所以, 优先级是 new > 显式绑定 > 隐式绑定 > 默认绑定

#### 绑定例外

##### 被忽略的 this

如果使用 null 或者 undefined 作为 this 的绑定对象传入 call, apply 或者 bind, 实际应用的是默认绑定规则

例如使用 apply()来展开一个数组, 并作为参数传入一个函数, 使用 bind()对参数进行柯里化

```js
function foo(a, b) {
  console.log("a:", a, "b:", b);
}
foo.apply(null, [1, 3]); // 展开数组
var bar = foo.bind(null, 2); // 柯里化
bar(3);
```

但是, 这些使用方法, 会把 this 绑定到全局对象, 需要特别注意.

###### 更安全的忽略 this 方法, DMZ--一个空的非委托对象

```js
function foo(a, b) {
  console.log("a:", a, "b:", b);
}
var DMZ = Object.create(null);
foo.apply(DMZ, [1, 3]); // 展开数组
var bar = foo.bind(DMZ, 2); // 柯里化
bar(3);
```

##### 间接引用

某些情况下, 可能会创建一个函数的间接引用, 这个情况下, 调用这个函数会应用默认绑定规则.

```js
function foo() {
  console.log(this.a);
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo()(
  // 3, 隐式绑定
  (p.foo = o.foo)
)(); // p.foo只是一个函数, foo(), 这里调用, 其实就是window.foo(), 并且需要注意, 如果是严格模式, 会被绑定到undefined
```

##### 软绑定

硬绑定会大大降低函数的灵活性, 使用了硬绑定之后, 无法使用隐式绑定或者显式绑定来修改 this.

如果可以给默认绑定指定一个全局对象和 undefined 以外的值, 那就可以实现和硬绑定一样的效果, 同时保留隐式绑定或者显示绑定修改 this 的能力.

#### this 词法, 就是箭头函数和 self = this

箭头函数通常用作回调函数中, 例如事件处理器或者定时器.

this 词法和 this 风格, 最好二选一

1. 只使用词法作用域风格, 不适用 this 风格, 例如使用 self = this 和箭头函数
2. 完全使用 this 风格, 只在必要的时候使用 bind()来改变 this 的绑定, 不使用 self = this 和箭头函数

13:23--13:47--14:40

p102--136

### 第三章 对象

对象究竟是什么?

#### 语法

1. 字面量形式
2. 构造形式

一般而言, 字面量形式用得比较多, 而且比较方便

#### 类型

六种基础类型, string, number, boolean, null, undefined, object

#### 内容

1. 点语法, 一般称为“属性访问”
2. 中括号语法, “键访问”

es6 新增的, 中括号语法里面, 可以是可计算的 js 表达式.

属性访问和方法访问.

数组, 特殊的对象, 有自己特有的方法.

对象的复制. 请注意, 赋值对象, 其实只是将对象的引用地址复制过去了, 并没有复制对象.
如果真的需要复制, 那么可以使用 JSON.parse(JSON.stringify(obj))来复制.
Object.assign()则可以用于浅复制.

属性描述符. Writable 之类的.
可以使用 Object.defineProperty(obj, 'xx', {})来定义.
... 后面是和红宝书和犀牛书差不多的内容, 省略.

#### 遍历

for...in 循环, for..of 循环

数组的辅助迭代器, forEach(), every(), some()
...(后面的内容涉及 es6 的迭代器, 暂时没看)

### 第四章 混合对象 “类”

类是一种设计模式.
类意味着复制.
总的来说, 在 js 中模拟类是得不偿失的.

#### 类的理论

类 / 继承, 描述了一种代码的组织结构形式, 一直在软件中对真实世界中的问题领域的建模方法.

面向对象编程, 强调的是数据和操作数据的行为, 本质上是互相关联的, 所以把数据和它相关的行为打包起来--数据结构.

##### “类”设计模式

##### js 中的“类”

es6 之后, 有一个 class 关键字, 但是, js 实际上并没有类, js 提供了一些近似类的语法.

#### 类的机制

一个类就是一张蓝图.

#### 类的继承

#### 混入

有显式混入和隐式混入. 用于模拟类的复制行为.

##### 显式混入

```js
function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key];
    }
  }
  return targetObj;
}
var Vehicle = {
  engines: 1,
  ignition: function() {
    console.log("Turning on my engine.");
  },
  drive: function() {
    this.ignition();
    console.log("Steering and moving forward!");
  }
};
var Car = mixin(Vehicle, {
  wheels: 4,
  drive: function() {
    Vehicle.drive.call(this); // 显式多态
    console.log(`Rolling on all ${this.wheels} wheels!`);
  }
});
```

和 Object.assign()是完全不同的东西, 这里有继承的概念在.

15:59--
p137-
