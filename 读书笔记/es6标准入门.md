# es6 标准入门

## 第一章 ECMAScript 6 简介

## 第二章 let 和 const 命令

## 第三章 变量的解构赋值

## 第四章 字符串的扩展

## 第五章 正则的扩展

## 第六章 数值的扩展

## 第七章 数组的扩展

## 第八章 函数的扩展

## 第九章 对象的扩展

## 第十章 Symbol

## 第十一章 Proxy 和 Reflect

## 第十二章 二进制数组

## 第十三章 Set 和 Map 的数据结构

## 第十四章 Iterator 和 for...of 循环

## 第十五章 Generator 函数

p191-

### promise 的含义

promise 的特点:

1. 对象的状态不受外界影响.
2. 一旦状态改变, 就不会再变, 任何时候都可以得到这个结果.

promise 可以将异步操作以同步操作的流程表达出来, 避免了层层潜逃的回调函数.

promise 的缺点:

1. 无法取消 promise, 一旦新建, 就会立即执行
2. 如果不设置回调函数, promise 内部抛出错误, 不会反应到外部
3. 处于 pending 状态时, 无法得知目前进展到哪个阶段(刚刚开始还是即将完成)

如果某些时间不断地反复发生, 一般来说, 使用 stream 模式是比部署 promise 更好的选择.
steam 模式是什么? // todo, 需要去了解

### 基本用法

promise 对象是一个构造函数, 用来生成 promise 实例.
这个构造函数的参数是一个函数 b, 函数 b 的参数是两个函数, resolve 和 reject(由 JavaScript 引擎提供, 不用自己部署).
resolve 函数的作用是: 将 promise 对象状态从 pending 变成 resolved, 在异步操作成功时调用, 并将异步操作的结果, 作为一个参数传递出去, reject 类似, 是在异步操作失败时调用.

promise 实例生成以后 , 可以使用 then 方法分别指定 resolved 状态和 reject 状态的回调函数.

```javascript
promise.then(
  function(value) {
    // success
  },
  function(error) {
    // failure
  }
);
```

// 注意setTimeout函数的参数, 第一个参数是需要执行的函数x, 第二个是间隔时间, 第三个以后是执行函数x的参数

## 第十六章 Promise 对象

## 第十七章 异步操作和 Async 函数

## 第十八章 Class

## 第十九章 修饰器

## 第二十章 Module

## 第二十一章 编程风格

## 第二十二章 读懂 ECMAScript 规格
