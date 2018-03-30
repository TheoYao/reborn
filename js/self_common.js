$(document).ready(function() {
    // $.cookie('cookie_info', JSON.stringify({"username": "xuebin", "identity": "contribute,audit"}));

    $('.sign-area').on('click', "div#sign-out", function() {
        $.cookie('cookie_info', '', { expires: -1 });
        window.location.href = "index.html"
    });

    //if($.cookie('cookie_info') != undefined && $.cookie('cookie_info') != "" && $.cookie('cookie_info') != null) {
    if($.cookie('cookie_info')){
        var a =$.cookie('cookie_info');
        var username = JSON.parse($.cookie('cookie_info')).username;
        var identity = JSON.parse($.cookie('cookie_info')).identity;

        $(".sign-area").empty();
        $(".sign-area").html("<span id=\"sign-area-name\"><a href=\"user_center.html\">"+username+"&nbsp;</a></span><div id=\"sign-out\">退出</div>");
    }
});