# js类型判断

## 使用 typeof 判断

Undefined,Null,Boolean,Number,String,BigInt,Symbol,Object,Function,other Object  
undefined,object,boolean,number,string,bigint,symbol,object,function,object

## instanceof判断
instanceof无法判断基本数据类型，对于引用类型数据，返回其其对应类型  

## 使用 Object.prototype.toString.call()判断（使用apply()效果一致）

console.log(Object.prototype.toString.call(1)); // [object Number]  
console.log(Object.prototype.toString.call('123')); // [object String]  
console.log(Object.prototype.toString.call(true)); // [object Boolean]  
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]    
console.log(Object.prototype.toString.call(null)); // [object Null]  
console.log(Object.prototype.toString.call({})); // [object Object]  
console.log(Object.prototype.toString.call([])); // [object Array]  
console.log(Object.prototype.toString.call(new Date())); // [object Date]  
console.log(Object.prototype.toString.call(new Error())); // [object Error]  
console.log(Object.prototype.toString.call(/a/g)); // [object RegExp]  
console.log(Object.prototype.toString.call(()=>{})); // [object Function]  
console.log(Object.prototype.toString.call(123n)); // [object BigInt]  
console.log(Object.prototype.toString.call(Symbol())); // [object Symbol]  
console.log(Object.prototype.toString.call(Math)); // [object Math]  
console.log(Object.prototype.toString.call(JSON)); // [object JSON]  

# 执行上下文和执行上下文栈

以下内容只是一个人的说法，原文链接：
https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0

执行上下文是评估和执行 JavaScript 代码的环境的抽象概念。每当 JavaScript 代码在运行的时候，它都是在执行上下文中运行
4种情况会创建新的执行上下文  
1.进入全局代码  
2.进入function函数体代码  
3.进入eval函数参数指定的代码  
4.进入module代码  



执行上下文负责存储VO,AO,Scope,this.同时也创建执行上下文栈（ECStack,Execution Context Stack）来管理执行上下文的推入和弹出  
## VO
VO即Variable Object变量对象，定义在全局执行上下文（globalEC）中，存储全局变量和函数

## AO
AO即Activation Object活跃对象，定义在函数执行上下文中（fnEC）中（准确来说，在函数开始执行时才创建），存储局部变量和子函数以及arguments

## Scope
Scope就是所谓作用域，存储在其中的一个个AO和VO按队列顺序链接成了所谓的**作用域链**，即***词法作用域**，用来查找可使用的变量
Scope关联[[scope]]  
[[scope]]定义在函数中，在函数**创建**时会保存当前父级函数的[[scope]]以及父级函数执行上下文的AO，若为全局函数，则保存全局上下文的VO  

Scope定义在执行上下文，[[scope]]定义在函数中，二者关系如下：
fnEC.Scope = [ fnEC.AO, ...fn.[[scope]] ]

### 闭包
本质就是返回并使用内部函数的[[scope]],即创建时候的作用域  
通常的表现形式是返回一个函数，这个函数可以引用到创建时父级函数的参数及作用域  


## this
this是当前执行上下文(global,function或eval)的一个属性，在非严格模式下，总是指向一个对象    
globalThis可获取不同环境下的全局this对象，也就是全局对象自身  

# 继承与原型链

prototype，虐杀原型游戏英文名
每个实例对象(object)都有一个私有属性(称之为**proto**)指向它的构造函数的原型对象(prototype)。它的构造函数的原型对象也有自己的原型对象(因为构造函数也是对象)(**proto**)，层层向上直到一个对象(Object.prototype)的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节。

函数(function)是拥有属性的。所有的函数都会有一个特别的属性-prototype。  
函数拥有prototype及__proto__属性  
例如：  
function a(){}   
a.prototype.__proto__ 指向Object.prototype,Object.prototype.__proto__ 指向null  
a.__proto__ 指向 Function.prototype,Function.prototype.__proto__ 指向 Object.prototype,Object.prototype.__proto__ 指向null
如果要查找a为构造函数生成新的实例的属性，关注a.prototype，若查找a自身的属性，关注a.__proto__   
a可以使用Function.prototype.call方法原理即是通过a.__proto__ 查找到Funtion.prototype



