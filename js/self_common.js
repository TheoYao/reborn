$(document).ready(function() {
    $.cookie('cookie_info', JSON.stringify({"username": "xuebin", "identity": "contribute,audit"}));

    $('.sign-area').on('click', "a#sign-out", function() {
        $.cookie('cookie_info', null);
        window.location.href = "index.html"
    });
});