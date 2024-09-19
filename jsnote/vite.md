vite是新一代打包构建工具，专注于快速开发体验和优化的构建速度    


### 如何制定vite插件的执行顺序
设置enforce修饰符来强制插件位置
1. pre:在vite核心插件之前调用该插件
2. post:在vite构建插件之后调用该插件   

### vite是否支持commonjs写法
纯业务代码建议使用ESM写法。引入的第三方库及第三方组件采用了CJS写法，vite在预构建的时候会将CJS模块转为ESM模块

### 为什么说vite比webpack要快
vite的冷启动，热更新会比webpack要快    
主要原因是因为底层编译逻辑不同    

vite开发阶段冷启动过程：  
1. 使用esbuild预构建依赖，提前将第三方依赖格式化为ESM模块
2. 本地启动node dev server服务
3. 打开浏览器，访问index.html
4. 基于浏览器已经支持原生ESM模块，逐步去加载入口文件及入口文件的依赖模块。浏览器发起请求后,dev server通过middlewares对请求做拦截，然后对源文件做resolve,load,transform,parse操作，然后再将转换后的内容发送给浏览器   

综上所述，开发模式vite比webpack快的原因：
1. vite不需要全量打包，这是比webpack快的主要原因，vite为按需加载 
2. vite在编译引擎利用了esbuild,更快(esbuild使用GO编写)
3. vite充分利用浏览器缓存。业务源码模块使用协商缓存，本地依赖模块使用强缓存   

### vite对比webpack优缺点
优点：更快冷启动热更新    
缺点：
1. vite由于实时编译打包机制，开发环境首屏加载变慢，懒加载更慢
2. webpack支持面更广，兼容性更加强

### vite如何配置代码拆分
vite的代码拆分是生产构建阶段，基于Rollup的
1. 动态导入import()
2. 配置拆分,build.rollupOptions.output.manualChunks   
3. 使用vite插件，例如vite-plugin-chunk-split  


### vite生命周期
常见生命周期函数：
1. config:vite读取配置文件后调用，可以用来修改配置
2. configureServer:在开发阶段调用，用于配置开发服务器，如添加自定义中间件  
3. transformIndexHtml:用于转换index.html的内容
4. resolveId:用于解析模块的标识符，返回模块ID
5. load:当resolvedId返回有效模块ID后，load来加载模块内容
6. transform:当模块内容被加载时，对模块源码进行转换    
7. handleHotUpdate:处理HMR逻辑    
8. renderChunk:生产构建阶段对chunk进行最后处理       

