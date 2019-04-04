# HTML5 WebSocket 权威指南

总共 400 页, 需要理解 WebSocket 是什么, 可以做什么, 怎么做.
事先已经在菜鸟教程看过一次简单的教程, 知道他是一个全双工的用于即时通讯的 TCP 升级协议, 可以大大节省带宽.

## 第一章 HTML5 WebSocket 简介

### HTML5 是什么

语义化, 更加简单, 更加自然, 更加符合逻辑.
跨域的限制, 协议通讯中变得越来越复杂.

### HTTP 协议的一些局限性

无状态, 导致每次都需要请求头, 冗余的信息. HTTP 是半双工的协议, 一个时刻内, 流量只能单向流动.
HTTP 用于文档共享, 而不是丰富的交互性应用程序.
随着客户端和服务器之间的交互的增加, HTTP 协议在客户端和服务器之间的通信所需要的信息量快速增加.

#### 解决的方法有 HTTP 轮询, 长轮询, 流化

- 轮询, 定时的同步调用, 客户端向服务器发送请求查看是否有可以的新信息. 请求是固定时间发出的, 不管有没有信息, 客户端都会得到响应, 如果没有可用的信息, 服务器返回一个拒绝响应, 客户端关闭连接.
- 长轮询, 客户端向服务器请求信息, 并在设定的时间段内打开一个连接, 如果服务器没有任何信息, 会保持请求打开, 直到客户端可用的信息或者直到指定的超时时间用完为止. 也被称为 Comet 或者反向 AJAX. “挂起 GET”或者“搁置 POST”. 但是, 当信息量很大的时候, 长轮询相对于轮询并没有明显的优势.
- 流化, 客户端发送一个请求, 服务器发送并维护一个持续更新和保持打开的开放响应. 当服务器有需交付给客户端的信息时, 更新响应. 但是, 如果服务器从不发送出完成 HTTP 响应的请求, 连接一直保持打开, 这个情况下, 代理和防火墙可能缓存响应, 导致信息交付的延迟增加.

### WebSocket 入门

WebSocket 时一种自然的全双工, 双向, 单套接字连接.
和轮询不同, WebSocket 值发出一个请求, 服务器不需要等待来自客户端的请求.

### 为什么需要 WebSocket

- 性能, 使得实时通信更加有效. 节约带宽, CPU 资源并减少延迟
- 简洁性, 比起 AJAX, 简单一些.
- 与标准相关, WebSocket 是一个低层网络协议, 可用在它的基础上构建其他标准协议.
- 与 HTML5 相关, WebSocket 为 HTML5 提供了 TCP 风格的网络, 没有破坏浏览器安全性.

### WebSocket 和 RFC 6455...

## 第二章 WebSocket API

### API 概览

使用 WebSocket 接口, 需要创建一个新的 WebSocket 对象实例, 并为新对象提供一个代表需要连接端口的 URL 即可.
这个 API 完全是事件驱动的.

### API 入门

1. 调用 WebSocket 构造函数, 创建一个 WebSocket 连接. 这个构造函数返回 WebSocket 对象实例, 可以监听这个对象上面的事件, 例如何时消息到达, 何时连接关闭以及发生错误等等.

   ```js
   var ws = new WebSocket("ws://www.websocket.org");
   var ws = new WebSocket("ws://www.websocket.org", "myProtocol"); // myProtocol是子协议, 需要服务器和客户端都知道, 匹配的, 例如XMPP和STOMP
   ```

2. WebSocket 事件, WebSocket API 是纯事件驱动的. 应用程序代码监听 WebSocket 对象上的事件, 以便处理输入数据和连接状态的改变. 消息和事件将在服务器发送它们的时候异步到达. 要开始监听事件, 只要为 WebSocket 对象添加回调函数即可. 也可以使用 addEventListener() DOM 方法为 WebSocket 对象添加事件监听器.

   - open

   ```js
   ws.onopen = function(e) {};
   ```

   - message, 也可以设置 ws.binaryType = “blob(arraybuffer)” 来设定处理的消息格式
   - error, 发生错误的时候触发, 还会导致 WebSocket 连接关闭.
   - close, ping, pong

3. WebSocket 方法

   - send(), 在调用 onopen 监听器之后, onclose 之前使用. 可以从客户端向服务器发送消息, 一条或者多条, 可以保持连接打开, 除非调用 close()方法终止连接. 有点类似 AJAX, 有一个热 adyState 属性, 代表是否可以再次发送数据

   ```js
   var ws = new WebSocket('ws://echo.websocket.org')
   ws.onopen = function(e) {
     ws.send(“hello world”)
   }

   function myEventHandler(data) {
     if(ws.readyState === WebSocket.OPEN) {
       ws.send(data)
     } else {
       console.log("not ready yet")
     }
   }
   ```

   - close()

4. WebSocket 对象特性

   1. readyState, 可以有 4 个值, WebSocket.CONNECTING-->0, WebSocket.OPEN-->1, WebSocket.CLOSING-->2, WebSocket.CLOSED-->3

   2. bufferedAmount, 发送数据的时候, 缓冲的大小, 在试图关闭连接之前, 需检查对象的这个属性, 确保数据已经全部发送到服务器.

   ```js
   var THRESHOLD = 10240;
   var ws = new WebSocket("ws://echo.websocket.org/updates");
   ws.onopen = function(e) {
     setInterval(function() {
       if (ws.bufferedAmount < THRESHOLD) {
         ws.send(getApplicationState());
       }
     }, 1000);
   };
   ```

   3. protocol, 告诉我们, 特定 WebSocket 上使用的协议.

### 全部组合起来

### 检查 WebSocket 支持

如果浏览器可以读取 window.WebSocket 的值, 代表支持 WebSocket

### 在 WebSocket 中使用 HTML5 媒体

## 第三章 WebSocket 协议

### WebSocket 协议之前

### WebSocket 协议简介

### WebSocket 协议

### 用 Node.js 编写 Javascript WebSocket 服务器

## 第四章 用 XMPP 构建 WebSocket 上的即时消息和聊天

## 第五章 用 STOMP 通过 WebSocket 传递消息

## 第六章 用远程帧缓冲协议实现 VNC

## 第七章 WebSocket 安全性

## 第八章 部署的考虑

## 附录
