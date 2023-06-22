window.addEventListener('load',function(){
    // 获取前后按钮元素 以及大盒子元素（轮播图位置）
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    let box = document.querySelector('.wrapper');
    // 鼠标经过 前后按钮显示
    box.addEventListener('mouseenter',function(){
        prev.style.display = 'block';
        next.style.display = 'block';
        // 鼠标经过 清除定时器
        clearInterval(timer);
        // 变量进行释放
        timer = null;
    })
    // 鼠标离开 前后按钮不显示 
    box.addEventListener('mouseleave',function(){
        prev.style.display = 'none';
        next.style.display = 'none';
        // 鼠标离开 重新开启定时器 不需要再次声明 因为已经声明过了
        timer = setInterval(function(){
            next.click();
        },2000)
    })

    // 动态生成小圆圈
    // 获取图片数量
    var ul = document.querySelector('.pic');
    var ol = document.querySelector('.circle');
    // 图片宽度
    var box_width = box.offsetWidth;
    // // 遍历ul的数量
    // console.log(ul.children.length);
    for(var i =0; i < ul.children.length;i++){
        // 创建元素li
        var li = document.createElement('li');
        // 给每个小li绑定索引
        li.setAttribute('index',i);
        // 在ol之后依次追加li
        ol.appendChild(li);
     
        // 运用排他思想 直接在小圆圈上绑定事件
    // 干掉所有人
    li.addEventListener('click',function(){
        for(var i = 0; i < ol.children.length; i ++){
            ol.children[i].className = '';
        }
    //留下我自己
        this.className = 'current';
    
    // 点击小圆圈移动图片 移动的是ul
    // ul的移动距离是 小圆圈的索引号 * 图片长度 注意是负值
    // 当我们点击了某个小li 就拿到了当前的索引号
    var index = this.getAttribute('index');
    // 当我们点击小li是要将li的索引号给num和circle
    num = circle = index;
    animate(ul,- index * box_width);
    })

     
}
    // 将ol第一个孩子变颜色
    ol.children[0].className = 'current';

    // 克隆ul第一张照片
    var first = ul.children[0].cloneNode(true);
    // 将第一张照片追加到最后的ul中
    // 克隆第一个li cloneNode()加true是深克隆 false 是浅克隆
    ul.appendChild(first);

    // 当点击右侧按钮时 开始进行下一张播放
    var num = 0;
    // 全局变量circle 来控制下方小圆圈与图片
    var circle = 0;

    // 无缝滚动
    next.addEventListener('click',function(){
        // 节流阀
        if (flag){
            // 关闭节流阀
            flag = false;
             // 声明变量 变量*图片宽度就使移动距离 注意是负值
        // 如果num 等于ul的最后一张图 那就得重新开始滚动
        // 将ul的样式重新设置 num 同时要赋值为0 
        if(num == ul.children.length - 1){
            ul.style.left = 0;
            num = 0;
        }
        num++;
        // 设置节流阀
        animate(ul,- box_width * num,function(){
            flag = true;
        });
    
        circle++;
        // 如果circle ==克隆的图片 圆圈就得重新赋值为0
        if(circle == ol.children.length){
            circle = 0;
        }
       circleChange();
        }
       
    })

    //  节流阀 
    var flag = true;
     // 左侧按钮
    // 无缝滚动
    prev.addEventListener('click',function(){
        if(flag){
            flag = false;
            // 声明变量 变量*图片宽度就使移动距离 注意是负值
        // 如果num 等于ul的第一张图 那就得重新开始滚动
        // 将ul的样式重新设置 num 同时要赋值为0 
        if(num == 0){
            num = ul.children.length - 1;
            ul.style.left = - num* box_width + 'px';
        }
        num--;
        animate(ul,- box_width * num,function(){
            flag = true;
        });
    
        circle--;
        // 如果circle ==克隆的图片 圆圈就得重新赋值为0
        if(circle < 0 ){
            circle = ol.children.length-1;
        }
        circleChange();
        }
    })
 
   function circleChange(){
    // 运用排他思想 将小圆圈当前色赋予给点击的圆圈
        // 干掉所有人
        // 留下自己
        for(var i = 0; i < ol.children.length;i++){
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
   }

    //    自动播放
    var timer = setInterval(function(){
        // 定时器轮播 相当于是手动点击右侧按钮
        next.click();
    },2000)
})