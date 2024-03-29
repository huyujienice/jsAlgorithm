# vue中的双向绑定
vue中的v-model可以用在表单的input输入框，完成视图和数据的双向绑定   
v-model其实是双向绑定的语法糖，input相当于vue自带的组件  
浏览器 \<input\> 标签可以注册oninput事件，在元素值发生变化时立即触发     
  
```html
<input v-model="xxx">

<!-- 上面的代码等价于 -->
<input :value="xxx" @input="xxx = $event.target.value">
<!-- 双向绑定 = 单向绑定 + UI事件监听 -->
```

MVC：Model-View-Controller(模型-视图-控制器)是一种分层架构的思想   
MVVM:Model-View-ViewModel(模型-视图-视图控制器)是一种双向数据绑定模式，用ViewModel来建立起Model数据层和View视图层的连接，数据改变会影响视图，视图改变会影响数据       

# vue 渲染流程  
示例：https://juejin.cn/post/6844904031983239181#heading-19  
render  
调用compile函数，生成render函数字符串，编译过程如下：   
1. parse函数解析template,生成ast(抽象语法树)    
2. optimize函数标记静态节点(diff算法跳过静态节点)       
3. generate函数生成render函数字符串      

render函数会返回虚拟DOM    


# vue nextTick
nextTick本质就是执行延迟回调的钩子，接受一个回调函数，在下次dom更新循环结束之后执行延迟回调。  
***操作dom节点是同步阻塞操作***     
更新dom是同步操作，vue框架为了效率更高采用了异步执行更新dom。    
当监听到数据变化，vue将开启一个队列，并缓冲在同一个事件循环中所发生的所有数据的变更。如果同一个副作用函数被多次触发，   
只会被推入到队列中一次。这种缓冲时去重数据对于避免不必要的计算和dom操作是非常重要的。   
在下一个的事件循环中，vue刷新队列并执行实际（已去重）的副作用函数。   
实现异步队列尝试使用宿主环境的Promise.then(),MutationObserver和setImmediate，若都不支持则采用setTimeout代替   
有一个全局队列存储副作用函数队列，一个全局pending标识，当pending为true的时候，副作用函数放入下一次的队列中，并且返回一个执行的Promise命令     
pending为false的时候副作用函数加入当前执行队列并返回一个执行的Promise命令           

window.setImmediate 除了高版本IE支持，主流浏览器都不支持     

# 纯函数
特点：  
1. 每一次调用时传入相同的参数，返回的都是同样的结果；它不会改变参数的值，也不会改变外部变量的值  
2. 纯函数没有其他副作用函数  
# vue响应式原理
使用ES6 Proxy创建vue Prototype对象的代理，从而实现对vue的实例对象的基本操作的拦截和自定义  
1. 注册副作用函数的时候(生成render渲染函数)使用了响应式对象的值，会触发其读取操作(依赖收集操作，所以需更新视图等操作需要提前注册副作用函数)      
2. 当响应式对象的值发生改变的时候，会触发其设置操作(派发更新操作)    

可以将拦截操作设置在Prototype对象上，如果读取实例对象的属性，拦截会生效   
```js
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log('GET ' + propertyKey);
    return target[propertyKey];
  }
});

let obj = Object.create(proto);
obj.foo // "GET foo"

```

一个响应式系统有多个响应式对象，一个对象可以有多个属性，一个对应的属性可以有多个副作用函数  
vuejs选择weakMap,Map,Set三个数据结构当做容器，来实现MVVM的双向绑定架构      
weakMap特点  
1. 只能是以对象作为键    
2. 对值是弱引用，不会对GC造成影响  
3. 不能循环遍历   

容器结构：  
```
WeakMap
   |___key: obj1 ___value: Map
                            |___key:obj1A ___value: Set
                            |___key:obj1B ___value: Set
                                                                
   |___key: obj2 ___value: Map
                            |___key:obj2A ___value: Set
                            |___key:obj2B ___value: Set
​
```

## 分支切换与CleanUp
通过在副作用函数上添加一个数组来保存自己的Set集合，在后续的跟踪的时候都先清除之前的依赖关系，再重新建立当前的依赖关系。  
这样来保证能够清除之前的遗留的副作用函数  

## computed && watch
我们可以通过给副作用函数添加属性，配置不同的参数，来控制副作用函数执行的时机，主要的便是options.scheduler以及lazy等参数  
computed及watch均是以此而来  



# vue3.0

## vue3 特性
1. 向下兼容,vue3支持大多数vue2特性  
2. 性能提升  
3. Composition API  
4. teleport瞬移组件 Suspense异步组件解决  
5. 更好TypeScript支持  

## vue3性能提升
1. vue3 Proxy实现响应式，vue2 Object.defineProperty性能较差，需递归执行  
2. PatchFlag优化diff算法
3. HoistStatic静态节点缓存优化    
4. CacheHandler缓存事件优化  
5. SSR优化  
6. tree-shaking  

