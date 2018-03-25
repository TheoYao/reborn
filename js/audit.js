$(document).ready(function() {
    //$.cookie('cookie_info', JSON.stringify({"username": "xuebin", "identity": "contribute,audit"}));

    var url = "http://ndac.env.tsinghua.edu.cn/app/index.php/";
    if ($.cookie('cookie_info')) {
        var username = JSON.parse($.cookie('cookie_info')).username;
        var identity = JSON.parse($.cookie('cookie_info')).identity;

        $("#sign-area-name").text(username)
    } else {
        var username = '';
        var identity = '';
        window.location.href = "../Form/login.html#signin"
    }
    if (identity.indexOf('audit') == -1) {
        $("#audit-nav-button").remove()
    }
    alert("permission denied")
    window.location.href = "../Form/login.html#signin"
});