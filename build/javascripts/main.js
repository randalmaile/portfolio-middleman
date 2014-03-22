"use strict";
////////////////////Settings////////////////////



//Twitter module hashtag
var twitter_query = '#twitter';

//Set main slider slide speed (in miliseconds)
var slide_speed = 10000;



///////////////////////////////////////////////



//Mobile Detection Function

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};


//Plugins load

$(window).load(function () {

    //Main slider
    var flex_slider = $('#main-slider-container .flexslider').flexslider({
        controlNav: false,
        pauseOnAction: false,
        touch: false,
        slideshowSpeed: slide_speed,
        start: function () {
            var $current_slide;
            $('#main-slider-container > img:first-child').hide();
            for (var i = 0; i < flex_slider.data("flexslider").count; i++) {
                $current_slide = $(flex_slider.data("flexslider").slides[i]);
                $current_slide.find(".main-headings").animate({marginTop: -300, opacity: 0}, 0);
                $current_slide.find(".sub-headings").animate({marginTop: 300, opacity: 0}, 0);
                $current_slide.find("button").animate({marginTop: 200, opacity: 0}, 0);
                $current_slide.find("img.slide-element").animate({marginRight: -800, opacity: 0}, 0);
            }
            var current_slide_index = flex_slider.data("flexslider").currentSlide;
            $current_slide = $(flex_slider.data("flexslider").slides[current_slide_index]);
            $current_slide.find(".main-headings").animate({marginTop: 0, opacity: 1}, 1000);
            $current_slide.find(".sub-headings").animate({marginTop: 0, opacity: 1}, 1000);
            $current_slide.find("button").animate({marginTop: 0, opacity: 1}, 1500);
            $current_slide.find("img.slide-element").animate({marginRight: 0, opacity: 1}, 2000);
            $('.progress-bar .bar').animate({'width': "100%"}, slide_speed, 'linear').width(0);
        },
        before: function () {
            var current_slide_index = flex_slider.data("flexslider").currentSlide;
            var $current_slide = $(flex_slider.data("flexslider").slides[current_slide_index]);
            $current_slide.find(".main-headings").animate({marginTop: -300, opacity: 0}, 1000);
            $current_slide.find(".sub-headings").animate({marginTop: 300, opacity: 0}, 1000);
            $current_slide.find("button").animate({marginTop: 200, opacity: 0}, 1000);
            $current_slide.find("img.slide-element").animate({marginRight: -800, opacity: 0}, 1500);
            $('.progress-bar .bar').stop().width('100%');
        },
        after: function () {
            flex_slider.data('flexslider').pause();
            flex_slider.data('flexslider').play();
            $('.progress-bar .bar').stop().width(0).animate({'width': "100%"}, slide_speed, 'linear');
            var current_slide_index = flex_slider.data("flexslider").currentSlide;
            var $current_slide = $(flex_slider.data("flexslider").slides[current_slide_index]);
            $current_slide.find(".main-headings").animate({marginTop: 0, opacity: 1}, 1000);
            $current_slide.find(".sub-headings").animate({marginTop: 0, opacity: 1}, 1000);
            $current_slide.find("button").animate({marginTop: 0, opacity: 1}, 1500);
            $current_slide.find("img.slide-element").animate({marginRight: 0, opacity: 1}, 2000);
        }
    });

//Gallery plugin
    $('#gallery').mixitup({
        targetSelector: '.all',
        filterSelector: '.filter',
        onMixEnd: function () {
            setTimeout(function(){renderParallax(true);}, 0);
        }
    });

//Client slider
    $('#client-slider').bxSlider({
        slideWidth: 190,
        minSlides: 1,
        maxSlides: 5,
        moveSlides: 1,
        slideMargin: 0,
        controls: true,
        nextText: '',
        prevText: ''
    });

// Mobile device navigation dropdown
    $(function () {
        $("#main-nav ul").tinyNav();
    });

// Twitter module options
    $(".tweets .tweet-container #tweet-inner-container").tweet({
        query: twitter_query,
        twitter_api_proxy_url: "twitter.php",
        join_text: false,
        avatar_size: false, // you can activate the avatar
        count: 2, // number of tweets
        template: "{avatar}{text}{join}" // [string or function] template used to construct each tweet <li> - see code for available vars
    });
    $('.tweets #more-button-container .more-tweets').attr('href', 'http://www.twitter.com/search?q=' + encodeURIComponent(twitter_query));

});


