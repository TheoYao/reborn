$(document).ready(function() {
    $.cookie('cookie_info', JSON.stringify({"username": "xuebin", "identity": "contribute,audit"}));

    $('.sign-area').on('click', "a#sign-out", function() {
        $.cookie('cookie_info', null);
        window.location.href = "index.html"
    });

    if($.cookie('cookie_info')) {
        var username = JSON.parse($.cookie('cookie_info')).username;
        var identity = JSON.parse($.cookie('cookie_info')).identity;

        $(".sign-area").empty();
        $(".sign-area").html("<span id=\"sign-area-name\">"+username+"&nbsp;</span><a id=\"sign-out\" href=\"login.html#signin\">退出</a>");
    }
});