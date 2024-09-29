## JSX 优点

JSX(JavaScript XML)是一种语法扩展，运行在 js 中开发 html 结构

1. 组件化模块化
2. 可读性较好
3. 工具链和社区支持

## 常用 API

1. setState
2. forceUpdate():调用自身 render 方法重新渲染组件
3. findDOMNode():获取 DOM 元素(或直接使用 Ref)

## Diff 算法

预设条件：

1. 同层 diff
2. 类型不同直接删除新建 dom
3. key 暗示可复用 dom

整体逻辑：

双层遍历:

1. 第一层遍历根据 key 值及 dom 类型等比较信息找到可复用的 dom 并记录
2. 第二层遍历根据第一层遍历找到可复用的 dom，不可复用直接删除新增 dom，处理所有 dom

Reactjs 中 Fiber 架构可实现多阶段渲染，提高性能和响应性

### Fiber 架构

将渲染工作分割成小块，分散到 Fiber 节点中，Fiber 节点为链表结构，能够更加细致得控制组件渲染过程
核心概念：

1. Fiber 节点：链表结构
2. 双缓冲机制：reactjs 维护 2 个 Fiber 树，显示树与计算树。当更新完成后，计算树变成新的显示树
3. 工作循环：合作调度处理工作单元，可暂停和恢复工作
4. 优先级：为不同类型更新分配了优先级，比如用户交互更新优于网络更新
5. 两个阶段：Fiber 分为两个主要阶段，render 阶段及 commit 阶段。render 阶段可中断，用于计算需要更新的 dom。commit 阶段不可中断，用于将计算结果应用到 dom 上  


## Reactjs diff vs Vue diff

相同点：

1. 预设条件类似，都是同层 diff，类型和 key 可作为是否可复用 node 的依据

不同点：

1. 整体逻辑不同，reactjs 实现双层遍历，vue 实现双端 diff 及预处理 diff
2. 提高性能方式不同，reactjs 引入 Fiber 架构实现多阶段渲染，vue 引入 nexttick 渲染队列实现延迟去重渲染

## React 生命周期

函数组件没有生命周期，只有类组件才有

1. Mounting(挂载):已插入真实 DOM

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

函数组件可以用 Hook 代替类组件的生命周期方法

1. useEffect():用于处理副作用函数，可用来模拟 componentDidMount，componentDidUpdate 和 componentWillUnmount

例如：

```js
import React, { useEffect } from 'react';

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

### Hook

1. useCallback:多次渲染中缓存函数,可配合 memo 跳过函数重复渲染
2. useMemo:多次渲染中缓存计算结果
3. useContext:读取和订阅 context,实现更新数据传递
4. useEffect

### 受控组件，非受控组件

受控组件：只能通过 React 修改数据或者组件状态  
非受控组件：input,textarea,select,checkbox 等，本身能控制数据和状态的变更  
怎么将非受控组件变为受控组件？将状态变更交给 React 来操作  
例如：  
input 组件，通过定义 state,设置表单元素的 value 属性，处理表单元素的 onChange 事件来实现

### 组件懒加载（异步组件）

React 提供了 lazy 和 Suspence 来实现懒加载  
lazy 接受一个回调函数，回调函数内部使用 import()方法异步加载组件
