chapter 4
变量、作用域和内存问题
{
    1.基本类型和引用数据类型的值
    {
        基本类型是指简单的数据段，包括number, string, boolean, null, undefined,Symbol
        引用数据类型是值那些可能由多个值组成的对象, 例如数组等等

        赋值则是直接使用'='即可

        复制变量值的时候, 两种数据类型的行为并不一样
        基本数据类型是复制数值, 引用数据类型是将引用复制,实际上还是只有一个对象

        函数传递参数
        参数只能按值传递, 也就是说, 传递进函数的值并不会影响原来的值, 除非传入之后对原数值或者对象进行了一些列操作, 例如给对象的属性赋值等等操作

        检测类型
        可以使用 typeof 来检测数据的类型, 但是并不准确
    }

    2.执行环境以及作用域
    {
        var a = '变量或函数有权访问的其他数据'
        执行环境定义了a, 决定了它们各自的行为
        {
            每个函数都有自己的执行环境, 当代码在一个环境中执行的时候, 会创建变量对象的作用域链, 保证对a有序访问
            应该是一个栈结构
            最上层是arguments对象, 然后是其父级环境对象, 一级级往下堆叠, 最底层是全局环境对象

            延长作用域链
            try-catch 的 catch语句
            with语句
            略

            JavaScript中(ECMAScript5以及之前)没有块级作用域, var的作用域是函数, 而不是像Java等语言一样是{}内
            ECMAScript6之后, 由于let等关键字的出现, 可以有{}的块级作用域了
        }
    }

    3.垃圾收集
    {
        JavaScript具有自动垃圾收集机制
        {
            1.主要的垃圾收集方式有
                1.标记清除
                {
                    简单来说, 就是如果一个变量进入环境, 则将这个变量标记为'进入环境', 当变量离开环境的时候, 标记为'离开环境'
                    垃圾收集器工作的时候, 将那些被环境标记为'离开'的值的占用的内存释放
                }
                2.引用计数
                {
                    简单来说, 就是如果a被引用了一次, 那么a的引用计数+1, 如果引用a的变量引用了其他的值, 则a的引用计数-1
                    当垃圾收集器下次工作的时候, 会自动释放那些引用计数为0的值所占用的内存
                    这种方式的问题是, 对象, 且没有被手动设置为null, 那么将永远不被回收, 因为至少有一个'对象名'在引用它
                }
            2.性能问题和内存管理
            {
                性能问题一般不需要管, 浏览器自动, 只要创建对象的数量不太过分就行
                内存管理也是不太需要管, 现在机器内存普遍超大, 如果闲的没事干, 可以遵循这样的方式, 把不再使用的对象设置为null, 手动标记为下一次垃圾回收的内容
            }
        }
    }
}


chapter 8
BOM
既是JavaScript访问浏览器窗口的一个接口, 也是ECMASCRIPT中规定的Global对象
{
    主要有
    {
        1.window对象
        2.location对象
        3.navigator对象
        4.screen对象
        5.history对象
    }

    1.window对象
    {
        1.全局作用域
            不在函数中用var或者let声明的变量, 或者没用var或let声明的变量, 都会变成全局变量的一个属性
        2.窗口关系以及框架
            frame和frameset, 实现网页内嵌一个其他网页
            内嵌的窗口位置和大小等等当然是可以调整的, 但是, 由于前人的滥用, 现在很多浏览器都甚至禁止了打开新窗口 window.open()方法, 所以这些东西用处不大
        3.间歇调用和超时调用
            就是定时器setTimeout和setInterval()
            这些方法都是window对象的方法, 需要非常注意里面函数的作用域
        4.系统对话框
            alert()用得多
            confirm()-->弹出一个选择ok的对话框, 可以获取一个boolean值, 如果点击了ok, 返回true
            prompt()-->弹出一个自定义的对话框, 可以用于用户交互
    }

    2.location对象
    最有用的BOM对象之一, 提供与当前窗口中加载的文档相关的信息, 一些导航功能, 例如host, href, port, search, protocol等等,前面都需要有location前缀, 是location的属性
    {
        1.查询字符串参数
            location.href返回?以及之后的所有字符串, 再增加一个自定义的字符串处理即可获得所需要的参数
        2.位置操作
            location.assign(url)方法, 传递一个url, 立刻打开该url并且再浏览器的历史记录中生成一条记录
            注意: 每次修改location的属性, 除了hash属性之外, 页面都会重新加载url
    }
    
    3.navigator对象
    用于识别客户端浏览器
    检测插件以及注册处理程序等等
    4.screen对象
    用处不大, 只是用来表明客户端的能力
    5.history对象
    浏览器历史
    history.go(url)-->转到url
    history.back()-->后退
    history.forward()-->前进
}


