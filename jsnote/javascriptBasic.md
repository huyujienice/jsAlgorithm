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