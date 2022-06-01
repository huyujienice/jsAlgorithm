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
5. 触发更新？

parsers

transition
动画,使用 transition,animation 将过渡动画主动分为 6 个状态，如何组织 6 个状态？使用 transitionend,animationend 触发过渡动画回调函数，将 6 个生命周期函数状态串联起来

1. 怎么解析.vue 模板
   vue-loader 实现

2. 双向绑定或者说视图绑定是如何实现的

3. 虚拟节点如何实现



