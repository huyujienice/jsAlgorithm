# event loop
js实现单线程异步执行的关键    
1. 主线程存在一个执行栈(execution context stack)，同步且不停执行任务    
2. 存在执行队列(task queue)，执行队列中的任务在合适的时刻可放入执行栈中执行      

    2.1. macrotask       
         
        2.1.1 timers:执行setTimeout和setInterval的回调函数    
        2.1.2 I/O callbacks:处理非setTimeout,setInterval,setImmediate,close的回调之外的所有I/O回调          
        2.1.3 idle,prepare:libuv内部调用      
        2.1.4 poll:轮询等待新I/O，如服务器回应，用户移动鼠标等     
        2.1.5 check:执行setImmediate的回调     
        2.1.6 close callbacks:执行关闭请求(close)的回调     

    2.2. microtask       
         
        2.2.1 process.nextTick    
        2.2.2 promise    
 
执行顺序为：     
1.N->2->1.N->2
会不断循环重复        

当一个macrotask中phase的切换，叫一个tick,每个tick之间会执行一次microtask

当进入poll phase中，若没有任何callbacks则持续等待I/0回调直致超时       
若有setImmediate则进入check phase     
若设定了timer且poll phase为空，则进入timer phase    

## process.nextTick setImmediate setTimeout

1. process.nextTick:用于在当前操作完成后，立即在当前事件循环的末尾执行回调函数。    
回调函数会在当前事件循环迭代中执行，而不会等待到下一个迭代。       
优先级高于setImmediate及setTimeout。    

2. setTimeout:用于在指定延迟的时间后将回调函数添加到事件队列。    

3. setImmediate:用于在事件循环的下一个迭代中执行回调函数。创建异步函数优先考虑使用setImmediate。          

## process
1. process.nextTick()
2. process.env
3. process.cwd()
4. process.stdin,process.stdout,process.stderr

## Child process
child_process模块用于在nodejs中创建和操作子进程，执行外部的脚本或者命令      
1. spawn()
2. exec()
3. execFile()
4. fork()

## Cluster
cluster是常见的nodejs利用多核的办法，它是基于child_process.fork()实现的     
cluster模块用于创建多个nodejs进程，实现负载均衡和并行处理    
cluster模块适用于在同一个nodejs应用程序中处理并行任务，而child_process模块适用于与外部进程交互    

## IPC
IPC进程间通信,操作系统进程间通信方式主要有：
1. 共享内存
2. 消息传递
3. 信号量
4. 管道

nodejs中实现IPC通道的是管道(pipe)技术   
child_process.fork()创建node进程，父子进程自带IPC通信机制      
on监听消息send发送消息     
父进程在实际创建子进程之前，会创建IPC通道并监听它，然后才真正创建出子进程，并通过环境变量（NODE_CHANNEL_FD）告诉子进程这个IPC通道的文件描述符fd。子进程再启动过程中，根据fd去连接这个已经存在的IPC通道，从而完成父子进程之间的连接          

除了nodejs内置IPC通信外,其他常用的进程间通信技术有：
1. stdin/stdout
2. Sockets
3. 消息队列，RabbitMQ，Redis


# 异步I/O
node实现异步I/O是通过多线程模拟实现线程池来实现的

### 文件描述符(fd)
Linux系统中，把一切都看做是文件，当进程打开现有文件或创建新文件时，内核向进程返回一个文件描述符(通常为一个正整数)             
文件描述符就是内核为了高效管理已经被打开的文件所创建的索引，用来指向被打开的文件，所有执行I/O操作的系统调用都会通过文件描述符         
fs.open()/fs.openSync()   

# 如何实现文件监听（热更新基础）
fs提供基本的fs.watchFile和fs.watch的API，但是不能开箱即用  
fs.watchFile采用轮询方式有性能问题  
fs.watch操作系统差异明显且会多次触发    
chokidar插件结合fs.watch,抹平了操作系统间的差异，加入了额外的校验与延时机制，分清楚了操作系统预期及用户预期，可开箱即用（vscode底层也是使用此插件）  

# stdout,stdin,stderr   
stdout标准输出,stdin标准输入,stderr标准错误    
当进程被创建的时候，系统会自动为该进程创建三个数据流，就是stdin,stdout,stderr      
对于这三个数据流来说，默认是表现在用户终端上     
可以通过process.stdout.write模拟console.log功能   

## process.stdout.write与console.log   
1. process.stdout.write和console.log都是用于向标准输出流stdout打印输出的方法      
2. node中的console.log方法内部就是使用process.stdout.write实现的       
3. process.stdout.write写入可能是同步或者异步，具体取决于流连接到什么及系统是Windows还是POSIX      
    3.1 文件：在Windows和POSIX上同步    
    3.2 TTY终端:在Windows上异步，在POSIX上同步
    3.3 管道(和套接字):在Windows上同步，在POSIX上异步     
5. process.stdout.write提供了底层的写操作控制，支持流动态写入，但是需要自己管理缓冲和编码处理    
6. console.log提供更加方便的格式化输出，字符串模版解析，自动管理缓冲，支持复杂数据打印，非常适合日常debug  

# HTTP Referer
HTTP中Referer字段标识当前网页来源于哪里，格式为URL。
浏览器默认设置，html网页通过meta设置，元素级设置referrerpolicy(a,img,iframe...)    



# SSR  

## web1.0服务端渲染 
1. 每次更新页面一小部分的模块，都需要服务端发版，开发及部署成本较高，灵活性欠缺          
2. 用户请求的每个页面都是由服务端拼接HTML而成，对服务器性能及可靠性有较高要求      
3. 前端代码js及后端jsp,php代码混杂在一起，开发及维护成本较高    

## CRS渲染
1. 首屏等待加载时间过长，且及其依赖客户端用户性能   
2. SEO(搜索引擎优化)不友好  

## 特点  
1. 首屏等待时间缩短，强制抹平客户端设备性能差异，前端项目性能得到极大增强    
2. SEO友好   
3. 相比CRS,代码复杂度增加，需要nodejs服务器环境，涉及构建设置和部署的更多要求     

## 原理
### 先决条件
#### 组件基于Vnode来实现渲染    
Vnode本身是js对象，兼容性极强，不依赖当前的执行环境，从而可以在服务端渲染及原生渲染    

#### vue-server-renderer
是一个具有独立渲染应用程序能力的包，是 Vue 服务端渲染的核心代码     

1. 应用初始化    
1.1 实例化流程    
1.2 防止交叉污染   

2. 应用输出   
2.1 加载脚本内容    
2.2 模版渲染   


#### JWT
JSON Web Token，用来做用户登陆认证，是一种开放的标准    
JWT包含3个部分，格式为：header.payload.signature

1. Header头部，包含token类型和加密算法    
2. Payload负载，标准登陆字段及业务字段   
3. Signature签名，对头部和负载进行签名防止篡改   

JWT优势：
1. 服务器压力减轻，无需存储用户状态

存在问题:
1. 用户登录状态改变无法处理(退出登录，修改密码，黑名单)，除非服务端存储用户状态    