chapter 9
客户端检测
主要在处理不同浏览器的兼容性方面使用, 万不得已才使用
一般来说, 最好是选择通用的方法和API, 不然精力根本不够用
{
    1.能力检测
    目的是识别浏览器的能力
    {
        首先, 需要检测达成目的所需要的最常用的特性
        然后, 必须测试实际要用到的特性

        测试的时候需要谨慎而且尽可能严密, 书上的例子是如果要测试一个对象能不能用一个方法, 单单测试这个方法是否存在是不够的, 应该进一步测试对应的东西是不是函数

        重视的应该是能力检测, 而不是特定浏览器检测
        因为浏览器版本更新之后, 特性可能会变更
    }

    2.怪癖检测
    {
        针对特定的怪癖来检测, 一般都是bug, 尤其要注意ie
        怪癖检测应该在脚本一开始执行
    }

    3.用户代理检测
    {
        优先度在能力检测和怪癖检测后面, 一般是万不得已才使用
        一些旧时代的破事
    }
}


chapter 10
DOM
规范化, 通用性强的API, 用于操作网页元素
{
    1.节点
        DOM和HTML元素一一对应, 形成一个树状结构
        {
            每一个HTML标记都可以使用DOM节点来表示, 而每一个节点又有一些特性节点, 其中比较重要的节点以及其类型值为
            1.Node.ELEMENT_NODE 元素节点
            2.Node.ATTRIBUTE_NODE 属性节点
            3.Node.TEXT_NODE 文档节点
            一共有12种节点类型
        }

        节点之间的关系类似族谱
        {
            每一个节点都有一个childNodes属性, 保存的是一个NodeList对象, 可以转换成数组, 方法如下
            var arrNode = Array.prototype.slice.call(xNode.childNodes, 0)
            firstChild是第一个子节点
            lastChild是最后一个子节点
            nextSibling是下一个兄弟节点
            previousSibling是上一个兄弟节点
            注意, 所有节点都有一个ownerDocument属性, 指向便是整个文档的文档节点, 并且, 每个节点不能同时拥有两个或者以上的文档节点, 可以用来直接访问文档节点
        }

        操作节点
        {
            appendChild(xxNode)方法用于在节点末尾添加一个子节点(xxNode), 返回新增的节点
            insertBefore(xxNode, parentNode.firstNode)可以用于插入到指定位置, 例如这里是把xxNode插入到parentNode.firstNode的前面
            replaceChild(newNode, parentNode.firstNode)用于将newNode替换到parentNode.firstNode的位置上
            removeChild(xxNode)用于移除xxNode
            cloneNode(xxNode, boolean)则用于复制节点, 是否进行深复制
        }

        以下细讲不同的节点类型
        {
            1.Document类型
            表示文档, nodeType的值为9, nodeName为"#document"
            {
                document对象是HTMLDocument的一个实例, 同时, 也是window对象的一个属性, 可以作为全局对象来访问, 一些比较常用的方法和属性如下
                {
                    document.firstChild()取得<html>

                    document.body取得<body>

                    document.doctype取得<!DOCTYPE>

                    document.title设定网页标题, 即浏览器任务栏上面表示的名字

                    document.URL获取完整的url

                    document.referer取得来源页面的url

                    document.domain设定来源页面, 只能设定一次, 如果将子页面的document.domain设置为一样, 可以解决跨域问题, 实现页面间的通信
                }

                查找元素
                {
                    document.getElementById('')-->返回第一个符合的节点
                    document.getElementsByTagName('') -->返回一个节点数组
                    等等
                }

                有一些特殊的集合
                {
                    document.anchors表示所有带name特性的<a>

                    document.forms表示所有的<form>

                    document.images表示所有的<img>

                    document.links表示所有带href的<a>
                }

                DOM一致性检测
                {
                    略
                }

                文档写入
                {
                    write()-->将输出流写入到网页中
                    writeln()-->同上, 最后会加一个换行符
                    上面两个都是写入到文档的末尾, 其实用处不大

                    open()
                    close()
                    分别用于打开和关闭网页的输出流
                }
            }

            2.Element类型
            表示XML或者HTML元素, 提供对元素标签名, 子节点, 特性的访问
            nodeType值为1, nodeName为元素的标签名, 例如<div>-->DIV, 等价于tagName, 注意, 是大写的
            {
                1.HTML元素
                {
                    所有的HTML元素都由HTMLElement类型表示
                    有如下标准特性
                    id
                    title-->一般都是当鼠标悬停一阵出现的那些提示信息
                    lang-->表示语言, 少用
                    dir-->文字方向, 少用, ltr, 从左到右, rtl反之
                    className-->与class特性相对应
                }

                2.取得特性
                {
                    aaa.getAttribute('title')-->获取aaa的title属性
                    注意, HTML5规范, 自定义特性前面应该加上data-前缀, 以便于验证

                    一般直接aaa.title来获取title属性, 除非要取得自定义特性
                }

                3.设置特性
                {
                    aaa.setAttribute('title', 'this is a title')
                    一般也是直接aaa.title = 'this is a title'来设置
                }

                4.attribute属性
                Element类型是使用attributes属性的唯一一个DOM节点类型
                {
                    包含一个NamedNodeMap, 和NodeList类似
                    有一些不太方便的方法...
                }

                5.创建元素
                {
                    document.createElement('div')即创建了一个游离的新div元素
                }

                6.元素的子节点
                不同浏览器中, 元素子节点的数量并不同, 有的浏览器会把空白也算作一个子节点, 所以, 操作之前, 需要确认一下子节点nodeType的值
            }

            3.Text类型
            文本节点, 表示纯文本内容
            nodeType的值为3, 可以包含转义后的HTML字符, 不能包含HTML代码
            parentNode是Element类型, 一般是e.appendChild(textNode)
            nodeValue表示节点所包含的文本
            {
                1.创建文本节点
                {
                    使用document.creaetTextNode(str)来创建str内容的TextNode
                    如果两个文本节点是兄弟节点, 则会连起来显示, 中间没有空格
                }

                2.规范化文本节点
                在一个或者多个文本节点的父元素上使用normalize()方法, 会将所有文本节点合并为一个

                3.分割文本节点
                和normalize()相反的操作, splitText(n), 将一个文本节点分成两个, 从index为n开始分割
            }

            4.Comment类型
            就是注释, 没有子节点, nodeType值为8, nodeValue就是注释内容

            5.CDATASection类型
            针对XML文档, 暂时略过

            6.DocumentType类型
            不常用, 略过

            7.DocumentFragment类型
            文档片段, 一个轻量级的文档
            一般被当作'仓库', 修改节点的时候在里面修改, 修改完毕再一次插入到DOM中

            8.Attr类型
            元素的特性在DOM中以Attr类型来表示
            注意, 它不被认为是DOM文档树的一部分

        }

    2.DOM操作技术
    {
        动态脚本
            var loadScript = function(url) {
                var script = document.createElement('script')
                script.type = 'text/javascript'
                script.url = url
                document.body.appendChild(script)
            }
        动态样式类似
        操作表格, 有专门的API, 略过

        NodeList, NamedNodeMap和HTMLCollection这三个集合都是动态的, 任何DOM的改动都会实时反应到他们上面, 尽量减少操作他们
    }
}


