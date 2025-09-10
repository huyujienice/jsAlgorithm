### HTTP 协议结构


#### HTTP 请求报文结构

1. 请求行：分别是请求方法+空格+URL+空格+协议版本+\r\n
2. 请求头：由多个请求头键值对组成，中间以冒号：隔开，每个键值对最后是\r\n
3. 空行：即\r\n
4. 请求包体：包体部分

#### HTTP 响应报文结构

1. 状态行：分别是协议版本+空格+状态码+空格+状态码描述符+\r\n
2. 响应头：由多个响应头部键值对组成，中间以：隔开，每个键值对最后是\r\n
3. 空行：即\r\n
4. 响应包体：包体部分

### HTTP 请求方法

1. GET:获取指定页面信息
2. HEAD:类似 GET 请求，但响应中没有具体内容，只有响应 Header
3. POST:向指定 URL 提交信息
4. PUT:向服务器传送数据
5. DELETE:请求服务器删除指定内容
6. OPTIONS:查看服务器信息
7. TRACE:回显服务器收到的请求，主要用于测试和诊断
8. PATCH:是对 PUT 方法的补充，用来对已知资源进行局部更新
9. CONNECT:HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器

#### GET 和 POST 区别

1. 数据位置，GET 传参附加在 url 上，POST 传参附加在 Body 上
2. 数据长度限制，GET 由于在 url 上传参，url 有长度限制，POST 没有
3. 数据安全性，GET 在 url 上能看得到，POST 看不到
4. 缓存，GET 会被浏览器缓存，POST 不可缓存

GET 和 POST 都属于 HTTP 请求方法，没有本质区别，只是一种规范  
有个浏览器级别的区别就是，GET 产生一个 TCP 数据包，POST 产生两个 TCP 数据包

### HTTP 状态码

1. 1xx:服务器收到请求，需要请求者继续执行操作
2. 2xx:成功
3. 3xx:重定向
4. 4xx:客户端错误
5. 5xx:服务器错误     
   
例如：   
- 101:协议切换，比如切换 websocket 协议  
- 301:永久重定向  
- 302:临时重定向  
- 304:资源未修改，可使用协商缓存  
- 401:要求用户授权  
- 431:请求头太大

### HTTP响应头 content-type

文件类型，决定浏览器以什么形式，什么编码读取HTTP响应（有些网页点击结果下载图片或者文件的原因）  
MIME 类型是描述消息内容的标准，用来表示文档，文件或字节流的性质和格式  
通用结构：type/subtype  
例:

1. text/html:超文本标记语言.html
2. text/plain:普通文本.txt
3. image/gif:GIF 图形.gif
4. image/jpeg:JPEG 图形.jpeg .jpg
5. application/x-gzip:GZIP 文件.gz
6. application/x-tar:TAR 文件.tar

设置 content-type:application/octet-stream，响应为字节流，浏览器处理字节流的默认方式就是下载  
配合设置 Content-Disposition 来实现图片文件下载（网页内联还是下载到本地）  

Content-Disposition用于指示响应内容如何被处理，常见的有
1. inline:默认值，表示响应内容应该在浏览器窗口显示
2. attachment:表示响应内容应该被下载到本地    

例如图片下载需设置：  
Content-Type: application/octet-stream  
Content-Disposition: attachment; filename="picture.png"

### HTTP URL

┌─────────────────────────────────────────────────────────────────────────────┐
│                                    href                                     │
├──────────┬┬───────────┬─────────────────┬───────────────────────────┬───────┤
│ protocol ││   auth    │      host       │           path            │ hash  │
│          ││           ├──────────┬──────┼──────────┬────────────────┤       │
│          ││           │ hostname │ port │ pathname │     search     │       │
│          ││           │          │      │          ├─┬──────────────┤       │
│          ││           │          │      │          │ │    query     │       │
"  http:   // user:pass @ host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          ││           │          │      │          │ │              │       │
└──────────┴┴───────────┴──────────┴──────┴──────────┴─┴──────────────┴───────┘

### XSS

Cross-Site Scripting,XSS 代码注入
- 恶意客户端脚本上传攻击服务器
- 网站被恶意脚本注入进行用户欺骗

如何解决：

1. 不信任客户端操作，传参转码，业务主流程关键节点校验，用户输入及操作 API 校验
2. CSP 策略,"内容安全策略"，提供加载外部资源白名单

### CSRF

Cross-Site Request Forgery,伪造跨站请求  
利用浏览器会话保持的特性，借用用户登陆信息，以用户身份模拟发送各种请求

如何解决：

1. API 同源检查
   1.1 Origin Header
   1.2 Referer Header

2. CSRF Token 校验，取代 Cookie 校验
3. 业务主流程关键节点校验

Cookie 虽然存在同源策略，但是 CSRF 利用了 Web 浏览器的一个特性：  
浏览器会自动将 Cookie 和其他会话标识随着 HTTP 请求发送到同一个域，即使这个请求是由另一个域上的页面发起的。  
这是因为浏览器认为，如果用户已经登陆了一个网站，那么用户可能希望在同一个浏览器窗口或标签页中进行会话保持

