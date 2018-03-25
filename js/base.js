$(document).ready(function() {

    if($.cookie('cookie_info')) {
        var username = JSON.parse($.cookie('cookie_info')).username;
        var identity = JSON.parse($.cookie('cookie_info')).identity;

        $(".sign-area").empty();
        $(".sign-area").html("<span id=\"sign-area-name\">"+username+"&nbsp;</span><a id=\"sign-out\" href=\"login.html#signin\">退出</a>");
    }
    /*********** video-modal **********/

    var videoUrl = $("#cartoonVideo").attr('src');

    $("#myModal").on('hide.bs.modal', function(){
        $("#cartoonVideo").attr('src', '');
    });


    $("#myModal").on('show.bs.modal', function(){
        $("#cartoonVideo").attr('src', videoUrl);
    });

    $("#slider-with-video").on('click', function(){
        $("#modal-show-video").html("<iframe id=\"cartoonVideo\" width=\"560\" height=\"315\" src=\"videos/marvel.mp4\" frameborder=\"0\" allowfullscreen></iframe>")
    });

    /*********** slider **********/
    var slideIndex = 1;
    var timer;
    showSlides();

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        if (slideIndex > slides.length) {slideIndex = 1}
        if (slideIndex <= 0) (slideIndex=slides.length)
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
        timer = setTimeout(function() {
            plusSlides(1);
        }, 7000);
    }

    function plusSlides(n) {
        clearTimeout(timer);
        slideIndex += n;
        showSlides();
    }

    function currentSlide(n) {
        clearTimeout(timer);
        slideIndex = n;
        showSlides();
    }

    /************ count down***********/
    var clock;
    var currentDate = new Date();
    var futureDate  = new Date(2018, 10, 18);
    var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
    clock = $('.clock').FlipClock(diff, {
        clockFace: 'DailyCounter',
        countdown: true
    });
});
