$(function(){
    // 全选 全不选模块
    $('.checkall').change(function(){
        // 要将获取全选按钮状态 将其状态赋值给三个复选框
        $('.j_check,.checkall').prop('checked',$(this).prop('checked'));
        // 全选时 给每个盒子添加背景颜色 添加类
        // 如果全选按钮时选着的 那么每个盒子添加背景颜色
        if($(this). prop('checked')){
            $('.box').addClass('cart_background');
        }
        else{
            $('.box').removeClass('cart_background');
        }
    })
    // 复选框导致全选框变化
    $('.j_check').change(function(){
        // 如果复选框被选中的长度 等于 所有复选框自身长度（隐式迭代） 全选为true
        if($('.j_check:checked').length === $('.j_check').length){
            $('.checkall').prop('checked',true);
        }
        // 否则 全选不选
        else{
            $('.checkall').prop('checked',false);
        }
        // 如果复选框是选中的 对当前的商品进行添加类
        if($(this).prop('checked')){
            $(this).parent('.box').addClass('cart_background');
        }
        // 否则移除类
        else{
            $(this).parent('.box').removeClass('cart_background');
        }
    })

    // 加减框
    // 加
    $('.jia').click(function(){
        // 当点击加号时 里面文本框的值也在自增
        // 将文本框本来的值存储起来
       let n = $(this).siblings('.itxt').val();
       n++;
        // 进行修改值 必须写是加框的兄弟的值进行修改     
       $(this).siblings('.itxt').val(n);

        // 小计
        // 点击加号 获取小计 再将小计进行赋值
        let p = $(this).parent().siblings('.prices').html();
        // 去掉￥ 从第一个位置开始取 元素.substr()
        p = p.substr(1);
        // 再将小计重新赋值 小计 =  价格* 数量(保留两位小数)
        $(this).parent('.counts').siblings('.subs').html("￥" +( n*p).toFixed(2));
        getSum()
    })
    // 减
    $('.jian').click(function(){
        // 当点击减时 表单值会自减 当为0时 终止
        // n为数量
        let n = $(this).siblings('.itxt').val();
        if(n == 0){
            return false;
        }
        n--;
        $(this).siblings('.itxt').val(n);
        // 小计  点击减号获取小计
        // p是价格
        let p = $(this).parent('.counts').siblings('.prices').html();
        p = p.substr(1);
        // 小计 = 价格* 数量
        $(this).parent('.counts').siblings('.subs').html("￥"+ (p*n).toFixed(2));
        getSum()
    })

    // 修改文本框 小计变化
    $('.itxt').change(function(){
        // 获取文本框的值
        let n = $(this).val();
        // 小计 = 文本框的值 * 单价
        let p = $(this).parent().siblings('.prices').html();
        // 将价格取两位小数  去除单位
        p = p.substr(1);
        $(this).parent().siblings('.subs').html("￥"+ (p * n).toFixed(2));
        getSum()
    })
    // 外面先运行一遍 初始页面要显示
    getSum();
    // 修改结算的件数
    // 封装一个函数
    function getSum(){
        // 计算总件数
        let count = 0; 
        //  计算总价钱
        let money = 0;
        // 遍历每一个数量
        $('.itxt').each(function(i,ele){
            count += parseInt($(ele).val());
        })
        // 再将遍历完的数量赋值给结算框中的商品数
        // 由于拿过来是字符型 得转换为数字型
        $('.remove b').text(count);

         // 结算总价
    // 遍历每一个小计
    $('.subs').each(function(i,ele){
        // 获取每个元素的小计 注意小数点和符号￥
        money += parseFloat($(ele).text().substr(1));
    })
    // 最后将算好的price修改到结算框中的总价
    // 要进行小数点处理
    $('.red').text("￥" + money.toFixed(2));
    }
   
    // 删除模块
    // 点击删除 删除图书
    $('.opers').click(function(){
        $(this).parent('.box').remove();
        getSum();
    })
    // 选中的复选框 点击删除选中的商品进行删除
    $('.remove').click(function(){
        $('.j_check:checked').parent('.box').remove();
        getSum();
    })
    // 清空购物车
    $('.remove em').click(function(){
        $('.box').remove();
        getSum();
    })
})