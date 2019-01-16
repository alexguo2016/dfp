# chapter 22 高级技巧

## 高级函数

### 安全的类型检测

使用 tyepof 和 instanceof 并不总是得到我们想要的结果, 即其类型检测并不完善
使用 toString()则可以保证稳妥的, 一致的返回值, 例如如果是数组, 返回的一定是“[object, Array]”
例如

```js
var a = [1, 2, 3];
Object.prototype.toString.call(a); // [object, Array]
```

### 作用域安全的构造函数

当使用 new 调用的时候, 构造函数内用到的 this 会指向新创建的对象实例
但是, 如果调用构造函数的时候, 不用 new, 那么, this 就是指向 window 对象, 因为构造函数的 this 映射在 window 对象上. 这个时候, 如果 window 对象上面有和构造函数一样名字的属性, 这些属性就会在构造函数被调用的时候被覆盖, 造成不可知的影响, 解决办法有 2 个

1. 使用构造函数的时候, 一定使用 new
1. 创建一个作用域安全的构造函数

   ```js
   // 对构造函数里面的 this 绑定做一个判断, 如果 this 指向的是和想要的对象类型一致的对象, 则正常使用, 否则, 使用 new 关键字
   function Cat(name, age) {
     if (this instanceof Cat) {
       this.name = name;
       this.age = age;
     } else {
       return new Cat(name, age);
     }
   }
   ```

   这样的 Cat 构造函数无论是使用 new 关键字还是直接调用, 都可以保证 this 的指向, 不会污染 window 对象

当使用借用构造函数的方法实现继承的时候, 会导致一些问题, 例如下面, rect.sides --> undefined, 因为 PG.call(this,2) 里面, this 指向的是 Rect 构造函数, 不是 PG 的实例, 所以, PG.call(this,2) 相当于 return new PG(sides), 和下文中的 this 指向不同, 所以无法将 sides 属性加入到新创建的 Rect 实例中

````js
function PG(sides) {
if (this instanceof PG) {
this.sides = sides
} else {
return new PG(sides)
}
}

    function Rect(num) {
      PG.call(this, 2)
      console.log(this)
      this.num = num
    }

    var rect = new Rect(4)
    console.log('sides', rect.sides)
    console.log('num', rect.num)
    ```

如果使用 原型链或者寄生组合继承的方法, 改变 Rect 的 prototype, 则可以实现 sides 属性的正常赋值

### 惰性载入函数, 可以避免执行不必要的代码, 例如 if 分支

只有一个 if 语句的代码, 也肯定比没有 if 语句慢
惰性载入表示函数执行的分支仅仅会发生一次, 有两种方式实现惰性载入
1. 在函数被调用的时候再处理函数
  其实就是动态重写了被调用的函数, 下次调用的时候, 环境一般是不会改变的, 所以其他分支也是没用了
1. 在声明函数的时候就指定适当的函数
  创造一个匿名, 自执行的函数

### 函数绑定

创建一个函数, 可以在特定的 this 环境中以指定参数调用另一个函数, 一般和回调函数与时间处理程序一起使用

```js
function bind(fn, context) {
  return function() {
    return fn.apply(context, arguments)
  }
}
```

es5 已经原生实现了 bind()

### 函数柯里化

函数柯里化的基本方法和函数绑定是一样的: 使用 一个闭包返回一个函数
创建柯里化函数的通用方式:
```js
function curry(fn) {
  var args = Array.prototype.slice.call(arguments, 1)
  return function() {
    var innerArgs = Array.prototype.slice.call(arguments)
    var finalArgs = args.concat(innerArgs)
    return fn.apply(null, finalArgs)
  }
}
```

## 防篡改对象

es5的一些新方法, 需要注意, 一旦定义为防篡改对象, 就无法撤销了

### 不可扩展对象, Object.preventExtensions(xxx)
这样操作之后, xxx对象就不能被增加属性了, 可以使用 Object.isExtensible(xxx)来判断

### 密封的对象, seled object, 对象不可扩展
有成员的Configruable特性被设置为false, 不能删除属性和方法, 不能使用Object.defineProperty()把数据属性修改为访问器属性, 但是属性值可以修改.
要密封对象, 可以使用Object.seal()方法

### 冻结的对象, Object.freeze(xxx), 既是密封的, 也是不可扩展的, 对象的数据属性Writable特性会设置为false, 如果有定义set函数, 访问器属性仍然是可写的.

## 高级定时器




chapter 23
离线应用与客户端存储
{

}

chapter 24
最佳实践
{

}

chapter 25
新兴的 API
{

}
````
