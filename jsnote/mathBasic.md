# 指数运算，对数运算，开方运算

简介https://www.zhihu.com/question/28092068
幂运算简介https://zh.wikipedia.org/wiki/%E5%86%AA

# 基本初等函数

## 幂函数

## 指数函数

## 对数函数

## 三角函数

## 反三角函数

# 时间复杂度

一个算法的时间复杂度反映了程序从开始到结束所需要的时间，把算法中基本操作重复执行的次数（频度）作为算法的时间复杂度

O(1):常数复杂度
O(log n):对数复杂度
O(n):线性时间复杂度
O(n^2):平方时间复杂度
O(n^3):立方时间复杂度
O(2^n):指数复杂度
o(n!):阶乘复杂度

# 空间复杂度

一个程序的空间复杂度是指运行完一个程序所需要的内存大小

# 数据结构

## 线性结构

栈，队列，链表，线性表

### 数组
类列表对象

Array.from()  
对一个类数组（arguments）或可迭代对象（Map或Set）创建新的，浅拷贝的数组实例。  
Array.isArray()  
用来判断某个变量是否是一个数组对象  
Array.of()  
根据一组参数来创建新的数组实例，作用类似字面量写法[]  

Array.prototype.length  
数组中的元素个数，可以通过直接设置lenght实现截断数组  
Array.prototype.concat()  
返回一个新数组，用于合并两个或者多个数组，不会更改现有数组  
Array.prototype.copyWithin()  
改变原有数组，但是原有数组长度不改变，浅复制数组的一部分到同一个数组的另一个位置 
Array.prototype.entries()  
返回新的Array Iterator对象，该对象包含数组中每个索引的键值对
Array.prototype.every()  
返回一个布尔值，测试一个数组内所有元素是否都能通过某个指定函数的测试
Array.prototype.fill()  
改变原有数组，用一个固定值填充一个数组从起始索引到终止索引内的全部元素。不包括终止索引  
Array.prototype.filter()  
返回一个新数组，其包含通过所提供的函数实现的测试的所有元素  
Array.prototpye.find()  
返回数组中满足提供的测试函数的第一个元素的值，否则返回undefined  
Array.prototype.findIndex()  
返回数组中满足提供的测试函数的一个元素的索引，若没有找到对应元素则返回-1  
Array.protopype.findLast()  
返回满足提供的测试函数条件的最后一个元素的值，否则返回undefined  
Array.prototpye.findLastIndex()  
返回满足提供的测试函数条件的最后一个元素的索引，若没有找到对应元素则返回-1 
Array.prototype.flat()  
返回新数组，按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组的元素合并为一个新数组返回  
Array.prototype.flatMap()  

Array.prototype.forEach()  
对数组的每个元素执行一次给定的函数  
Array.prototype.includes()  
返回true或false,用来判断数组是否包含一个指定的值  
Array.prototype.indexOf()  
返回索引，返回在数组中找到一个给定元素的第一个索引，如果不存在则返回-1  
Array.prototype.join()  
返回字符串，将一个数组的所有元素连接成一个字符串并返回，所有数组元素被转换成字符串，再用一个传入的分隔符将这些字符串连接起来  
Array.prototype.keys()  
返回索引键的迭代器对象  
Array.prototype.lastIndexOf()  
返回索引值，返回指定元素在数组中的最后一个的索引，不存在则返回-1  
Array.prototype.map()  
返回新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成    
Array.prototype.pop()  
返回数组中的元素，从数组中删除最后一个元素，并返回其值，且会更改原数组  
Array.prototype.push()  
返回数组长度，将一个或者多个元素添加到数组的末尾，并返回该数组的新长度,会更改原数组  
Array.prototype.reduce()  
返回函数调用值，对数组中的每个元素按序执行一个提供的函数，每次运行此函数将会将之前的计算结果作为参数传入，最后将其结果汇总为单个返回值  
Array.prototype.reduceRight()  
返回函数调用值，使用方法与reduce()类似，不过执行顺序为从尾到头，从右到左  
Array.prototype.reverse()  
返回原数组，数组中元素位置颠倒，会改变原数组  
Array.prototype.shift()  
返回删除的值，从数组中删除第一个元素，并返回该元素的值，会更改原数组  
Array.prototype.slice()  
返回新数组，这个数组是一个由begin和end决定的原数组的浅拷贝，不改变原数组  
Array.prototype.some()  
返回true或false，测试数组中是不是至少有1个元素通过了被提供的函数测试  
Array.prototype.sort()  
返回原数组，用原地算法进行排序，然后返回，改变原数组，sort((a, b) => a - b) 就是升序排列    
Array.prototype.splice()  
返回原数组，通过删除或者替换或添加新的元素来修改数组  
Array.prototype.toLocaleString()  
返回一个字符串表示数组中的元素  
Array.prototype.toString()  
返回一个字符串，表示指定的数组及其元素  
Array.prototype.unshift()  
返回数组长度，将一个或者多个元素添加到数组的开头，会更改原数组  
Array.prototype.values()  
返回索引值的迭代器对象


















