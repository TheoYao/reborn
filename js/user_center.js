$(document).ready(function() {
//添加更多作者
    $('#modal-add-author').on('click', function () {
        var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        var addName = $.trim($('#summary_input_more_author_name').val());
        var addPing = $.trim($('#summary_input_more_spell').val());
        var addEmail = $.trim($('#summary_input_more_email').val());
        var addCompany = $.trim($('#summary_input_more_unit').val());
        if(addName==''){
            alert('请填写作者姓名');
            return false
        }
        if(addPing==''||(/[\u4E00-\u9FA5\uF900-\uFA2D]/).test(addPing)){
            alert('请填写作者拼音');
            return false
        }
        if(addEmail==''||!(emailReg.test(addEmail))){
            alert('请填写作者邮箱');
            return false
        }
        if(addCompany==''){
            alert('请填写作者地址');
            return false
        }
        $('.more-author-list').append('<span class="more-author-item" data-name='+addName+' data-ping='+addPing+' data-email='+addEmail+' data-company='+addCompany+'>'+addName+'</span>')
        if (typeof($("#more-author-show").attr("value"))=="undefined") {
            $('#more-author-show').attr("value", addName)
        }
        else {
            $('#more-author-show').attr("value", $('#more-author-show').attr("value")+";"+addName)
        }

        clearModal();
    });
    function clearModal() {
        $('#summary_input_more_author_name').val("");
        $('#summary_input_more_spell').val("");
        $('#summary_input_more_email').val("");
        $('#summary_input_more_unit').val("");
        $('#myModal').modal('hide');
    }


    $('#btn-submit-summary').on('click', function () {
        var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        // var file = $('[type="file"]').get(0).files[0];
        // var fileSrc = $("input[name=fileString]").val();
        var fileSrc = $("input[name=fileString]")[0].files[0];
        var chineseTitle = $.trim($('#summary_input_cn_title').val());
        var englishTitle = $.trim($('#summary_input_egls_title').val());
        var keyChinese = $.trim($('#summary_input_cn_kwd').val());
        var keyEnglish = $.trim($('#summary_input_egls_kwd').val());
        var theme = $.trim($('#summary_input_topic option:selected').val());
        var authorName = $('#summary_input_author_name').val();
        var authorPing = $.trim($('#summary_input_author_spell').val());
        var authorEmail = $.trim($('#summary_input_email').val());
        var authorCompany = $.trim($('#summary_input_unit').val());
        var remarks = $.trim($('#summary_submit_remark').val());

        var author = [{
            authorName: authorName,
            authorPing: authorPing,
            authorEmail: authorEmail,
            authorCompany: authorCompany
        }];
        var moreAuthor = $('.more-author-item');
        moreAuthor.each(function (i) {
            var item={};
            var addName=  $(this).attr('data-name');
            var addPing=  $(this).attr('data-ping');
            var addEmail=  $(this).attr('data-email');
            var addCompany=  $(this).attr('data-company');
            item.authorName =addName;
            item.authorPing =addPing;
            item.authorEmail =addEmail;
            item.authorCompany =addCompany;
            author.push(item);
        });
        var fileAccept = fileSrc.name.split(".")[1];//获取上传文件的后缀
        if( fileAccept!="doc" && fileAccept!="docx" ){
            $('.val-apply-file').html("只能上传.doc和.docx的文件！");
        }


        if(!/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(chineseTitle)){
            $('.chinese-tit-error').html('请填写中文标题');
            return false
        }
        if(!(/[\u4E00-\u9FA5\uF900-\uFA2D]||\，*||\,*/.test(keyChinese))){
            $('.chinese-tit-error').html('请填写不错过5个关键字，以逗号隔开');
            return false
        }
        if(authorName==''){
            $('.apply-name-error').html('请填写作者姓名');
            return false
        }
        if(authorPing==''||/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(authorPing)){

            $('.apply-ping-error').html('请填写作者拼音');
            return false
        }
        if(authorEmail==''||!(emailReg.test(authorEmail))){
            $('.apply-email-error').html('请填写作者邮箱');
            return false
        }
        if(authorCompany==''){
            $('.apply-name-error').html('请填写作者地址');
            return false
        }
        var data = new FormData();
        data.append('username', username);
        data.append('fileSrc', fileSrc);
        data.append('chineseTitle', chineseTitle);
        data.append('englishTitle', englishTitle);
        data.append('keyChinese', keyChinese);
        data.append('keyEnglish', keyEnglish);
        data.append('theme', theme);
        data.append('author', JSON.stringify(author));
        data.append('remarks', remarks);
        $.ajax({
            type: "POST",
            url: url +"Document/submit",
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.status == 1) {
                    alert('提交成功，请等待审核');
                    // window.location.reload();
                    window.location.href='/app/Tpl/Form/user.html'
                } else {
                    // $('.user-person-apply').append('<div class="pwd-error">'+data.info+'</div>');
                    alert(data.info);
                    return false;
                }
            },
            error: function () {
                alert('网路不给力，请稍候再试');
            }
        })
    });
})
