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


    $(".cfr-topic-item").mouseover(function(){
        var item_list = $(".cfr-topic-item");
        var this_id = $(this).attr("id").split("-")[1];

        for(i=0; i<item_list.length; i++) {
            $(item_list[i]).css("z-index", 10-i);
            $(item_list[i]).css("margin-top", 0);
            $(item_list[i]).css("height", "420px");
            $(item_list[i]).css("opacity", 0.8);
        }
        $(this).css("z-index", 17);
        $(this).css("margin-top", 0);
        $(this).css("height", "450px");
        $(this).css("z-index", 99);
        $(this).css("opacity", 1.0);
        //$("p").css("background-color","yellow");
    });
});
