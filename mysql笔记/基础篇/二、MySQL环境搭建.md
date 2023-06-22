## 二、MySQL环境搭建

### 1. MySQL的卸载

软件本身、数据存放、服务中sql启动、环境变量

#### 步骤1 停止MySQL服务

服务中mysql80停止服务

#### 步骤2  软件的卸载 

控制面板、第三方软件、软件本身卸载功

### 2. MySQL的下载、安装、配置

#### 2.1 MySQL的四大版本

MySQL社区版 MySQL企业版 MySQL集群版（可将几个MySQL server封装成一个server） MySQL cluster CGE高级集群版

#### 2.2 配置环境变量

在不同目录下，仍然可以运行

### 3. MySQL登录

#### 3.1 服务的启动与停止

需要启动服务器进程

#### 3.2 使用命令行工具

```
net start MYSQL服务名
net stop MYSQL服务名
```

#### 3.3 登录

客户端和服务器在同一台机器上，所以输入localhost或127.0.0.1

```
mysql -uroot -p
```

```
mysql -h localhost -P 3306 -u root -p
```

### 4. mysql演示使用

#### 4.1 MySQL的使用演示

##### 1.查看所有的数据库

```
show databeses;
```

#### 4.2 mysql的编码设置

##### MySQL5.7中

问题：命令行操作sql乱码问题

问题解决：

步骤1

```
show variables like 'character_%';
show variables like 'collection_%';			查看编码命令
```

步骤2

```
[mysql]							修改mysql的数据目录下的my.ini配置文件
....				
default-character-set=utf8			默认字符集

[mysqld]						
...
character-set-server=utf8
collation-server=utf8_general_ci
```

### 5. MySQL图形化管理工具

MySQL work beach、phpMyAdmin、Navicat等

#### 1. MySQL work beach

mysql官方提供的图形化管理工具，可视化

### 6. 常见问题的解决

##### 修改数据库和表的字符编码

修改编码：

（1）停止服务		（2）修改my.ini文件		（3）重新启动服务