// Twitter module options
$(".tweets .tweet-container #tweet-inner-container").tweet({
    username: 'BungMARKgtown',
    twitter_api_proxy_url: "twitter.php",
    join_text: false,
    avatar_size: false, // you can activate the avatar
    count: 2, // number of tweets
    template: "{avatar}{text}{join}" // [string or function] template used to construct each tweet <li> - see code for available vars
    });



//Various functions

// Team margin fix
function team_margin_fix() {
    if ($(window).width() > 480) {
        $('#team-container .team-member').removeClass('zero-marginleft');
        $('#team-container .team-member:nth-child(4n+1)').addClass('zero-marginleft');
    }
    if ($(window).width() <= 480) {
        $('#team-container .team-member').removeClass('zero-marginleft');
        $('#team-container .team-member:nth-child(2n+1)').addClass('zero-marginleft');
    }
}
$(window).load(function () {
    team_margin_fix();
});
$(window).resize(function () {
    team_margin_fix();
});

var testimonial_height;

$(window).load(function () {

    // Gallery margin fix
    if ($('#gallery').hasClass('three-cols')) {
        $('#gallery').append('<li class="gap"></li>');
    }
    else if ($('#gallery').hasClass('four-cols')) {
        $('#gallery').append('<li class="gap"></li><li class="gap"></li>');
    }

    // Clients margin fix
    $('#testimonials .testimonial:nth-child(2n-1)').addClass('zero-marginleft');

    // Client Slider Logo show
    $('#client-slider-container .client-logo img').show();

    // Color options fix
    $('#options-panel .container .options ul li:nth-child(3n+1)').addClass('zero-marginleft');

    // Color options
    window.setTimeout(function () {
        $('#options-panel .container').addClass('hide').addClass('show');
    }, 500);

    // Navigation active implement
    $('#main-nav li:first-child').addClass('active');

    //Client slider arrows
    $('#client-slider-container .bx-prev').addClass('icon-caret-left');
    $('#client-slider-container .bx-next').addClass('icon-caret-right');

    // Testimonial by vertical align
    testimonial_height = $('.parallax-container .testimonial-by-container').height();
    testimonial_height += 25;
    $('.parallax-container .testimonial-by-container').css('line-height', testimonial_height + 'px');
});
$(window).resize(function () {
    testimonial_height = $('.parallax-container .testimonial-by-container').height();
    testimonial_height += 25;
    $('.parallax-container .testimonial-by-container').css('line-height', testimonial_height + 'px');
});


//Navigation scroll

// Cache selectors
var lastId,
    topMenu = $("header"),
    topMenuHeight = topMenu.outerHeight(),
// All list items
    menuItems = topMenu.find("a"),
// Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });
$(window).resize(function () {
    topMenuHeight = topMenu.outerHeight();
});

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function (e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 65;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop){
            return this;
        }
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent().removeClass("active")
            .end().filter("[href=#" + id + "]").parent().addClass("active");
    }
});

$('.nav li a, #top-button').click(function () {
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 300);
    return false;
});


//Service button functions

$(window).load(function () {
    $('.button-container div:not(.active) span').css('opacity', '0');
    $('.service-description:not(.default)').hide();
    $('.button-container div button').click(function () {
        $('.button-container div').removeClass('active');
        $('.button-container span').css('opacity', '0');
        $('.service-description').hide();
        var ButtonNO = $(this).parent().attr('class');
        $(this).parent().addClass('active');
        $('.' + ButtonNO).children('span').css('opacity', '1');
        $('.service-description.' + ButtonNO).show();
    });
    if (isMobile.Android()) {
        $('.button-container .service-arrow').hide();
    }
});


//Collapsable items

