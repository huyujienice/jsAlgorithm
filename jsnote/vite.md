vite 是新一代打包构建工具，专注于快速开发体验和优化的构建速度

### 如何制定 vite 插件的执行顺序
vite.config.js中plugins数组顺序，从上往下依次注册

设置 enforce 修饰符来强制插件位置

1. pre:在 vite 普通插件之前调用该插件
2. post:在 vite 普通插件之后调用该插件
   
插件执行顺序受enforce,插件挂载生命周期钩子函数，vite.config.js中plugins数组注册顺序影响       
生命周期>enforce>plugins注册    

### vite 是否支持 commonjs 写法

纯业务代码建议使用 ESM 写法。引入的第三方库及第三方组件采用了 CJS 写法，vite 在预构建的时候会将 CJS 模块转为 ESM 模块

### 为什么说 vite 比 webpack 要快

vite 的冷启动，热更新会比 webpack 要快  
主要原因是因为底层编译逻辑不同

vite 开发阶段冷启动过程：

1. 使用 esbuild 预构建依赖，提前将第三方依赖格式化为 ESM 模块
2. 本地启动 node dev server 服务
3. 打开浏览器，访问 index.html
4. 基于浏览器已经支持原生 ESM 模块，逐步去加载入口文件及入口文件的依赖模块。浏览器发起请求后,dev server 通过 middlewares 对请求做拦截，然后对源文件做 resolve,load,transform,parse 操作，然后再将转换后的内容发送给浏览器

综上所述，开发模式 vite 比 webpack 快的原因：

1. vite 不需要全量打包，这是比 webpack 快的主要原因，vite 为按需加载
2. vite 在编译引擎利用了 esbuild,更快(esbuild 使用 GO 编写)，vite下一代使用rolldown进行编译，rust编写，性能更强    
3. vite 充分利用浏览器缓存。业务源码模块使用协商缓存，本地依赖模块使用强缓存

### vite 对比 webpack 优缺点

优点：更快冷启动热更新  
缺点：

1. vite 由于实时编译打包机制，开发环境首屏加载变慢，懒加载更慢
2. webpack 支持面更广，兼容性更加强

### vite 如何配置代码拆分

vite 的代码拆分是生产构建阶段，基于 Rollup 的

1. 动态导入 import()
2. 配置拆分,build.rollupOptions.output.manualChunks
3. 使用 vite 插件，例如 vite-plugin-chunk-split

### vite 生命周期

常见生命周期函数：

1. config:vite 读取配置文件后调用，可以用来修改配置
2. configureServer:在开发阶段调用，用于配置开发服务器，如添加自定义中间件
3. transformIndexHtml:用于转换 index.html 的内容
4. resolveId:用于解析模块的标识符，返回模块 ID
5. load:当 resolvedId 返回有效模块 ID 后，load 来加载模块内容
6. transform:当模块内容被加载时，对模块源码进行转换
7. handleHotUpdate:处理 HMR 逻辑
8. renderChunk:生产构建阶段对 chunk 进行最后处理


### Rolldown
rust开发的js打包工具，在下个阶段代替esbuild和rollup，实现vite框架更快更强的性能   