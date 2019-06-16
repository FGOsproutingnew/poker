$(function () {

    let poker = [];
    let colorArr = ['s','h','d','c'];
    let flag ={};
   //扑克牌
    for(let i=0;i<52;i++){
        let index = Math.floor(Math.random() * colorArr.length);
        let color = colorArr[index];
        let number = Math.round(Math.random()*12+1);

        while (flag[color+'_'+number]){
           index = Math.floor(Math.random() * colorArr.length);
           color = colorArr[index];
           number = Math.round(Math.random()*12+1);
        }
        poker.push({color,number});
        flag[color+'_'+number] = true;
    }
    //发牌
    let index = -1;
    let first =null;
    for(let i=0;i<5;i++){
        for(let j=0;j<=i;j++){
            index++;
            let obj = poker[index];
            let lefts = 350-50*i +100*j,tops = 70*i;
            $('<div>').addClass('poker')
                .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
                .appendTo('.box')
                .data('number',obj.number)
                .attr('id',i+'_'+j)
                // .delay(index*10)
                .animate({left:lefts,top:tops,opacity:1})
        }
    }
    //剩下的牌放在左下角
    let box = $('.box');
    for(;index<poker.length;index++){
        let obj = poker[index];
        $('<div>').addClass('poker')
            .addClass('left')
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
            .attr('id','-2_-2')
            .data('number',obj.number)
            .appendTo('.box')
            // .delay(index*10)
            .animate({left:0,top:478,opacity:1})
    }

    box.on('click','.poker',function () {
        let _this = $(this);
        let [i,j] = _this.attr('id').split('_');

        let id1 = i * 1 + 1 + '_' + j, id2 = i * 1 + 1 + '_' + (j * 1 + 1);

        if ($('#' + id1).length || $('#' + id2).length) {
            return;
        }

        if(_this.hasClass('active')){
            $(this).removeClass('active').animate({top:'+=30px'})
        }else{
            $(this).addClass('active').animate({top:'-=30px'})
        }

        if(!first){
            first = _this;
        }else {
            let number1 = first.data('number') , number2 =_this.data('number');
            if(number1+number2 ===14){
                $('.active').animate({top:0,left:710,opacity:0},function () {
                    $(this).remove();
                });
            }else {
                $('.active').animate({top:'+=30'},function () {
                    $(this).removeClass('active');
                })
            }
            first = null;
        }
    })

    //切换
    let n=0;
    $('.right1').on('click',function () {
        $('.left').last().css('zIndex',n++).animate({left:706},function () {
            $(this).removeClass('left').addClass('right');
        })
    })
    let j=1000;
    $('.left1').on('click',function () {
        $('.right').first().css('zIndex',j--).animate({left:0},function () {
            $(this).removeClass('right').addClass('left');
        })
    })

})