# new 方法底层逻辑

通过 new 调用构造函数实际会经历以下 4 个步骤

1. 创建一个新对象
2. 将构造函数的原型挂到新对象的原型上（this 指向 新对象）
3. 执行构造函数，完成新对象的创建初始化
4. 返回新对象

# Module

浏览器环境中，<script>标签带 defer 或 async 属性，脚本就会异步加载。
defer(铁的)会等到整个页面在内存中正常渲染结束(DOM 结构完全生成，以及其他脚本执行完成),才会执行,即渲染完再执行
async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染，即下载完就执行
浏览器加载 ES6 模块，也使用<script>标签，但是要加入 type="module"属性，且渲染完再执行

ES6 模块与 CommonJS 模块的差异

1. CommonJS 模块输出是一个值的拷贝，ES6 模块输出的是值的引用
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
3. CommonJS 模块的 require()是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段

Node.js 中，.mjs 文件总是以 ES6 模块加载，.cjs 文件总是以 CommonJS 模块加载，.js 文件的加载取决于 package.json 里面的 type 字段的设置。指定 type 为 module 则解释.js 脚本为 ES6 模块，若不指定 type 或者 type 的字段为 commonjs，则.js 脚本会被解释成 CommonJS 模块。

package.json 文件中有 2 个字段可以指定模块的入口文件：main 和 exports
简单只使用 main 字段可以指定模块加载的入口文件
exports 字段优先级高于 main 字段

CommonJS 模块加载 ES6 模块
(async () => {
await import('./my-app.mjs');
})();
ES6 模块加载 CommonJS 模块
只能整体加载，不能只加载单一输出项
// 正确
import packageMain from 'commonjs-package';
// 报错
import { method } from 'commonjs-package';
或使用 Node.js 内置的 module.createRequire()可加载 CommonJS 模块

# ArrayBuffer,TypedArray,DataView

ArrayBuffer 对象，TypedArray 视图和 DataView 视图是 JavaScript 操作二进制数据的一个接口。

SharedArrayBuffer，允许 Worker 线程与主线程共享同一块内存。
多线程共享内存，最大的问题就是如何防止两个线程同时修改某个地址，或者说，当一个线程修改共享内存以后，必须有一个机制让其他线程同步。SharedArrayBuffer API 提供 Atomics 对象，保证所有共享内存的操作都是“原子性”的，并且可以在所在的线程内同步。

# js 内置对象

## Number

javascript 的 Number 类型为双精度 IEEE754 64 位浮点类型
javascript 对整数提供四种进制的表示方法

- 十进制：没有前导 0 ， Decimal system
- 八进制：有前缀 0o 或者 0O 的数值，或者有前导 0，且只用 0-7 的八个阿拉伯数字，Octal number system
- 十六进制：有前缀 0x 或者 0X，Hexadecimal
- 二进制：有前缀 0b 或者 0B，Binary

Number.EPSILON
表示 2 个数最小的浮点数之间的差值，即 2^-52，可用来测试是否相等

Number.MAX_SAFE_INTEGER
表示在 js 中最大的安全整数 2^53 - 1

Number.MAX_VALUE
表示在 js 中能表示的最大整数

Number.MIN_SAFE_INTEGER
表示在 js 中最小的安全的 integer 型数字-(2^53 - 1)

Number.MIN_VALUE
表示在 js 中的最小的正值

Number.NaN
表示非数字,Not A Number

Number.NEGATIVE_INFINITY
表示负无穷大

Number.POSITIVE_INFINITY
表示正无穷大

Number.isFinite()
检测传入的参数是否是一个有穷数，全局 isFinite()会将参数自动转换为数字

Number.isInteger()
判断给定的参数是否为整数

Number.isNaN()
确定传递的值是否为 NaN,并且检查类型是否为 Number，原来全局 isNaN()会将参数自动转换成数字

Number.isSafeInteger()
传入参数是否为安全整数，安全整数范围为 -(2^53 - 1)到 2^53 - 1 之间的整数，包含 -(2^53 - 1)和 2^53 - 1

