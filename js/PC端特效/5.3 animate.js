// 封装一个动画函数
function animate(obj,target,callback){
    // 先进行清除定时器 以免重复有很多定时器开启
   clearInterval(obj.timer);
   // 运用对象属性 以免浪费存储空间
   obj.timer = setInterval(function(){
       // 由于到达的像素有小数 不是很准确 所以要将步长进行取整（向上取整 Math.ceil  向下取整 Math.floor）
       // let step = Math.ceil((target - obj.offsetLeft ) /10);
       let step = (target - obj.offsetLeft ) /10;
       // 正数就往大了取 负数就往小了取 这样才没有误差
       step = step > 0 ? Math.ceil(step) : Math.floor(step);
       // 当对象运动到达目的地 停止运动 进行清除定时器
       if( obj.offsetLeft == target){
           clearInterval(obj.timer);
        // 结束定时器之后 立即执行回调函数 回调函数写在定时器结束里面
        //    if(callback){
        //        callback();
        //    }
        callback && callback();
       }
           obj.style.left = obj.offsetLeft + step + 'px';
   },30)
}
