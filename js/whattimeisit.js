/* 
 * -------------------------
 * What Time is It ?
 * -------------------------
 * Sélecteur d'horaires
 * Version : 1.0
 * CopyRight : Jerome Clerc
 */

(function($) {
    $.fn.whattimeisit=function(options) {
        //Variables
        slotPos = new Array();            
            slotPos['0'] = new Array('-80', '57');
            slotPos['1'] = new Array('-69', '97');
            slotPos['2'] = new Array('-40', '127');
            slotPos['3'] = new Array('1', '138');
            slotPos['4'] = new Array('42', '127');
            slotPos['5'] = new Array('70', '97');
            slotPos['6'] = new Array('81', '57');
            slotPos['7'] = new Array('70', '16');
            slotPos['8'] = new Array('42', '-14');
            slotPos['9'] = new Array('1', '-25');
            slotPos['10'] = new Array('-40', '-14');
            slotPos['11'] = new Array('-69', '16');
            slotPos['12'] = new Array('-80', '57');
        
        Hours = '';
        Minutes = '';
        
        var defaults = { 'ampm' : 'PM' };        
        var params = $.extend(defaults, options);
        
        //Wrapping
        $('form').find('.wtii').each(function() {
            $(this).wrap('<div id="wrap-wtii" />')
                .after('<img src="images/ico_timer.png" class="wtii-trigger"><div class="wtii-background round"><div class="wtii-close round"><img src="images/wtii_close.png"></div></div>');
        });
        
        //Affichage du select-background
        $('#wrap-wtii').delegate('.wtii-trigger, input.wtii', 'click', function() {
            $('.wtii-background').css({height : '0px', width : '0px', top : '12px', left : '75px'}).fadeIn('fast', function() {
                $(this).animate({height : '200px', width : '200px', top : '-86px', left : '-30px'}, 'fast', function() {
                    $('.wtii-close').fadeIn('fast');
                    if(params.ampm == 'AM') { echoSlots(0, 1); }
                    if(params.ampm == 'PM') { echoSlots(12, 1); }
                });
            });
        });
        
        //Sélection de la plage horaire AM
        $('#wrap-wtii').delegate('#AM', 'click', function() {
            params.ampm = 'AM';
            $('#PM').removeClass('active');
            $('#AM').addClass('active');
            removeSlots('h');
            removeAmPm();
            echoSlots(0, 1);
        });
        
        //Sélection de la plage horaire AM
        $('#wrap-wtii').delegate('#PM', 'click', function() {
            params.ampm = 'PM';
            $('#PM').addClass('active');
            $('#AM').removeClass('active');
            removeSlots('h');
            removeAmPm();
            echoSlots(12, 1);
        });
        
        //Sélection de l'heure
        $('#wrap-wtii').delegate('.wtii-sloth', 'click', function() {
            Hours = $(this).attr('alt');
            removeSlots('h');
            echoSlots(0, 5);
        });
        
        //Sélection des minutes
        $('#wrap-wtii').delegate('.wtii-slotm', 'click', function() {
            Minutes = $(this).attr('alt');
            removeSlots('m');
            removeAmPm();
            closeWrap();
            $('input.wtii').val(Hours + ':' + Minutes);
        });
        
        //Fermeture du sélecteur
        $('#wrap-wtii').delegate('.wtii-close', 'click', function() {
            removeSlots('h');
            removeSlots('m');
            removeAmPm();
            closeWrap();
        });
        
        //Affichage des heures
        function echoSlots(c, s) {
            for(i=0;i<13;i++) {
                if(i != 0) {
                    if(c == 60) { c = '00'; }
                    if(s == 1) {
                        $('.wtii-background').after('<div class="wtii-sloth round" id="slot-' + c + '" alt="' + getNum(c) + '"><span class="slot-num" id="span' + c + '">' + getNum(c) + '</span></div>');
                    }
                    else {
                        removeAmPm();                        
                        $('.wtii-background').after('<div class="wtii-slotm round" id="slot-' + c + '" alt="' + getNum(c) + '"><span class="slot-num" id="span' + c + '">' + getNum(c) + '</span></div>');
                    }
                    $('#slot-' + c).css({top : slotPos[i][0] + 'px', left : slotPos[i][1] + 'px'});
                }
                var c = c + s;
            }
            if(s == 1) {
                $('.wtii-background').after('<div class="wtii-sun" id="PM" alt="PM">PM</div>');
                $('.wtii-background').after('<div class="wtii-moon" id="AM" alt="AM">AM</div>');
                if(params.ampm == 'PM') { $('#PM').addClass('active'); }
                if(params.ampm == 'AM') { $('#AM').addClass('active'); }
            }
        }
        
        //Formatage des chiffres
        function getNum(c) {
            if(c < 10 && c != 0) {
                var c = '0' + c;
            }
            return c;
        }
        
        //Fermeture du selecteur
        function closeWrap() {
            $('.wtii-close').fadeOut('fast', function() {
                $('.wtii-background').animate({height : '0px', width : '0px', top : '12px', left : '75px'}, 'fast', function() {
                    $(this).fadeOut('fast');
                });
            });
        }
        
        //Suppression des slots
        function removeSlots(i) {
            $('.wtii-slot' + i).remove();
        }
        
        //Suppression du sélecteur AM / PM
        function removeAmPm() {
            $('.wtii-sun').remove();
            $('.wtii-moon').remove();
        }
    }
})(jQuery);
