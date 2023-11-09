# event loop

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
child_process模块用于在nodejs中创建和操作子线程，执行外部的脚本或者命令    
1. spawn()
2. exec()
3. execFile()
4. fork()

## Cluster
Cluster是常见的nodejs利用多核的办法，它是基于child_process.fork()实现的     
cluster模块用于创建多个nodejs进程，实现负载均衡和并行处理    
cluster模块适用于在同一个nodejs应用程序中处理并行任务，而child_process模块适用于与外部进程交互    
# 异步I/O
node实现异步I/O是通过多线程模拟实现线程池来实现的
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
6. console.log提供更加方便的格式化输出，自动管理缓冲，支持复杂数据打印，非常适合日常debug  

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