## 五、 es6

### 5.1 es6简介

#### 5.1.1 什么是es6

是一项脚本语言的标准化规范

#### 5.1.2 为什么使用es6

变量提升特性增加了程序运行时的不可预测性

### 5.2 let

用于声明变量的关键字

#### 5.2.1 只在所处于的块级有效

```
if(true){
	let a = 10;
}
console.log(a);			// a没有定义
```

**注意：**

1. 使用let 关键字声明的变量才具有块级作用域，使用var声明的变量不具备块级作用域的特性

2. 防止循环变量变成全局变量

#### 5.2.2不存在变量提升

```
console.log(a);			// a 没有定义
let a = 20;
```

#### 5.2.3 暂时性死区

```
var tmp = 123;
if(true){
	tmp = 'abc';
	let tmp;
}						// 未定义 let应当先声明在定义
```

#### 5.2.4 不能重复声明

```
let a = 1;
let a = 2;
console.log(a);			// 未定义
```

### 5.3 const

作用：声明常量，常量就是值（内存地址）不能变化的量

##### 具有块级作用域

```
if(true){
	const a = 10;
}
console.log(a);			// a没有定义
```

##### 声明常量时必须赋值

```
const PI;			// 会报错
```

##### 常量赋值后，值不能修改，但可以修改对象内部属性

```
const PI = 3.14;
PI = 100;				// 报错
```

```
const person ={
	name:'吴雪'
};
person.naem = 'andy';		// 可以被修改
person = {
	age:20
}；							// 内存地址不能修改	
```

**作用：**

1. for循环是个经典例子
2. 不会污染全局变量
3. 建议在默认情况下使用const，而只有在你知道变量值需要被修改的情况使用let

### 5.4 let、const、var的区别

| var          | let            |     const      |
| ------------ | -------------- | :------------: |
| 函数级作用域 | 块级作用域     |   块级作用域   |
| 变量提升     | 不存在变量提升 | 不存在变量提升 |
| 值可更改     | 值可更改       |   值不可更改   |

### 5.5 解构赋值

ES6 允许从数组中提取值，按照对应位置，对变量赋值。对象也可以实现解构。

#### 5.5.1 数组解构

```
let [a,b,c] = [1,2,3]
console.log(a);
console.log(b);
console.log(c);
```

#### 5.5.2 对象解构

对象解构允许我们使用变量的名字匹配对象的属性 匹配成功将对象属性的值赋值给变量

```
let person = {name:'zhangsan',age:20,sex:"女"};
let { name ,age,sex} = person;
```

```
let {name : myName} = person;
```

### 5.6 箭头函数

新增定义函数的方式

返回对象需要加小括号

```
() => {};
const fn = () => {}; 
```

```
function fn(v){
return v;
};
const fn = v => v;
```

```
  function fn11(){
        console.log(this);
        return() => {
            console.log(this);
        }
    }
    const obj = {name: "zhangsan"};
    const resFN = fn11.call(obj);
    resFN();							// this指向都是obj
```

```
let getObj = id => ({
	id:id,
	name:'wuxue'
});
let obj = getObj();
console.log(obj);
```

**注意：**

1. 函数体中只有一句代码，且代码的执行结果就是返回值，可以省略大括号

2. 如果形参只有一个，可以省略小括号
3. 箭头函数不绑定this关键字，箭头函数中的this,指向的是函数定义位置的上下文this

4. 对象不能产生局部作用域 函数才可以 （对象内的this指的是window）

5. 一旦使用箭头函数，当前就不存在作用域

6. 使用箭头函数，函数内部没有arguments

7. 箭头函数不能使用new关键字来实例化对象

8. function函数也是一个对象，但是箭头函数不是一个对象，他其实就是一个语法糖

### 5.7 剩余参数

形式：由三个点...和一个紧跟着的具名参数指定 ...keys

剩余参数允许我们将一个不定数量的参数表示为一个数组

```
const sum(...args => {};);
```

###### 剩余参数和解构配合使用

```
let ary1 = ['张三','李四','王五'];
let [s1,...s2] = ary1;
console.log(s1);
console.log(s2);
```

### 5.8 Array的扩展方法

#### 5.8.1 扩展运算符

扩展运算符可以将数组或者对象转为用逗号分隔的参数序列,并将各个项作为分离的参数传给函数

```
let ary = [1,2,3];
console.log(..,ary);
```

#### 5.8.2 合并数组

