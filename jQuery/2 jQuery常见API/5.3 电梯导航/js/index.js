$(function(){
    // 当我们点击li的时候 我们不需要将li添加类
    flag = false;
    // 当页面滚动到今日推荐部分 左侧电梯模块开始显示
    // 将今日推荐顶部定义
    let recommend = $('.recommend').offset().top;
    // 一开始就进行调用
    toggle();
    // 封装函数
    function toggle(){
          // 如果页面卷动的头部大于等于今日推荐的部分 左侧电梯显示出来
          if( $(document).scrollTop() >= recommend){
            $('.fixedtool').fadeIn();
        }
        else{
            $('.fixedtool').fadeOut();
        }
    }
    // 页面滚动事件 滚动事件也开始调用
    $(window).scroll(function(){ 
        toggle();
        // 如果flag是true 就会执行
       if(flag){
         // 用each来遍历每一个模块 就会获得索引和元素
         $('.floor .w').each(function(i,ele){
            // 如果文档卷入的头部大于等于元素的头部 那么就给相应左侧的li添加类
            if( $(document).scrollTop() >= $(ele).offset().top){
                $('.fixedtool li').eq(i).addClass('current').siblings().removeClass();
            }
        })
       }
    })
    // 点击左侧电梯 出现对应模块
    $('.fixedtool li').click(function(){
        flag = false;
        // 点击左侧小li 将对应索引记起来 这是滚动到的位置
        let current = $('.floor .w').eq($(this).index()).offset().top;
        // 点击时 页面进行动画滚动到当前位置
        $('html,body').stop().animate({
            scrollTop:current
        },function(){
            flag = true;
        })
        // 将所点击的小li添加类 点击小li的其他兄弟姐妹去除类
        $(this).addClass('current').siblings().removeClass();
    })
})