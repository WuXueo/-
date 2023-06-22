## 三、基本的Select语句

###  1. SQL概述

SQL是使用关系模型的数据库应用语言

#### 1.1 sql分类

DDL（数据定义语言）create 、alter、drop、rename、truncate

DML（数据操作语言）insert、delete、update、select

DCL（数据控制语言）commit、rollback、savepoin、grant、revoke

学习技巧：大处着眼，小处着手 

### 2. SQL的语言规范

sql是用于访问和处理数据库的标准的计算机语言

#### 2.1 基本规则（必须遵守）

- sql可以卸载一行或者多行，各子句分行写，必要时使用缩进

- 每套及命令以；或\g或\G结束
- 关键字不能被缩写也不能分行
- 字符串、日期的数据使用''表示
- 列的别名尽量使用双引号“”

#### 2.2 sql大小写规范（建议遵守）

MySQL在Windows环境下是大小写不敏感

MySQL在Linux环境下是大小写敏感（数据库名、表名、表的别名严格区分大小写，关键字不敏感）

**统一规范：**数据库名、表名、表别名、字段名、字段别名等都小写

​					sql关键字、函数名、绑定变量等都大写

#### 2.3 注释

```
# 代表单行注释  

/*  */ 代表多行注释

-- 注释文字（-- 后面必须要有空格）
```

#### 2.4 命名规则

详情见十

#### 2.5 导入现有的数据、表的数据

- 方式一：source 文件的全路径名
- 方式二：基于具体的图形化界面的工具可以导入数据

```
source d:\mysqldb.sql			在命令行客户端登录MySQL 使用source指令导入
```

### 3. 基本的select语句

```
select 1;		没有任何子句
select 9/2;		没有任何子句
```

#### 3.1 select基本语句

```
select 字段1，字段2,...	from  表名
```

*代表表中的所有的字段（或列）

#### 3.2 列的别名

as全称可省略	列的别名可以使用一对“”引起来，不要使用''

#### 3.3 去除重复行(distinct)

默认情况下，查询会返回全部行，包括重复行

```
-- 去重
SELECT DISTINCT department_id FROM employees;
```

#### 3.4 空值参与运算

1. 空值：null

2. 空值不等同于0，‘ ’，‘null’ 

3. 空值参与运算: 结果一定也为空。实际问题的解决方案：引入ifnull

```
// 空值用0来替换
SELECT employee_id,salary "月工资",
salary *(1 + IFNULL (commission_pct,0)) *12 "年工资",commission_pct
FROM employees;						
```

#### 3.5 着重号 ``

字段名和关键字冲突要加着重号

#### 3.6 查询常数

只是展示hahha,123

```
SELECT '哈哈哈哈',123,employee_id,last_name FROM employees;
```

### 4. 显示表结构

describe或desc命令

```
describe employees;		显示表中字段的详细信息
```

### 5. 过滤数据

where 过滤条件，声明在from结构后面

```
-- 查询90号部门的员工信息
SELECT * FROM employees WHERE department_id = 90;
```

```
-- 查询last_name 为'king'的员工信息
select * from employees where last_name = 'king';
```
