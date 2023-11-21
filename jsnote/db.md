# MySQL

## RDBMS术语
RDBMS:Relational Database Management System,关系型数据库管理系统    

1. 数据库：关联表的集合
2. 数据表：表是数据的矩阵
3. 主键：主键是唯一的。一个数据表中只能包含一个主键。可用主键来查询数据
4. 外键：外键用于关联两个表
5. 索引：使用索引可快速访问数据库表中的特定信息。索引是对数据库表中的一列或多列的值进行排序的一种结构。类似于书籍的目录
6. 复合键：复合键（组合键）将多个列作为一个索引键，一般用于复合索引
7. 完整性参照：参照的完整性要求关系中不允许引用不存在的实体。与实体的完整性是关系模型必须满足的完整性约束条件，目的是保证数据的一致性  

## 数据类型
1. 数值类型
常用的有tinyint	(0，255),int(0，4 294 967 295),decimal(存储金额，如decimal(5,2)表示范围为-999.99到999.99)   

2. 日期和时间类型
常用的有datetime(YYYY-MM-DD hh:mm:ss)

3. 字符串类型
常用的有varchar,变长字符串，0-65535     
varchar(32)，表示可以存储32个字符    

### char varchar text 对比
1. 存储定长数据可使用char(0-255),索引速度极快（例如：手机号，身份证号）
2. 长度255以上只能使用varchar或text,能用varchar尽量不要用text
3. char(N)是定长的，不足使用空格补齐，超过N被截断丢弃。varchar(N)是不定长的，不足不会补齐，超过N被截断丢弃 
4. 查找效率相比:char>varchar>text,text在效率和安全性上都存在问题  

## 查询数据
SELECT column_name,column_name FROM table_name,table_name [WHERE Clause] [LIMIT N] [OFFSET M]   

1. 查询中可以使用一个或多个表，表之间用(,)分割，并使用WHERE语句来设定查询条件 
2. SELECT命令可以读取一条或多条记录
3. 可以使用(*)来代替其他字段，SELECT语句会返回表的所有字段数据
4. 可以使用WHERE语句来包含任何条件
5. 可以使用LIMIT来设定返回的记录数
6. 可以通过OFFSET指定SELECT语句开始查询的数据偏移量。默认情况下偏移量为0

### WHERE 查询条件
SELECT filed1,field2 FROM table_name1,table_name2 [WHERE condition1 [AND [OR]]] condition2...    

1. 可以使用AND或者OR指定一个或者多个条件
2. WHERE子句也可以运用于SQL的DELETE或者UPDATE命令
3. WHERE子句类似于if，可使用=,!=,>,<,>=,<=操作符 
4. WHERE子句的字符串比较是不区分大小写的。可以使用BINARY关键字来区分大小写   

#### LIKE 模糊查询条件
SELECT filed1,filed2 FROM table_name1,table_name2 WHERE filed1 LIKE condition1 [AND [OR]] filed2='somevalue'      

字符串匹配模式：
1. %:表示0个或多个字符      
2. _:表示任意单个字符

#### REGEXP 正则查询条件
在WHERE子句中使用正则模式匹配
SELECT filed1,filed2 FROM table_name1,table_name2 WHERE filed1 REGEXP condition1 [AND [OR]] condition2   

### UNION 多表联合查询
查询多个表中相同列信息      
UNION:用于将不同表中相同的列中查询的数据展示出来(不包括重复信息)      
UNION ALL:用于将不同表中相同的列中查询的数据展示出来(包括重复信息)     

SELECT 列名称 FROM 表名称 UNION SELECT 列名称 FROM 表名称 ORDER BY 列名称；    
SELECT 列名称 FROM 表名称 UNION ALL SELECT 列名称 FROM 表名称 ORDER BY 列名称；    

### ORDER BY 排序   
ASC升序DESC降序，默认升序

### GROUP BY 分组
对查询出来的结果按照某个字段或者表达式进行分组，获得一组组的集合，然后从每组中取出一个指定字段或者表达式的值     
SELECT column_name,function(column_name) FROM table_name WHERE column_name operator value GROUP BY column_name    

function可以选择COUNT,SUM,AVG等函数    

### JOIN 多表查询
1. INNER JOIN(内连接，或等值连接)(可省略INNER使用JOIN):获取两个表中字段匹配关系的记录    
2. LEFT JOIN(左连接):获取左表所有记录，即右表没有对应匹配的记录
3. RIGHT JOIN(右连接):与LEFT JOIN相反

当RIGHT JOIN对比的2个表行数不相等时，对比行数以左表结构来还是以右表结构来？
经过测试，显示结构会以长的表来，不会以左右来，左右只表示数据是否显示

一般默认小库撞大库，即小库是a,大库是b，用LEFT JOIN


### 事务
成批执行SQL语句    

1. 只有Innodb数据库引擎的数据库才支持事务
2. 事务处理可以用来维护数据库的完整性，保证成批的SQL语句要么全部执行，要么全部不执行
3. 事务用来管理INSERT,UPDATE,DELETE语句

事务必须满足4个条件
1. 原子性
2. 一致性
3. 隔离性
4. 持久性

### ALTER
ALTER用于修改数据库，表和索引等对象的结构    

### 索引
索引被用来快速找出在一个列上用一特定值的行。如果没有索引，MySQL必须从第一条记录开始一直读到相关行       

1. KEY:索引
2. PRIMARY KEY:主键索引,主键且唯一
3. UNIQUE KEY:唯一索引
4. FOREIGN KEY

PRIMARY KEY必须为NOT NULL    
一个表只能有一个PRIMARY KEY,但可以有多个UNIQUE KEY      