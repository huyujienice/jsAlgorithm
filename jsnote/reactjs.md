## JSX 优点

JSX(JavaScript XML)是一种语法扩展，运行在 js 中开发 html 结构

1. 组件化模块化
2. 可读性较好
3. 工具链和社区支持

## 常用 API

1. setState
2. forceUpdate():调用自身 render 方法重新渲染组件
3. findDOMNode():获取 DOM 元素(或直接使用Ref)

## Diff算法
预设条件：   
1. 同层diff
2. 类型不同直接删除新建node
3. key可暗示可复用node    

整体逻辑：   
        
双层遍历:
1. 第一层遍历根据key值找到可复用的node并记录    
2. 第二层遍历根据第一层遍历找到可复用的node，不可复用直接删除新增node，处理所有node   

Reactjs中 Fiber 架构可实现多阶段渲染，提高性能和响应性    

## Reactjs diff vs Vue diff
相同点：
1. 预设条件类似，都是同层diff，类型和key可作为是否可复用node的依据    


不同点：   
1. 整体逻辑不同，reactjs实现双层遍历，vue实现双端diff及预处理diff 
2. 提高性能方式不同，reactjs引入Fiber架构实现多阶段渲染，vue引入nexttick渲染队列实现延迟去重渲染     



## React 生命周期

函数组件没有生命周期，只有类组件才有

1. Mounting(挂载):已插入真实DOM    

   1.1 constructor()：调用挂载前，会调用它的构造函数  
   1.2 getDerivedStateFromProps()  
   1.3 render():是 class 组件中唯一必须实现的方法  
   1.4 componentDidMount():在组件挂载后（插入 Dom 树中）立即调用

2. Updating(更新)：正在被重新渲染    

   2.1 getDerivedStateFromProps()  
   2.2 shouldComponentUpdate()  
   2.3 render()  
   2.4 getSnapshotBeforeUpdate()  
   2.5 componentDidUpdate()：在更新后会被立即调用

3. Unmounting(卸载)：已移出真实 DOM     

   3.1 componentWillUnmount(): 在组件卸载及销毁之前直接调用

函数组件可以用 Hooks 代替类组件的生命周期方法

1. useEffect():用于处理副作用函数，可用来模拟 componentDidMount，componentDidUpdate 和 componentWillUnmount

例如：    
```js
import React, { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    // 类似于 componentDidMount 和 componentDidUpdate 的逻辑

    return () => {
      // 类似于 componentWillUnmount 的逻辑
      // 执行清理工作
    };
  }, []); // 空依赖数组确保这个 effect 仅在组件挂载时运行一次

  return <div>My Component</div>;
}
```

### 受控组件，非受控组件
受控组件：只能通过React修改数据或者组件状态    
非受控组件：input,textarea,select,checkbox等，本身能控制数据和状态的变更       
怎么将非受控组件变为受控组件？将状态变更交给React来操作    
例如：    
input组件，通过定义state,设置表单元素的value属性，处理表单元素的onChange事件来实现         


### 组件懒加载
React提供了lazy和Suspence来实现懒加载      