$(window).load(function () {
    $('.collapsable-item .hidden-container').each(function () {
        if (isMobile.Android()) {
            $('.collapsable-item .hidden-container').hide();
            $(this).prev().click(function () {
                $(this).parent().parent().find('.clickable-area').not(this).removeClass('active');
                $(this).parent().parent().find('.hidden-container').not($(this).next()).hide();
                $(this).toggleClass('active');
                if ($(this).next().css('display') === 'none') {
                    $(this).next().css('max-height', $(this).next().show());
                }
                else {
                    $(this).next().hide();
                }
                if ($(this).parent().parent().find('.clickable-area').hasClass('active')) {
                    $(this).parent().parent().find('.clickable-area').children('button').html('+');
                    $(this).children('button').html('-');
                }
                else {
                    $(this).parent().parent().find('button').html('+');
                }
            });

        }
        else {
            $('.collapsable-item .hidden-container').css('max-height', '0');
            $(this).css('max-height', 'none');
            $(this).data('original-height', $(this).height());
            $(this).css('max-height', 0);
            $(this).prev().click(function () {
                $(this).parent().parent().find('.clickable-area').not(this).removeClass('active');
                $(this).parent().parent().find('.hidden-container').not($(this).next()).css('max-height', '0px');
                $(this).toggleClass('active');
                if ($(this).next().css('max-height') === '0px') {
                    $(this).next().css('max-height', $(this).next().data('original-height'));
                }
                else {
                    $(this).next().css('max-height', '0px');
                }
                if ($(this).parent().parent().find('.clickable-area').hasClass('active')) {
                    $(this).parent().parent().find('.clickable-area').children('button').html('+');
                    $(this).children('button').html('-');
                }
                else {
                    $(this).parent().parent().find('button').html('+');
                }
            });
        }
    });
    $('.gallery-modal-container').hide();
});


//Page options

// Menu toggle
$('#options-panel .container .toggle-button button').click(function () {
    if ($('#options-panel').hasClass('show')) {
        $('#options-panel').removeClass('show');
        $('#options-panel').addClass('hide');
    }
    else if ($('#options-panel').hasClass('hide')) {
        $('#options-panel').removeClass('hide');
        $('#options-panel').addClass('show');
    }
});

// Header style toggle
$('#options-panel .container #iconic').click(function () {
    $('header').removeAttr('class');
    $('header').addClass('iconic');
    $('#main-slider-container').css('padding-top', $('header').height());
    topMenu = $("header");
        topMenuHeight = topMenu.outerHeight();
});
$('#options-panel .container #simple').click(function () {
    $('header').removeAttr('class');
    $('header').addClass('simple');
    $('#main-slider-container').css('padding-top', $('header').height());
    topMenu = $("header");
        topMenuHeight = topMenu.outerHeight();
});
$(window).load(function () {
    $('#main-slider-container').css('padding-top', $('header').height());
});
$(window).resize(function(){
    $('#main-slider-container').css('padding-top', $('header').height());
});

// Stylesheet switch
$('#green-template').click(function () {
    $('#layout-css').attr('href', 'styles/layouts/green-layout.css');
});
$('#orange-template').click(function () {
    $('#layout-css').attr('href', 'styles/layouts/orange-layout.css');
});
$('#blue-template').click(function () {
    $('#layout-css').attr('href', 'styles/layouts/blue-layout.css');
});
$('#bright-green-template').click(function () {
    $('#layout-css').attr('href', 'styles/layouts/bright-green-layout.css');
});
$('#magenta-template').click(function () {
    $('#layout-css').attr('href', 'styles/layouts/magenta-layout.css');
});
$('#yellow-template').click(function () {
    $('#layout-css').attr('href', 'styles/layouts/yellow-layout.css');
});


//Column selector

var window_width;
window_width = $(window).width();
$(window).resize(function () {
    window_width = $(window).width();
});
$('.column-selector .button2').click(function () {
    $('#gallery').removeAttr('class');
    $('.column-selector .button2,.column-selector .button3,.column-selector  .button4').removeClass('active');
    $(this).addClass('active');
    $('#gallery').addClass('two-cols');
    renderParallax(true);
});
$('.column-selector .button3').click(function () {
    $('#gallery').removeAttr('class');
    $('.column-selector .button2,.column-selector .button3,.column-selector .button4').removeClass('active');
    $(this).addClass('active');
    $('#gallery').addClass('three-cols');
    renderParallax(true);
});
$('.column-selector .button4').click(function () {
    $('#gallery').removeAttr('class');
    $('.column-selector .button2,.column-selector .button3,.column-selector .button4').removeClass('active');
    $(this).addClass('active');
    $('#gallery').addClass('four-cols');
    renderParallax(true);
});
// This function adjusts column count based on window width
function column_organiser() {
    if (window_width < 1024) {
        $('.column-selector .button3').trigger('click');
        $('.column-selector').hide();
    }
    if (window_width < 768) {
        $('.column-selector .button2').trigger('click');
    }
    if (window_width > 1024) {
        $('.column-selector').show();
    }
}