```
// 方法1
let ary1 = [1,2,3];
let ary2 = [4,5,6];
let ary3 = [...ary1,...ary2];
console.log(ary3);
```

```
// 方法2
ary1.push(...ary2);		// 用push方法
```

#### 5.8.3 将伪数组转换为真正的数组

###### 扩展运算符

```
// 方法1：
var oDivs = document.getElementsByTagName('div');
console.log(oDivs);
var ary =  [...oDivs];
console.log(ary);
```

###### Array.from();

```
// 方法2：
let arrayLike = {
	'0','a',
	'1':'b',
	'2':'c',
	'length':2
};
let arr2 = Array.from(arraylike);
```

**from()方法还可以接受第二个参数，作用类似于数组的map方法**

```javascript
let arryLike = {
   '0':'1',
   '1':'2',
   '2':'3',
   'length':3
};
let newAry = Array.from(arryLike,item => item *2);
```

###### of()

将任意的数据类型，转换成数组

```javascript
console.log(Array.of(3,11,20,'30'));
```

###### copywithin()

数组内部将制定位置的元素复制到其他的位置，返回当前数组

```javascript
[1,2,3,8,9,10].copyWhithin(0,3);	//[8,9,10,8,9,10]
//从3位置往后的所有数值替换从0位置往后的三个数值
```

#### 5.8.4 find()

用于找出**第一个符合条件**的数组成员，如果没有找到返回Undefined

```javascript
let ary = [{
	id:1,
	name:'张三'
},{
	id:2,
	name:'李四'
}];
let  target = ary.find(item => item.id == 2);
```

#### 5.8.5 findIndex()

用于找出第一个符合条件的数组成员的位置，如果没有找到返回-1

```javascript
let ary = [1,5,10,15];
let index = ary.findIndex((value,index) => value > 8);	
```

#### 5.8.6 includes()

表示某个数组是否包含给定的值，返回布尔值 解决了indexOf问题（值为-1不包含 反之）

```javascript
[1,2,3] includes(2);		// true
```

#### 5.8.7 entries()、keys()、values()

返回一个遍历器 可以使用for...of...循环进行遍历

```javascript
['a','b'].keys();
for(let index of ['a','b'].keys()){		// 取键
    console.log(index);
};
for(let ele of ['a','b'].values()){	// 取值
    console.log(ele);
};
```

```javascript
for(let [index,ele] of ['a','b'].entries()){
	console.log(index,ele);
}
```

**注意：**

1. keys()对键名遍历
2. values()对值遍历
3. entries()对键值对遍历

### 5.9 String 的扩展方法

#### 5.9.1 模板字符串

ES6新增的创建字符串的方法，使用反引号定义,插入变量值使用${变量值}

```
let name = `zhangsan`;
let sayHello = `hello,my name is ${name}`;
```

```
let res = {
	name:"zhangsan",
	age:20
};
let html = `
	<div>
		<span>${result.name}</span>
		<span>${result.age}</span>
    </div>`;
```

```
const fn = ()=> {
	return '我是fn函数' 
};
let html = `我是模板字符串 ${fn()}`;
console.log(html);
```

**注意：**

1. 模板字符串中可以解析变量

2. 模板字符串中可以换行

3. 模板字符串可以调用函数

#### 5.9.2 startWith()和endWith()

startWith()：表示参数字符串是否在原字符串的头部，返回布尔值

endWith()：表示参数字符串是否在原字符串的尾部，返回布尔值

```
let str = 'Hello World !';
str.startWith('Hello');
str..endWith('!')；
```

#### 5.9.3 repeat()

repeat()方法表示将原字符串重复n次，返回一个新字符串

```javascript
'x'.repeat(3);
'hello'.repeat(5);
```

### 5.10 扩展的对象功能

#### 5.10.1 对象的方法

is()    ===  比较两个值是否严格相等

```javascript
console.log(Object.is(NaN,NaN));		// true
```

assign()    浅拷贝 对象的合并

```javascript
Object.assign(target,obj1,obj2....);	
```

### 5.11 set数据结构

#### 5.11.1 Set数据结构

表示五重复值的有序列表

```javascript
let set = new Set();
console.log(set);
```

类似于数组，但是成员的值都是唯一的，没有重复的值。

Set本身是一个构造函数，用来生成Set数据结构

```
const s = new Set();
```

Set函数可以接受一个数组作为参数，用来初始化

```javascript
const set = new Set([1,2,3,4,5]);
```

#### 5.11.2 利用set数据结构做数组去重

