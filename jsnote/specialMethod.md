## 项目优化
指标量化

### 微信小程序底层原理简介
https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0004a2ef9b8f803b0086831c75140a  

### 按需加载策略与提前加载策略
静态资源按需加载，图片和iframe，字体，业务        
1. script模块defer有序async无序异步加载,import动态加载    
2. img和iframe标签设置loading="lazy"加入懒加载，或使用Intersection Observer观察元素是否进入视口实现
3. 字体加载使用const font = new FontFace()，document.fonts.add(font),font.load动态加载

下个页面/用户动作等用到的信息可提前加载
1. HTML中的Prefetch,Prerender,Preload   
2. webpack中使用import(/* webpackPrefetch: true */ './sub1.js')，import(/* webpackPreload: true */ './sub2.js')   
3. canvas提前生成背景底图    

### 复杂业务分层
1. 小程序异步canvas生成图片分享，分为数据层和视图层模块    

### js浮点数simplecount计算模块化
js使用IEEE 754标准表示浮点数，无法精确表示所有浮点数的值     

可以将数字转为字符串，字符串转为整数或者bigInt进行计算      
toFixed()进行字符串四舍五入有误差，可以使用转化为字符串进行自定义判断，或者不会出现负数的业务场景下使用Math.round()进行正常的四舍五入      

### vue-router的分包预加载策略    
浏览器环境内通过navigator.connection.type判断是否wifi环境    
如果符合预加载策略，可以通过在route中meta加入自定义字段传递需要预加载的路由队列，在beforeResolve当前路由加载完毕后队列延时import静态路由资源     

### 场景算法优化，策略模式使用（如瀑布流）


### UI组件，如全局加载动画,toast,上拉加载,下拉刷新
上拉加载和下拉刷新可通过将页面组件装进一个全局组件的slot实现具体细节    
上拉加载通过监听此组件的scroll触发回调
下拉刷新通过监听此组件touchstart，touchmove，touchend判断下拉的距离配合transform，transition实现具体交互细节及触发回调         


### webpack plugin 实现uniapp内微信小程序实现独立分包
通过插件监听webpack的done生命周期，读取app.json中的独立分包配置，将app.json进行独立分包配置重写    

### vue simplehtmllayout 模式,vue loader，支持uniapp,vue2.0 ,css原子化思想实践        
webpack loader，将.vue文件进行字符串正则的处理，将template中的匹配的命令，生成css的具体内容塞入style中    


### windows中bat语言备份单机文件存档  
bat语言使用nodejs启动备份脚本，复制文件到指定地址     

### SSR nuxt3 nuxt3-winston-log
nuxt3-winston-log提供nuxt3模块自动记录console.log,console.error日志    
通过winston新增服务端插件，重写console来实现自动记录       

