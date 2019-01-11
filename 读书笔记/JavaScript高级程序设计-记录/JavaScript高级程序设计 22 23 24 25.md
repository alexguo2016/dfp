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
```js
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
