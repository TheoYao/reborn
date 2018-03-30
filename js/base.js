$(document).ready(function() {

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