Number.parseFloat()
与全局 parseFloat 表现一致

Number.parseInt()
与全局 parseInt 表现一致

Number.prototype.toExponential()
以指数表示法返回该数值字符串表示形式，例如 7.823e+5=782300

Number.prototye.toFixed()
以定点表示法来格式化一个数值，返回字符串

Number.prototype.toPrecision()
以指定的精度返回该数值对象的字符串表示,跟上面 toFixed 有啥区别？toPrecision 可能会返回指数写法，不可预期

## Boolean

Boolean(undefined) // false

Boolean(null) // false

Boolean(0) // false

Boolean(NaN) // false

Boolean('') // false

Boolean(new Boolean(false))// Boolean 对象会转成 true

Boolean([]) // 空数组会转成 true

Boolean({}) // 空对象会转成 true

# es6 相关

## 函数扩展

参数默认值

rest 参数
rest 参数（形式为...变量名）,用于获取函数的多余参数，用来代替 arguments 对象,可直接使用数组相关方法

箭头函数
箭头函数没有自己的 this 对象，this 指向函数定义生效时上层作用域中的 this
不可以当作构造函数，即不可以对箭头函数使用 new 命令
不可以使用 arguments 对象，如果要使用则用 rest 参数代替
不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数

尾调用优化

尾递归

递归函数改写

尾递归优化

## 数组扩展

扩展运算符
扩展运算符（spread）是三个点（...）,好比 rest 参数的逆运算，将一个数组转化为用逗号分隔的参数序列，该运算符主要用于函数的调用
扩展运算符可复制数组，合并数组等

Array.from()
Array.from 方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）（本质拥有 length 属性）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）

Array.of()
用于将一组值，转化为数组

Array.prototype.copyWithin()
数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组

Array.prototype.find()
Array.prototype.findIndex()
找出成员

Array.prototype.fill()
强制填充数组

Array.prototype.entries()
Array.prototype.keys()
Array.prototype.values()
用于遍历数组

Array.prototype.includes()
是否包含给定的值

Array.prototype.flat()
Array.prototype.flatMap()
将嵌套数组拉平

## 对象的扩展

属性简写

属性名表达式
使用字面量方式定义对象时（使用{}定义），可用[]表示对象的属性名

方法的 name 属性

对象属性的描述符
对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为
Object.getOwnPropertyDescriptor 方法可以获取该属性的描述对象

Object.defineProperty():

对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。  
数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。存取描述符是由 getter 函数和 setter 函数所描述的属性。一个描述符只能是这两者其中之一；不能同时是两者。

两种描述符共享 2 个可选键值：  
configurable:当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能够从对应的对象上被删除。默认为 false  

enumerable:当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。默认为 false  

数据描述符还具有以下 2 个键值：
value:该属性对应的值

writable:当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。默认为 false

存取运算符还具有以下 2 个键值：
get：属性的 getter 函数，如果没有 getter，则为 undefined,函数执行时不传入任何参数，但是会传入 this 对象

set:属性的 setter 函数，如果没有 setter,则为 undefined,该函数接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象

enumerable 属性，称为“可枚举性”，如果该属性为 false，以下四个操作会忽略 enumerable 为 false 的属性

1. for...in 循环：只循环对象自身的和可继承的可枚举的属性
2. Object.keys():返回对象自身的所有可枚举的属性的键名
3. JSON.stringify():只串化对象自身的可枚举的属性
4. Object.assign():忽略 enumerable 为 false 的属性，只拷贝对象自身的可枚举属性

引入“可枚举”（enumerable）这个概念的最初目的就是让某些属性可以规避掉 for...in 操作,不然所有的内部属性和方法都会遍历到

属性的遍历
ES6 一共有 5 种方法可以遍历对象的属性

1. for...in:循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）
2. Object.keys(obj):返回一个数组，包含对象自身的所有可枚举属性（不含 Symbol 属性）的键名
3. Object.getOwnPropertyNames(obj):返回一个数组，包含对象的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
4. Object.getOwnPropertySymbols(obj):返回一个数组，包含对象自身的所有的 Symbol 属性的键名
5. Reflect.ownKeys(obj):返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

