$(document).ready(function() {
    var url = "http://ndac.env.tsinghua.edu.cn/app/index.php/";
    loadNews();
    function loadNews() {
        $.ajax({
            type: "GET",
            url: url+"Inner/getNews",
            //url: "json/getNews.json",
            dataType: 'json',
            success: function (data) {
                if(data.length == 0) {
                    return
                }
                var htmlStr = "";
                $(".content-body").empty();
                var anchor = window.location.hash.slice(1);
                for(var i=0; i<data.length; i++) {
                    var newsId = data[i].id;
                    if (newsId != anchor){
                        continue
                    }
                    var title = data[i].title;
                    var content = data[i].content;

                    htmlStr += ("<h4 id=\"news-info-title\">" + title + "</h4>");
                    htmlStr += content;
                }
                if(htmlStr == ""){
                    htmlStr = "<p>无此条消息</p>";
                }
                $(".content-body").html(htmlStr);
            },
            complete: function () {

            },
            error: function () {
                swal('对不起，当前服务器开小差，请稍候再试', '', "error")
            }

        });
    }

    $('.info-main-area').on('click', "div.info-item", function() {
        var news_id = $(this).attr("news_id");
        window.location.href = "./news_info.html#"+news_id;
    });
});