```javascript
const s3 = new Set(['a','a','b']);
// 将s3变成了一个以逗号分隔的数组
let arr = [...s3];
console.log(arr);
```

**实例方法**

add(value):添加某个值，返回Set结构本身

delete(value):删除某个值，返回一个布尔值，表示删除是否成功

has(value):返回一个布尔值，表示该值是否为Set的成员

clear()：清除所有成员，没有返回值

size():大小

```javascript
const ss= new Set();
ss.add(1).add(2).add(3);
ss.delete(3);
ss.has(1);
ss.clear();
```

#### 5.11.3 遍历

Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值

```javascript
s.forEach(value => console.log(value));
```

**注意：**

1.  set中对象的引用无法被释放，所以出现了WeakSet

2.  WeakSet不能传入非对象类型的参数

3.  不可迭代
4.  没有forEach()
5.  没有size属性

### 5.12 Map()

Map()类型是键值对的有序列表，健和值是任意类型

```javascript
let map = new Map();
map.set('name','张三');
console.log(map);
```

### 5.13 Symbol

原始数据类型Symbol，表示是独一无二的值

```javascript
const name = Symbol('name');
const name2 = Symbol('name');
console.log(name === name2);			// false 
```

**注意：**最大的用途用来定义对象的私有变量

### 5.14 迭代器

Iterator 是一种新的遍历机制

```javascript
const items = ['one','two','three'];
const ite = items[Symbol.iterator]();		// 调用遍历器的方法
console.log(ite.next());			// {value:'one',done:false} done如果为false表示还可以继续遍历 如果为true 表示不能继续遍历
console.log(ite.next());
console.log(ite.next());
console.log(ite.next());
```

**注意：**

1. 迭代器是一个接口，能快捷的访问数据，通过Symbol.iterator来创建迭代器，通过迭代器的next方法来获取迭代结果
2. 迭代器是用于遍历数据解构的指针（数据库的游标）done:true 表示遍历结束

## 5.15 解决异步编程三种方法

1. 生成器
2. promise
3. async,await

**作用：** 

1. 解决回调地狱
2. 使得异步操作显得更加方便

### 5.15 生成器

###### generator()函数 可以通过yield关键字，将函数挂起，为了改变执行流提供可能性，同时为了异步编程提供了方案

```javascript
function* func(){
	yield 2;			// 返回一个遍历器对象 可以调用next()
}					
let o = func();
```

**与普通函数的区别：**

1. function后面函数名之前有个*
2.  只能在函数内部使用yield表达式，让函数挂起

**总结：**

generator函数是分段执行的，yield语句是暂停执行，而next()恢复执行

使用场景：为不具备Interator接口的对象提供了遍历操作

generator 部署Ajax操作 让异步代码同步化

### 5.16 promise

相当于一个容器，保存着未来还会结束的事件（异步操作）的一个结果

各种异步操作都可以用同样的方法进行处理 axios

**特点：**

1. 对象的状态不受外界影响 处理异步操作 三个状态 Pending(进行) Resolved(成功) Rejected(失败)

2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果

**then()方法**

第一个参数是resolve 回调函数,第二个参数是可选的  是rejected状态回调的函数

then()返回一个新的promise实例，可以采用链式编程

then(null,err => {})相当于catch(err => {});

**resolve()方法**

能将现有的任何对象转换成promise对象

**all()方法**

异步并行

应用：一些游戏类的素材比较多，等待图片、flash、静态资源文件都加载完成才进行页面初始化

**race()方法**

某个异步请求设置超时时间，并且在超时后执行相应的操作

请求图片资源

### 5.17 async的用法

**作用：**使得异步操作更加方便

基本操作 asunc他会返回一个Promise对象 then catch

**注意：**

1. async是Generator的一个语法糖

2. await 命令一定是在async中

3. 如果async函数中有多个await 那么then函数会等待所有的await指令运行完的结果 才去执行

### 5.18 class类的用法

#### 5.18.1 类的创建

```javascript
// 构造类 再通过new来创建对象
class 类名{

}
let p = new 类名();
```

通过Object.assign()方法一次性向类中添加多个方法

#### 5.18.2 类的继承

使用关键字extends

 super要写 继承父类的属性和方法

在子类中也可以进行重写父类方法

### 5.19 module模块的使用

es6模块功能主要有两个命令构成：export 、import

export 用于规定模块的对外接口

import 用于输入其他模块提供的接口

一个模块就是独立的文件
