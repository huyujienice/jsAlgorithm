### 二进制,八进制,十六进制

1. 二进制：以 0b 开头，例如 0b1010。
2. 八进制：以 0o 开头，例如 0o123。
3. 十六进制：以 0x 开头，例如 0x1A。

### 字节数组

字节数组是一组固定大小的数组，用于存储原始的二进制数据。字节数组的每个元素都是 u8 类型的值，表示一个字节（8 位无符号整数）  
字节数组通常用于处理二进制文件，网络协议，加密算法等需要直接操作字节数据的场景  
字节数组在 Rust 中的类型为[u8;N],N 是数组长度,例如：

```rust
// 创建一个固定大小的字节数组
let bytes: [u8; 4] = [0x01, 0x02, 0x03, 0x04];
// 使用 `vec!` 宏创建一个动态大小的字节数组（`Vec<u8>`）
let bytes_vec: Vec<u8> = vec![0x01, 0x02, 0x03, 0x04];
```

常用方法：

1. as_bytes 将字符串转为字节数组
2. from_utf8 将字节数组转为字符串
3. to_le_bytes 将数字转为小端字节序字节数组
4. from_le_bytes 将小端字节序字节数组转为数字

## 闭包

lambda 表达式，是一类能够捕获周围作用域中变量的函数

### 数组

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
   any(f) 任一满足？  
   all(f) 全部满足？  
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

### 解决 IEEE 754 浮点数计算问题

1. 引入 fixed 模块解决
