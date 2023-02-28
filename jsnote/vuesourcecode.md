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

## vue diff算法


## vue3全局api
app.config.errorHandler  
用于为应用内抛出的未捕获错误指定一个全局处理函数  

## vue生命周期  
beforeCreate  
在组件实例初始化完成,props解析之后,data和computed等选项处理之前立即调用   
setup钩子会在beforeCreate之前调用，是最先调用的生命周期钩子函数  

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