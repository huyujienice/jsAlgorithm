webpack 是一个静态模块打包工具  
当 webpack 处理应用程序时，它会从内部从一个或多个入口构建一个依赖图，然后将你项目中所需的每一个模块组合成一个或者多个 chunk

# 入口

entry 字段指示 webpack 应该使用哪个模块，来作为其构建内部依赖图(dependency graph)的开始     
使用对象语法可以扩展入口定义     
常见场景：     
1. 分离 app(应用程序)和 vendor(第三方库)入口     
2. 多页面应用程序      

通过在entry配置中包含runtime值，则会在entry chunk之外再增加一个专门容纳runtime的chunk对象，多个entry间可共享runtime chunk    

# 输出

ouput 属性指示 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件    
output占位符：    
1. [id] 返回模块id    
2. [path] 返回文件路径    
3. [name] 返回文件名    
4. [ext] 返回扩展名    
5. [hash] 返回整个构建hash     
6. [chunkhash] 返回入口指定模块的hash     
7. [contenehash] 返回文件内容hash    

# loader

webpack 开箱自带解析 js 和 JSON 文件的功能。loader 处理其他类型的文件，并将其转换为有效模块，供程序使用，以及被添加到依赖图中   

```
module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```

test为字符串时筛选匹配资源的绝对路径，为函数时，入参为资源的绝对路径，返回boolean      

test 属性识别哪些文件会被转换  
use 属性定义使用哪个 loader 进行转换   

有两种使用 loader 方式：  
1. 配置方式：webpack.config.js 中通过 module.rules 中 test,use 指定(从右到左，从下到上地取值，执行)  
2. 内联方式：在每个 import 语句中显示指定 loader   

import 语句中，使用!将资源中的 loader 分开

## 自定义 loader

```
/**
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
function aLoader(content, map, meta) {
  // 省略部分代码
}
/**
 * @param {string|Buffer}
 * @param {object}
 * @param {any} [data] 在pitch阶段和normal阶段之间共享的对象
 */
aLoader.pitch = function (remainingRequest, precedingRequest, data) {

};

module.exports = aLoader;
```

loader函数中的this会指向webpack，可以使用this.callback,this.async等访问一些方法或者属性        
loader配置了options对象的话，this.query就指向这个对象，可以通过options传递配置参数    
        
Loader在pitch阶段如果返回非 undefined 值的时候会出现熔断效果，且将返回值交给原本Normal阶段的下一个Loader，类似于“在我之前处理的结果都不算，以我返回的结果为准，将我的结果交给原来的下一个处理者”      
Loader在pitch阶段传递给pitch函数的data,在normal执行阶段也会暴露在this.data之中，可用于捕获共享pitch阶段的信息         
 
Loader可以分为同步Loader和异步Loader     
同步Loader可以通过return语句或者this.callback的方式来同步地返回转换后的结果      
异步Loader通过const callback = this.async()方法来获取callback函数       
  
    
pre loader和post loader,可以通过rule对象内的enforce属性来指定     
正常loader执行顺序
1. 不同阶段之间：pre->normal->post
2. 每个阶段内部：use数组中，从右往左，从下到上

pitch执行顺序跟正常loader执行顺序完全相反
1. 不同阶段之间：post->normal->pre
2. 每个阶段内部：use数组中，从左往右，从上到下

类似中间件洋葱模型
或者说类似浏览器事件传输capture phase和bubbing phase     

# 插件

插件可以执行很多任务，包括：打包优化，资源管理，注入环境变量

## 自定义插件

一个 class 类，定义 apply 方法，以 compiler 为参数，指定挂载到 webpack 自身的事件钩子    
自定义插件举例：https://webpack.docschina.org/contribute/writing-a-plugin/#example    
assets是一个包含compilation中所有静态资源的对象，该对象的键是资源路径，值是文件的源码     
compilation.emitAsset   可以向 compilation 添加新的资源    

### Compiler 和 Compilation  

