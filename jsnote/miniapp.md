# 微信小程序底层原理简介
https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0004a2ef9b8f803b0086831c75140a  

## 生命周期
https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page-life-cycle.html    

简单来说就是2个线程，
1. 用户逻辑在AppService Thread中执行，当初始化完毕后，等待View Thread初始化完毕通知
2. View Thread初始化完毕后通知AppService Thread，AppService Thread将onLoad,onShow逻辑传递至AppService Thread进行执行渲染      
3. AppService Thread进行First Render完毕之后通知AppService Thread，AppService Thread将onReady逻辑传递至AppService Thread进行执行渲染        
4. onHide,onShow,onUnload都是通过AppService Thread传递至View Thread进行执行渲染      

总的来说就是逻辑层初始化完毕等待渲染层初始化完毕通知，逻辑层将逻辑传递给渲染层执行，渲染层执行完毕之后会通知逻辑层  


### 小程序启动流程
分为Native微信端，视图层View Thread，逻辑层AppService Thread    

1. Native从微信后台或者本地缓存获取小程序基本信息(头像名称版本配置权限)及代码包，然后进行代码包下载与校验，视图层同时进行Activity初始化，系统初始化和UI初始化，Webview容器和UI的初始化，逻辑层同时进行资源准备
2. Native代码包准备完成之后，将代码包分别派发至视图层和逻辑层，视图层和逻辑层进行前端框架初始化，插件，扩展库代码注入，开发者代码注入
3. 逻辑层经过App.onLaunch,App.onShow,路由事件navigationStart,页面初始化后将初始化数据传入等待中的视图层进行页面初始化渲染
4. 逻辑层页面onLoad,onShow生命周期，将对应的事件传入视图层进行页面渲染，当渲染完毕后通知逻辑层执行页面onReady   

#### 小程序启动环境预加载
微信客户端会依照一定策略在小程序启动前对运行环境进行部分预加载，以降低启动耗时   
1. 视图层进行部分UI和系统组件的创建，WebView部分初始化,小程序基础库注入
2. 逻辑层进行JS引擎初始化和域创建，小程序基础库注入
3. Native（安卓）进行小程序进程和微信基础模块初始化   

#### 安卓和iOS的启动耗时差异
1. iOS设备的平均性能要好于安卓   
2. iOS小程序和微信公用进程，而Android上小程序运行在独立进程，需要额外的进程创建和一些基础模块的初始化流程
3. iOS上需要使用使用系统提供的WebView和JavaScript Core，初始化开销几乎可以忽略
4. 安卓UI和系统组件的创建开销远高于iOS


### 小程序运行环境
1. 在iOS,iPadOS和Mac OS上，小程序逻辑层代码运行在JavaScriptCore中，视图层由WKWebview来渲染的
2. 在Android上，小程序逻辑层代码运行在V8中，视图层由微信自研XWeb引擎来渲染的
3. 在windows上，小程序逻辑层和视图层都是用Chromium内核
4. 在开发工具上，小程序逻辑层代码运行在NW.js中，视图层由Chromium Webview来渲染的    

### 条件编译
使用webpack可参考js-conditional-compile-loader      
uni-app也自带了条件编译实现    



JavaScriptCore无法开启JIT编译（Just-In-Time Compiler），同等条件下的运行性能要明显低于其他平台     

### 光栅化 Rasterization
https://zhuanlan.zhihu.com/p/78758247

### OAuth 2.0
OAuth的作用就是让客户端安全可控的获取用户的授权，与服务提供商进行互动    
思路：     
设置授权层（authorization layer）。客户端不能直接登录服务提供商，只能登录授权层。将普通用户与客户端区分开来    
客户端登录授权层使用的令牌（token），与用户密码不同。用户可以在登录的时候，指定授权层令牌的权限范围和有效期      

### 坐标系
地理坐标系-地心坐标系
1. WGS84:GPS全球定位系统坐标系
2. GCJ-02:中国国家测绘局坐标系，在WGS84基础上执行加密算法而成，国内通用坐标系
3. BD-09:百度坐标系

### sitemap.json
用来配置小程序及其页面是否允许被微信爬虫索引     

### initialRenderingCache
可配置initialRenderingCache进行静态初始渲染缓存，第二次进来页面View Thread直接渲染data中的内容信息（效果有限）   


#### handleWebviewPreload
配置handleWebviewPreload可手动控制页面预加载资源（preloadRule）的触发时机
1. static:默认值，在当前页面onReady触发200ms后触发预加载
2. auto:渲染线程空闲时进行预加载。由基础库根据一段时间内requestAnimationFrame的触发频率算法判断
3. manual:由开发者通过调用wx.preloadWebview触发    


### 神策自定义埋点实现

1. 获取page和Component对象，遍历对象的所有属性，当属性为函数且不为原始生命周期函数的函数为用户自定义函数
2. 默认第一步获取到的函数为用户点击函数，点击函数第一个入参为events，当开启自定义埋点且events.currentTarget.dataset['name']存在则进行函数代理改写    
