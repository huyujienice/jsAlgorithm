# 正则表达式速记

```
*通配符，匹配 0,1,2,3...任意次
+匹配 1,2,3...匹配一次或者多次
?是否存在，匹配 0,1 次
.默认匹配除换行符以外的任何单个字符
\d 匹配一个数字,digital
\D 匹配一个非数字字符
\s 匹配一个空白字符，包括空格，制表符，换页符和换行符，space
\S 匹配一个非空白字符
\w 匹配一个单字字符，数字字母下划线，word
\W 匹配一个非单字字符
^匹配输入开始
$匹配输入结束
```

# 进程，线程，协程

进程 Process,线程 Thread,协程 Coroutine

1. 进程是操作系统资源分配的基本单位，线程是任务调度和执行的基本单位
2. 进程拥有独立的内存空间，线程则共享所在进程中的内存空间
3. 进程之间切换开销较大，而线程间切换开销较小
4. 程序是一个静态指令的集合，而进程是一个正在系统中活动的指令的集合

js 原生不支持协程，但是可以通过 event loop 模拟协程行为，协程的调度完全由用户控制（进程和线程都是由 cpu 内核进行调度）

1. 协程，特殊的函数（程序控制）
2. 一个线程可以拥有多个协程
3. 可以暂停执行(暂停的表达式称为暂停点)
4. 可以从挂起点恢复（保留其原始参数和局部变量）
5. 事件循环是异步编程的底层基石

协程的优点：

1. 没有线程上下文切换的开销，Coroutine 切换调度开销方面远比线程小
2. 无需原子操作锁定及同步的开销
3. 方便切换控制流，简化编程模型
4. 每个 goroutine 默认占用内存远比 Java，C 的线程少。Coroutine:2KB(官方),线程:8MB(参考网络)  
   高并发+高扩展性+低成本：一个 CPU 支持上万个协程都不是问题。所以很适合用于高并发处理。

协程的缺点：

1. 无法利用多核资源：协程的本质是个单线程，它不能同时将单个 CPU 的多核用上，协程需要和进程配合才能运行在多 CPU 上
2. 进行阻塞(Blocking)操作(如 IO 时)会阻塞掉整个程序  
   CPU 密集型代码(各种循环处理，计算等等)：使用多进程。IO 密集型代码(文件处理，网络爬虫等)：使用多线程

### 浏览器多进程架构

浏览器主要包含以下主要进程：  
1.主进程，负责协调主控，只有一个。作用包括：  
 1.1 负责浏览器界面显示，与用户前进后退等交互  
 1.2 创建和销毁其他进程  
 1.3 网络资源的管理与下载  
2.第三方插件进程：每种类型插件对应一个进程，仅当使用该插件时创建  
3.GPU 进程：最多一个，用于 3D 绘制  
4.浏览器渲染进程(浏览器内核)(Renderer 进程，内部是多线程的)：默认每一个 Tab 页面一个进程，互不影响。主要作用是页面渲染，脚本执行，事件处理等

浏览器渲染进程主要包含以下线程：  
1.GUI 渲染线程  
2.JS 引擎线程  
3.事件触发线程  
4.定时触发器线程  
5.异步 http 请求线程

主流浏览器内核：  
Safari->webkit  
chrome->Blink(webkit 分支)  
firefox->Gecko

# 位 字节 字

位，来自英文 bit,音译为“比特”，表示二进制位。位是计算机内部数据存储的最小单位。

字节，来自英文 Byte，习惯上用大写“B”表示。字节是计算机中数据处理的基本单位。计算机中以字字节为单位存储和解释信息，规定一个字节由八个二进制位构成，即 1 个字节等于 8 个比特(1Byte=8bit)。八位二进制数最小为 00000000，最大为 11111111；通常一个字节可以存入一个 ASCII 码(ASCII 码包括一些标点符号，大小写英文字母，数字，键盘操作等，所以需要 256 种状态来存储)，二个字节可以存放一个汉字国标码。

1B=8b  
1KB=1024B  
1MB=1024KB  
1GB=1024MB  
1TB=1024GB

# 十六进制

每个十六进制可表示 0~15 大小，一般用数字 0 到 9 和字母 A 到 F 表示，其中：A~F 相当于十六进制的 10~15，十六进制以 0x 或 0X 作为前缀  
4b 可表示一个单独的十六进制数，1B 可表示 2 个连续的十六进制数

ASCII 码  
American Standard Code for Information Interchange，美国标准，起初是 128 个字符，后面扩展了，256 个字符

Unicode  
每个符号都给予一个独一无二的编码，是一个符号集

UTF-8  
UTF-8 是互联网上使用最广的一种 Unicode 的实现方式。UTF-8 是 Unicode 的实现方式之一，其他方式还包括 UTF-16,UTF-32，但基本不使用
UTF-8 是一种变长的编码方式。它可以使用 1~4 个字节表示一个符号，根据不同的符号而变化字节长度

### 对称加密

对称加密指加密和解密使用相同的密钥进行加密算法  
优点：算法公开，计算量小，加密速度快，加密效率高  
缺点：单方秘钥泄露双方加密失效  
使用场景：本地数据加密，https 通信，网络传输等  
例如：

1. AES,广泛使用,安全性高

### 非对称加密

一对秘钥，公钥私钥  
RSA算法可实现：
1. 公钥加密，私钥解密：用于加密数据
2. 私钥签名，公钥验证：用于数字签名  
优点：安全性更强,一组公钥私钥，可以保证单个方向传输的安全性  
缺点：花费时间长，速度慢，适合少量数据加密  
使用场景：https 会话前期，CA 数字证书，信息加密，登录认证  
例如:

1. RSA,用于加密和数字签名
2. DSA,用于数字签名,通常与 SHA 结合使用
3. ECC,基于椭圆曲线的加密算法,常用于移动设备和物联网设备

### Hash 算法

将任意长度的消息压缩到某一个固定长度的消息  
优点：不可逆，易计算，特征化  
缺点：可能存在散列冲突  
使用场景：数据一致性校验，数字签名，鉴权登录（密码存储）  
例如：

1. SHA-256,用于 TLS，JWT，区块链
2. SHA-256 + RIPEMD-160,BTC 地址生成

#### 彩虹表

用于破解 Hash 算法，通过预先计算明文->哈希的映射，破解时按需查表即可，核心思想是用空间换时间  
**MD5 及 SHA-1 目前已被攻破，不能用于安全场景**  
如何防御彩虹表

1. 密码哈希前，附加盐值，生成的 Hash 结果会不同
2. 换其他 Hash 算法

### Base64

将二进制的信息流转化为编码为 Base64 的编码的 ASCII 字符串（这种字符串可以显示打印出来也可以通过字符串传播）  
window.btoa 转码  
window.atob 解码  
如何 Unicode 字符串需要转码解码（例如中文），则需要特殊处理，详见 https://developer.mozilla.org/zh-CN/docs/Web/API/btoa

### 成熟请求加密方案

~~在业务 http 场景中，AES 的密钥在前端随机生成，从服务器或者其他平台方式获取 RSA 的公钥，(这样前端逻辑即使泄露也无法直接获取公钥)  
使用 RSA 公钥对 AES 的密钥进行非对称加密，把加密后的密钥放在请求头传递给服务器，用 AES 对 body 进行加密（这样拦截 http 无法获取有效信息）  
服务器收到请求后使用 RSA 私钥解密请求头，得到明文 AES 秘钥，即可对 body 进行解密  
在客户端将 body 明文进行 MD5 加密放入请求头，服务端拿到明文 body 后可进行 MD5 解密，与请求头信息进行比较（这样可以防止 http 被拦截后篡改 body）~~  
**_以上用法不妥_**  
实现类似防爬虫获取 api 信息可以通过身份校验+大数据打标签发放不同的优惠券逻辑实现，不会涉及到加密通道内容

公钥 + 对称加密只能保证“数据加密”，不能保证“你是谁”  
攻击者确实可以使用公钥+对称加密建立与服务器的加密通道，再往通道里面发送任意加密请求，比如`{ action: "transfer", amount: 1000 }`  
但是服务器不会只凭这条加密请求就执行转账，它会校验：  
这条请求是谁发的？（身份认证）  
这个人有没有权限执行转账？（授权）  
这条请求是不是第一次出现？（防重放）  
整条流程串起来：

1. 握手阶段（任何人都能完成）：RSA + AES 建立加密通道
2. 登录阶段（仅限合法用户）：客户端获取登录凭证
3. 转账阶段（必须带有效身份）：     
    3.1 浏览器把 { action: "transfer", amount: 1000, nonce: "..." } 用 AES 加密，并自动附带 JWT。       
    3.2 服务端：      
        3.2.1 用 RSA 私钥解密 AES 密钥 → 解密 JSON     
        3.2.2 验证 JWT 签名 → 确认用户身份     
        3.2.3 检查 nonce 是否已用 → 防重放     
        3.2.4 核对余额 → 执行转账    

如何解决重放问题：服务器在登录或握手时下发单次随机数 nonce，有效期 5~10 分钟，客户端请求携带 nonce + 时间戳

“公钥人人可用”解决的只是数据保密问题  
“谁能做什么”由身份认证（登录令牌）+ 授权逻辑 + 防重放机制决定

### HTTPS 加密原理

基于安全性和性能，采用非对称加密+对称加密的方式进行通信

1. 浏览器预装 CA 机构的数字证书验证程序，服务器给与浏览器数字证书，验证程序能保证数字证书的有效性，从而获取到服务器信息及公钥  
   1.1 验证程序包含公钥私钥，数字证书通过公钥加密，浏览器内验证程序通过数字证书链及私钥解密来获取证书内服务器信息  
   1.2 采用 CA 机构验证服务器公钥的方案能够解决公钥信任问题(网站是否是正常网站，是否备案过等等)及中间人攻击的问题
2. 浏览器生成当次随机的加密串使用服务器公钥进行加密，服务器通过私钥解密，这样 CS 两端都拥有了暂时的随机的加密串
3. CS 两端使用上述随机字符串进行对称加密通信

为什么有些网站需要单独安装证书？  
私有网络/自签/国密/代理场景可能会需要  
例如：  
某些政府及金融网站，因为强制要求 SM2 国密算法，国际浏览器对国密算法支持不完整，无法识别国密 CA  
解决方案：

1. RSA+SM2 双证书部署
2. 客户端浏览器额外按照国密根证书和 TLS 算法插件

### encodeURIComponent decodeURIComponent

将特定的字符转换为 UTF-8 编码,常用于 URL 转义，当 URL 中包含中文的时候可以使用


### 32 位 64 位操作系统区别

32 位及 64 位指的是计算机的处理器架构是 32 位还是 64 位  
32 位指的是处理器一次可以处理 32bit 二进制数据，在进行算术运算，数据传输等操作时，以 32bit 为基本单位操作数据。64 位同理  
32 位系统理论上能够寻址的内存空间是 2\*\*32 字节，也就是 4GB。这意味着它的物理地址空间被限制在 4GB 以内，现代计算器物理内存普遍大于 4G  
32 位系统属于早期系统，数据处理能力差，软件兼容性较差
