$(document).ready(function(e){
    /* code to drag an element on screen */
    $('[data-drag="draggable"]').on('mousedown', function(e) {
        $(this).addClass('draggable').parents().on('mousemove', function(e) {
            $('.draggable').offset({
                top: e.pageY - $('.draggable').outerHeight() / 2,
                left: e.pageX - $('.draggable').outerWidth() / 2
            }).on('mouseup', function() {
                $(this).removeClass('draggable');
            });
        });
        e.preventDefault();
    }).on('mouseup', function() {
        $(this).removeClass('draggable');
    });


    /* code to show tooltip in max avilable side on screen */
    $('[data-toolpar="toolTipWrapper"]').hover(function(e){
        if($("#tipWidth").val()>0){
            $('[data-type="toolTipText"]').css({'width':$("#tipWidth").val() + 'px'});
        }
        if($("#tipHeight").val()>0){
            $('[data-type="toolTipText"]').css({'height':$("#tipHeight").val() + 'px'});
        }       
            var elem = {
                top: $(this).offset().top,
                left: $(this).offset().left,
                height: $(this).outerHeight(),
                width: $(this).outerWidth()
            }
            var body = {
                scroll:$("body").scrollTop(),
                left:$("body").scrollLeft(),
                width: window.innerWidth,
                height: window.innerHeight
            }
            var tip = {
                width: $(this).find('[data-type="toolTipText"]').outerWidth(),
                height: $(this).find('[data-type="toolTipText"]').outerHeight()
            }
            var space = {
                top: 0,
                bottom: 0,
                left: 0,
                right:0
            }
            if(elem.width>=tip.width && elem.height>=tip.height){
                space.top = elem.top - body.scroll;
                space.right = 0;
                space.bottom = (body.scroll + body.height) - (elem.top + elem.height + 15);
                space.left = elem.left - body.left;
            }
            else{
                space.top = elem.top - body.scroll;
                space.right = (body.width + body.left) - (elem.left + elem.width);
                space.bottom = (body.scroll + body.height) - (elem.top + elem.height + 15);
                space.left = elem.left - body.left;
            }
            switch(true){
                case (space.bottom >= 0 && space.bottom >=space.top && space.bottom >= tip.height):
                    if(elem.left < (tip.width - elem.width)/2){
                        $(this).find('[data-type="toolTipText"]').css({'top':(space.top + elem.height + 7)  + 'px','left':space.left + 'px'});
                        $(this).find('[data-for="tooltipTop"]').css({'left':'5px'}).show();
                    }
                    else if((body.width-(elem.left+elem.width)) < ((tip.width - elem.width)/2)){
                        $(this).find('[data-type="toolTipText"]').css({'top':(space.top + elem.height + 7) + 'px','left':(space.left +elem.width - tip.width) + 'px'})
                        $(this).find('[data-for="tooltipTop"]').css({'right':'5px'}).show();
                    }
                    else{
                        $(this).find('[data-type="toolTipText"]').css({'top':(space.top + elem.height + 7) + 'px','left':(space.left - ((tip.width - elem.width)/2)) + 'px'})
                        $(this).find('[data-for="tooltipTop"]').addClass('horCenter').show();
                    }
                    break;
                case (space.top >= 0 && space.top >= space.bottom && space.top >= tip.height):
                    if(elem.left < (tip.width - elem.width)/2){
                        $(this).find('[data-type="toolTipText"]').css({'top':(space.top - tip.height - 7) + 'px','left':space.left + 'px'})
                        $(this).find('[data-for="tooltipBottom"]').css({'left':'5px'}).show();
                    }
                    else if((body.width-(elem.left+elem.width)) < ((tip.width - elem.width)/2)){
                        $(this).find('[data-type="toolTipText"]').css({'top':(space.top - tip.height - 7) + 'px','left':(space.left +elem.width - tip.width) + 'px'})
                        $(this).find('[data-for="tooltipBottom"]').css({'right':'5px'}).show();
                    }
                    else{
                        $(this).find('[data-type="toolTipText"]').css({'top':(space.top - tip.height - 7) + 'px','left':(space.left - ((tip.width - elem.width)/2)) + 'px'})
                        $(this).find('[data-for="tooltipBottom"]').addClass('horCenter').show();
                    }
                    break;
                case (space.right >= 0 && space.right >= space.left && space.right >= tip.width):
                     if(elem.top < ((tip.height - elem.height)/2)){
                        $(this).find('[data-type="toolTipText"]').css({'left':(space.left + elem.width + 7) + 'px','top':space.top + 'px'})
                        $(this).find('[data-for="tooltipLeft"]').css({'top':'5px'}).show();
                    }
                    else if((body.height-(elem.top+elem.height)) < (tip.height-elem.height)/2){
                        $(this).find('[data-type="toolTipText"]').css({'left':(space.left + elem.width + 7) + 'px','top':(space.top-tip.height) + 'px'})
                        $(this).find('[data-for="tooltipLeft"]').css({'bottom':'5px'}).show();
                    }
                    else{
                        $(this).find('[data-type="toolTipText"]').css({'left':(space.left + elem.width + 7) + 'px','top':(space.top-((tip.height-elem.height)/2))})
                        $(this).find('[data-for="tooltipLeft"]').addClass('verMiddle').show();
                    }
                    break;
                default:
                    if(elem.top < ((tip.height - elem.height)/2)){
                        $(this).find('[data-type="toolTipText"]').css({'left':(space.left - tip.width - 7) + 'px','top':space.top + 'px'})
                        $(this).find('[data-for="tooltipRight"]').css({'top':'5px'}).show();
                    }
                    else if((body.height-(elem.top+elem.height)) < (tip.height-elem.height)/2){
                        $(this).find('[data-type="toolTipText"]').css({'left':(space.left - tip.width - 7) + 'px','top':(space.top-tip.height) + 'px'})
                        $(this).find('[data-for="tooltipRight"]').css({'bottom':'5px'}).show();
                    }
                    else{
                        $(this).find('[data-type="toolTipText"]').css({'left':(space.left - tip.width - 7) + 'px','top':(space.top-((tip.height-elem.height)/2)) + 'px'})
                        $(this).find('[data-for="tooltipRight"]').addClass('verMiddle').show();
                    }
            }
            $(this).find('[data-type="toolTipText"]').css({'opacity':1});
    },function(e){
        $(this).find('[data-type="toolTipText"],[data-type="tooltipArrow"]').removeAttr("style").removeAttr("class");
        $(this).find('[data-type="toolTipText"]').css({'opacity':0});
    });



carousel();
});

