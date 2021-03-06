window.addEventListener('load',function(){
    // 1.获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus= document.querySelector('.focus');
    var focusWidth=focus.offsetWidth;
// 2.鼠标经过focus 就显示隐藏的左右按钮
    focus.addEventListener('mouseenter',function(){
        arrow_l.style.display='block';
        arrow_r.style.display='block';
        clearInterval(timer);
       timer=null; // 清除定时器变量
    })
    focus.addEventListener('mouseleave',function(){
        arrow_l.style.display='none';
        arrow_r.style.display='none';
        timer=setInterval(function(){
            // 手动调用点击事件
            arrow_r.click();
        },2000);

    })
    // 3. 动态生成小圆圈
    var ul= focus.querySelector('ul');
    var ol=focus.querySelector('.circle');
    for(var i=0;i<ul.children.length;i++){
        //创建一个小li
        var li=document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('index',i);
        //把小li插入到ol里面
        ol.appendChild(li);
        // 4.小圆圈的排他思想
        li.addEventListener('click',function(){
            for(var i=0;i<ol.children.length;i++){
                ol.children[i].className='';
            }
            this.className='current';
            // 5.点击小圆圈，移动图片，移动的是ul
            
            // 当我们点击了某个小li 就可拿到当前小li的索引号
            var index= this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个小li的索引号给num
            num=index;
             // 当我们点击了某个小li 就要把这个小li的索引号给circle
             circle=index;
            animate(ul,-index*focusWidth);
        })

    }
    // 把ol里面的第一个小li设置类名为current
     ol.children[0].className='current';

    //  6.克隆第一张图片，放到u最后面
    var fisrt =ul.children[0].cloneNode(true);
    ul.appendChild(fisrt);
    //  7.点击右侧按钮，图片滚动一张
    var num=0;
    var circle=0;
    var flag=true;
   
    arrow_r.addEventListener('click',function(){
     if(flag){
          flag=false;//关闭节流阀
        // 如果走到了最后复制的一张图片，此时我们的ul要快速复原left改为0
    if(num==ul.children.length-1){
        ul.style.left=0;
        num=0;
    }
    num++;
     animate(ul,-num*focusWidth,function(){
         flag=true;//打开节流阀
     });
   
    //  8.点击右侧按钮，小圆圈跟随一起变化，
    // 可以在生命一个变量控制小圆圈的播放
    circle++;
    if(circle==ol.children.length){
        circle=0;
    }
    circleChange();
     }
    })

    // 9.左侧按钮做法
    arrow_l.addEventListener('click',function(){
       if(flag){
           flag=false;
      if(num==0){
         num=ul.children.length-1; 
         ul.style.left=-num*focusWidth +'px';
          
      }
      num--;
       animate(ul,-num*focusWidth,function(){
           flag=true;
       });
      //  点击按钮，小圆圈跟随一起变化，
      // 可以在生命一个变量控制小圆圈的播放
      circle--;
    //   如果circle<0 说明第一张图片 则小圆圈要改为第四个小圆圈
      if(circle<0){
          circle=ol.children.length-1;
      }
    //    
      circleChange();
    }
    })

function circleChange(){
//先清楚其他小圆圈current类名
for(var i=0;i<ol.children.length;i++){
    ol.children[i].className='';
}

ol.children[circle].className='current';
}
// 10.自动播放轮播图
var timer=setInterval(function(){
    // 手动调用点击事件
    arrow_r.click();
},2000);

})