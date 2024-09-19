webpack 是一个静态模块打包工具  
当 webpack 处理模块打包时，它会从内部从一个或多个入口构建一个依赖图，然后将你项目中所需的每一个模块组合成一个或者多个 chunk

# 入口 entry

entry 字段指示 webpack 应该使用哪个模块，来作为其构建内部依赖图(dependency graph)的开始  
使用对象语法可以扩展入口定义  
常见场景：

1. 分离 app(应用程序)和 vendor(第三方库)入口
2. 多页面应用程序

在entry中使用对象语法：
1. import: 需要加载的模块地址   
2. runtime: 则会在 entry chunk 之外再增加一个专门容纳 runtime 的 chunk 对象，多个 entry 间可共享 runtime chunk 
3. dependOn: 会设置当前入口所依赖的入口。它会在该入口被加载前加载       

runtime 和 dependOn 不应该在同一入口上使用，因为提前加载顺序问题冲突         


# 输出 output

ouput 属性指示 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件(使用path及filename属性)     
output 占位符：

1. [id] 返回模块 id
2. [path] 返回文件路径
3. [name] 返回文件名
4. [ext] 返回扩展名
5. [hash] 返回整个构建 hash
6. [chunkhash] 返回入口指定模块的 hash
7. [contenehash] 返回文件内容 hash

# 模块 module
module属性选项决定了如何处理项目中不同类型的模块

module.generator： 配置所有生成器选项    
可以配置不同位置的模块生成不同的publicPath和outputPath,对于将资源文件放置在特定位置的场景非常有用      

module.parser：集中配置所有解析器的选项     
例如，对于 JavaScript 模块，你可以设置 module.parser.javascript 来配置 JavaScript 解析器的行为      

module.rules: 配置不同模块需要不同的loader进行处理    


# loader

webpack 开箱自带解析 js 和 JSON 文件的功能。loader 处理其他类型的文件，并将其转换为有效模块，供程序使用，以及被添加到依赖图中

```js
module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```

test 为字符串时筛选匹配资源的绝对路径，为函数时，入参为资源的绝对路径，返回 boolean      

test 属性识别哪些文件会被转换  
use 属性定义使用哪个 loader 进行转换     

有两种使用 loader 方式：     

1. 配置方式：webpack.config.js 中通过 module.rules 中 test,use 指定(从右到左，从下到上地取值，执行)        
2. 内联(inline)方式：在每个 import 语句中显示指定 loader           

import 语句中，使用!将资源中的 loader 分开  
例如：

```js
// inline引入
import "style-loader!css-loader!stylus-loader?a=b!../../common.css";
// 相当于webpack.config.js中配置
[
  { loader: "style-loader", options: undefined },
  { loader: "css-lodaer", options: undefined },
  { loader: "stylus-loader", options: "?a=b" },
];
```

## 自定义 loader

```js
/**
 * @param {string|Buffer} content 源文件的内容
 * @param {object} [map] 可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据
 * @param {any} [meta] meta 数据，可以是任何内容
 */
function aLoader(content, map, meta) {
  // 省略部分代码
}
/**
 * @param {string} loader链剩余部分及资源文件的绝对路径的字符串,类似inline写法
 * @param {object} loader链前置部分绝对路径字符串   
 * @param {any} [data] 在pitch阶段和normal阶段之间共享的对象    
 */
aLoader.pitch = function (remainingRequest, precedingRequest, data) {

};

module.exports = aLoader;
```

loader 函数中的 this 会指向 webpack，可以使用 this.callback,this.async 等访问一些方法或者属性     
loader 配置了 options 对象的话，this.query 就指向这个对象，可以通过 options 传递配置参数    

Loader 在 pitch 阶段如果返回非 undefined 值的时候会出现熔断效果，且将返回值交给原本 Normal 阶段的下一个 Loader，类似于“不需要执行处理在我之前的Loader，以我返回的结果为准，将我的结果交给原来的下一个处理者”  
Loader 在 pitch 阶段传递给 pitch 函数的 data,在 normal 执行阶段也会暴露在 this.data 之中，可用于捕获共享 pitch 阶段的信息

Loader 可以分为同步 Loader 和异步 Loader  
同步 Loader 可以通过 return 语句或者 this.callback 的方式来同步地返回转换后的结果  
异步 Loader 通过 const callback = this.async()方法来获取 callback 函数

pre loader 和 post loader,可以通过 rule 数组对象内的子项 enforce 属性来指定  
正常 loader 执行顺序

1. 不同阶段之间：pre->normal->inline->post
2. 每个阶段内部：use 数组中，从右往左，从下到上

pitch 执行顺序跟正常 loader 执行顺序完全相反

1. 不同阶段之间：post->inline->normal->pre
2. 每个阶段内部：use 数组中，从左往右，从上到下    

类似中间件洋葱模型     
或者说类似浏览器事件传输 capture phase , target phase ,  bubbing phase

