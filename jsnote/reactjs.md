## JSX 优点

JSX(JavaScript XML)是一种语法扩展，运行在 js 中开发 html 结构

1. 组件化模块化
2. 可读性较好
3. 工具链和社区支持

## 常用 API

1. setState
2. forceUpdate():调用自身 render 方法重新渲染组件
3. findDOMNode():获取 DOM 元素

## React 生命周期

函数组件没有生命周期，只有类组件才有

1. 挂载

   1.1 constructor()：调用挂载前，会调用它的构造函数  
   1.2 getDerivedStateFromProps()  
   1.3 render():是 class 组件中唯一必须实现的方法  
   1.4 componentDidMount():在组件挂载后（插入 Dom 树中）立即调用

2. 更新

   2.1 getDerivedStateFromProps()  
   2.2 shouldComponentUpdate()  
   2.3 render()  
   2.4 getSnapshotBeforeUpdate()  
   2.5 componentDidUpdate()：在更新后会被立即调用

3. 卸载

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
