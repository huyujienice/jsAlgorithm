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
用来比较2个值是否严格相等,与严格比较符（===）的行为基本一致
不同之处只有两个：一是+0不等于-0,二是NaN等于自身