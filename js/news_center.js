$(document).ready(function() {
    var rn = 10;
    loadNews(0);
    function loadNews(pn) {
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

                for(var i=pn*rn; i<data.length && i<(pn+1)*rn; i++) {
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
                $(".nav-page").attr("cur_page", parseInt(pn)+1);
                $(".list-group").html(htmlStr);


                var pageHtmlStr = "";
                if (pn == 0) {
                    pageHtmlStr += ("<li class=\"disabled backward\"><a href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">«</span></a></li>");
                }
                else {
                    pageHtmlStr += ("<li class=\"backward\"><a href=\"#\" aria-label=\"Previous\"><span aria-hidden=\"true\">«</span></a></li>");

                }
                var total_page = 1 + parseInt(data.length / 10);
                for(var i=0; i < total_page; i++) {
                    if(i.toString() == pn){
                        pageHtmlStr += ("<li class=\"active\"><a href=\"#\">" + (i+1) + " <span class=\"sr-only\">(current)</span></a></li>");
                    }
                    else {
                        pageHtmlStr += ("<li><a href=\"#\">"+ (i+1) +"</a></li>");
                    }
                }
                if (pn == parseInt(total_page)-1) {
                    pageHtmlStr += (" <li class=\"disabled forward\"><a href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">»</span></a></li>")
                }
                else {
                    pageHtmlStr += (" <li class=\"forward\"><a href=\"#\" aria-label=\"Next\"><span aria-hidden=\"true\">»</span></a></li>")

                }
                $(".pagination").html(pageHtmlStr);

                $(".nav-page").attr("total_page", total_page);
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


    $('.nav-page').on('click', "li", function() {
        var curpage =$(".nav-page").attr("cur_page");
        if ($(this).hasClass("backward")){
            if ($(this).hasClass("disabled")) {
                return
            }
            loadNews(parseInt(curpage)-2);
        }
        else if($(this).hasClass("forward")){
            if ($(this).hasClass("disabled")) {
                return
            }
            loadNews(parseInt(curpage));
        }
        else{
            var aim_page = parseInt($(this).text()) - 1;
            loadNews(aim_page)
        }
    });
});
