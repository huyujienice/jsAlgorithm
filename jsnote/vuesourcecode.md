尝试理解 vue tag 1.0.0 源码

api

compiler

directives

filter

fragment

instance

observer

dep
observer
watcher

dep 中加入 watcher
将一个对象设置为响应式，使用Observer.create，将对象的__ob__指向新生成的观察者observer,observer有属性dep，dep 中加入 watcher

Dep类 dep实例
Observer类 observer实例
Watcher类 watcher实例

如何将一个data对象变成响应式?
1. Vue实例初始化，将data对象执行Observer.create(data,this)

2. Observer添加data.__ob__指向Observer生成的实例observer，一个observer拥有一个dep实例，
   当data是数组时候使用observeArray等的方法特殊处理，当是对象的时候使用walk的方法处理
   walk方法本质上是对对象的每个属性执行convert方法，实际执行defineReactive方法
   defineReactive方法为每个data中的属性foo使用闭包添加一个dep，当data的属性也是一个对象obj的时候，
   也为这个对象obj执行Observer.create(obj)的方法，使用Object.defineProperty定义get和set方法,
   当读取data.foo及写入data.foo执行依赖收集及触发更新的逻辑

3. 当执行Directive，$watch，prop，_initComputed等相关操作的时候，会执行new Watcher
   当创建非lazy watcher的时候，new Watcher会直接触发this.get()
   Watcher.prototype.get第一步就是执行this.beforeGet()，将Dep.target指向watcher实例
   然后执行traverse()，将data中所有的对象进行读取获值,触发依赖收集dep.depend，即watcher.addDep
   watcher中有newDeps和deps属性对象，会收集相关dep，dep内有subs数组，收集相关watcher，需要观察
   的对象内有dep，可进行相关依赖收集及触发更新
   
4. 依赖收集？当触发data.foo可完成
5. 触发更新？触发所有watcher.run方法，即执行new Watcher初始化的时候传入的cb回调

parsers

transition
动画,使用 transition,animation 将过渡动画主动分为 6 个状态，如何组织 6 个状态？使用 transitionend,animationend 触发过渡动画回调函数，将 6 个生命周期函数状态串联起来

1. 怎么解析.vue 模板
   vue-loader 实现

2. 双向绑定或者说视图绑定是如何实现的

3. 虚拟节点如何实现

# vue中的双向绑定
vue中的v-model可以用在表单的input输入框，完成视图和数据的双向绑定   
v-model其实是双向绑定的语法糖，input相当于vue自带的组件  
浏览器<input>标签可以注册oninput事件，在元素值发生变化时立即触发     
  
```
<input v-model="xxx">

<!-- 上面的代码等价于 -->
<input :value="xxx" @input="xxx = $event.target.value">
<!-- 双向绑定 = 单向绑定 + UI事件监听 -->
```

MVC：Model-View-Controller(模型-视图-控制器)是一种分层架构的思想   
MVVM:Model-View-ViewModel(模型-视图-控制器)是一种双向数据绑定模式，用ViewModel来建立起Model数据层和View视图层的连接，       
数据改变会影响视图，视图改变会影响数据       

# vue 渲染流程  
示例：https://juejin.cn/post/6844904031983239181#heading-19  
render  
调用compile函数，生成render函数字符串，编译过程如下：   
1.parse函数解析template,生成ast(抽象语法树)    
2.optimize函数标记静态节点(diff算法跳过静态节点)       
3.generate函数生成render函数字符串      

# vue nextTick
nextTick本质就是执行延迟回调的钩子，接受一个回调函数，在下次dom更新循环结束之后执行延迟回调。  
***操作dom节点是同步操作***     
更新dom是同步操作，vue框架为了效率更高采用了异步执行更新dom。    
当监听到数据变化，vue将开启一个队列，并缓冲在同一个事件循环中所发生的所有数据的变更。如果同一个副作用函数被多次触发，   
只会被推入到队列中一次。这种缓冲时去重数据对于避免不必要的计算和dom操作是非常重要的。   
在下一个的事件循环中，vue刷新队列并执行实际（已去重）的副作用函数。   
实现异步队列尝试使用宿主环境的Promise.then(),MutationObserver和setImmediate，若都不支持则采用setTimeout代替   
有一个全局队列存储副作用函数，一个全局pending标识，当pending为true的时候，副作用函数放入下一次的队列中，并且返回一个Promise执行    
pending为false的时候副作用函数加入当前执行队列并返回一个Promise执行    

