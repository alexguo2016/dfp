chapter 1
JavaScript简介
{
    略
}


chapter 2
在HTML中使用JavaScript
{
    1.script元素
    注意在JavaScript代码使用script元素的时候, / 需要转义字符 \
    引入JavaScript代码的方式有: 内联, src引入url对应的外部文件
    一般来说, JavaScript代码应该放在body结束之前, 加快网页加载速度
    如果这样的script元素
    <script src= 'xxx' defer = 'defer'></script>
    则说明这个脚本会被浏览器立即下载, 但是需要延迟到整个页面加载完之后再运行
    类似的还有async属性, 表示异步执行
    2.noscript元素
    如果浏览器不知道是否支持JavaScript, 可以添加一个noscript元素来检测, 例如
    <noscript>
        <span>您的浏览器不支持JavaScript</span>
    </noscript>
}


chapter 3
基本概念
{
    1.语法
    JavaScript的基本语法和其他语言类似, 区分大小写, 标识符有特定的要求, 语句可以省略;号, 注释为//或者/**/

    2.保留字和关键字
    略

    3.变量
    var 用于表示定义一个变量, 如果没用这个标志, 则会变成全局变量

    4.数据类型
    {
        ECMAScript是松散类型, 使用typeof操作符来检测变量类型, 不是太准确

        undefined类型, 只有一个值, 就是undefined, 表示变量定义之后没有被赋值, typeof 的值为undefined

        Null类型, 只有一个值, null, 表示空指针对象, typeof 的值为object

        Boolean类型, 布尔类型, true和false有一些其他类型的值可以转换为Boolean类型, 方法为Boolean(x), 例如下面这些值
        ''(空字符串) 0和NaN(Number类型) null对象 undefined

        Number类型, 表示数字, 只有浮点数, 小数的比较, 最好是对其差值和一个足够小的值相比, 可以使用Number()和parseInt()等方法将其他类型转换为Number类型

        String类型, 和其他编程语言类型, 字符串都是不可变的, 其他类型可以使用toString()方法转换为String类型, 注意 null 和undefined 没有toString()方法, 返回的是他们的字面量

        Object类型
        详见chapter 4
    }

    5.操作符
    和其他编程语言类似, 注意&& 和 || 的短路性即可

    6.语句
    和其他编程语言类似

    7.函数
    和其他编程语言类似, 需要注意的是, JavaScript的函数没有重载的概念
}


chapter 14
表单脚本
表单不推荐使用DOM技术, 最好使用表单元素自己的API
{

}


chapter 15
使用canvas绘图
{

}


chapter 16
HTML5脚本编程
{

}
