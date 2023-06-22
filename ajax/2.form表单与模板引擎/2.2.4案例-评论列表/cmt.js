    function getCommentList(){
        // 获取评论列表
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3006/api/cmtlist',
            success:function(res){
                if(res.status !== 200){
                    return alert('获取评论列表失败！')};
                var rows = [];
                $.each(res.data,function(i,item){
                    var str = '<li class="list-group-item"><span class="badge" style="background-color: #f0AD4E">评论时间：'+item.time+'</span><span class="badge"style="background-color:#5BC0DE;">评论人：'+item.username+'</span>'+item.content+'</li>';
                    rows.push(str);
                })
                $('#cmt-list').empty().append(rows.join(''));
            }
        })
    }

    getCommentList();


    $(function(){
    // 发表评论
$('#formAddcmt').submit(function(e){
        // 阻止表单默认行为  一定要注意在文本框格式中要有name属性
        e.preventDefault();
        // 得到表单中所有数据
        var data = $(this).serialize();
        // 发送请求
        $.post('http://www.liulongbin.top:3006/api/addcmt',data,function(res){
            if(res.status !== 201)
            return alter('发表评论失败');
            getCommentList();
        // 清空所输入的内容
        $('#formAddcmt')[0].reset();
        })
})
})