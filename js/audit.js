$(document).ready(function() {
    var url = "http://ndac.env.tsinghua.edu.cn/app/index.php/";
    if ($.cookie('cookie_info')) {
        var username = JSON.parse($.cookie('cookie_info')).username;
        var identity = JSON.parse($.cookie('cookie_info')).identity;
    } else {
        var username = '';
        var identity = '';
        window.location.href = "login.html#signin"
    }

    if (identity.indexOf('editor') == -1) {
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
        } else {
            swal('请选择学术水平');
            return;
        }

        if (document.getElementById("optionsRadios21").checked) {
            academic_innovation = "有"
        } else if (document.getElementById("optionsRadios22").checked) {
            academic_innovation = "无"
        } else {
            swal('请选择学术/技术创新性');
            return;
        }

        if (document.getElementById("optionsRadios31").checked) {
            application_value = "高"
        } else if (document.getElementById("optionsRadios32").checked) {
            application_value = "一般"
        } else if (document.getElementById("optionsRadios33").checked) {
            application_value = "低"
        } else {
            swal('请选择应用价值');
            return;
        }

        if (document.getElementById("optionsRadios41").checked) {
            paper_write = "有"
        } else if (document.getElementById("optionsRadios42").checked) {
            paper_write = "无"
        } else {
            swal('请选择论文写作规范');
            return;
        }

        if (document.getElementById("optionsRadios51").checked) {
            abstract_write = "高"
        } else if (document.getElementById("optionsRadios52").checked) {
            abstract_write = "一般"
        } else if (document.getElementById("optionsRadios53").checked) {
            abstract_write = "低"
        } else {
            swal('请选择英文摘要写作水平');
            return;
        }


        if(manu_status=='请选择...'){
            swal('请选择审稿状态');
            return false
        }

        if(comment_text==''){
            swal('请填写审稿意见');
            return false
        }

        if(comment_text.length < 100){
            swal('您填写意见少于100字符');
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


    $('#audited-table').on('click', "div.comment-get", function() {
        var docu_id = $(this).parent().prev().prev().text();
        $.ajax({
            type: "Get",
            url: url +"Document/getpaperopinion?docu_id="+docu_id,
            // url: "json/opinion.json",
            // data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.audit_opinion.length>0) {
                    opinion_dict = JSON.parse(data.audit_opinion);
                    if(opinion_dict.length == 0) {
                        swal("出现问题", data.info, "error");
                        return false;
                    }
                    for(var key in opinion_dict) {
                        opinion_str = opinion_dict[key];
                        opinion = JSON.parse(opinion_str);
                        manu_status = opinion["manu_status"];
                        abstract_write = opinion["abstract_write"];
                        academic_innovation = opinion["academic_innovation"];
                        academic_level = opinion["academic_level"];
                        application_value = opinion["application_value"];
                        paper_write = opinion["paper_write"];
                        comment_text = opinion["comment_text"];


                        switch(academic_level) {
                            case "高":
                                document.getElementById("optionsRadios111").checked = true;
                                break;
                            case "较高":
                                document.getElementById("optionsRadios112").checked = true;
                                break;
                            case "一般":
                                document.getElementById("optionsRadios113").checked = true;
                                break;
                            case "较低":
                                document.getElementById("optionsRadios114").checked = true;
                                break;
                            case "低":
                                document.getElementById("optionsRadios115").checked = true;
                                break;
                        }

                        switch(academic_innovation) {
                            case "有":
                                document.getElementById("optionsRadios121").checked = true;
                                break;
                            case "无":
                                document.getElementById("optionsRadios122").checked = true;
                                break;
                        }

                        switch(application_value) {
                            case "高":
                                document.getElementById("optionsRadios131").checked = true;
                                break;
                            case "一般":
                                document.getElementById("optionsRadios132").checked = true;
                                break;
                            case "低":
                                document.getElementById("optionsRadios133").checked = true;
                                break;
                        }

                        switch(paper_write) {
                            case "有":
                                document.getElementById("optionsRadios141").checked = true;
                                break;
                            case "无":
                                document.getElementById("optionsRadios142").checked = true;
                                break;
                        }

                        switch(abstract_write) {
                            case "高":
                                document.getElementById("optionsRadios151").checked = true;
                                break;
                            case "一般":
                                document.getElementById("optionsRadios152").checked = true;
                                break;
                            case "低":
                                document.getElementById("optionsRadios153").checked = true;
                                break;
                        }

                        $('#show-comment-status').attr("value", manu_status);
                        $('#show-comment-opinion').html(comment_text);

                    }
                } else {
                    swal("出现问题", data.info, "error");
                    return false;
                }
            },
            error: function () {
                swal('网路不给力，请稍候再试');
            }
        });
        $('#showCommentModal').modal()
    });
});