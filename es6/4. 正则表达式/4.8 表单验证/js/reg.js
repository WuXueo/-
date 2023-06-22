// var reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
window.onload = function(){
    var regtel = /^1[3 | 4 | 5 | 7 | 8 ]\d{9}$/;
    var regqq = /^[1-9]\d{4,}$/;
    var regnc = /^[\u4e00-\u9fa5]{2,8}$/;
    var regmsg = /^\d{6}$/;
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;
    // 获取元素
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var nc = document.querySelector('#nc');
    var msg = document.querySelector('#msg');
    var pwd = document.querySelector('#pwd');
    var surepwd = document.querySelector('#surepwd');
    // 调用函数
    regxp(tel,regtel);      // 手机号码
    regxp(qq,regqq);        // qq号码
    regxp(nc,regnc);        // 昵称
    regxp(msg,regmsg);      // 短信
    regxp(pwd,regpwd);      // 密码
    // 封装函数
    function regxp(ele,reg){
        ele.onblur = function(){
            if( reg.test(this.value)){
                // console.log('true');
                // 要将tel下一个兄弟添加类名
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您输入正确';
            }
            else{
                // console.log('wrong');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式输入不正确';
            }
        }
    }

    // 确认密码
    surepwd.onblur = function(){
        // 如果确认密码框与密码框值一致 则输入正确
        if(pwd.value == this.value){
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您输入正确';
        }
        else{
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>两次密码输入不一致';
        }
    }


}
   