window.addEventListener('load',function(){
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    let box = document.querySelector('.big_box');

    box.addEventListener('mouseenter',function(){
        prev.style.display = 'block';
        next.style.display = 'block';
    })

    box.addEventListener('mouseleave',function(){
        prev.style.display = 'none';
        next.style.display = 'none';
    })
})