compiler 是 webpack 底层编译对象的引用  
webpack 从开始执行到结束，compiler 只会实例化一次。compiler 对象记录了 webpack 运行环境的所有信息，  
插件可以通过它获取到 webpack 的配置信息，如 entry,output,module 等配置(通过compiler.options获取完整的配置对象)，也可以直接通过 compiler.hooks 挂载生命周期钩子回调       

compilation 对象，提供了 webpack 大部分生命周期 Hook API 供自定义扩展处理使用  
compilation 对象记录了一次构建到生成资源过程中的信息，它储存了当前的模块资源，编译生成的资源，变化的文件以及被跟踪依赖的状态信息    


### 异步插件
同步用tap来绑定，异步可以用tapAsync或tapPromise来绑定    

### runtime manifest

当 compiler 开始执行，解析和映射时，它会保留所有模块的详细要点。这个数据集合称为“manifest”,当完成打包并发送到浏览器时，  
runtime 会通过 manifest 来解析和加载模块。    

### webpack 单独生成 chunk 方法

1. 多入口指定

```
entry: {
    main: './src/js/index.js',
    test: './src/js/test.js'
},
```

2. optimization

```
optimization: {
    splitChunks: {
      chunks: 'all'
    }
}
```

3. import 动态导入

### chunk

chunk 有 2 种形式：  
1. initial(初始化)是入口起点的 main chunk。此 chunk 包含入口起点指定的所有模块及依赖项  
2. non-initial 是可以延迟加载的块。会出现在使用 import 动态导入或者 splitChunks 配置中

默认情况下，non-initial chunk 没有名称，因此会使用唯一 ID 来代替。在使用动态导入时，我们可以使用  
magic comment(魔术注释)来显示指定 chunk 名称,例如：  
/_ webpackChunkName: "app" _/ （vue-router 的配置中使用了）  
/_ webpackPrefetch: true _/ 会在浏览器闲暇时下载文件  
/_ webpackPreload: true _/ 会在父 chunk 加载时并行下载文件    

optimization.splitChunks.cacheGroups 允许自定义规则分离chunk    


### source map
source map是将编译打包压缩过后的代码映射回源代码的文件，是用来调试源码的     
通过webpack.config.js中devtool字段配置    
在开发环境可使用eval开头的sourcemap加快编译速度   
在生产环境可以考虑使用：      
  1.nosources-source-map:只会显示具体行数以及查看源代码的错误栈。安全性比source-map高    
  2.source-map:通过ngnix设置.map文件只对白名单开放       

### webpack 运行流程   

1. 初始化流程  
从配置文件和 Shell 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数     

2. 编译构建make  
从 entry 出发，针对每个 module 串行调用对应的 loader 将模块转译为标准JS内容，调用JS解释器将内容转换为AST对象     
，从中找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过本步骤的处理      

3. 生成阶段seal   
根据dependency graph,module.exports.optimization.splitChunks等配置构建chunk graph,将module组合成chunk    

4. 输出流程emit     
把 chunk 转换成文件 bundle，输出到文件系统    

### webpack 常用生命周期函数
1. compiler.compile:创建compilation前     
2. compiler.compilation:创建compilation后        
3. compiler.make:loader处理编译完成时触发     
4. compiler.emit:输出assets到output目录之前执行      
5. compiler.done:整体编译完成时执行   


compilation   
1. compilation.buildModule:在模块创建开始之前触发，可修改模块
2. compilation.successdModule:模块构建成功时执行
3. compilation.seal:compilation对象停止接收新的模块时触发
4. compilation.processAssets:asset处理

### webpack常用Plugin
1. define-plugin:注入自定义环境变量    
2. clean-webpack-plugin:目录清理    
3. speed-measure-webpack-plugin:整体编译流程执行耗时    
4. webpack-bundle-analyzer:编译完毕输出chunk分析


### webpack如何实现tree-shaking   
tree-shaking是指在运行过程中静态分析模块之间的导入导出，确定ESM模块中哪些导出值及引用未被使用，在输出的文件内将其物理删除      
实现前提条件：     
1. 使用ESM规范编写模块代码    
2. 配置optimization.usedExports为true,启动标记功能    
3. 启动代码优化功能，可以通过如下方式实现：     
  3.1 配置mode=production
  3.2 配置optimization.minimize=true   

