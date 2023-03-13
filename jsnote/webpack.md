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

import语句中，使用!将资源中的loader分开    

loader   
preLoader    
postLoader   

# 插件

插件可以执行很多任务，包括：打包优化，资源管理，注入环境变量

### webpack 单独生成 chunk 方法

1.多入口指定

```
  // 多入口：有一个入口，最终输出就有一个bundle
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

3.import


### webpack运行流程   
1.初始化流程    
从配置文件和Shell语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数     
     
2.编译构建流程     
从entry出发，针对每个module串行调用对应的loader去翻译文件内容，再找到该module依赖的module，递归地进行编译处理    

3.输出流程   
对编译后的module组合成chunk,把chunk转换成文件，输出到文件系统   
