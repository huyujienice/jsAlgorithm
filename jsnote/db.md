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

### INT(5)
INT存储空间是4byte,(5)只是“显示宽度”，只有在字段加上ZEROFILL才有效果
```sql
CREATE TABLE t1 (
  a INT(5) ZEROFILL
);
INSERT INTO t1 VALUES (42);
SELECT a;   -- 返回 00042（不足 5 位用 0 补齐）
```

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

### GROUP BY 将数据集合分组
对查询出来的结果按照某个字段或者表达式进行分组，获得一组组的集合，然后从每组中取出一个指定字段或者表达式的值     
SELECT column_name,function(column_name) FROM table_name WHERE column_name operator value GROUP BY column_name    

function可以选择COUNT,SUM,AVG等函数    

### DISTINCT
SELECT DISTINCT语句用于返回唯一不同的值，类似返回字段的set集合          
SELECT DISTINCT column1,column2 FROM table_name     


### JOIN 多表查询
1. INNER JOIN(内连接，或等值连接)(可省略INNER使用JOIN):获取两个表中字段匹配关系的记录    
2. LEFT JOIN(左连接):获取左表所有记录，即右表没有对应匹配的记录
3. RIGHT JOIN(右连接):与LEFT JOIN相反

当RIGHT JOIN对比的2个表行数不相等时，对比行数以左表结构来还是以右表结构来？
经过测试，显示结构会以长的表来，不会以左右来，左右只表示数据是否显示？是否有问题？ 

一般默认小库撞大库，即小库是a,大库是b，用LEFT JOIN

### 查询优化
EXPLAIN 语句可查询sql执行路径，从而优化查询      
直接在sql语句前加入EXPLAIN即可，例如： EXPLAIN SELECT * FROM users WHERE age > 30;       

查询优化方向：   
1. 优化SQL语句，比如选择适当索引，避免SELECT *,优化WHERE    
2. 索引优化   
3. 适当使用查询缓存   
4. 优化数据表结构，比如规划化与反规范化，分库分表    
5. 监控与分析慢查询     


### 事务
成批执行SQL语句    

1. 只有Innodb数据库引擎的数据库才支持事务
2. 事务处理可以用来维护数据库的完整性，保证成批的SQL语句要么全部执行，要么全部不执行
3. 事务用来管理INSERT,UPDATE,DELETE语句

事务必须满足4个条件(ACID属性)
1. 原子性
2. 一致性
3. 隔离性
4. 持久性
   
使用方法：
BEGIN;显示开启一个事务
COMMIT;提交事务
ROLLBACK;回滚并结束事务


### ALTER
ALTER用于修改数据库，表和索引等对象的结构    

### 索引
索引被用来快速找出在一个列上用一特定值的行。如果没有索引，MySQL必须从第一条记录开始一直读到相关行       

常见索引类型：
1. PRIMARY KEY:主键索引  
2. UNIQUE:唯一索引
3. INDEX:普通索引
4. FULLTEXT:用于搜索文本中关键字 

创建普通索引：CREATE INDEX index_name ON table_name (column_name);      
创建唯一索引：CREATE UNIQUE INDEX index_name ON table_name (column_name);     

INDEX和KEY都可以代指索引，但是语法不相同       


KEY类型：
1. PRIMARY KEY:主键索引,主键且唯一
2. UNIQUE KEY:唯一索引
3. FOREIGN KEY

PRIMARY KEY必须为NOT NULL    
一个表只能有一个PRIMARY KEY,但可以有多个UNIQUE KEY      



### utf8 utf8mb4
正常情况下数据库编码集用utf8mb4    
utf8缺少部分字符集，比如Emoji表情，很多不常用的汉字，以及任何新增的Unicode字符等     
utf8可以节省空间    


### DML,DDL,DCL
DML:数据库操作语言，包括INSERT,DELETE,UPDATE,SELECT    
DDL:用来定义表或者更改表结构，数据类型，表之间的链接和约束等初始化工作，包括CREATE,ALTER,DROP    
DCL:数据控制语言，用来控制数据库用户和角色的权限，包括GRANT,REVOKE   


### JOIN UNION
JOIN用于将多个表中的数据根据一定关系进行组合      
UNION用于将多个SELECT语句的结果合并成为一个结果集,UNION要求SELECT语句中的列名，数据类型和顺序必须相同       

日常使用JOIN情况较多         


### 安全
1. 用户权限控制
2. 数据加密及签名
3. 日志记录及审计
4. 服务器及网络安全    
5. 定期更新及打补丁
6. 备份与恢复


### 备份与恢复

备份：
1. 使用mysqldump命令行进行热备份操作，将数据导出至SQL类型文件
2. 停机物理备份

恢复：
1. 如果是SQL类型文件可将备份文件直接导入mysql
2. 如果备份文件是CSV则使用mysqlimport工具进行导入
3. 物理备份则直接复制进文件夹

开发bash脚本实现定期自动备份数据库    
为了最小化备份对系统性能造成影响，可采取以下策略：   
1. 在业务低峰进行备份
2. 将备份任务分散到一周内不同的时间点，以避免集中负载    
