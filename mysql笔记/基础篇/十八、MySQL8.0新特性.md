## 十八、 MySQL8.0新特性

### 1. MySQL8.0新特性概述

#### 1.1 MySQL8.0新增特性

1.简便的nosql支持

2.更好的索引

3.更完善的json支持

4.安全和账户管理

5.InnoDB的变化	默认存储引擎

6.数据字典

7.原子数据定义语句 原子DDL

8.资源管理

9.字符集支持 更改为utf8mb4

10.优化器增强

11.公用表表达式	使用with语句对临时结果集进行命名

12.窗口函数

13.正则表达式支持

14.内部临时表 temptable存储引擎取代memory存储引擎成为内部临时表的默认存储引擎

15.日志记录

16.备份锁

17.增强的MySQL复制 支持对json文档进行部分更新的二进制日志记录，该记录使用紧凑的二进制格式

#### 1.2 MySQL8.0移除的旧特性

1.查询缓存

2.加密相关

3.空间函数相关

4.\N和Null

5.mysql_install_db

6.通用分区处理函数等

### 2.新特性 窗口函数

#### 2.1 使用窗口函数前后对比

需要分组统计的结果对每一条记录进行计算的场景下，使用窗口函数更好

#### 2.2 窗口函数分类

静态窗口函数、动态窗口函数

- 静态窗口函数的窗口大小是固定的，不会因为记录的不同而不同
- 动态窗口函数的窗口大小会随着记录的不同而变化

![image-20230611141200689](D:\typora\mysql笔记\img\窗口函数.png)

#### 2.3 语法结构

窗口函数的语法结构：

```
函数 over([partition by 字段名 order by 字段名 ASC|DESC])
```

##### 1. 序号函数

###### row_number()

顺序排序

```
-- 查询goods数据表中每个商品分类下价格降序排列的各个商品信息
select row_number() over(partition by category_id order by price desc)
as row_num,id,category_id,categlory,name,price,stock
from goods;
```

###### rank()

并列排序，会跳过重复的序号

```
-- 使用rank（）函数获取goods数据表中各类别的价格从高到低排序的各商品信息
select rank() over (partition by category_id order by price DESC)
as row_num ,id,category_id,category,name,price,stock
from goods;
```

###### dense_rank()

并列排序，不会跳过重复的序号

```
select dense_rank() over (partition by category_id order by price DESC)
as row_num ,id,category_id,category,name,price,stock
from goods;
```

##### 2. 分布函数

###### percent_rank()

等级值百分比

```
(rank -1) / (rows -1 )
```

```
select rank() over (partition by by category_id order by price DESC)as r,
percent_rank() over (partition by by category_id order by price DESC)as pr,
id,category_id,category,name,price,stock
from goods
where category_id = 1;
```

######  cume_dist()

主要用于查询小于或等于某个值的比例

```
select cume_dist() over(partition by category_id order by price DESC)as cd,
id,category_id,category,name,price,stock
from goods;
```

#### 3. 前后函数

###### lag(expr,n)函数

返回当前行的前n行的expr的值

```
select id ,category,name,price,pre_price,price - pre_price as diff_price
from (
	select id,category,name,price,lag(price,1) over w as pre_price
	from goods
	window w as (partiotion by category_id order by price )
) t;
```

###### lead(expr,n)

返回当前行的后n行的expr的值

```
select id ,category,name,price,pre_price,price - pre_price as diff_price
from (
	select id,category,name,price,lead(price,1) over w as behind_price
	from goods
	window w as (partiotion by category_id order by price )
) t;
```

#### 4. 首尾函数

###### first_value(expr)

返回第一个expr的值

```
select id，category,name,price,stock,first_value(price) over w as
first_price from goods window w as(partition by category_id order by price);
```

###### last_value(expr)

返回最后一个值

#### 5. 其他函数

###### nth_value(expr,n)

返回第n个expr的值

###### ntile(n)

将分区中的有序数据分为n个桶，记录桶编号

### 3. 新特性2：公用表表达式

普通公用表表达式和递归公用表表达式

#### 3.1 普通公用表表达式

```
with cte名称
as (子查询)
select | delete | update 语句;
```

普通公用表表达式类似于子查询，不过，跟子查询不同的是，它可以被多次引用，而且可以被其他的普通公用表表达式所引用

#### 3.2 递归公用表达式

递归公用表达式也是一种公用表表达式。不同的是 可以调用自己

```
with recursive
cte名称 as(子查询)
select | delete | update 子句
```

子查询，就是获得递归的初始值