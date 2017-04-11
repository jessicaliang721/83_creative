/**
 * Created by jessica.pei on 4/10/17.
 */

(function ($) {
    // isOnScreen
    // http://upshots.org/javascript/jquery-test-if-element-is-in-viewport-visible-on-screen
    $.fn.isOnScreen = function(x, y){

        if(x == null || typeof x == 'undefined') x = 1;
        if(y == null || typeof y == 'undefined') y = 1;

        var win = $(window);

        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var height = this.outerHeight();
        var width = this.outerWidth();

        if(!width || !height){
            return false;
        }

        var bounds = this.offset();
        bounds.right = bounds.left + width;
        bounds.bottom = bounds.top + height;

        var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

        if(!visible){
            return false;
        }

        var deltas = {
            top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
            bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
            left : Math.min(1, ( bounds.right - viewport.left ) / width),
            right : Math.min(1, ( viewport.right - bounds.left ) / width)
        };

        return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;

    };

    $(document).ready(function() {
        // smooth scrolling
        $(function () {
            $('a[href*="#"]:not([href="#"])').click(function () {
                var target = $(this.hash);
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 500);
                    return false;
                }
            });
        });

        // test if section is on screen
        $(window).scroll(function() {
            var section = $(".traits");
            $("#scroll-bullets a").removeClass("active");
            // var id = section.attr("id");
            section.each(function() {
                var id = $(this).attr("id");
                if ($(this).isOnScreen(0.5, 0.5) == true) {
                    $("#scroll-bullets").find("a[href='#"+id+"']").addClass("active");

                }
            });
        });
    });

})(jQuery);