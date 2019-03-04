# 你不知道的 JavaScript 中卷

## 第一部分 类型和语法

可能这部分的东西比较琐碎...

### 第一章 类型

类型是值的内部特征, 它定义了值的行为, 以使其区别与其他值.

js 有七种内置的类型: null, undefined, boolean, number, string, object, symbol.
需要注意的是 typeof, typeof null == “object”, typeof undefined == "undefined", typeof symbol = "symbol"

js 中, 变量是没有类型的, 和 java 等等语言相区别

undefined 和 not defined 是两回事, 前者是有这个变量, 没有定义值, 后者是没有这个变量.

## 第二部分 异步和性能

异步编程--回调函数--promise--生成器

### 第一章 异步: 现在与将来

程序的一部分现在运行, 程序的另外一部分则在将来运行, 现在和将来之间有一些空隙, 在这段空隙中, 程序没有活跃执行.

#### 分块的程序

最常见的块单位是函数.
例如标准的 ajax 函数, 它不是同步的, 一般没有返回值, 只是一个将来运行的程序, 将来才有结果.
从现在到将来的“等待”, 最佳的方法是使用回调函数. 但是, 使用回调函数的时候, 需要注意, 程序执行的结果, 例如:

```js
console.log(233);
setTimeout(function() {
  console.log("last");
}, 0);
console.log(466);
// 输出的结果是 233 466 last, 这里的setTimeout设置了一个定时器, 是将来的某个事件, 可是, 这个事件会在当前tick走完之后才会被执行
```

同时, 需要注意的是, 我们在使用 console.log 的时候, 其实也是异步的, 因为其中使用到的是控制台 I/O, 比较耗时, 不同的浏览器有不同的实现, 有时候可能不会得到我们想要的结果, 所以, 调试的时候, 最好还是使用断点.

#### 事件循环

js 引擎本身所做的只不过是在需要的时候, 在给定的任意时刻执行程序中的单个代码块, 可是, 这个“需要”, 是谁需要?
js 引擎有一个叫做“事件循环”的机制. js 引擎本身并没有事件的概念, 只是一个按需执行 js 代码的环境.“事件”(js 代码执行)调度总是由包含 js 引擎的环境进行的.
什么是事件循环?
原理其实就是一个 while 循环, 每一个时刻(tick)运行它里面事件 array 的所有事件, 如果这个 tick 的事件完成了, 可以执行下一个 tick 的循环. 例如, 如果我们 setTimeout 了一个事件(回调函数), 则会在前一个 tick 完成之后, 任意的时间插入到下一个 tick 的循环中, 然后被执行.

#### 并行线程

异步和并行的意义完全不同. 异步是关于现在和将来的事件间隙, 而并行是关于能够同时发生的事情.
js 是单线程的, 它拥有完整运行特性, 每一步都是原子性的. 由于这个特性, 它比并行的多线程程序确定性要强一些, 但仍然有不确定性, 这个不确定性是由函数运行顺序带来的, 被称为竞态条件.

#### 并发

当多个并发进程之间没有交互的时候, 代码总是可以正常工作的.
如果它们之间有交互, 就会因为这些交互而产生意想不到的结果.
通过一些手段, 例如“门闩”, 可以解决一部分的这些问题.
另外的一种方法是“并发协作”, 重点是不再是通过共享作用域中的值进行交互, 是取一个长期运行的进程, 并将其分割成多个步骤或者多批任务来执行. 例如, 如果有一个任务, 需要读取数百万条数据, 可以这样

```js
var res = [];
function response(data) {
  var chuck = data.splick(0, 1000);
  res = res.concat(
    chuck.map(function(val) {
      return val * 2;
    })
  );
  if (data.length > 0) {
    setTimeout(function() {
      response(data);
    }, 0);
  }
}
// 这里, 其实就是一个tick执行1000个数据的处理
```

#### 任务

es6 中, 一个新的概念, 建立在事件循环之上, 叫做任务队列: 挂在事件循环队列的每个 tick 之后的一个队列. 在事件循环的每个 tick 中, 可能出现的异步动作, 不会导致一个完整的新事件添加到事件循环队列中, 而会在当前 tick 的任务队列末尾添加一个项目.

事件循环队列相当于在游乐场玩过一个游戏之后, 重新去到队伍的末尾排队(在下一个 tick 运行); 而任务队列则是, 玩过游戏之后, 插队接着玩(在这个 tick 运行).

promise 的异步特性是基于任务的! 和 setTimeout 基于事件循环有所不同.

#### 语句顺序

因为 js 是需要编译的, 所以, 实际运行的代码和写的时候有可能顺序不一样, 即使没有任何异步的情况下.

### 第二章 回调

#### continuation

回调函数包裹了程序的延续, 在当前程序的 tick 完成之后, 下一个 tick 中, 执行这个回调函数.

#### 顺序的大脑

我们大脑的工作方式, 有点类似事件循环队列. 在执行的时候, 不是多任务, 而是快速进行上下文切换.

#### 信任问题