# 纯函数
特点：  
1.每一次调用时传入相同的参数，返回的都是同样的结果；它不会改变参数的值，也不会改变外部变量的值  
2.纯函数没有其他副作用函数  
# vue响应式原理
Proxy用于创建一个对象的代理，从而实现基本操作的拦截和自定义  
1.注册副作用函数的时候使用了obj对象的值，会触发其读取操作(依赖收集操作，所以需更新视图等操作需要提前注册副作用函数)      
2.当obj对象的值发生改变的时候，会触发其设置操作(派发更新操作)     

一个响应式系统有多个响应式对象，一个对象可以有多个属性，一个对应的属性可以有多个副作用函数  
vuejs选择weakMap,Map,Set三个数据结构当做容器  
weakMap特点  
1.只能是以对象作为键    
2.对值是弱引用，不会对GC造成影响  
3.不能循环遍历   

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

当有副作用函数使用了响应式的数据，我们需要将当前的副作用函收集起来；当响应式的数据发生改变之后，我们又需要将副作用函数进行取出并  
重新执行。与此同时配合Proxy API进行响应数据的读取，设置拦截操作  
其次，我们可以通过给副作用函数添加属性，配置不同的参数，来控制副作用函数执行的时机，主要的便是options.scheduler以及lazy等参数  
computed及watch均是以此而来  




# vue3.0

## vue3 特性
1.向下兼容,vue3支持大多数vue2特性  
2.性能提升  
3.Composition API  
4.teleport瞬移组件 Suspense异步组件解决  
5.更好TypeScript支持  

## vue3性能提升
1.vue3 Proxy实现响应式，vue2 Object.defineProperty性能较差，需递归执行  
2.PatchFlag优化diff算法  
3.HoistStatic静态节点缓存优化    
4.CacheHandler缓存事件优化  
5.SSR优化  
6.tree-shaking  

## HoistStatic静态节点缓存优化
在编译器编译的过程中，将一些静态的节点或者属性提升到渲染函数之外。它能够减少更新时创建虚拟dom带来的性能开销和内存占用  

## vue diff算法
diff算法适用于容器内容为子节点数组的比较。如果不采用diff算法，最简单的操作就是先将之前的dom全部卸载，再将当前的新节点全部挂载  
但是直接操作dom对象是十分耗费性能的，所以diff算法作用就是找出两组vdom节点之间的差异，并尽可能复用dom节点，使得能用最小的性能消耗来完成更新操作  
特点：    
1.比较只会同层进行，不会跨层比较  

2.循环从两边向中间比较  


简单的diff算法就是拿新节点数组中的节点去旧节点数组中查找，通过key来判断是否能够复用，并记录当前的lastIdx。  
lastIndex作用是保存在新节点数组中，对于已经遍历了的新节点在旧节点数组的最大的下标。对于后续的新节点来说，  
只要它在旧节点数组中的下标的值小于当前的lastIdx,代表当前的节点位置发生了改变，则需要移动  

vue2.0采用双端diff算法  
双端diff算法是一种同时对新旧两组子节点的两端进行比较的算法  
1.旧头 === 新头？复用，不用移动  
2.旧尾 === 新尾？复用，不用移动  
3.旧头 === 新尾？复用，需要移动  
4.旧尾 === 新头？复用，需要移动  
若四步比较失败，找到新头结点在旧节点的位置，并进行移动即可  

vue3.0采用快速diff算法  
快速diff算法包含预处理步骤，使用了最长递增子序列来复用相对位置没有发生变化的节点，这些节点不需要移动，能最快的进行复用和更新     
最长递增子序列可采用暴力算法或者动态规划进行解决    
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
<Suspense>组件可以包裹异步组件并协调多层组件加载的处理  


## vue3生命周期setup相关  
https://cn.vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram  
onMounted()注册一个回调函数，在组件挂载完成后执行    
onUpdated()注册一个回调函数，在组件因为响应式状态变更而更新其DOM树之后调用  
onUnmounted()注册一个回调函数，在组件实例被卸载之后调用  
onActivated()注册一个回调函数，若组件是<KeepAlive>缓存树的一部分，当组件被插入到DOM中时调用  



父子组件生命周期执行顺序简易版:父created->子created->子mounted->父mounted


## vue-router原理

hash模式，默认模式，url带#，通过hashchange方法监听url的变化    
优点兼容性好，不需要服务端进行配置，hash的变化会在浏览器history中新增记录，可实现浏览器前进后退功能     
缺点是url展示及传递参数不够直观      

history模式，通过pushState和replaceState方法修改url地址      
popstate只能监听浏览器前进后退改变url，如果是a调整可以拦截a标签的点击事件来监听url变化     
优点解决了url及参数传递不够直观问题，需要服务端进行配置，通过nginx将路由都重新定位到根目录      

