$(document).ready(function() {
    loadNews();
    function loadNews() {
        $.ajax({
            type: "GET",
            //url: url+"Inner/getNews",
            url: "json/getNews.json",
            dataType: 'json',
            success: function (data) {
                if(data.length == 0) {
                    return
                }
                var htmlStr = "";
                $(".list-group").empty();

                for(var i=0; i<data.length; i++) {
                    var newsId = data[i].id;
                    var title = data[i].title;
                    var date = data[i].date;

                    htmlStr += ("<a class=\"list-group-item\" news_id=");
                    htmlStr += newsId;
                    htmlStr += ("><div class=\"news-item\"><div class=\"item-title\">");
                    htmlStr += title;
                    htmlStr += ("</div><div class=\"item-date\">");
                    htmlStr += date;
                    htmlStr += ("</div></div></a>")

                }
                if(htmlStr == ""){
                    htmlStr = "<p>暂无新闻</p>";
                }
                $(".list-group").html(htmlStr);
            },
            complete: function () {

            },
            error: function () {
                swal('对不起，当前服务器开小差，请稍候再试', '', "error")
            }

        });
    }

    $('.list-group').on('click', "a.list-group-item", function() {
        var news_id = $(this).attr("news_id");
        window.location.href = "./news_info.html#"+news_id;
    });
});
