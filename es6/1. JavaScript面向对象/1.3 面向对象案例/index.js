var that;
class Tab{
    constructor(id){
        // 获取元素
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        // 获取列表中的父元素ul
        this.ul =   this.main.querySelector('.firstnav ul:first-child');
        // 获取tab的父元素
        this.fsection = this.main.querySelector('.tabscon');
        
        // 调用init方法
        this.init();
    }
    // init 初始化操作让相关元素绑定事件
    
    init(){
        this.updateNode();
        // 添加函数
        this.add.onclick = this.addTab;
        // 必须要进行循环的切换函数
        for(var i =0 ;i <this.lis.length;i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            // 把每一个span都绑定一个事件
            this.spans[i].ondblclick = this.editTab;
            // 把每一个section都绑定一个事件
            this.sections[i].ondblclick = this.editTab;
            }
        }
    // 获取所有的小li 和所有的section
    updateNode(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        // 获取X号
        // 因为动态添加 需要重新获取对应的元素
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.firstnav span:first-child')
    }
    // 1.切换功能
    toggleTab(){
        //清除其他li的样式
        that.clearClass();
        // 给当前点击的li添加样式
        this.className = "liactive";
        // 让下面的tab内容添加样式
        that.sections[this.index].className = "conactive";
    }

    clearClass(){
        for(var i = 0; i < this.lis.length;i++){
            this.lis[i].className ="";
            this.sections[i].className = '';
        }
    }

    // 2.添加功能
    addTab(){
        // 先清除所有人 再留下我自己
        that.clearClass();
        // 随机生成一个随机数
        var random = Math.random();
    //（1）创建li元素和section元素
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section =   ' <section class="conactive">测试 '+ random +'</section>';
    // （2）把这两个元素追加到对应的父元素里面
        // 将新增小Li添加到ul最后一个子节点后面
        that.ul.insertAdjacentHTML('beforeend',li);
        // 继续将要添加的section追加到tab父级元素中 也就是fsection
        that.fsection.insertAdjacentHTML('beforeend',section);
        that.init();
    }   
    // 3.删除功能
    removeTab(e){
        // 阻止冒泡 防止切换li的切换
        e.stopPropagation();
        // 通过用父元素索引来进行删除
        var index = this.parentNode.index;
    // 根据索引号删除对应的li 和section remove()方法可以直接删除指定元素
    that.lis[index].remove();
    that.sections[index].remove();
    that.init();
    // 当我们删除的不是选中状态的li 的时候 原来的选中状态li保持不变
    if(document.querySelector('.liactive')) return;


    // 当我们删除了选中状态的li 让他得前一个li 处于选定状态
    index -- ;
    // click()手动调用点击事件 不需要鼠标触发
    that.lis[index] && that.lis[index].click();
    }
    // 4.修改功能
    editTab(){
        var str = this.innerHTML;

        //  双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 直接把内容修改为文本框
        this.innerHTML = '<input type = "text" /> ';
        var input = this.children[0];
        input.value = str;
        // 文本框里面的文字处于选定状态
        input.select();
        // 当我们离开文本框 就将文本框里面的值留给span
        input.onblur = function(){
            this.parentNode.innerHTML = this.value;
        };
        // 按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e){
            if(e.keyCode === 13)
            // 手动调用表单失去焦点事件 不需要鼠标离开操作
                this.blur();
        }
}
}
new Tab('#tab');