super 关键字
指向当前对象的原型对象，只能用在对象的方法之中，用在其余的地方都会报错

扩展运算符

Object.is()
用来比较 2 个值是否严格相等,与严格比较符（===）的行为基本一致
不同之处只有两个：一是+0 不等于-0,二是 NaN 等于自身

Object.assign()
将源对象的所有可枚举(enumerable)属性，复制到目标对象

Object.getOwnPropertyDescriptors()
返回指定对象所有自身属性（非继承属性）的描述对象
Object.getOwnPropertyDescriptor()
返回某个对象属性的描述对象

Object.setPrototypeOf(),写原型操作
Object.getPrototypeOf()，读原型操作
Object.create()，生成原型操作

Object.keys()
返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名
Object.values()
返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值
Object.entries()
返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组
Object.entries 的基本用途是遍历对象的属性，另一个用处是将对象转为真正的 Map 结构

Object.fromEntries()
是 Object.entries()的逆操作，用于将一个键值对数组转为对象，因此特别适合将 Map 结构转为对象

## 运算符扩展

指数运算符（**）
// 相当于 2 ** (3 ** 2)
2 ** 3 \*\* 2
// 512

链判断运算符(?.)

Null 判断运算符(??)

逻辑赋值运算符
// 或赋值运算符
x ||= y
// 等同于
x || (x = y)

// 与赋值运算符
x &&= y
// 等同于
x && (x = y)

// Null 赋值运算符
x ??= y
// 等同于
x ?? (x = y)

可以为变量或属性设置默认值

## Symbol

原始数据类型 Symbol,表示独一无二的值。

## Set

类似于数组，但是成员值都是唯一的，内部判断是否唯一相等采用类似===算法，区别是 Set 认为 NaN 等于自身

Set.prototype.constructor:构造函数，默认就是 Set 函数

Set.prototype.size:返回 Set 实例的成员总数

Set.prototype.add(value):添加某个值，返回 Set 结构本身

Set.prototype.delete(value):删除某个值，返回一个布尔值，表示删除是否成功

Set.prototype.has(value):返回一个布尔值，表示该值是否为 Set 的成员

Set.prototype.clear():清除所有成员，没有返回值

Set.prototype.keys():返回键名的遍历器

Set.prototype.values():返回键值的遍历器

Set.prototype.entries():返回键值对的遍历器

Set.prototype.forEach():使用回调函数遍历每个成员

Array.from 方法可以将 Set 结构转为数组

## WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合
WeakSet 的成员只能是对象，且对象都是弱引用，垃圾回收机制不考虑 WeakSet 对该对象的引用

WeakSet.prototype.add(value)

WeakSet.prototype.delete(value)

WeakSet.prototype.has(value)

### 对象链式写法的前提是方法能给返回一个有此方法的对象（比如返回对象自身）

## Map

类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当做键

Map.prototype.size

Map.prototype.set(key,value)

Map.prototype.get(key)

Map.prototype.has(key)

Map.prototype.delete(key)

Map.prototype.clear()

Map.prototype.keys()

Map.prototype.values()

Map.prototype.entries()

Map.prototype.forEach()

## WeakMap

## WeakRef

WeakRef 对象，用于直接创建对象的弱引用

## FinalizationRegistry

清理器注册表，用来指定目标对象被垃圾回收机制清除以后，所要执行的回调函数
代码示例：
let testObj = {};
const registry = new FinalizationRegistry((value) => {
alert(value);
});
registry.register(testObj, "clear testObj");
setTimeout(() => {
testObj = null;
}, 1000);

## Proxy

下面是 Proxy 支持的拦截统一操作一览，一共 13 种

get(target,propKey,receiver):拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']

set(target,propKey,value,receiver):拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值

has(target,propKey):拦截 propKey in proxy 的操作，返回一个布尔值

deleteProperty(target,propKey):拦截 delete proxy[propKey]的操作，返回一个布尔值

ownKeys(target):拦截 Object.getOwnPropertyNames(proxy),Object.getOwnPropertySymbols(proxy),Object.keys(proxy),for...in 循环,返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。