chapter 11
DOM扩展
用于简化DOM操作
{
    1.选择符
    {
        querySelector和querySelectorAll
    }

    2.元素遍历
    {
        之前说过, 子节点的遍历需要先判断nodeType的值
        现在Element Traversal规范定义一组属性, 返回都是 元素
        childElementCount-->子元素的个数, 不包含文本节点和注释
        firstElementChild-->指向第一个子元素
        last...
        previous...
        next...
        使得代码变得简洁
    }

    3.HTML5
    {
        1.getElementsByClassName()中传入一个或者多个类名的字符串, 其顺序可以打乱

        2.classList属性
            remove()
            add()
            toggle()-->切换
            contains()-->是否包含某个class

        3.焦点管理
        {
            element.focus()使element立刻获得焦点
            可以用于用户交互的提示
        }

        4.自定义属性
        {
            前缀data-xxx
            可以通过element.dataset.xxx来获取属性的值
        }

        5.插入标记
        {
            innerHTML-->改变元素内的内容
            outerHTML-->连同这个元素一起改变, 直接替换
            insertAdjacentHTML()
        }
    }

    4.专有扩展
    {
        ...
        并不是标准, 很多都是IE的, 不管
    }
}


chapter 12
DOM2和DOM3
用于增强交互能力
{
    1.DOM变化
    {
        主要是错误处理和特性检测方面
        暂时略过
    }

    2.样式
    {
        1.访问
        {
            需要注意的是, css用短划线的属性, 在JavaScript中使用驼峰命名法
            设置属性的值时, 使用字符串

            计算的样式
            style对象能够提供支出style特性的任何元素的信息, 但是, 如果这个元素之间相互层叠影响, 这个信息就不准确了
            {
                getComputedStyle(), 返回一个CSSStyleDeclaration对象(与style属性的类型相同), 包含该元素的所有计算的样式
            }
        }

        2.操作样式表
        {
            CSSStyleSheet对象, 通用, 只表示样式表
            可以通过cssText等等返回对应css规则的属性, 例如文本等等

            创建规则
            sheet.insertRule('xxx',n), 类似于DOM的insertBefore()方法, 插入css规则的字符串

            删除规则, 使用sheet.deleteRule(n), 删除第n + 1条规则
        }

        3.元素大小
        {
            偏移量, 包括元素在屏幕上占用的所有可见的空间
            , 大小由高度和宽度确定, 包含内边距, 滚动条, 边框大小, 但是不包括外边框(margin)
            offsetHeight
            ...Width
            ...Left
            ...Top
            注意, 对这些值进行访问, 可能会引起reflow, 影响性能, 使用的时候最好先用一个变量来接住
            另外, 这个只是一个基本准确的值, 对表格和内嵌框架布局来事, 因为不同浏览器实现的规则不同, 会变得不准确

            客户区大小
            client dimension, 指元素内容以及其内边距的大小, content + padding
            clientWidth和clientHeight

            滚动大小
            指的是包含滚动内容的元素的大小

        }


    }

    3.遍历
    DOM2定义了用于遍历的DOM结构的类型, NodeIterator和TreeWalker, 都是基于给定点进行深度优先的遍历操作

    4.范围
    {
        很麻烦, 暂时不看
    }
}
