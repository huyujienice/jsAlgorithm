## 项目优化

指标量化

SSR 优化
深圳前端服务器：8c16g*3  
广州测试服务器：4c4g*1  
优化成果

1. total performance:13%
2. FCP:7%
3. LCP:18%
4. total blocking time:100%

### 微信小程序底层原理简介

https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0004a2ef9b8f803b0086831c75140a

### 按需加载策略与提前加载策略

静态资源按需加载，图片和 iframe，字体，业务

1. script 模块 defer 有序 async 无序异步加载,import 动态加载
2. img 和 iframe 标签设置 loading="lazy"加入懒加载，或使用 Intersection Observer 观察元素是否进入视口实现
3. 字体加载使用 const font = new FontFace()，document.fonts.add(font),font.load 动态加载

下个页面/用户动作等用到的信息可提前加载

1. HTML 中的 Prefetch,Prerender,Preload
2. webpack 中使用 import(/_ webpackPrefetch: true _/ './sub1.js')，import(/_ webpackPreload: true _/ './sub2.js')
3. canvas 提前生成背景底图

### 复杂业务分层

1. 小程序异步 canvas 生成图片分享，分为数据层和视图层模块

### js 浮点数 simplecount 计算模块化

js 使用 IEEE 754 标准表示浮点数，无法精确表示所有浮点数的值

可以将数字转为字符串，字符串转为整数或者 bigInt 进行计算  
toFixed()进行字符串四舍五入有误差，可以使用转化为字符串进行自定义判断，或者不会出现负数的业务场景下使用 Math.round()进行正常的四舍五入

### vue-router 的分包预加载策略

浏览器环境内通过 navigator.connection.type 判断是否 wifi 环境  
如果符合预加载策略，可以通过在 route 中 meta 加入自定义字段传递需要预加载的路由队列，在 beforeResolve 当前路由加载完毕后队列延时 import 静态路由资源

### 场景算法优化，策略模式使用（如瀑布流）

### UI 组件，如全局加载动画,toast,上拉加载,下拉刷新

上拉加载和下拉刷新可通过将页面组件装进一个全局组件的 slot 实现具体细节  
上拉加载通过监听此组件的 scroll 触发回调
下拉刷新通过监听此组件 touchstart，touchmove，touchend 判断下拉的距离配合 transform，transition 实现具体交互细节及触发回调

### webpack plugin 实现 uniapp 内微信小程序实现独立分包

通过插件监听 webpack 的 done 生命周期，读取 app.json 中的独立分包配置，将 app.json 进行独立分包配置重写

### vue simplehtmllayout 模式,vue loader，支持 uniapp,vue2.0 ,css 原子化思想实践

webpack loader，将.vue 文件进行字符串正则的处理，将 template 中的匹配的命令，生成 css 的具体内容塞入 style 中

### windows 中 bat 语言备份单机文件存档

bat 语言使用 nodejs 启动备份脚本，复制文件到指定地址

### SSR nuxt3 nuxt3-winston-log

nuxt3-winston-log 提供 nuxt3 模块自动记录 console.log,console.error 日志  
通过 winston 新增服务端插件，重写 console 来实现自动记录

### 项目背景优势

电商平台，核心探索业务主要是外卖，美食，卡券。  
总注册用户数约 800 万，每日 PV 约 10 万，每日 GMV 约 20 万。  
C 端主要是用户微信小程序端和用户 APP，B 端主要是商家端 APP 和配送端 APP，采用混合开发模式进行开发和维护。前后端开发人数配比约 1:2

### 前端技术选型

技术选型是个综合考虑的过程，可以考虑几点我认为比较关键的因素：

1. 项目需求分析：明确项目规模，复杂度，用户体验要求，小型静态项目可能只需要引入 jquery
2. 团队技术栈：考虑团队现有的技术栈和成员的技术水平，优先考虑已上线且拥有完整基建的技术解决方案
3. 社区支持与生态系统
4. 性能要求：考虑项目特殊的性能要求，对于首屏的加载时间和运行时性能有极高要求可使用 SSR 技术

### 前端开发规范制定

制定前端开发规范是确保代码质量，提升开发效率，促进团队协作的重要步骤，我们可以考虑以下关键点

1. 版本控制：使用 Git 进行版本控制，确保代码可追踪，便于团队协作
2. 自动构建和部署：使用 Jinkens 进行自动化代码扫描，构建部署，提升团队效率
3. 代码风格统一：使用 ts+Prettier+Eslint 确保代码风格的一致性
4. 代码审查：通过代码审查保证质量，实现模块化，安全性，性能等细节
5. 模版：开发模版对之前的项目技术细节做总结，以及技术预研考虑项目发展趋势和未来更新
6. AI 賦能，将开发规范写入项目提示词中
7. 开发规范形成文件及网站，方便随时查看