$(window).load(function () {
    column_organiser();
});
$(window).resize(function () {
    column_organiser();
});


//Portfolio modal

var scroll_position;
$('.gallery-item .gallery-show-modal').click(function (e, param) {
    //Find next & previous items
    var i, index;
    var $next_item;
    var $prev_item;
    var gallery_item_count = $(this).closest("li.gallery-item").parent().find(".gallery-item").length;
    var item_index = $(this).closest("li.gallery-item").index();
    for (i = 0; i < gallery_item_count; i++) {
        index = (item_index + 1 + i) % gallery_item_count;
        if ($(this).closest("li.gallery-item").parent().find(".gallery-item").eq(index).css("display") === "inline-block") {
            $next_item = $(this).closest("li.gallery-item").parent().find(".gallery-item").eq(index);
            break;
        }
    }
    for (i = 0; i < gallery_item_count; i++) {
        index = (item_index - 1 - i + (gallery_item_count * 2)) % gallery_item_count;
        if ($(this).closest("li.gallery-item").parent().find(".gallery-item").eq(index).css("display") === "inline-block") {
            $prev_item = $(this).closest("li.gallery-item").parent().find(".gallery-item").eq(index);
            break;
        }
    }
    //Append & show modal
    var $modal = $(this).parent().parent().find('.gallery-modal-container').children().clone(true);
    $('body, html').css('overflow', 'hidden');
    scroll_position = $(document).scrollTop() > 0 ? $(document).scrollTop() : scroll_position;
    if (isMobile.Android()) {
        $('#main-body-container').css('position', 'fixed');
    }
    $('body').append($modal);
    if (param && param.extra) {
        $modal.css("opacity", 0);
        switch (param.extra) {
            case 'next':
                $modal.css("left", '80%').delay(150).animate({opacity: 1, left: '50%', speed: 'fast'});
                break;
            case 'prev':
                $modal.css("left", '20%').delay(150).animate({opacity: 1, left: '50%', speed: 'fast'});
                break;
        }
    } else {
        $modal.hide().delay(250).fadeIn();
    }
    $('#overlay').fadeIn();
    //Modal close button
    $modal.find('.close-button').click(function () {
        $modal.fadeOut({
            complete: function () {
                $modal.remove();
            }
        });
        $('#overlay').fadeOut();
        $('body, html').css('overflow', 'visible');
        if (isMobile.Android()) {
            $('#main-body-container').css('position', 'static');
            setTimeout(function () {
                $('body').scrollTop(scroll_position);
            }, 800);
        }
    });
    $('#overlay').click(function () {
        $modal.find('.close-button').trigger('click');
    });
    //Next & previous gallery item button
    $modal.find('.gallery-next').click(function () {
        $modal.animate({left: '0%', opacity: 0}, {complete: function () {
            $modal.remove();
        }});
        $next_item.find('.gallery-show-modal').trigger('click', {extra: 'next'});
    });
    $modal.find('.gallery-prev').click(function () {
        $modal.animate({left: '100%', opacity: 0}, {complete: function () {
            $modal.remove();
        }});
        $prev_item.find('.gallery-show-modal').trigger('click', {extra: 'prev'});
    });
});


//Placeholder support for older browsers

$(window).load(function () {
    $(function () {
        if (!$.support.placeholder) {
            var active = document.activeElement;
            $(':text').focus(function () {
                if ($(this).attr('placeholder') !== '' && $(this).val() === $(this).attr('placeholder')) {
                    $(this).val('').removeClass('hasPlaceholder');
                }
            }).blur(function () {
                    if ($(this).attr('placeholder') !== '' && ($(this).val() === '' || $(this).val() === $(this).attr('placeholder'))) {
                        $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
                    }
                });
            $(':text').blur();
            $(active).focus();
        }
    });
});