使用回调函数的时候, 例如 ajax('...', function() {}), 其中 function 是我们自己需要执行的程序, 如果 ajax 是第三方的函数, 那么, 整个程序的控制权就到了第三方了, “控制反转”. 这个时候, 需要注意非常多的问题, 例如 ajax 调用 function 的次数, 时机, 发生异常时候的处理等等, 问题简直数不过来.

解决办法有多种, 例如 function 内进行输入值的判定, “error first 风格”, 调用验证等等, 通常, 比较有用的一个建议是: 永远异步调用回调.

### 第三章 promise

使用回调函数表达程序异步和管理并发的两个主要缺陷: 缺乏顺序性和可信度. 其根源在于控制反转.
如果可以将控制反转再反转, 第三方给我们提供了解其任务何时结束的能力, 然后我们自己的代码来决定下一步做什么, 那么, 就不存在上面的两个缺陷了.

#### 什么是 promise

##### 未来值

“一旦我需要的值准备好了, 我就用我的承诺值(value-promise)来换取这个值本身”.
或者, 这个值不能被准备好, 我得到的是一个 error 信息.

由于 promise 封装了依赖于时间的状态--等待底层值的完成或者拒绝, 所以 promise 本身是与时间无关的. 一旦 promise 决议, 它就永远保持在这个状态--不变值, 可以根据需求多次查看.

##### 完成事件

如果需要在 foo 函数结束之后进行一些操作, foo 可能需要一段时间才能完成, 我们可以这样做:

1. 使用典型的 js 风格, 使用回调函数的形式写入我们后面的操作, 这样做, 会发生“控制反转”, 主导权在 foo 函数
2. 使用 promise 风格, 主动侦听来自 foo 的事件, 反转控制反转, 主导权在我们写的 promise 里面

#### 具有 then 方法的鸭子类型 promise 的坑

首先, p instanceof Promise 是不足以作为检查方法的.
thenable 的函数(或者对象)都会被认为是 instanceof Promise 的.

不过, 经过实践, chrome 浏览器上面已经可以识别了, 例如 var a = {then: function(){}}, a instanceof Promise --> false.

#### promise 的信任问题

和使用回调函数相比, promise 有类似的信任问题吗? 例如调用次数, 时机, 参数和环境的传递, 错误和异常处理等等问题.

使用 Promise.resolve(), 如果里面是一个 Promise, 则直接返回, 如果不是, 则会返回一个包装的 Promise 值.

#### 链式流

我们可以把多个 Promise 连接在一起, 表示一系列异步步骤.

```js
var p = Promise.resolve(42);
var p2 = p.then(function(v) {
  console.log(v); // 42
  return v * 2;
});
p2.then(function(v) {
  console.log(v); // 84
});

var p = Promise.resolve(42);
p.then(function(v) {
  console.log(v); // 42
  return v * 2; // 甚至可以没有return一个promise对象, 或者是异步操作, 后续的程序也会正常运行
  // 每个then里面, 都会隐式返回一个后续的promise决议, 被后一个then使用
}).then(function(v) {
  console.log(v); // 84
});
```

```js
function delay(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, time);
  });
}

delay(1000)
  .then(function step1() {
    console.log("step1");
    return delay(500);
  })
  .then(function step2() {
    console.log("step 2");
    return delay(2000);
  })
  .then(function step3() {
    console.log("delay 2000");
    return Promise.resolve(233);
  });
```

使得链式控制流可行的 Promise 固有特性:

1. 调用 promise 的 then(...)会自动创建一个新的 promise, 从调用返回
2. 在完成或拒绝处理函数内部, 如果返回一个值或者抛出一个异常, 新返回的(可链接的)promise 就响应地决议
3. 如果完成或者拒绝处理函数返回一个 promise, 它将会被展开, 这样, 不管它的决议值是什么, 都会成为当前 then(...)返回的链接 promise 的决议值

Promise 的一些术语: 决议, 完成以及拒绝.
需要注意的是, reject()不会像 resolve()一样对里面的内容进行展开, 只会原封不动地传值.

#### 错误处理

try/catch 是同步的, 无法检测异步错误. 使用 error-first 风格的代码可以处理异步错误, 但是 promise 使用的是不同的方案: “分离回调”--一个回调用于完成情况, 一个回调用于拒绝情况.

```js
var p = Promise.resolve(42);
p.then(
  function fulfilled(msg) {
    console.log(msg.toLowerCase());
  },
  function rejected(err) {
    console.log(err); // 不会执行这个, 因为promise已经被42填充了, 是不可变的, 如果需要通知这个错误, 只能通过上一个then中return出来
  }
).catch(err => {
  console.log(err);
});
```

##### 绝望的陷阱, 编程的时候, 需要努力, 才能够达到预想的结果

不能仅仅在 promise 最后加一个 catch 就以为可以将所有错误捕捉了, 如果 catch 的函数也发生错误, 这个就无法被捕捉了.
解决这个问题, 可以在全局设置一个处理“全局未处理拒绝”的处理函数, 或者在 promise 后面增加一个表示这个 promise 被正常执行的 done 函数(但这个不是 es6 的标准, 需要自己写).

##### 成功的坑, 编程的时候, 需要努力, 才可能发生错误(暂时只是理论上的)

