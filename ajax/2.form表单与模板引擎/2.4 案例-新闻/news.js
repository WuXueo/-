$(function(){

    // 定义一个补零的函数
    function padZero(n){
        if(n <10){
            return '0' +n;
        }
        else{
            return n;
        }
    }

    // 定义格式化时间过滤器
    template.defaults.imports.dateFormat = function(dtStr){
        // 获取传送过来的时间
        var dt = new Date(dtStr);

        // 重新获取年月日 及时间
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() +1);
        var d = padZero(dt.getDate());

        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());

        return y +'-'+ m +'-'+ d +' '+ hh +':'+ mm +':'+ss;
    }




    // 获取新闻列表的函数
    function getNewList(){
        $.get(('http://www.liulongbin.top:3006/api/news'),function(res){
            // 如果状态不等于200 则代表获取数据失败
            if(res.status !== 200)
            return alert('获取新闻列表失败');
            // // 否则打印一下数据
            // console.log(res.data);
        // 把每一项的tags属性，从字符串改造成字符串数组 
        for(let i = 0;i <res.data.length;i++){
            res.data[i].tags = res.data[i].tags.split(',');
        }
        console.log(res);
    // 调用template 函数
    let htmlStr = template('tpl-news',res);
    $('#news-list').html(htmlStr);
        })
    }
    // 调用函数
    getNewList();
    
})