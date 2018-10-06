chapter 20
JSON
相比XML, 是一种低冗余的数据格式
{
    1.语法
    {
        JSON可以表示以下三种类型的信息
        1.简单值, 可以表示字符串, 数值, 布尔值和null, 但是, 不支持JavaScript的undefined, 可以利用这个特性, 去除undefined的值
        与JavaScript字符串相比, 最大的不同是, 必须使用双引号

        2.对象, 键值对, 键名必须使用双引号

        3.数组
        采用的是JavaScript中的字面量方式
        例如["aaa", "bbb"]
    }

    2.解析与序列化
    {
        1.JSON.stringify()-->把指定的JavaScript对象序列化
        {
            序列化的时候, 第一个参数是将要被序列化的对象, 第二个参数可以是一个key数组, 例如["num", "age"], 那么只有对象中的num和age属性被序列化

            第二个参数也可以是一个回调函数, 参数是key和value, 对应序列化时对数据进行一系列的订正

            第三个参数用于控制结果中的缩进和空白符, 例如JSON.stringify(xx, null, 4)表示缩进空格为4个, 如果是"--*--", 则缩进为"--*--"

            toJSON()方法, Date对象可以自己定义一个toJSON()方法, 确定返回的序列化信息

            注意, 在序列化的时候, 按照以下的顺序进行
                1.对象的toJSON()方法
                2.如果提供了第二个参数, 应该这个过滤器, 传入过滤器的值是1的结果
                3.对2的结果进行序列化
                4.执行格式化
        }

        2.JSON.parse()-->把指定的JSON字符串进行解析
        {
            第二个参数可以是一个回调函数, 和序列化的时候差不多
        }
    }
}


chapter 21
Ajax与Comet
{
    {
        兼容性问题...ie各个版本的XMLHttpRequest对象并不同, 最好手写一个兼容性函数, 返回XHR对象

        XHR的用法
        {
            var xhr = new XMLHttpRequest()
            xhr.open(method, url, boolean), 使用method打开url, boolean异步
            xhr.send(data), 如果method是get, data是null, 否则应该是序列化之后的JavaScript对象

            response
            responseText-->作为响应主体被返回的文本
            status-->响应的HTTP状态 200系列为ok, 304为缓存, 400系列为客户端错误, 500系列为服务器错误
            statusText-->状态说明

            XHR的readyState
            0 1 2 3 4
            未初始化, 启动, 发送, 接收, 完成
            未调用open(), 调用open(), 调用send(), 接收到部分响应数据, 数据接收完毕
            一般这样写
            var xhr = new XMLHttpRequest()
            xhr.onreadyStatechange = function() {
                if (xhr.readyState == 4) {
                    ...
                }
            }
            xhr.open(method, url, boolean)
            xhr.send(data)

            HTTP头部信息
            一系列的方法, 例如
            Accept-->能够处理的内容类型
            Accept-Charset-->..字符集
            ..
            Connection-->连接的类型
            Cookie-->当前页面的
            Host-->发出请求的页面所在的域
            Referer-->错别字, 发出请求的页面的URL
            这些头部信息必须在open(), 之后, send()之前使用setRequestHeader()来设定

            get请求
            直接向服务器查询信息, 如果需要提交信息, 则可以在url末尾添加字符串的形式

            post请求
            通常用于向服务器发送应该被保存的信息
        }

        XMLHttpRequest二级
        {
            FormData对象
            var data = new FormData()
            data.append("age", "55")
            创建一个表单对象, 并且插入了一条内容, 也可以从页面中选择的forms数组中找一条添加进去, 例如
            data.append(document.forms[4])-->添加第5条表单条目
        }

        进度事件
        progress事件, 可以用来做进度条, 例如上传文件的

        跨域
        补充资料
        {
            跨域资源共享 CORS 详解 - 阮一峰的网络日志
            http://www.ruanyifeng.com/blog/2016/04/cors.html
        }
        {
            CORS:
            服务器设置Access-Control-Allow-Origin: http://xxx.com
            请求页面在请求头设置Origin: http://xxx.com, 实际上, 除了ie, 其他浏览器都不需要设置

            Preflighted Reqeusts(预检请求)
            这种透明服务器验证机制支持开发人员使用自定义的头部, GET或POST之外的方法, 以及不同类型的主体内容

            带凭据的请求
            一般来说, 跨域请求都不提供凭据(cookie, HTTP认证, 客户端SSL等), 如果在请求头上设置withCredentials属性为true, 则这个请求应该发送凭据, 相应地, 服务器的HTTP头部应该有Access-Control-Allow-Credentials: true
            如果服务器没有包含这个头部, 浏览器就不会发送请求, 可以用于安全认证

            图像Ping
            不用担心跨域问题, 用来跟踪广告浏览量

            JSONP
            利用script标签进行信息传递

             Comet, 服务器推送, 能够近乎实时地将数据变化反应到浏览器上, 非常适合用在股票, 体育赛事等等场景
             {
                 1.长轮询
                 浏览器定期向服务器发送请求, 看看数据有没有变化, 如果有变化, 则更新
                 2.短轮询
                 页面发起一个请求到服务器, 服务器一直保持连接打开, 直到有数据可以发送
                 他们都要求浏览器在接收数据之前, 发送一个请求, 短轮询是服务器立即发送响应, 无论数据是否有效, 长轮询则等待发送响应

                 3.HTTP流
                 实现的原理是, 将数据打印输出缓存之后刷新, 将输出缓存中的内容一次性全部发送到客户端
                 浏览器通过监听readystatechange事件以及检测readyState的值是否为3, 利用XHR实现HTTP流

                 4.服务器发送事件SSE
                 简单实用的API, 可以实现长轮询, 短轮询以及HTTP流
                 {
                     var source = new EventSource('myevents.php')
                     source.onmessage = function(event) {
                         var data = event.data
                     }
                     source.close()

                     服务器事件会通过一个持久的HTTP响应发送, 格式是纯文本, 前缀data:
                     可以指定一个ID, 用于跟踪数据
                 }
             }

             Web Sockets
             {
                 只有专门的HTTP服务器可以实现
                 使用的不是HTTP协议, URL模式也不同, 数据包很小, 适合移动应用

                 应用场景比较麻烦, 看来暂时不需要, 进阶之后再说
             }

        }
    }
}
