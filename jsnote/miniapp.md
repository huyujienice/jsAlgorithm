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

### 小程序运行环境
1. 在iOS,iPadOS和Mac OS上，小程序逻辑层代码运行在JavaScriptCore中，视图层由WKWebview来渲染的
2. 在Android上，小程序逻辑层代码运行在V8中，视图层由微信自研XWeb引擎来渲染的
3. 在windows上，小程序逻辑层和视图层都是用Chromium内核
4. 在开发工具上，小程序逻辑层代码运行在NW.js中，视图层由Chromium Webview来渲染的    


JavaScriptCore无法开启JIT编译（Just-In-Time Compiler），同等条件下的运行性能要明显低于其他平台     

### 光栅化 Rasterization
https://zhuanlan.zhihu.com/p/78758247

### OAuth 2.0
OAuth的作用就是让客户端安全可控的获取用户的授权，与服务提供商进行互动    
思路：   
设置授权层（authorization layer）。客户端不能直接登录服务提供商，只能登录授权层。将普通用户与客户端区分开来    
客户端登录授权层使用的令牌（token），与用户密码不同。用户可以在登录的时候，指定授权层令牌的权限范围和有效期         
### sitemap.json
用来配置小程序及其页面是否允许被微信爬虫索引     

### initialRenderingCache
可配置initialRenderingCache进行静态初始渲染缓存，第二次进来页面View Thread直接渲染data中的内容信息（效果有限）    


### 神策自定义埋点实现

1. 获取page和Component对象，遍历对象的所有属性，当属性为函数且不为原始生命周期函数的函数为用户自定义函数
2. 默认第一步获取到的函数为用户点击函数，点击函数第一个入参为events，当开启自定义埋点且events.currentTarget.dataset['name']存在则进行函数代理改写    
