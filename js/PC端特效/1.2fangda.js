window.addEventListener('load',function(){
    let pic = document.querySelector('.pic');
    let mask = document.querySelector('.mask');
    let big = document.querySelector('.right');
    let box = document.querySelector('div')

    box.addEventListener('mouseover',function(){
        mask.style.display = 'block';
        big.style.display = 'block';    
    })

    box.addEventListener('mouseout',function(){
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    box.addEventListener('mouseover',function(e){
        // 鼠标在页面中的坐标减去盒子在页面中的坐标 赋值给遮盖层坐标
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;
        // 将遮盖层坐标算出 减去遮盖层一半就可以将鼠标置于遮盖层中央
        let mask_X = x - mask.offsetWidth / 2;
        let mask_Y = y - mask.offsetHeight / 2; 
        if(mask_X <= 0){
            mask_X = 0;
        }
        else if(mask_X >= pic.offsetWidth - mask.offsetWidth ){
            mask_X = pic.offsetWidth - mask.offsetWidth;
        }
        mask.style.left= mask_X+ 'px';
        mask.style.top = mask_Y+ 'px';
    })
})
   