/* function for timer and prgressive bar */
sesExpBar = function(par){
    var timer, min, sec;
    var intv = setInterval(function(){
        timer = par.find('[data-timer="timer"]').text();
        min = timer.split(":")[0];
        sec = timer.split(":")[1];
        if(sec > 0){
            sec = sec >10 ?parseInt(sec - 1) : ("0" + parseInt(sec - 1));
            timer = min + ":" + sec;
        }
        else if(sec == 0 && min > 0){
            min = min >10 ?parseInt(min - 1) : ("0" + parseInt(min - 1));
            timer = min + ":" + '59';
        }
        else{
            timer = '00:00';
            clearInterval(intv);
        }
        par.find('[data-timer="timer"]').text(timer);
    },1000);
    var dur = parseInt(par.find('[data-timer="timer"]').text().split(":")[0]) * 60 * 1000;
    par.find('[data-cover="progresser"]').animate({"width":'100%'},dur, "linear");
}
/* function for slider */
carousel = function(){
    var slideWidth = parseInt($('[data-item="slideBox"]').outerWidth() *  $('[data-item="slideBox"]').length * $('[data-item="slideBox"]').attr('data-mar'));
    $('[data-cont="sliderItemContainer"]').css({"width":slideWidth + 'px'});

    $('[data-wrp="sliderWrpr"] [data-arrow]').on("click",function(e){
        var dir = $(this).attr('data-arrow'),
            count = parseInt($(this).siblings('[data-cont="sliderItemContainer"]').attr("data-count"));
            itemWidth = parseInt($('[data-item="slideBox"]').outerWidth());
            mar = parseInt($('[data-item="slideBox"]').attr('data-mar'));
            wrpWidth = parseInt($(this).parent().outerWidth());
        switch(dir){
            case 'leftArrow': if(count>0){
                                var left =  --count * (itemWidth + mar);
                                $(this).siblings('[data-cont="sliderItemContainer"]').css({'left':'-' + left + 'px'});
                                $(this).siblings('[data-cont="sliderItemContainer"]').attr("data-count",count);
                            }
            break;
            case 'rightArrow':if(count < $('[data-item="slideBox"]').length - parseInt(wrpWidth/(itemWidth + mar))){
                                var right =  ++count * (itemWidth + mar); 
                                $(this).siblings('[data-cont="sliderItemContainer"]').css({'left':'-' + right + 'px'});
                                $(this).siblings('[data-cont="sliderItemContainer"]').attr("data-count",count);
                            }
            break;
            default:''
            break;
        }
    });
}