### 中间人攻击

Man-in-the-middle attack MITM  
公共场所免费 wifi,劫持流量

如何解决：

1. https
2. 相互认证
3. 延迟测试，通讯延迟异常则可能存在第三方中间人

# OSI 七层网络模型

Open System Interconnect,开放式系统互联

## 应用层

为应用程序提供服务  
HTTP 协议，超文本传输协议，它允许将超文本标记语言 HTML 文档从 web 服务器传送到客户端的浏览器

## 表示层

数据格式转化，数据加密

## 会话层

建立，管理和维护会话

## 传输层

建立，管理和维护端到端的连接  
建立端口（port）到端口的通信，端口是 0 到 65535 之间的一个整数，刚好是 16 个二进制位，0 到 1023 的端口被系统占用，用户只能选择大于 1023 的端口。  
Unix 系统就把主机+端口，叫做“套接字”（socket），源端口号+ip 首部的 ip 源地址+目的端口号+ip 首部的目的 ip 地址，唯一的确定了 tcp 连接。  
"套接字"(Socket)是一种在计算机网络中用于实现进程间通信的编程接口(个人感觉类似于后端接口 api 的概念)
tcp协议位于传输层     

### tcp 协议结构

#### 首部
通常包含 20 个字节

##### 首部标识位说明

标识符可为 01,1 表示有效

1. ACK:确认标识，连接建立成功后，总为 1。为 1 时确认号有效
2. RST:复位标识，重新连接
3. SYN:新建连接标识，建立新连接时，该位为 1
4. FIN:关闭连接标识

##### TCP 连接建立（三次握手）

1. 当新建连接时，客户端到服务端的报文段的 SYN 位被启用，此时序号字段包含了初始序列号 ISN
2. 服务端返回 ACK（确认序号为客户端序号 ISN+1）作为确认。同时发送 SYN 作为应答（序号为内容为服务端唯一序号）
3. 客户端发送 ACK 确认收到（确认序号为服务端序号+1）

##### 为何是三次握手

1. TCP 连接时全双工的，数据在两个方向上能同时传递
2. 要确保双方，同时能发送数据和接收数据
3. 第一次握手，证明了发送方能发送数据
4. 第二次握手，ack 确保了接收方能接收数据，syn 确保了接收方能发送数据
5. 第三次握手，确保了发送方能接收数据
6. 建立连接其实是 4 个维度的信息交换，不过中间两步合并为一次握手了
7. 4 次握手浪费，2 次握手不能保证双方同时具备收发功能

##### TCP 断开连接（四次挥手）

1. （客户端）主动关闭的一方发送 FIN,表示要单方面关闭数据的传输
2. 服务端接收到 FIN 后，发送一个 ACK 作为确认（序列号为收到的序列号+1）
3. 等服务端传输数据完毕，也发送一个 FIN 的标识，表示关闭这个方向的数据传输
4. 客户端回复 ACK 以确认回复

##### 为什么是四次挥手

1. TCP 连接时全双工的，数据在 2 个方向上能同时传递
2. TCP 支持半关闭（发送一方结束发送还能接收数据）
3. 因此每个方向都要单独关闭，且收到关闭通知需要发送确认回复

TCP 三次握手保证双方功能性，四次挥手保证双方传输数据完整性

##### 为什么要支持半关闭

1. 使用半关闭的单连接效率要比使用两个 TCP 连接更好

## 网络层

IP 选址及路由选择  
引进一套新的地址，使得我们区分不同的计算机是否属于同一个子网络，这套地址就是“网址”

### IP 协议结构


## 数据链路层
提供介质访问和链路管理  
来自线路的二进制数据包称作一个帧
链路中这么多连续 01 如何分辨哪些是一个帧的信息？
以太网帧结构由前导码和帧开始符开始，冗余校验结尾，每个帧之间都有帧间距

## 物理层

### websocket

websocket 是基于 TCP 的一种新的持久化应用层网络协议。它实现了客户端与服务端全双工通信，即服务器主动发送消息给客户端

特点：

1. 与 HTTP 协议有良好兼容性，握手阶段使用 HTTP 协议进行握手，复用 HTTP 服务器进行协议升级
2. 较小的开销，因 websocket 有状态，建立连接后不需要携带大量状态标识信息
3. 没有同源政策

主要流程：

1. 客户端发起 HTTP 协议完成单次握手,协议新增请求头  
   - Connection:Upgrade
   - Upgrade:websocket
2. 服务端返回 101,表示成功建立 websocket 协议
3. 全双工 websocket 通讯

websocket心跳：客户端每隔固定时间向服务器ws.send数据，如果服务器未正常返回说明连接断开，客户端主动ws.close关闭连接，触发onClose     
websocket实现断线重连：监听onClose事件，当触发onClose事件后判断是否完成数据传输，没有完成则重新进行连接    

### SSE

