# OSI七层网络模型  
Open System Interconnect,开放式系统互联

## 应用层
为应用程序提供服务  
HTTP协议，超文本传输协议，它允许将超文本标记语言HTML文档从web服务器传送到客户端的浏览器    

### HTTP协议结构
客户端发出的消息称为HTTP请求，服务端返回的消息称为HTTP响应  

#### HTTP请求结构
1.请求行：分别是请求方法+空格+URL+空格+协议版本+\r\n  
2.请求头：由多个请求头键值对组成，中间以冒号：隔开，每个键值对最后是\r\n  
3.空行：即\r\n  
4.请求包体：包体部分  

#### HTTP响应结构
1.状态行：分别是协议版本+空格+状态码+空格+状态码描述符+\r\n  
2.响应头：由多个响应头部键值对组成，中间以：隔开，每个键值对最后是\r\n  
3.空行：即\r\n  
4.响应包体：包体部分  

### HTTP请求方法
1.GET:获取指定页面信息  
2.HEAD:类似GET请求，但响应中没有具体内容，只有响应Header  
3.POST:向指定URL提交信息  
4.PUT:向服务器传送数据  
5.DELETE:请求服务器删除指定内容  
6.OPTIONS:查看服务器信息  
7.TRACE:回显服务器收到的请求，主要用于测试和诊断  
8.PATCH:是对PUT方法的补充，用来对已知资源进行局部更新  
9.CONNECT:HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器  


## 表示层  
数据格式转化，数据加密  

## 会话层  
建立，管理和维护会话  

## 传输层  
建立，管理和维护端到端的连接  
建立端口（port）到端口的通信，端口是0到65535之间的一个整数，刚好是16个二进制位，0到1023的端口被系统占用，用户只能选择大于1023的端口。  
Unix系统就把主机+端口，叫做“套接字”（socket），源端口号+ip首部的ip源地址+目的端口号+ip首部的目的ip地址，唯一的确定了tcp连接。

### tcp协议结构

#### 首部
通常包含20个字节
1.1-2B（代表第一个到第二个字节）：源端口号  
2.3-4B:目的端口号  
3.5-8B:序号，tcp提供全双工服务，两端都有各自的序号。解决网络包乱序问题  
4.9-12B:确认序列号，上次成功收到的数据字节序号加1，ack为1才有效。解决丢包问题  
5.13.0-13.5B:6b长度，偏移量  
6.13.5B-14B:6b长度，保留  
7.13-14B:标识位，控制各种状态  
8.15-16B:窗口大小，接收端期望接收的字节数。解决流量控制的问题  
9.17-18B:校验和，由发送端结算和存储，由接收端校验。解决数据正确性问题  
10.19-20B:紧急指针  

##### 首部标识位说明
标识符可为01,1表示有效  
1.URG:为1时，表示紧急指针有效    
2.ACK:确认标识，连接建立成功后，总为1。为1时确认号有效    
3.PSH:接收方应尽快把这个报文交给应用层    
4.RST:复位标识，重新连接    
5.SYN:建立新连接标识，建立新连接时，该位为1    
6.FIN:关闭连接标识  

##### TCP连接建立（三次握手）
1.当新建连接时，客户端到服务端的报文段的SYN位被启用，此时序号字段包含了初始序列号ISN  
2.服务端返回ACK（确认序号为客户端序号ISN+1）作为确认。同时发送SYN作为应答（SYN的序号为服务端唯一序号）  
3.客户端发送ACK确认收到（确认序号为服务端序号+1）  

##### 为何是三次握手
1.TCP连接时全双工的，数据在两个方向上能同时传递  
2.要确保双方，同时能发送数据和接收数据  
3.第一次握手，证明了发送方能发送数据  
4.第二次握手，ack确保了接收方能接收数据，syn确保了接收方能发送数据  
5.第三次握手，确保了发送方能接收数据  
6.建立连接其实是4个维度的信息交换，不过中间两步合并为一次握手了  
7.4次握手浪费，2次握手不能保证双方同时具备收发功能  
  

##### TCP断开连接（四次挥手）
1.（客户端）主动关闭的一方发送FIN,表示要单方面关闭数据的传输  
2.服务端接收到FIN后，发送一个ACK作为确认（序列号为收到的序列号+1）  
3.等服务端传输数据完毕，也发送一个FIN的标识，表示关闭这个方向的数据传输  
4.客户端回复ACK以确认回复  

##### 为什么是四次挥手
1.TCP连接时全双工的，数据在2个方向上能同时传递  
2.TCP支持半关闭（发送一方结束发送还能接收数据）  
3.因此每个方向都要单独关闭，且收到关闭通知需要发送确认回复  

##### 为什么要支持半关闭
1.使用半关闭的单连接效率要比使用两个TCP连接更好


## 网络层  
IP选址及路由选择  
引进一套新的地址，使得我们区分不同的计算机是否属于同一个子网络，这套地址就是“网址”  

## 数据链路层  
提供介质访问和链路管理  
来自线路的二进制数据包称作一个帧
链路中这么多连续01如何分辨哪些是一个帧的信息？
以太网帧结构由前导码和帧开始符开始，冗余校验结尾，每个帧之间都有帧间距  

### 以太网结构  

#### 前同步码
10101010 10101010 10101010 10101010 10101010 10101010 10101010  
7个字节，作用是使接收端的适配器在接收MAC帧时能够迅速调整时钟频率，使它和发送端的频率相同  
#### 帧开始符
10101011  
1个字节  
一个帧已7个字节的前导码和1个字节的帧开始符作为帧的开始，即  
10101010 10101010 10101010 10101010 10101010 10101010 10101010 10101011 
//todo
//没搞清楚16进制为什么转成这样，不应该是0xaa吗？
由于在传输一个字节时最低位最先传输（LSB），因此对应的16进制表示为 0x55 0x55 0x55 0x55 0x55 0x55 0x55 0xD5  
#### 报头,目的MAC地址
6个字节，目的地方的MAC地址，用处是当网卡接收到一个数据帧时，首先会检查该帧的目的地址，是否与当前适配器的物理地址相同，如果相同则进一步处理，不相同则丢弃  
#### 报头，源MAC地址  
6个字节，发送端的MAC地址    
报头包含源地址和目标地址的MAC地址  
#### 类型
2个字节，该字段在网络协议分解中及其重要，PDU（协议数据单元）来到某一层时，它需要将PDU交付给上层，而上层协议众多，所以在处理数据时，必须要一个字段标识我这个交付给谁。  
例如：该字段为0x0800时，表示将有效载荷交付给IP协议，为0x0806交付给ARP，0x8035交付给RARP。
#### 数据
有效负荷，需要交付给上层的数据。数据长度最小为46字节，最大为1500字节  
#### 帧校验码FCS
帧校验码是一个32位循环冗余校验码，以便验证帧数据是否被损坏  
#### 帧间隙
最小12个字节，其数据全为1？
11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111 11111111

## 物理层  


