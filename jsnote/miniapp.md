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




### sitemap.json
用来配置小程序及其页面是否允许被微信爬虫索引     

### initialRenderingCache
可配置initialRenderingCache进行静态初始渲染缓存，第二次进来页面View Thread直接渲染data中的内容信息（效果有限）    


### 神策自定义埋点实现

1. 获取page和Component对象，遍历对象的所有属性，当属性为函数且不为原始生命周期函数的函数为用户自定义函数
2. 默认第一步获取到的函数为用户点击函数，点击函数第一个入参为events，当开启自定义埋点且events.currentTarget.dataset['name']存在则进行函数代理改写    