Server-Sent Events,服务器向浏览器推送消息  
HTTP 协议无法做到服务器主动推送消息。但是如果服务器向客户端的不是一次性的数据包，而是一个数据流（streaming）。那么客户端就不会关闭连接  
核心原理：基于 HTTP 协议，使用流消息向浏览器推送信息  
优点：

1. SSE 基于 HTTP 协议，适用性广。websocket 是独立协议，是 HTTP 协议升级
2. SSE 轻量，使用简单
3. SSE 默认支持断线重连，websocket 需要自己实现
4. SSE 一般用来传送文本，websocket 默认传送二进制
5. SSE 支持自定义发送消息类型

客户端使用 EventSource 实现连接

```js
let source = new EventSource(url);
source.addEventListener(
  "open",
  function (event) {
    // ...
  },
  false
);
source.addEventListener(
  "message",
  function (event) {
    let data = event.data;
    // handle message
  },
  false
);
source.addEventListener(
  "error",
  function (event) {
    // handle error event
  },
  false
);
```

服务端向浏览器发送SSE数据，必须是UTF-8的文本，设置Content-type:text/event-stream    

### 逐字渲染效果
将字符串拆分成单个字符，使用settimeout或requestAnimationFrame引入渲染队列，结合CSS3中transition的opacity实现逐个出现的效果       

### HTTP1.1 HTTP2.0 HTTP3.0

http1.1

1. http1.1 基于文本解析，把所有请求和响应作为纯文本
2. http1.1 加入缓存处理(强缓存和协商缓存)
3. http1.1 拥有长连接(Connection:keep-alive)，同一个 TCP 连接上串行传输多个 HTTP 请求与响应

http2

1. 不同于 http1.1 文本传输，http2 采用二进制传输，将内容进行分流
2. 头部字段压缩
3. 多路复用，同一 TCP 连接可并行传输多个 HTTP 请求和响应，请求数据无序，浏览器组装
4. 服务端主动推送缓存

http3

1. 优化头部压缩
2. 放弃 tcp 协议,通过 QUIC(udp)协议建立，解决了队头堵塞问题等问题

### Connection: keep-alive 和多路复用区别

Connection: keep-alive 是同一个 TCP 连接串行处理多个 HTTP 请求  
多路复用是并行传输多个请求

### 浏览器缓存

浏览器缓存分为 4 种，当依次查找以下缓存且都没有命中的时候，才会去请求网络

1. service worker
2. memory cache --内存
3. disk cache --硬盘
4. push cache --HTTP2 推送缓存

强缓存：不会向服务器发送请求，直接从缓存中读取数据

1. Expires 设置强缓存过期时间
2. Cache-Control 设置缓存命令

协商缓存：强缓存失效后，向服务器发送获取资源请求  
HTTP 状态码 304 表示缓存有效，无需更新  
HTTP 状态码 200 表示缓存失效，返回资源结果

1. Last-Modified 和 If-Modified-Since:资源更新时间
2. ETag 和 If-None-Match：资源的唯一标识

### 强制刷新强缓存

入口 html 文件设置 no-cache,其他资源设置 max-cache

### 数据传输安全

可以基于 TCP 协议实现私有协议通讯?  
Netty

### 浏览器跨域 CORS

同源政策是浏览器独有核心安全策略，协议，域名，端口号任意不同则非同源  
非同源以下行为收到限制：

1. Cookie,LocalStorage,IndexDB 无法读取
2. DOM 无法获得
3. 基于 XMLHttpRequest 及 Fetch 的 AJAX 请求无法获取

如何解决浏览器跨域问题:

1. JSONP:通过在 html 加入 script 元素，向服务器请求 JSON 数据，只支持 get 请求
2. WebSocket 
3. （速记 ACAO）服务端设置响应头 ```Access-Control-Allow-Origin:*```

### XMLHttpRequest Fetch

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "/service");

// state change event
xhr.onreadystatechange = () => {
  // is request complete?
  if (xhr.readyState !== 4) return;

  if (xhr.status === 200) {
    // request successful
    console.log(JSON.parse(xhr.responseText));
  } else {
    // request not successful
    console.log("HTTP error", xhr.status, xhr.statusText);
  }
};

// start request
xhr.send();
```

```js
fetch("/service", { method: "GET" })
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:", err));
```

区别：

1. Fetch 支持设置浏览器缓存，XMLHttpRequest 只能通过附加随机查询字符串绕过浏览器缓存
2. 服务器未设置 Access-Control-Allow-Origin，Fetch 和 XMLHttpRequest 都会失效，但是 Fetch 有'no-cors'模式，可配合 service worker 获取静态资源
3. Fetch 可设置是否发送 cookie,XMLHttpRequst 总是发送 cookie
4. Fetch 可设置是否遵循服务器重定向命令，XMLHttpRequest 不可设置
5. Fetch 支持流式请求和响应，XMLHttpRequest 不支持
6. Fetch 不支持获取上传进度，XMLHttpRequest 支持
