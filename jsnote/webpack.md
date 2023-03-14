webpack 是一个静态模块打包工具  
当 webpack 处理应用程序时，它会从内部从一个或多个入口构建一个依赖图，然后将你项目中所需的每一个模块组合成一个或者多个 bundles

# 入口

entry 字段指示 webpack 应该使用哪个模块，来作为其构建内部依赖图(dependency graph)的开始  
使用对象语法可以扩展入口定义  
常见场景：  
1.分离 app(应用程序)和 vendor(第三方库)入口  
2.多页面应用程序

# 输出

ouput 属性指示 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件

# loader

webpack 开箱自带解析 js 和 JSON 文件。loader 处理其他类型的文件，并将其转换为有效模块，已供程序使用，以及被添加到依赖图中

```
module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```

test 属性识别哪些文件会被转换  
use 属性定义使用哪个 loader 进行转换

有两种使用 loader 方式：  
1.配置方式：webpack.config.js 中通过 module.rules 中 test,use 指定(从右到左，从下到上地取值，执行)  
2.内联方式：在每个 import 语句中显示指定 loader

import 语句中，使用!将资源中的 loader 分开

## 自定义 loader

```
function aLoader(content, map, meta) {
  // 省略部分代码
}

aLoader.pitch = function (remainingRequest, precedingRequest, data) {

};

module.exports = aLoader;
```

Normal Loader 执行顺序通过配置决定     
Pitching Loader 可提前执行，且返回非 undefined 值的时候会出现熔断效果    

Loader可以分为同步Loader和异步Loader
同步Loader可以通过return语句或者this.callback的方式来同步地返回转换后的结果    
异步Loader通过this.async方法来获取callback函数    

# 插件

插件可以执行很多任务，包括：打包优化，资源管理，注入环境变量

## 自定义插件

一个 class 类，定义 apply 方法，以 compiler 为参数，指定挂载到 webpack 自身的事件钩子

### Compiler 和 Compilation

compiler 是 webpack 底层编译对象的引用  
webpack 从开始执行到结束，compiler 只会实例化一次。compiler 对象记录了 webpack 运行环境的所有信息，  
插件可以通过它获取到 webpack 的配置信息，如 entry,output,module 等配置，所以可以通过 compiler.hooks 挂载钩子回调

compilation 对象，提供了 webpack 大部分生命周期 Hook API 供自定义扩展处理使用  
compilation 对象记录了一次构建到生成资源过程中的信息，它储存了当前的模块资源，编译生成的资源，变化的文件以及被跟踪依赖的状态信息

### runtime manifest

当 compiler 开始执行，解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为“manifest”,当完成打包并发送到浏览器时，  
runtime 会通过 manifest 来解析和加载模块。

### webpack 单独生成 chunk 方法

1.多入口指定

```
entry: {
    main: './src/js/index.js',
    test: './src/js/test.js'
},
```

2.optimization

```
optimization: {
    splitChunks: {
      chunks: 'all'
    }
}
```

3.import 动态导入

### chunk

chunk 有 2 种形式：  
1.initial(初始化)是入口起点的 main chunk。此 chunk 包含为入口起点指定的所有模块及依赖项  
2.non-initial 是可以延迟加载的块。会出现在使用 import 动态导入或者 splitChunks 配置中

默认情况下，non-initial chunk 没有名称，因此会使用唯一 ID 来代替。在使用动态导入时，我们可以使用  
magic comment(魔术注释)来显示指定 chunk 名称,例如：  
/_ webpackChunkName: "app" _/ （vue-router 的配置中使用了）  
/_ webpackPrefetch: true _/ 会在浏览器闲暇时下载文件  
/_ webpackPreload: true _/ 会在父 chunk 加载时并行下载文件

### webpack 运行流程

1.初始化流程  
从配置文件和 Shell 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数

2.编译构建流程  
从 entry 出发，针对每个 module 串行调用对应的 loader 去翻译文件内容，再找到该 module 依赖的 module，递归地进行编译处理

3.输出流程  
对编译后的 module 组合成 chunk,把 chunk 转换成文件 bundle，输出到文件系统