getOwnPropertyDescriptor(target,propKey):拦截 Object.getOwnPropertyDescriptor(proxy,propKey)，返回属性的描述对象

defineProperty(target,propKey,propDesc):拦截 Object.defineProperty(proxy,propKey,propDesc),Object.defineProperties(proxy,propDescs)，返回一个布尔值

preventExtensions(target):拦截 Object.preventExtensions(proxy)，返回一个布尔值

getPrototypeOf(target):拦截 Object.getPrototypeOf(proxy),返回一个对象

isExtensible(target):拦截 Object.isExtensible(proxy),返回一个布尔值

setPrototypeOf(target,proto):拦截 Object.setPrototypeOf(proxy,proto),返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截

apply(target,object,args):拦截 Proxy 实例作为函数调用的操作，比如：proxy(...args),proxy.call(object,...args),proxy.apply(...)

construct(target,args):拦截 Proxy 实例作为构造函数调用的操作，比如:new Proxy(...args)

## Reflect

设计目的：

1. 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放在 Reflect 对象上
2. 修改某些 Object 方法的返回结果，让其变得更合理
3. 让 Ojbect 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj[name],而 Reflect.has(obj,name)和 Reflect.deleteProperty(obj,name)让它们变成了函数行为
4. Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为

静态方法：

1. Reflect.apply(target,thisArg,args)
2. Reflect.construct(target,args)
3. Reflect.get(target,name,receiver)
4. Reflect.set(target,name,value,recevier)
5. Reflect.defineProperty(target,name,desc)
6. Reflect.deleteProperty(target,name)
7. Reflect.has(target,name)
8. Reflect.ownKeys(target)
9. Reflect.isExtensible(target)
10. Reflect.preventExtensions(target)
11. Reflect.getOwnPropertyDescriptor(target,name)
12. Reflect.getPrototypeOf(target)
13. Reflect.setPrototypeOf(target,prototype)

## Promise

Promise 是一种异步编程的解决方案

Promise.prototype.then():then 方法返回的是一个新的 Promise 实例，因此可以采用链式写法，在 then 里面 return 一个 Promise，然后在 then 方法后面再次调用另一个 then 方法

Promise.prototype.catch():方法是.then(null,rejection)或.then(undefined,rejection)的别名，用于指定发生错误时的回调函数。（在 Promise 内，throw new Error 等各种异常的抛出，与直接使用 reject 效果一致，都会走进 catch 中，而且 catch 完毕之后 then 又可以执行新的 Promise，每个 Promise 正常来说都需要 catch 错误，不然异常会抛出到最外层显示，但是抛出到最外层的异常不会阻塞中断线程，这个即“Promise 会吃掉错误”,这种情况是否跟微任务队列有关系？）

Promise.prototype.finally()

Promise.all():只有当所有条件 resolve 才最终 resolve,如若有一个条件 reject 则最终 reject

Promise.race():只要有一个条件率先改变状态,则最终改变相同的状态 resolve/reject

Promise.allSettled():确定所有条件都已改变状态

Promise.any():只有当所有条件 reject 才最终 reject,如若有一个条件 resolve 则最终 resolve

Promise.resolve():将现有对象转为 Promise 对象

Promise.reject()

Promise.try()

## Generator

Generator 函数是 ES6 提供的一种异步编程的解决方案

两个特征：

1. function 关键字与函数名之间有一个星号(\*)
2. 函数体内部使用 yield 表达式

yield 表达式本身没有返回值，或者说总是返回 undefined。next()方法可以带一个参数，该参数就会被当做上一个 yield 表达式的返回值

协程（coroutine）是一种程序运行方式，可以理解成“协作的线程”或“协作的函数”。协程即可以用单线程实现，也可以用多线程实现。前者是一种特殊的子线程，后者是一种特殊的线程

Generator 函数是 ES6 对协程的实现，但属于不完全实现。Generator 函数被称为“半协程”,意思是只有 Generator 函数的调用者，才能将程序的执行权还给 Generator 函数。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。

## Iterator

遍历器(Iterator)是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理处理该数据结构的所有成员），即 for...of 循环。当使用 for...of 循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口
ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性上。
可使用遍历器实现“链表”结构