实现原理：    
先标记出模块导出值中哪些没有被用过，再使用Terser插件删掉这些没有被用到的导出语句    
1. Make阶段，收集模块导出变量并记录到模块依赖图ModudleGraph变量中     
2. Seal阶段，遍历ModuleGraph标记模块并判断导出变量是否有被其他模块引用且在其他模块正文中是否出现及使用，如果没有则进行标记    
3. 生成产物时，根据Seal阶段的标记，删除对应的导出语句    

webpack的tree shaking逻辑停留在代码静态分析层面，只判断    
1. 模块导出变量是否被其他模块引用    
2. 引用模块的主体代码中有没有出现及引用这个变量   
### webpack如何实现HMR
核心流程：     
1. 使用webpack-dev-server(WDS)在本地建立静态资源服务器，同时以Runtime方式注入HMR客户端(浏览器)代码       
2. 浏览器加载页面后，与WDS建立WebSocket连接      
3. Webpack通过chokidar监听到文件变化后，增量构建发生变更的模块，并通过WebSocket发送hash事件      
4. 浏览器接收到hash事件，请求manifest资源文件，确认增量变更范围   
5. 浏览器加载发生变更的增量模块    
6. Webpack运行时触发变更模块的module.hot.accept回调，执行代码变更逻辑     

### 优化H5项目策略   
技术提供业务建议：   
1. 确定项目核心功能，非核心功能后置     

服务端可做：   
1. 减少重定向    
2. 启用资源gzip压缩    
3. 改善服务器响应时间   
4. 使用浏览器静态资源缓存       
5. 优化图片等静态资源          
6. 升级http2,http3       

客户端可做：    
1. 打包分离(bundle spliting)    
为了浏览器更好的缓存，合适得创建更多更小的文件     

2. 代码分离(code spliting)    
动态加载代码，按需加载    


### webpack性能优化策略
https://juejin.cn/post/6997227418113032200#heading-11   

webpack-bundle-analyzer分析包大小    
speed-measure-webpack-plugin分析分析打包速度    

生成最终webpack配置然后进行逐项优化    
例如：vue.config.js通过vue inspect > output.js生成最终配置项    


1. 设置cache属性（默认生产模式为false，开发模式为true）   
2. resolve部分优化(模块解析)：   
    2.1 resolve.externals:对第三方包进行公共包CDN引用，降低包大小   
    2.2 resolve.alias:使用别名缩短模块路径，降低文件解析成本    
    2.3 resolve.mainFields:使用npm包中package.json中那个字段来导入npm包，减少第三方模块搜索步骤   
    3.4 resolve.extensions:为未标明后缀的文件引入提供解析文件的后缀
3. module优化:   
    3.1 include和exclude:排除不需要处理的loader文件     
    3.2 cache-loader:对loader解析过的文件进行缓存     
    3.3 noParse:与external功能类似，且无法共存。主要作用就是防止webpack解析，跳过编译环节，忽略大型的library可以提高构建性能        
4. optimization优化:    
    4.1 splitChunks代码分割   
    4.2 runtimeChunk:创建一个额外的文件或者chunk,减少entry chunk体积，提高性能   
5. Plugin优化：    
    5.1 eslint-webpack-plugin:可以配置eslint自动fix和多核编译    
    5.2 mini-css-extract-plugin:抽离css至单独文件，可上传CDN  
    5.3 DLLPlugin:提前将不会更改的框架公共代码打包，减少打包体积（VUE CLI可以使用）       
6. 多线程打包：
    6.1 Happypack    
    6.2 thread-loader   
7. purgecss-webpack-plugin:对css文件进行tree-shaking  
8. 通过devtool配置合适的sourcemap:开发环境可配置eval开头的sourcemap加快编译速度   


### webpack模块联邦    
模块联邦能达到线上Runtime效果,让代码直接在项目间利用CDN直接共享，不再需要本地安装Npm包  

