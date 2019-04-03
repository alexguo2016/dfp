# websocket 是什么, 可以用来做什么, 怎么实现

## websocket 是什么

HTML5 开始提过的一种在单个 TCP 连接上进行全双工通讯的协议.
允许服务端主动向客户端推送数据, 在 websocket api 中, 浏览器和服务器只需要完成一次握手, 两者之间就直接可以创建持久性的连接, 并进行双向数据传输.
可以更好地节省服务器资源和带宽, 并且能够更实时地进行通讯(比起 AJAX 轮询).

```js
var Socket = new WebSocket(url, [protocol]);
// protocol是可选的, 表示可以接收的子协议
```

### WebSocket 事件

| 事件    | 事件处理程序     | 描述                       |
| ------- | ---------------- | -------------------------- |
| open    | Socket.onopen    | 连接建立的时候触发         |
| message | Socket.onmessage | 客户端接收服务端数据时触发 |
| error   | Socket.onerror   | 通信发生错误时触发         |
| close   | Socket.onclose   | 连接关闭时触发             |

### WebSocket 方法

| 方法           | 描述             |
| -------------- | ---------------- |
| Socket.send()  | 使用连接发送数据 |
| Socket.close() | 关闭连接         |

### WebSocket 实例

如果需要建立一个 WebSocket 连接, 客户端浏览器首先需要向服务器发起一个 HTTP 请求, 和一般的 HTTP 请求不同, 包含了一些附加头信息, “Upgrade: WebSocket”表明这是一个厂申请协议升级的 HTTP 请求, 服务器端解析这些附加的头信息然后产生应答信息返回给客户端, 客户端和服务器端的 WebSocket 连接就建立起来了, 双方可以通过这个连接通道自由地传输信息, 除非客户端或者服务器端某一方主动地关闭连接.