## PatchFlag
PatchFlag是一个标识，是一个枚举ID
用途：
1. 用来标记当前节点需要更新，静态节点没有这个参数，更新的时候直接略过
2. 进行组合更新

## HoistStatic静态节点缓存优化
在编译器编译的过程中，将一些静态的节点或者属性提升到渲染函数之外。它能够减少更新时创建虚拟dom带来的性能开销和内存占用  

## CacheHandle
开启CacheHandle事件缓存后，render函数将绑定的事件生成固定的内联函数，由内联参数传递代替上下文对象进行传参，避免了生成vnode重复渲染      

## tree-shaking
框架代码会按需引入     

## vue diff算法
diff算法用于处理新旧子节点数组的比较及更新。         
如果不采用diff算法，最简单的操作就是先将之前的旧vdom全部卸载，再将当前的新vdom全部挂载         
但是直接操作dom对象是同步阻塞过程，十分耗费性能的，所以diff算法作用就是找出两组vdom节点之间的差异，并尽可能复用dom节点，使得能用最小的性能消耗来完成更新操作  
特点：    
1. 比较只会同层进行，不会跨层比较  
2. 双端diff同时对新旧节点数组进行比较       


基础的diff算法就是拿新节点数组中的节点去旧节点数组中查找，通过key和结点类型等来递归判断是否能够复用当前节点。         
记录当前的对应旧节点的lastIndex,对于后续的新节点查找可复用的旧节点来说，只要找到的旧节点数组中的下标的值小于所有之前新节点记录的lastIndex,代表当前的节点位置发生了改变，则需要移动     

vue2.0采用双端diff算法  
双端diff算法是一种同时对新旧两组子节点的两端进行比较的算法  
1.新头 === 旧头？复用，不用移动  
2.新尾 === 旧尾？复用，不用移动  
3.新尾 === 旧头？复用，需要移动  
4.新头 === 旧尾？复用，需要移动  
若四步比较失败，直接执行基础diff算法即可     

vue3.0采用快速diff算法  
快速diff算法包含预处理步骤，使用了最长递增子序列来复用相对位置没有发生变化且相同的节点，这些节点不需要移动，能最快的进行复用和更新     
最长递增子序列可采用暴力算法或者动态规划DP进行解决    
动态规划的核心设计思想是数学归纳法     




## vue3全局api
app.config.errorHandler  
用于为应用内抛出的未捕获错误指定一个全局处理函数  

## vue生命周期  
setup钩子会在beforeCreate之前调用，是最先调用的生命周期钩子函数  

beforeCreate  
在组件实例初始化完成,props解析之后,data和computed等选项处理之前立即调用   

created  
在这个钩子被调用时，以下内容已经设置完成：响应式数据，计算属性，方法和侦听器。未挂载实际DOM  

beforeMount  
组件被挂载前调用  

mounted  
组件被挂载之后调用  
1.所有同步子组件都已经被挂载(不包含异步组件或<Suspense>树内组件)  
2.其自身的DOM树已经创建完成并插入了父容器中  

## 异步组件
1.defineAsyncComponent()  
2.async setup  
\<Suspense\>组件可以包裹异步组件并协调多层组件加载的处理  


## vue3生命周期setup相关  
https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram  
onMounted()注册一个回调函数，在组件挂载完成后执行    
onUpdated()注册一个回调函数，在组件因为响应式状态变更而更新其DOM树之后调用  
onUnmounted()注册一个回调函数，在组件实例被卸载之后调用  
onActivated()注册一个回调函数，若组件是<KeepAlive>缓存树的一部分，当组件被插入到DOM中时调用  



父子组件生命周期执行顺序简易版:父created->子created->子mounted->父mounted


## vue-router原理

hash模式，默认模式，url带#，通过hashchange方法监听url的变化，通过window.location.hash触发url更新        
优点兼容性好，不需要服务端进行配置，hash的变化会在浏览器history中新增记录，可实现浏览器前进后退功能     
缺点是url展示及传递参数不够直观      

history模式，通过pushState和replaceState方法修改url地址      
popstate只能监听浏览器前进后退改变url，如果是a调整可以拦截a标签的点击事件来监听url变化     
优点解决了url及参数传递不够直观问题，需要服务端进行配置，通过nginx将路由都重新定位到根目录      


### vue2.0强制更新
vue2.0不允许在已经创建的实例上动态添加新的响应式属性   
若想实现数据与视图同步更新，可采取以下方案：
1. Vue.set()
2. Object.assign()
3. $forceUpdate    

### $attrs
inheritAttrs默认为true,默认将未声明为props或emit的attribute或者v-on监听器自动传递给子组件     
将inheritAttrs设置为false,$attrs 可透传多级未声明props及emit,直接在模板中使用v-bind="$attrs"传递给有需要的组件或$attrs.onClick获取@click事件监听器          