enforce 和 webpack.config.js 中 loader 配置执行顺序怎么确定？
enforce 相对于 rule 数组中的每一项来说的，先根据 enforce 和书写方式对 rule 进行排序，然后对 rule 中的 loader 进行排序  
rule 中的 loader 不会进行去重     

# 插件

插件可以执行很多任务，包括：打包优化，资源管理，注入环境变量

## 自定义插件

一个 class 类，定义 apply 方法，以 compiler 为参数，指定挂载到 webpack 自身的事件钩子  
自定义插件举例：https://webpack.docschina.org/contribute/writing-a-plugin/#example

compilation 常用方法：

assets 是一个包含 compilation 中所有静态资源的对象，该对象的键是资源路径，值是文件的源码

1. compilation.emitAsset:可以向 compilation 添加新的资源
2. compilation.addModule:添加自定义模块
3. compilation.addEntry:添加入口，功能上与直接定义 entry 配置相同

### Compiler 和 Compilation

compiler 是 webpack 底层编译对象的引用  
webpack 从开始执行到结束，compiler 只会实例化一次。compiler 对象记录了 webpack 运行环境的所有信息，  
插件可以通过它获取到 webpack 的配置信息，如 entry,output,module 等配置(通过 compiler.options 获取完整的配置对象)，也可以直接通过 compiler.hooks 挂载生命周期钩子回调

compilation 对象，提供了 webpack 大部分生命周期 Hook API 供自定义扩展处理使用    
compilation 对象记录了单次从源码构建到生成资源过程中的信息，它储存了当前的模块资源，编译生成的资源，变化的文件以及被跟踪依赖的状态信息      

### 异步插件

同步用 tap 来绑定，异步可以用 tapAsync 或 tapPromise 来绑定

### manifest

当 compiler 开始执行，解析和映射时，它会保留所有模块的详细要点。这个数据集合称为“manifest”,当完成打包并发送到浏览器时，  
runtime 会通过 manifest 来解析和加载模块。

### runtime
webpack 底层框架代码，包括模块化，异步加载，HMR等    
编译结果bundle，整体是由一个IIFE包裹，包括
1. __webpack_modules_ 对象，即所有模块对象，key为模块path,value为模块源码
2. __webpack_module_cache__ 对象，存储已使用过的模块对象
3. __webpack_require__ 函数，实现模块引用require逻辑   


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

3. import 动态导入(或使用Webpack专属语法require.ensure)   

### chunk

chunk 有 2 种形式：

1. initial(初始化)是入口起点的 main chunk。此 chunk 包含入口起点指定的所有模块及依赖项
2. non-initial 是可以延迟加载的块。会出现在使用 import 动态导入或者 splitChunks 配置中

默认情况下，non-initial chunk 没有名称，因此会使用唯一 ID 来代替。在使用动态导入时，我们可以使用  
magic comment(魔术注释)来显示指定 chunk 名称,例如：  
/_ webpackChunkName: "app" _/ （vue-router 的配置中使用了）  
/_ webpackPrefetch: true _/ 会在浏览器闲暇时下载文件  
/_ webpackPreload: true _/ 会在父 chunk 加载时并行下载文件

optimization.splitChunks.cacheGroups 允许自定义规则分离 chunk

### source map

source map 是将编译打包压缩过后的代码映射回源代码的文件，是用来调试源码的，源码最后会携带特殊注释//# sourceMappingURL 的属性指向sourcemap地址供浏览器下载        
source map 是一个JSON文件，记录了代码转换前后的所有信息，其中mapping字段通过VLQ编码映射位置关系           
      
通过 webpack.config.js 中 devtool 字段配置  
在开发环境可使用 eval 开头的 sourcemap 加快编译速度  
在生产环境可以考虑使用：  
 1.nosources-source-map:只会显示具体行数以及查看源代码的错误栈。安全性比 source-map 高  
 2.source-map:通过 ngnix 设置.map 文件只对白名单开放

### webpack 运行流程

1. 初始化流程  
   从配置文件和 Shell 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数

2. 编译构建 make  
   从 entry 出发，针对每个 module 串行调用对应的 loader 将模块转译为标准 JS 内容，调用 JS 解释器(acorn)将内容转换为 AST 对象  
   ，从中找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过本步骤的处理

3. 生成阶段 seal  
   根据 dependency graph,optimization.splitChunks 等配置构建 chunk graph,将 module 组合成 chunk

4. 输出流程 emit  
   把 chunk 转换成文件 bundle，输出到文件系统

### webpack 常用生命周期函数

1. compiler.hooks.compile: 创建 compilation 前
2. compiler.hooks.compilation: 创建 compilation 后
3. compiler.hooks.make: loader 处理编译开始时触发
4. compiler.hooks.emit: 输出 assets 到 output 目录之前执行
5. compiler.hooks.done: 整体编译完成时执行

compilation

1. compilation.hooks.buildModule: 在模块构建开始之前触发，可修改模块
2. compilation.hooks.successdModule: 模块构建成功时执行
3. compilation.hooks.seal: compilation 对象停止接收新的模块时触发
4. compilation.hooks.processAssets: asset 处理

