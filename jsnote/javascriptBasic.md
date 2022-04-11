# 执行上下文和执行栈

以下内容只是一个人的说法，原文链接：
https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0

执行上下文是评估和执行 JavaScript 代码的环境的抽象概念。每当 JavaScript 代码在运行的时候，它都是在执行上下文中运行
三种执行上下文

1. 全局执行上下文
2. 函数执行上下文
3. Eval 函数执行上下文

执行上下文两个阶段

1. 创建阶段
2. 执行阶段

创建阶段发生三件事情

1. this 绑定
   在全局执行上下文中，this 的值指向全局变量，在函数执行上下文中，this 的值取决于该函数式如何被调用的。如果它被一个引用对象调用，那么 this 会被设置成那个对象，否则 this 的值被设置为全局对象或者 undefined

2. 创建词法环境组件
3. 创建变量环境组件

# 继承与原型链

prototype，虐杀原型游戏英文名
每个实例对象(object)都有一个私有属性(称之为__proto__)指向它的构造函数的原型对象(prototype)。它的构造函数的原型对象也有自己的原型对象(因为构造函数也是对象)(__proto__)，层层向上直到一个对象(Object.prototype)的原型对象为null。根据定义，null没有原型，并作为这个原型链中的最后一个环节。

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

对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可以是可写的，也可以是不可写的。存取描述符是由 getter 函数和 setter 函数所描述的属性。一个描述符只能是这两者其中之一；不能同时是两者。

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
2. Object.keys(obj):返回一个数组，包含对象自身的所有属性（不含 Symbol 属性）的键名
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

Generator函数是ES6提供的一种异步编程的解决方案

两个特征：
1. function关键字与函数名之间有一个星号(*)
2. 函数体内部使用yield表达式

yield表达式本身没有返回值，或者说总是返回undefined。next()方法可以带一个参数，该参数就会被当做上一个yield表达式的返回值

协程（coroutine）是一种程序运行方式，可以理解成“协作的线程”或“协作的函数”。协程即可以用单线程实现，也可以用多线程实现。前者是一种特殊的子线程，后者是一种特殊的线程

Generator函数是ES6对协程的实现，但属于不完全实现。Generator函数被称为“半协程”,意思是只有Generator函数的调用者，才能将程序的执行权还给Generator函数。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。



## Iterator

遍历器(Iterator)是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理处理该数据结构的所有成员），即 for...of 循环。当使用 for...of 循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口
ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性上。
可使用遍历器实现“链表”结构