# css 揭秘

本书会用到一个自定义的函数, 如下

```js
function $$(selector, context) {
  context = context || document;
  var elements = context.querySelectorAll(selector);
  return Array.prototype.slice.call(elements);
}
```

## 1. 引言

css 编码技巧:

1. 尽量减少代码重复: 当某些值相互依赖的时候, 应该把它们的相互关系用代码表达出来.
2. 相信你的眼睛, 而不是数字, 需要达到的是设计稿的样子, 而不仅仅是设计的数字, 需要顺应人类的视觉错觉, 因为, 网页是写给人看的.
3. 关于响应式网页设计, 例如媒体查询, 应该只能作为最后的工具--其本质只是将灰尘扫到地毯下面而已. 媒体查询的断点不应该由具体的设备来决定, 而是应该根据设计自身来决定.
4. 合理使用简写

background: currentColor--> 和文本一样颜色的背景

## 2. 背景与边框

1. 半透明边框
   background-clip 可以限定背景色的盒子模型. 而默认的 background 会覆盖到 border 下方.

   ```css
   #test {
     border: 10px solid hsla(0, 0%, 100%, 0.5);
     background: white;
     background-clip: padding-box;
   }
   ```

2. 多重边框
   box-shadow 的基本用法, box-shadow 可以模拟外框. 它支持逗号语法, 可以一层层叠加. 但是, 投影不是边框, 不会影响布局, 不受 box-sizing 的影响. 不会响应鼠标事件.
   outline 方案. 如果只需要 2 层边框, 可以使用 outline 属性来产生外层的边框. 但是, 可能是bug, border-radius并不作用于outline, 需要测试.

3. 灵活的背景定位

## 3. 形状

## 4. 视觉效果

## 5. 字体排印

## 6. 用户体验

## 7. 结构与布局

## 8. 过渡与动画
