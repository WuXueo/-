export const name = '吴雪';
export const age = 20;
export function sayName(){
    return 'my name';
}
// 定义对象
const obj = {
    foo:'foo'
}
// // 抛出对象
// export default obj;


// 声明对象或类 必须要进行抛出 default只能用一次
class Person{
    constructor(){
    
    }
    sayAge(){
        console.log('21');
    }
}

export default Person;