### Set
Set对象是值的集合，你可以按照插入的顺序迭代它的元素。Set中的元素是唯一的。
+0，-0算相同值  
NaN与NaN算相同值  
undefined与undefined算相同值  
  
Set.prototype.size()  
返回Set对象中的值的个数  
Set.prototype.add(value)  
在Set尾部添加一个元素  
Set.prototype.clear()  
移除Set内的所有元素  
Set.prototype.delete(value)  
移除值为value的元素  
Set.prototype.entries()    
返回一个键值对的迭代器对象，每个值的键和值相等  
Set.prototype.forEach()  
按照插入顺序，为Set对象的每一个值都调用一次回调   
Set.prototype.has(value)  
返回布尔值，表示该值在Set中存在与否  
Set.prototype.keys()  
Set.prototype.values()  
返回值的迭代器对象  



### Map
Map对象保存键值对，并且能够记住键的原生插入顺序。任何值（对象或者基本类型）都可以作为一个键或一个值  

Map.prototype.size  
返回Map对象中的键值对数量  
Map.prototype.clear()  
Map.prototype.delete(key)  
Map.prototype.get(key)  
Map.prototype.has(key)  
Map.prototype.set(key,value)  
Map.prototype.keys()  
Map.prototype.values()  
Map.prototype.entries()  
Map.prototype.forEach() 


### 链表

用一组任意存储的单元来存储线性表的数据元素。一个对象存储着本身的值和下一个元素的地址。  
(线性存储节点，节点包括自身的值和下一个节点的指向)  
特点：插入快，查询慢  
例如：原型链  

## 非线性结构

二维数组，树


### 树
树通常用来存储逻辑关系为一对多的数据，树是用来模拟具有树状结构性质的数据集合  
#### 结点
树存储结构中也将存储的各个元素称为“结点”
1.父结点  
2.根结点    
3.叶结点   

#### 子树
通常，我们将一棵树中几个节点构成的“小树”称为这棵树的“子树”

#### 结点的度
一个结点拥有的子树的个数，就称为该结点的度（Degree）  
比较一棵树中所有结点的度，最大的度即为整棵树的度  

#### 结点的层次
从一棵树的树根开始，树根所在的层为第一层，树的孩子结点所在的层为第二层，以此类推  
树中节点层次的最大值，称为这棵树的深度或者高度  

### 有序树和无序树  
如果一棵树中，各个结点左子树和右子树的位置不能交换，那么这棵树就称为有序树。反之则为无序树  

### 二叉树
满足以下两个条件的树就是二叉树：  
1.本身是有序树  
2.树中包含的各个结点  

#### 二叉树的性质
1.二叉树中，第i层最多有 2**(i-1) 个节点  
2.如果二叉树的深度为K，那么此二叉树最多有 2**K - 1个结点  
3.二叉树中，终端结点树（叶子结点树）为n0，度为2的结点数为n2，则n0=n2+1 

结论3推导：n个结点的数，一定有n-1条边  
假设n0表示度为0的结点树，n1为度为1的结点树，n2为度为2的结点树，那么  
n0+n1+n2 = n1 + 2*n2 + 1,即n0=n2+1  
二叉树中知道了叶子结点的数目，那么就知道了度为2的结点数目

#### 二叉树遍历
1.前序遍历：访问根->遍历左子树->遍历右子树  
2.中序遍历：遍历左子树->访问根->遍历右子树  
3.后序遍历：遍历左子树->遍历右子树->访问根  
4.广度遍历：按照层次一层层遍历  
 
前根左右，中左根右，后左右根  
前中后代表的是根结点的位置  

知道中序遍历+前/后序遍历可推导出二叉树结构  
因为前/后序遍历可直接知道根结点，中序遍历知道根结点后可知道左中序结点和右中序结点的个数，  
即可知道左前结点和右前结点或者左后结点或右后结点的内容，递归推导即可获取整个二叉树结构  


前 1 2 4 9 5 6 10 3 7 8
中 4 9 2 10 6 5 1 3 8 7 

2 4 9 5 6 10
4 9 2 10 6 5

4 9

5 6 10 
10 6 5

6 10 
10 6

3 7 8 
3 8 7

7 8 
8 7 

               1
            2       3
         4    5        7
          9  6         8 
            10  


### 完全二叉树

#### 完全二叉树特点
当根结点为1的时候
1.编号为i的子节点，左孩子编号为2*i,右孩子编号为2*i+1  
2.可以用连续空间存储（数组）



### 二叉排序树
二叉排序树又被称为二叉搜索树或二叉查找树  
#### 特征  
1.若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值  
2.若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值  
3.它的左，右子树分别为二叉排序树  

（左子树小于根，右子树大于根） 
二叉排序树中序遍历的结果是一个升序的序列