### webpack 常用 Plugin

1. define-plugin:注入自定义环境变量
2. clean-webpack-plugin:目录清理
3. speed-measure-webpack-plugin:整体编译流程执行耗时
4. webpack-bundle-analyzer:编译完毕输出 bundle 分析
5. UnusedWebpackPlugin:根据 webpack 编译信息反向查找项目内哪些文件没有被用到

### webpack 如何实现 tree-shaking

tree-shaking 是指在运行过程中静态分析模块之间的导入导出，确定 ESM 模块中哪些导出值及引用未被使用，在输出的文件内将其物理删除  
实现前提条件：

1. 使用 ESM 规范编写模块代码
2. 配置 optimization.usedExports 为 true,启动标记功能
3. 启动代码优化功能，可以通过如下方式实现：  
   3.1 配置 mode=production  
   3.2 配置 optimization.minimize=true

实现原理：  
先标记出模块导出值中哪些没有被用过，再使用 Terser 插件删掉这些没有被用到的导出语句

1. Make 阶段，收集模块导出变量并记录到模块依赖图 ModudleGraph 变量中
2. Seal 阶段，遍历 ModuleGraph 标记模块并判断导出变量是否有被其他模块引用且在其他模块正文中是否出现及使用，如果没有则进行标记
3. 生成产物时，根据 Seal 阶段的标记，删除对应的导出语句

webpack 的 tree shaking 逻辑停留在代码静态分析层面，只判断

1. 模块导出变量是否被其他模块引用
2. 引用模块的主体代码中有没有出现及使用这个变量

### webpack 如何实现 HMR

核心流程：

1. 使用 webpack-dev-server(WDS)在本地建立静态资源服务器，同时以 Runtime 方式注入客户端(浏览器)HMR 代码
2. 浏览器加载页面后，与 WDS 建立 WebSocket 连接
3. webpack 通过 chokidar 监听到文件变化后，增量构建发生变更的模块，并通过 WebSocket 发送 hash 事件
4. 浏览器接收到 hash 事件，请求 manifest 资源文件，确认增量变更范围
5. 浏览器加载发生变更的增量模块
6. webpack 运行时触发变更模块的 module.hot.accept 回调，执行代码变更逻辑

### 优化项目策略

产品方向：    

1. 确定项目核心功能，非核心功能后置

服务端方向：    

1. 减少重定向
2. 启用资源 gzip 压缩
3. 改善服务器响应时间
4. 使用浏览器静态资源缓存
5. 优化图片等静态资源
6. 升级 http2,http3

客户端方向：    

1. 打包分离(bundle spliting)  
   为了浏览器更好的缓存，合适地创建更多更小的文件

2. 代码分离(code spliting)  
   动态加载代码，按需加载

### webpack 性能优化策略

https://juejin.cn/post/6997227418113032200#heading-11

webpack-bundle-analyzer 分析包大小  
speed-measure-webpack-plugin 分析分析打包速度

生成最终 webpack 配置然后进行逐项优化  
例如：vue.config.js 通过 vue inspect > output.js 生成最终配置项

1. 设置 cache 属性（默认生产模式为 false，开发模式为 true）
2. resolve 部分优化(模块解析)：  
   2.1 resolve.externals:对第三方包进行公共包 CDN 引用，降低包大小  
   2.2 resolve.alias:使用别名缩短模块路径，降低文件解析成本  
   2.3 resolve.mainFields:使用 npm 包中 package.json 中哪个字段(main || exports)来导入 npm 包，减少第三方模块搜索步骤  
   3.4 resolve.extensions:为未标明后缀的文件引入提供解析文件的后缀
3. module 优化:  
   3.1 include 和 exclude:排除不需要处理的 loader 文件  
   3.2 cache-loader:对 loader 解析过的文件进行缓存  
   3.3 noParse:与 external 功能类似，且无法共存。主要作用就是防止 webpack 解析，跳过编译环节，忽略大型的 library 可以提高构建性能
4. optimization 优化:  
   4.1 splitChunks:代码分割  
   4.2 runtimeChunk:创建一个额外的文件或者 chunk,减少 entry chunk 体积，提高性能
5. Plugin 优化：  
   5.1 eslint-webpack-plugin:可以配置 eslint 自动 fix 和多核编译  
   5.2 mini-css-extract-plugin:抽离 css 至单独文件，可上传 CDN  
   5.3 DLLPlugin:提前将不会更改的框架公共代码打包，减少打包体积（VUE CLI 可以使用）
6. 多线程打包：
   6.1 Happypack  
   6.2 thread-loader
7. purgecss-webpack-plugin:对 css 文件进行 tree-shaking
8. 通过 devtool 配置合适的 sourcemap:开发环境可配置 eval 开头的 sourcemap 加快编译速度

### webpack 模块联邦

模块联邦能达到线上 Runtime 效果,让代码直接在项目间利用 CDN 直接共享，不再需要本地安装 Npm 包


 