//Services hover

$(window).load(function () {
    $('.parallax-container').each(function () {
        $(this).css('background-image', 'url("' + $(this).find('img.parallax-bg').attr('src') + '")');
        $(this).find('.parallax-bg').remove();
    });
    renderParallax(false);
    $(window).scroll(function () {
        renderParallax(false);
    });
    $(window).resize(function () {
        renderParallax(false);
    });
});
function renderParallax(animate) {
    $('.parallax-container').each(function () {
        if ($(window).width() >= 1000) {
            var $element = $(this);
            var top_pos = $element.offset().top;
            var viewable_height = $(window).height();
            var current = $(window).scrollTop();
            var bg_image = new Image();
            bg_image.src = $element.css('background-image').replace(/"/g, "").replace(/url\(|\)$/ig, "");
            var bg_image_height = bg_image.height;
            var bg_height = $element.height();
            if (current + viewable_height > top_pos && current < top_pos + bg_height) {
                var bg_offset = -((bg_image_height - bg_height) * (current + viewable_height - top_pos) / (viewable_height + bg_height));
                if (animate) {
                    $element.animate({backgroundPositionY: bg_offset}, 'fast');
                } else {
                    $element.css("background-position", 'center ' + bg_offset + 'px');
                }
            }
        }
    });
}


//Scroll detect for skill bars

$(window).load(function () {
    var skill_position = $('.skill').offset().top;
    var trigger_position;
    if (isMobile) {
        trigger_position = skill_position - ($(window).height() / 2 + 150);
    }
    else {
        trigger_position = skill_position - ($(window).height() / 2);
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > trigger_position) {
            $('.skill').removeClass('empty');
            $('.skill').addClass('full');
        }
    });
});


//Mobile Fixes

$(window).load(function () {
    if (isMobile.iOS()) {
        $('.process-grid li').click(function () {
            if ($(this).children('.process').hasClass('hover-emulate')) {
                $('.process').removeClass('hover-emulate');
            }
            else {
                $('.process').removeClass('hover-emulate');
                $(this).children('.process').addClass('hover-emulate');
            }
        });
    }
    if (isMobile) {
        $('.process-info-front').hide();
        $('.process-info-front p').hide();
        $('.process-info-front').show();
        $('.process-info-front p').show();
    }
});

if (!isMobile.any()) {
    $('.button-container button').addClass('hover-enabled');
}

$("#main-nav").on("click", "select", function () {
    $('header').css('left', '0px');
});


//Contact Form
$(document).ready(function(){
    $('#contact-form').submit(function () {
        var is_error = false;
        var that = this;
        $(this).find("input, textarea, span").removeClass("error");
        $(this).find("input, textarea").each(function () {
            if ($.trim($(this).val()) === "") {
                is_error = true;
                $(this).addClass("error");
                $("#row6 form > span").addClass("error");
            }
        });
        if (!is_error) {
            $(this).find("[type=submit]").prop("disabled", true);
            $(this).find("[type=submit]").addClass("disabled");
            $.ajax({
                url: "send_form.php",
                type: "POST",
                data: $(this).serialize(),
                success: function (data) {
                    if (data === "OK") {
                        $(that).find("input, textarea").val("");
                        var $success_box = $("<p />");
                        $success_box.append("Your message has been received. Thank you for contacting us.");
                        $("#row6 .heading-container #form-alert").append($success_box);
                        $success_box.delay(6000).fadeOut();

                    } else {
                        var $error_box = $("<p />");
                        $error_box.append("There was an error while sending the form. Please try again later.");
                        $("#row6 .heading-container").append($error_box);
                        $error_box.delay(6000).fadeOut();
                    }
                },
                error: function () {
                    var $error_box = $("<p />");
                    $error_box.append("There was an error while sending the form. Please try again later.");
                    $("#row6 .heading-container").append($error_box);
                    $error_box.delay(6000).fadeOut();
                },
                complete: function () {
                    $(that).find("[type=submit]").prop("disabled", false);
                    $(that).find("[type=submit]").removeClass("disabled");
                }
            });
        }
        return false;
    });

});
                        
