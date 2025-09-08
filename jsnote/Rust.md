### 二进制,八进制,十六进制

1. 二进制：以 0b 开头，例如 0b1010。
2. 八进制：以 0o 开头，例如 0o123。
3. 十六进制：以 0x 开头，例如 0x1A。
   
0b,0o,0x都是整型字面量，默认类型是i32,可与i32直接进行运算，或通过as转为其他整形类型进行运算   
进制的前缀只影响“怎么看”，不影响“是什么类型”    

### 字节数组

字节数组用于存储原始的二进制数据。字节数组的每个元素都是 u8 类型的值，表示一个字节（8 位无符号整数）  
字节数组通常用于处理二进制文件，网络协议，加密算法等需要直接操作字节数据的场景  
例如：

```rust
// 创建一个固定大小的字节数组
let bytes: [u8; 4] = [0x01, 0x02, 0x03, 0x04];
// 使用 `vec!` 宏创建一个动态大小的字节数组（`Vec<u8>`）
let bytes_vec: Vec<u8> = vec![0x01, 0x02, 0x03, 0x04];
```

&[u8] 常用方法：

1. as_bytes 将字符串转为字节数组
2. from_utf8 将字节数组转为字符串 
3. to_le_bytes 将数字(整数浮点数都可以)转为小端字节序字节数组
4. from_le_bytes 将小端字节序字节数组转为数字

### 字符串

String 被存储为由字节组成的 vector(Vec<u8>)  
&str 是一个总是指向有效的 UTF-8 序列的切片(&[u8])

## 闭包

lambda 表达式，是一类能够捕获周围作用域中变量的函数

### 数组

从根本上讲，Vec 始终是 (指针，容量，长度) 三元组，指针永远不为空  
动态数组 Vec 常用方法：

```rust
let a = Vec::new();
let mut b = vec![1,2,3];
b.push(4);                  // 尾部添加
b.pop();                    // 删除并返回尾部元素
b.insert(4, 5);             // 指定位置插入
b.remove(1);                // 删除指定索引元素
b.clear();                  // 清空所有元素
let first = b[0];           // 索引访问（可能 panic）
let first = b.get(0);       // 返回 Option<&T>
let slice = &b[1..3];       // 切片
b.sort();                   // 升序排序
let len = b.len();          // 数组内元素个数
assert!(b.is_empty());      // 数组是否为空
let mut c = vec![1];
c.extend_from_slice(&[2, 3, 4]);   // 克隆并将切片中的所有元素追加到c
assert_eq!(c, [1, 2, 3, 4]);
let mut d = vec![1, 2, 2, 3, 2];
d.dedup();                          // 删除d中连续的重复元素
assert_eq!(d, [1, 2, 3, 2]);
```

### 迭代器

1. 拿到迭代器

```rust
let v = vec![1, 2, 3, 4];
// &Vec<T> -> 迭代器
v.iter()         // &T
v.iter_mut()     // &mut T
v.into_iter()    // T（消耗 Vec）
```

2. 常用适配器（中间方法）
   map(f) 一对一转换  
   filter(f) 过滤  
   enumerate() 带索引的元组  
   chain(other) 两个迭代器拼接

3. 常用消费器（终结方法）  
   collect() 把迭代结果收集到集合  
   count() 元素个数  
   sum() / product() 求和 / 求积  
   any(f) 任一满足返回bool    
   all(f) 全部满足返回bool    
   find(f) 返回第一个 Some(&T)  
   position(f) 返回首个索引 Some(usize)

### hashmap

常用方法

```rust
use std::collections::HashMap;

let mut map = HashMap::new();           // 空 map
map.insert("b", 3);                     // 插入或覆盖
let v = map["a"];                       // 直接索引（可能 panic）
let v = map.get("a");                   // Option<&V>
let v = map.get_mut("a");               // Option<&mut V>
map.entry("c").or_insert(10);           // 若键不存在则插入
map.entry("a").and_modify(|v| *v += 1); // 若存在则修改
map.remove("a");                        // 删除并返回旧值
map.clear();                            // 清空
let has = map.contains_key("a");        // 是否包含
let len = map.len();                    // 长度
let is_empty = map.is_empty();          // 是否为空
```

## trait

#[derive]可提供某些 trait 的基本实现  
很多运算符可以通过 trait 进行重载。比如 a + b 会调用 add 方法，add 方法是 Add trait 一部分，所以+运算符可以被任何 Add trait 的实现着使用

### 类型转换

使用 From 和 Into Traits 来实现 2 个类型的相互转换

### Result 与 Option

```rust
enum Option<T>{
   Some(T),
   None,
}
enum Result<T,E>{
   Ok(T),
   Err(E),
}
```

拥有相似的方法:

1. is_some() / is_ok() 是否存在/成功
2. is_none() / is_err() 是否不存在/失败
3. map() 转换成功存在值
4. and_then() 链上操作成功存在值
5. unwrap() 提取成功存在值，若没有则直接 panic
6. unwrap_or() 提取成功存在值，或提供默认值
7. 都支持使用?，函数提前返回失败错误值

不同点：

1. 语义：Option 用于值存在或缺失，Result 用于成功失败
2. 类型参数：Option 只有一个参数，Result 有 2 个参数
3. Option 多用于查找操作，配置项和数组访问；Result 多用于文件访问，网络请求，解析操作

### Result <-> Option 相互转化

1. .ok(): Result<T,E> -> Option<T> 保留成功值
2. .err(): Result<T,E> -> Option<E> 保留错误值
3. .ok_or(err):Option<T> -> Result<T,E> 提供默认错误值
4. .ok_or_else(f):Option<T> -> Result<T,E> 通过闭包生成错误值

### 使用?和 unwrap()的区别

使用?表示提前返回函数 Err 或者 None 的结果
使用 unwrap()表示出现 Err 或 None,程序直接 panic,使用 unwrap_or 可提供默认值

### Rc,Arc,Cell,RefCell

rust 规则

1. 一个数据只有一个所有者 -> Rc,Arc 让一个数据拥有多个所有者
2. 要么多个不可变借用，要么一个可变借用 -> RefCell 实现编译期可变，不可变引用共存

当 struct 中有部分字段需要修改而有部分不需要修改的时候，通常需要将整个 struct 变为&mut  
如果不想将整个 struct 设置为&mut,可将单个字段设置为 Cell 和 RefCell,实现内部可变性

#### rust 规则 1，所有权

非 Copy 的类型，被整体当做右值使用时（赋值传参模式匹配），会发生所有权移动 -> &,as_ref(),Rc,Arc 解决

### 生命周期

生命周期是为了确保引用在所需的时间内有效，其实指的就是引用有效的范围（作用域 Scope）  
每个引用都有生命周期

### 解决 IEEE 754 浮点数计算问题

1. 引入 fixed 模块解决