1. 默认情况下, promise 在下一个任务或者 tick 上面, 向开发者终端报告所有的拒绝, 如果在这个时间点上, 该 promise 上还没有注册错误处理函数的话
2. 如果想要一个被拒绝的 promise 在查看之前的某个时间段内保持拒绝状态, 可以调用 defer(), 这个函数优先级高于该 promise 的自动错误报告.

也就是说, 除非编程人员特意将错误保留, 否则, 错误都会被上报到开发者终端(默认的).

#### promise 模式

除了之前的链式(顺序)模式之外, promise 还有其他的使用模式.

##### Promise.all[a, b], 其中 a 和 b 都是异步, 需要它们都执行完成之后, 才会进行 then

a 和 b 都是 promise 实例, 它们的完成顺序是不一定的, 不过, 一定需要都完成的情况下, then 才可以被执行.
如果传的是空数组, 则马上 then

##### Promise.race([a, b]), 只响应第一个完成的, 在 promise 中被称为“竞态”

```js
function delay(time) {
  return new Promise(function(resolve, reject) {
    console.log("time", time);
    setTimeout(resolve, time);
  });
}

var a = delay(500);
var b = delay(1000);

Promise.race([a, b]).then(res => {
  console.log(res);
});
```

使用的时候需要注意, 不能传空数组, 不然会一直挂起.
其他 all 和 race 的变体以及 promise 的迭代使用, 暂时应该用不到.

#### Promise API

这是原生的, 其他 promise 库不在这里说明.

1. new Promise()构造器
2. Promise.resolve()和 Promise.reject()
3. then()和 catch()
4. Promise.all([...])和 Promise.race([...])

#### Promise 的局限性

1. 顺序错误处理.
2. 单一值. 如果需要处理多个值的时候, 不妨试试 Promise.all([...])
3. 单决议. 由于 promise 的特点, 如果用在事件或者数据流的时候, 这个时候需要多个值, 除非在 promise 上面构建显著的多值抽象, 否则, 无法合适地工作.
4. 惯性. 如果旧代码使用的是回调风格, 除非全部代码大修, 不然使用 Promise 风格比起继续使用旧风格更加累. promise 和回调函数是两种不同的范式, 需要刻意改变. 一般来说, 需要自己手动写一个“包裹函数”, 将回调的响应封装成一个 promise.
5. 无法取消的 Promise. 一旦创建了一个 Promise 并为其注册了完成或者拒绝处理函数, 如果由于某个原因, 这个 promise 一直 pending 的话, 我们是没有办法从外部停止它的进程的.
6. 性能, 和纯回调函数相比, 我们做了控制反转的反转, 更多的工作, 更多的保护, 自然会慢一些. 而且 Promise 把一切都变成异步了, 一些本来可以同步的操作也变成异步操作, 一个 tick 的差别. 所以, 如果有需要, 识别出关键部分, 对它们进行 Promise, 提高可信性, 才是比较合适的做法.

### 第四章 生成器

promise 解决了可信任性问题, 接下来, 我们可以使用生成器来使用同步的视觉来实现异步效果.

#### 并不是完整运行的函数, 生成器

生成器函数, 和其他函数不一样, 可以不是完整运行的, 可以在某个地方中断, 然后在合适的时机继续, 而且不一定需要完整运行完.
简直是魔法. 合作式的控制放弃(yield).

##### 输入和输出

生成器函数仍然是函数, 可以带参数输入, 也可以有输出, 例如

```js
function* foo(x, y) {
  return x * y;
}
var it = foo(5, 6); // 只是声明了一个生成器函数, 没有运行, 如果需要运行, 则是it.next()
var res = it.next(); // {value: 30, done: true}
res.value; // 30
```

###### 迭代消息传递

生成器提供了更加强大的内建消息输入和输出的能力, 利用 yield 和 next(..)实现, 例如

```js
function* foo(x) {
  var y = x * (yield);
  return y;
}
var it = foo(6);
it.next();
var res = it.next(7); // 7作为yield的值被传入, 函数继续运行
res.value;
```

一般来说, 需要的 next(..)调用要比 yield 语句多一个.

消息是双向传递的--yield..作为一个表达式, 可以发出消息响应 next(..)的调用, next(..)也可以像暂停的 yield 表达式发送值.
第一个 next()调用, 一般是不带参数的, 它的意思是: 生成器要给的下一个值是什么? 这个问题由第二个 next(..)来回答, 同时也提了一个一样的问题.

##### 多个迭代器

同一个生成器的多个实例可以同时运行, 甚至可以彼此交互.

```js
function* foo() {
  var x = yield 2;
  z++;
  var y = yield x * z;
  console.log("x:", x, "y:", y, "z:", z);
}
var z = 1;
var it1 = foo();
var it2 = foo();
var val1 = it1.next().value;
var val2 = it2.next().value;

val1 = it1.next(val2 * 10).value;
val2 = it2.next(val1 * 5).value;
it1.next(val2 / 2);
it2.next(val1 / 4);
```

#### 生成器产生值

##### 生成器与迭代器

迭代器需要有一个可以记住状态的值, 可以使用闭包来实现.
