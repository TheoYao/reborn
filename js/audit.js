$(document).ready(function() {

    var url = "http://ndac.env.tsinghua.edu.cn/app/index.php/";
    if ($.cookie('cookie_info')) {
        var username = JSON.parse($.cookie('cookie_info')).username;
        var identity = JSON.parse($.cookie('cookie_info')).identity;

        $("#sign-area-name").text(username)
    } else {
        var username = '';
        var identity = '';
        //window.location.href = "../Form/login.html#signin"
    }
    /*
    if (identity.indexOf('audit') == -1) {
        $("#audit-nav-button").remove();
        alert("permission denied");
        window.location.href = "login.html#signin";
    }
    */

    $('#to-audit-table').on('click', "div.comment-add", function() {
        $('#addCommentModal').modal()
    });

    $('#modal-add-comment').on('click', function () {
        var manu_status = $.trim($('#add-comment-status option:selected').val());
        var comment_text = $.trim($('#add-comment-opinion').val());
        if(manu_status=='请选择...'){
            alert('请选择审稿状态');
            return false
        }

        if(comment_text==''){
            alert('请填写审稿意见');
            return false
        }

        swal(
            {
                title: "确定提交吗？",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定提交",
                closeOnConfirm: false
            }, function(){
                var data = new FormData();
                data.append('username', username);
                data.append('status', manu_status);
                data.append('comment', comment_text);

                $.ajax({
                    type: "POST",
                    url: url +"Document/submit",
                    data: data,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.status == 1) {
                            swal("提交成功！", "您审稿辛苦了。", "success");
                            window.location.reload();
                        } else {
                            swal("出现问题", data.info, "error");
                            return false;
                        }
                    },
                    error: function () {
                        swal('网路不给力，请稍候再试');
                    }
                })
            });


        $('#addCommentModal').modal('hide');
        document.getElementById("add-comment-status").options.selectedIndex = 0;
        $('#add-comment-opinion').val("");
    });


});