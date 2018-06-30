$(document).ready(function() {

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

    if (identity.indexOf('auditor') == -1) {
        $("#audit-nav-button").remove();
        alert("permission denied");
        window.location.href = "login.html#signin";
    }

    var docu_id = "";
    $('#to-audit-table').on('click', "div.comment-add", function() {
        docu_id = $(this).parent().prev().prev().prev().text();
        $('#addCommentModal').modal()
    });

    $('#modal-add-comment').on('click', function () {
        var manu_status = $.trim($('#add-comment-status option:selected').val());
        var comment_text = $.trim($('#add-comment-opinion').val());
        var academic_level = "";
        var academic_innovation = "";
        var application_value = "";
        var paper_write = "";
        var abstract_write = "";

        if (document.getElementById("optionsRadios11").checked) {
            academic_level = "高"
        } else if (document.getElementById("optionsRadios12").checked) {
            academic_level = "中"
        } else if (document.getElementById("optionsRadios13").checked) {
            academic_level = "一般"
        } else if (document.getElementById("optionsRadios14").checked) {
            academic_level = "较低"
        } else if (document.getElementById("optionsRadios15").checked) {
            academic_level = "低"
        }

        if (document.getElementById("optionsRadios21").checked) {
            academic_innovation = "有"
        } else if (document.getElementById("optionsRadios22").checked) {
            academic_innovation = "无"
        }

        if (document.getElementById("optionsRadios31").checked) {
            application_value = "高"
        } else if (document.getElementById("optionsRadios32").checked) {
            application_value = "一般"
        } else if (document.getElementById("optionsRadios33").checked) {
            application_value = "低"
        }

        if (document.getElementById("optionsRadios41").checked) {
            paper_write = "有"
        } else if (document.getElementById("optionsRadios42").checked) {
            paper_write = "无"
        }

        if (document.getElementById("optionsRadios51").checked) {
            abstract_write = "高"
        } else if (document.getElementById("optionsRadios52").checked) {
            abstract_write = "一般"
        } else if (document.getElementById("optionsRadios53").checked) {
            abstract_write = "低"
        }


        if(manu_status=='请选择...'){
            alert('请选择审稿状态');
            return false
        }

        if(comment_text==''){
            alert('请填写审稿意见');
            return false
        }

        opinion = {};
        opinion["manu_status"] = manu_status;
        opinion["comment_text"] = comment_text;
        opinion["academic_level"] = academic_level;
        opinion["academic_innovation"] = academic_innovation;
        opinion["application_value"] = application_value;
        opinion["paper_write"] = paper_write;
        opinion["abstract_write"] = abstract_write;

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
                data.append('docu_id', docu_id);
                data.append('opinion', JSON.stringify(opinion));

                $.ajax({
                    type: "POST",
                    url: url +"Document/audit",
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