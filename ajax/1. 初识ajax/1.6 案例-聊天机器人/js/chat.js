$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();

//   给发送按钮绑定事件
$("#btnSend").on('click',function(){
    // 获取文本框的值 trim()为了去除两边空格
    var text = $('#ipt').val().trim();
    // 判断文本框内容是否为空 如果为空 就要将聊天框内容清除
    if(text.length <= 0){
        return $('#ipt').val('');
    }
    // 如果文本框内容不为空 则就要将用户输入内容追加到聊天框
    $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /><span>'+text+'</span></li>');
    // 追加完内容 自动清空聊天框内容
    $('#ipt').val("");
    // 自动调整滚动条的位置
    resetui();
    // 获取信息
    getMsg(text);
})

// 获取聊天机器人发送消息
function getMsg(text){
    $.ajax({
        method:'GET',
        url:' http://www.liulongbin.top:3006/api/robot',
        data:{
            spoken:text
        },
        success:function(res){
            console.log(res);
            if(res.message === 'success'){
                // 接受聊天消息
           var msg = res.data.info.text;
           $('#talk_list').append(' <li class="left_word"><img src="img/person01.png" /><span>'+msg+'</span></li>');
        //    重置滚动条
        resetui();
        getVioce(msg);
        }
        }
    })
}

// 将聊天机器人播放语音
function getVioce(text){
    $.ajax({
        method:'GET',
        url:'http://www.liulongbin.top:3006/api/synthesize',
        data:{
            text:text
        },
        success:function(res){
            console.log(res);
// 如果成功获取 那么就播放语音
            if(res.status === 200){
            // 播放语音
            $("#voice").attr('src',res.voiceUrl);
            }
        }
    })
}  

    // 为文本框绑定keyup事件
    // 获取当前按键keycode
    $('#ipt').on('keyup',function(e){
        // console.log(e.keyCode);
        // 如果用户点击了回车键 就会代替点击按扭键进行发送
        if(e.keyCode == 13){
            $('#btnSend').click();
        }
    })
})

