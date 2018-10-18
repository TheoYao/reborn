$(document).ready(function() {
    var url = "http://ndac.env.tsinghua.edu.cn/app/index.php/";
    var username = '';
    var identity = '';
    if($.cookie('cookie_info')){
        username =JSON.parse($.cookie('cookie_info')).username;
        identity =JSON.parse($.cookie('cookie_info')).identity;

    }else {
        window.location.href = "login.html#signin";
    }
    if(identity.indexOf('editor') == -1){
        $("#audit-nav-button").remove();
    } else {
        window.location.href = "audit.html?time=1539829088.html";
    }
    //出生日期
    $('.form_datetime').datetimepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        minView: 2,
        pickerPosition: "bottom-left"
    });

    var schoolData =[
        '清华大学','北京大学', '北京工业大学', '北京航空航天大学',
        '北京化工大学', '北京交通大学', '北京科技大学', '北京理工大学', '北京林业大学', '北京师范大学', '成都理工大学',
        '大连大学', '大连工业大学', '大连海事大学', '大连交通大学', '大连理工大学', '大连理工大学盘锦校区',
        '电子科技大学', '东北大学', '东北大学秦皇岛分校', '东北林业大学', '东北农业大学', '东北师范大学', '东华大学', '东南大学',
        '福州大学', '复旦大学', '广西大学', '广西师范大学', '广州大学', '贵州大学', '桂林理工大学', '哈尔滨工程大学',
        '哈尔滨工业大学', '哈尔滨工业大学(威海)', '海南大学', '合肥工业大学', '河北工业大学',
        '河北科技大学', '河海大学', '河南大学', '湖南大学', '湖南师范大学', '华北电力大学(保定)', '华北电力大学(北京)',
        '华东理工大学', '华东师范大学', '华南理工大学', '华南师范大学', '华中科技大学', '华中农业大学', '华中师范大学',
        '吉林大学', '暨南大学', '江南大学',
        '江苏大学', '解放军防化学院', '昆明理工大学', '兰州大学',
        '兰州交通大学', '辽宁大学', '辽宁工程技术大学', '辽宁石油化工大学', '南昌大学',
        '南京大学', '南京工业大学', '南京理工大学', '南京林业大学', '南京农业大学', '南京师范大学',
        '南开大学', '内蒙古大学', '内蒙古科技大学',
        '宁夏大学', '青岛大学', '青海大学', '厦门大学', '山东大学', '山东大学威海分校',
        '山西大学', '陕西师范大学', '上海大学', '上海交通大学', '上海理工大学', '沈阳大学',
        '沈阳化工大学', '沈阳建筑大学', '沈阳理工大学', '沈阳农业大学', '石河子大学', '四川大学', '四川农业大学',
        '苏州大学', '苏州科技学院', '太原理工大学', '天津城市建设学院',
        '天津大学', '天津工业大学', '同济大学', '武汉大学', '武汉纺织大学', '武汉工程大学', '武汉理工大学',
        '西安建筑科技大学', '西安交通大学', '西北大学', '西北工业大学', '西北农林科技大学', '西藏大学', '西南大学',
        '西南交通大学', '新疆大学', '延边大学', '云南大学', '长安大学', '长江大学',
        '浙江大学', '浙江工商大学', '浙江工业大学', '郑州大学', '中国地质大学(北京)', '中国地质大学(武汉)',
        '中国海洋大学', '中国环境科学研究院', '中国科学技术大学', '中国科学院成都山地灾害与环境研究所',
        '中国科学院城市环境研究所', '中国科学院大气物理研究所', '中国科学院地理科学与资源研究所', '中国科学院地球化学研究所',
        '中国科学院地球化学研究所', '中国科学院东北地理与农业生态研究所',
        '中国科学院广州地球化学研究所', '中国科学院广州能源研究所', '中国科学院海洋研究所',
        '中国科学院南海海洋研究所', '中国科学院南京地理与湖泊研究所',
        '中国科学院南京土壤研究所', '中国科学院上海高等研究院', '中国科学院沈阳应用生态研究所',
        '中国科学院生态环境研究中心', '中国科学院水生生物研究所',
        '中国科学院西北高原生物研究所', '中国科学院西北生态环境资源研究院',
        '中国科学院新疆生态与地理研究所', '中国矿业大学', '中国矿业大学(北京)', '中国农业大学',
        '中国农业科学院', '中国人民大学',
        '中国石油大学(北京)', '中国石油大学(华东)', '中国药科大学',
        '中南财经政法大学', '中南大学', '中山大学', '中央财经大学', '中央民族大学', '重庆大学', '重庆工商大学',
        '中国林业研究院', '中国林业科学院', '中国科学院大学'

    ];
    initData(schoolData);
    function initData(data) {
        var str='';
        for(var i=0;i<data.length;i++){
            // str+='<option  selected="selected">'+data[0]+'</option>';
            str+='<option>'+data[i]+'</option>';

        }
        $('#personal_info_input_school').html(str);

    };

    fillPersonInfo();
    function fillPersonInfo() {
        $.ajax({
            type: "GET",
            url: url+"Form/getUserInfo",
            data: {
                username: username
            },
            dataType: 'json',
            success: function (data) {
                $('.selectpicker').selectpicker('refresh');
                if (data.status == 1) {
                    var curData = data.data;
                    $("#personal_info_input_username").attr("value", curData["username"]);
                    $("#personal_info_input_mail").attr("value", curData["email"]);
                    $("#personal_info_input_name").attr("value", curData["stuName"]);
                    if (curData["sex"] == "男") {
                        $("button[data-id='personal_info_input_sex']").attr("title", "男");
                        $("button[data-id='personal_info_input_sex'] .filter-option").text("男")
                    }
                    else if (curData["sex"] == "女"){
                        $("button[data-id='personal_info_input_sex']").attr("title", "女");
                        $("button[data-id='personal_info_input_sex'] .filter-option").text("女")
                    }
                    else {
                        $("button[data-id='personal_info_input_sex']").attr("title", "");
                        $("button[data-id='personal_info_input_sex'] .filter-option").text("")
                    }


                    $("#personal_info_input_birth").attr("value", curData["birthDate"]);

                    $("button[data-id='personal_info_input_school']").attr("title", curData["school"]);
                    $("button[data-id='personal_info_input_school'] .filter-option").text(curData["school"]);

                    if (curData["userID"] != "") {
                        $("#personal_info_input_stuno").attr("value", curData["userID"]);
                    }
                    else{
                        $("#personal_info_input_stuno").attr("placeholder", "暂无");
                    }
                    $("#personal_info_input_stuno").attr("value", curData["userID"]);
                    $("#personal_info_input_docno").attr("value", curData["docName"]);
                    $("#personal_info_mobile").attr("value", curData["phone"]);
                    $("#personal_info_input_addr").attr("value", curData["address"]);


                    /*填充tips*/
                    $("#school_name").text(curData["school"]);
                    $("#person_name").text(curData["stuName"]);
                    if (curData["school"] == "" || curData["stuName"] == "") {
                        $(".welcome-tips-item").remove();
                    };

                } else {
                    swal(data.info);
                    return false;
                }

            },
            complete: function () {

            },
            error: function () {
                swal('对不起，当前服务器开小差，请稍候再试', '', "error")
            }

        });
    }

    var isAbstractAc = false;
    contribution(username);
    function contribution(username) {
        //请求稿件查询列表
        $.ajax({
            type: "POST",
            url:  url +"Document/show",
            data: {
                username: username,
                type: 'all'
            },
            /*type: "GET",
            url: "./json/show_product.json",
            dataType: 'json',*/
            success: function (res) {
                if(res.status==1){
                    var data = res.data;
                    var ele =$('#manu-check-table');
                    if(data.length>0) {
                        if (data[0].status==3) {
                            isAbstractAc = true;
                        }
                        renderManuList(data);
                    }
                    else{
                        IsInfoTableEmpty();
                    }
                }else {
                    console.log(res.info);
                }
            }

        });

    }
    function renderManuList(data){
        var aimStr = "";
        for (i=0; i<data.length; i++){
            var curData = data[i];
            var curTitle = curData["chineseTitle"];
            if (curTitle == null) {
                curTitle = curData["englishTitle"];
            }
            var curDate = curData["create_time"].split(" ")[0];
            var curDocuId = curData["docu_id"];
            if (i%2 == 1){
                aimStr += "<div class=\"manu-item manu-item-even\" docuid="+curDocuId+"><div class=\"manu-item-title\">"+curTitle+"</div><div class=\"manu-item-date\">"+curDate+"</div></div>"
            }
            else {
                aimStr += "<div class=\"manu-item manu-item-odd\" docuid="+curDocuId+"><div class=\"manu-item-title\">"+curTitle+"</div><div class=\"manu-item-date\">"+curDate+"</div></div>"
            }
        }
        ele = $("#manu-check-table");
        ele.html(aimStr);

        return
    }

    //添加更多作者
    $('#modal-add-author').on('click', function () {
        var emailReg=/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        var addName = $.trim($('#summary_input_more_author_name').val());
        var addPing = $.trim($('#summary_input_more_spell').val());
        var addEmail = $.trim($('#summary_input_more_email').val());
        var addCompany = $.trim($('#summary_input_more_unit').val());
        var isCommuAuthor =document.getElementById("toggle-button").checked;
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
        if(isCommuAuthor){
            addName = addName + "(通讯作者)"
        }
        $('.more-author-list').append('<span class="more-author-item" data-name='+addName+' data-ping='+addPing+' data-email='+addEmail+' data-company='+addCompany+'>'+addName+'</span>')
        if (!$("#more-author-show").attr("value")) {
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
        document.getElementById("toggle-button").checked = false;
        $('#myModal').modal('hide');
    }

    $("#clear-more-author").on('click', function () {
        $(".more-author-list").empty();
        $('#more-author-show').attr("value", "");
    });

    $('#btn-submit-summary').on('click', function () {
        var emailReg=/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
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
        var fileArray = fileSrc.name.split(".");//获取上传文件的后缀
        var fileAccept = fileArray[fileArray.length - 1]
        if( fileAccept!="doc" && fileAccept!="docx" ){
            swal("只能上传.doc和.docx的文件！");
        }


        if(!/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(chineseTitle)){
            swal('请填写中文标题');
            return false
        }
        if(!(/[\u4E00-\u9FA5\uF900-\uFA2D]||\，*||\,*/.test(keyChinese))){
            swal('请填写不过超过5个关键字，以逗号隔开');
            return false
        }
        if(authorName==''){
            swal('请填写作者姓名');
            return false
        }
        if(authorPing==''||/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(authorPing)){
            swal('请填写作者拼音');
            return false
        }
        if(authorEmail==''||!(emailReg.test(authorEmail))){
            swal('请填写作者邮箱');
            return false
        }
        if(authorCompany==''){
            swal('请填写作者地址');
            return false
        }

        swal(
            {
                title: "确定提交吗？",
                text: "每人只能提交一份稿件，提交后信息将无法修改！",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定提交",
                closeOnConfirm: false
            }, function(){
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
                            swal("提交成功！", "请等待审核。", "success");
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
    });

    $('#btn-submit-personal-info').on('click', function () {
        var userName = $.trim($('#personal_info_input_username').val());

        var email = $.trim($('#personal_info_input_mail').val());

        var stuName = $.trim($('#personal_info_input_name').val());
        if(stuName=='') {
            swal('请填写姓名');
            return false
        }

        var sex = $("button[data-id='personal_info_input_sex']").attr("title");
        if(sex=='') {
            swal('请选择性别');
            return false
        }

        var birthDate = $('#personal_info_input_birth').val();

        var school = $("button[data-id='personal_info_input_school']").attr("title");
        if(school=='') {
            swal('请选择学校');
            return false
        }

        var userId = $.trim($('#personal_info_input_stuno').val());

        var docName = $.trim($('#personal_info_input_docno').val());
        if(docName=='') {
            swal('请输入导师姓名');
            return false
        }

        var phone = $.trim($('#personal_info_mobile').val());
        if(phone=='') {
            swal('请输入手机号');
            return false
        }

        //地址拼接
        var address = $.trim($('#personal_info_input_addr').val());
        if(address=='') {
            swal('请输入地址');
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
                $.ajax({
                    type: "POST",
                    url: url+"Form/editUserInfo",
                    data: {
                        username: userName,
                        email: email,
                        sex: sex,
                        birthDate: birthDate,
                        school: school,
                        userID: userId,
                        stuName: stuName,
                        docName: docName,
                        phone: phone,
                        address: address
                    },
                    dataType: 'json',
                    beforeSend: function () {
                        $('#btn-submit-personal-info').css({"background": "rgba(11,11,11,0.1)"});

                    },
                    success: function (data) {
                        if (data.status == 1) {
                            swal('修改成功', "","success");
                            window.location.reload();

                        } else {
                            swal(data.info);
                            return false;
                        }

                    },
                    complete: function () {

                    },
                    error: function () {
                        swal('对不起，当前服务器开小差，请稍候再试', '', "error")
                    }
                });
            });
    });

    $('#btn-submit-modify-pwd').on('click', function () {
        var oldPwd = $('#modify_password_input_ori').val();
        var newPwd = $('#modify_password_input_new').val();
        var cPwd = $('#modify_password_input_again').val();

        if(oldPwd.length<6 || oldPwd == ''){
            swal('请填写你原来的密码');
            return false;
        }
        if(newPwd.length<6 || newPwd == ''){
           swal('请设置6位以上的密码');
            return false;
        }
        if(cPwd != newPwd || cPwd==''){
            swal('请再次确认你的密码');
            return false;
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
                $.ajax({
                    type: "POST",
                    url: url +"Form/modifyPassword",
                    data: {
                        username: username,
                        oldPwd: oldPwd,
                        newPwd: newPwd
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 1) {
                            swal({
                                    title: "设置成功",
                                    type: "success",
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "确定",
                                    closeOnConfirm: false
                                }, function() {
                                $.cookie('cookie_info', '', {expires: -1});
                                window.location.href = "http://ndac.env.tsinghua.edu.cn/app/Mainpage/login.html";
                            })
                        } else {
                            swal("修改失败，请重新设置");
                            return false;
                        }
                    },
                    error: function () {
                        swal('网路不给力，请稍候再试');
                    }
                })
            });

    });


    function IsInfoTableEmpty(){
        var info_center_table = $('#info-center-table');

        if (info_center_table.children().length == 0) {
            info_center_table.append($("<div class=\"manu-item manu-item-even\"><div class=\"manu-item-title\">暂无消息</div></div>"))
        }

        var manu_check_table = $('#manu-check-table');
        if (manu_check_table.children().length == 0) {
            manu_check_table.attr("isPost", "0");
            manu_check_table.append($("<div class=\"manu-item manu-item-even\"><div class=\"manu-item-title\">暂无稿件</div></div>"))
        }
        else {
            manu_check_table.attr("isPost", "1");
        }
    };


    $('.manu-check-area').on('click', "div.manu-item", function() {
        var docuid = $(this).attr("docuid");
        $.ajax({
            type: "POST",
            url:  url +"Document/showById",
            data: {
                username: username,
                docu_id: docuid
            },
            /*
            type: "GET",
            url: "./json/product_detail.json",
            dataType: 'json',
            */
            success: function (res) {
                if (res.status == 1) {
                    var data = res.data;
                    var curData = data[0];
                    $('#manuDetailModal').modal()
                    var modal_value = $(".detail-modal-content");
                    $(modal_value[0]).text(curData["docu_id"]);
                    $(modal_value[1]).text(curData["chineseTitle"]);
                    $(modal_value[2]).text(curData["englishTitle"]);
                    $(modal_value[3]).text(curData["keyChinese"]);
                    $(modal_value[4]).text(curData["keyEnglish"]);
                    $(modal_value[5]).text(curData["theme"]);
                    $(modal_value[6]).text(curData["create_time"]);
                    var manuStatus = "未知";
                    switch(curData["status"]) {
                        case "1":
                            manuStatus = "已提交，待审稿";
                            break;
                        case "2":
                            manuStatus = "审稿中";
                            break;
                        case "3":
                            manuStatus = "已接收";
                            break;
                        case "4":
                            manuStatus = "不宜采纳";
                            break;
                    }
                    $(modal_value[7]).text(manuStatus);
                    $(modal_value[8]).text("暂无审稿意见");
                    if (curData["audit_opinion"]) {
                        var trans_audit_opinion = JSON.parse(curData["audit_opinion"]);
                        if (trans_audit_opinion) {
                            $(modal_value[8]).text(trans_audit_opinion["comment_text"]);
                        }

                    }
                    $(modal_value[9]).html("<span id=\"download_abstract\" docuid="+curData["filename"]+"><a>点击下载</a></span>");
                } else {
                    console.log(res.info);
                }
            }
        })
    });

    $('#manuDetailModal').on('click', "span#download_abstract", function() {
        var cid = $(this).attr("docuid");
        window.open('http://ndac.env.tsinghua.edu.cn' + '/app/data/'+cid);
    });

    $('#acco_input_acco').on('changed.bs.select',function(e){
        if ($("button[data-id='acco_input_acco']").attr("title") == "是") {
            $("#is_acco_area").show();
        }
        else {
            $("#is_acco_area").hide();
        }
    });

    $('#reimburse_input_contact').on('changed.bs.select',function(e){
        if ($("button[data-id='reimburse_input_contact']").attr("title") == "是") {
            $("#more_air_area").show();
            $("#more_railway_area").show();
        }
        else {
            $("#more_air_area").hide();
            $("#more_railway_area").hide();
        }
    });

    $('#acco_input_area').on('changed.bs.select',function(e){
        if ($("button[data-id='acco_input_area']").attr("title") == "其他国家") {
            $("#is_acco_implement_area").show();
        }
        else {
            $("#is_acco_implement_area").hide();
        }
    });

    $('#reimburse_input_ticket_type').on('changed.bs.select',function(e){
        if ($("button[data-id='reimburse_input_ticket_type']").attr("title") == "飞机票") {
            $("#is_air_area").show();
            $("#is_railway_area").hide();
        }
        else {
            $("#is_railway_area").show();
            $("#is_air_area").hide();
        }
    });

    $('#acco_input_meal').on('changed.bs.select',function(e){
        $("#meal_more_area").hide();
        if ($("button[data-id='acco_input_meal']").attr("title") == "其他(请注明)") {
            $("#meal_more_area").show();
        }
    });

    $('.user-nav-bottom-item,.user-nav-item')
        .click(
            function(){
                var id_array = ($(this).attr("id")).split("-");
                var index = parseInt(id_array[id_array.length - 1]);


                if (index == 1) {
                    var manu_list = $("#manu-check-table");
                    if (manu_list.attr("isPost") != "0"){
                        swal("您已投稿，不能重复投稿");
                        return
                    }
                }
                if (index == 2) {
                    if (!isAbstractAc) {
                        swal("您的稿件暂未被采纳", "请及时关注稿件状态");
                        return;
                    }
                }
                if (index == 3) {
                    if(!isFulltextSubmit) {
                        swal("您尚未提交全文");
                        return;
                    }
                }
                if (index == 4) {
                    if(!isRegisterInfoSubmit) {
                        swal("您尚未注册");
                        return;
                    }
                }
                for (i = 0; i < 7; i++) {
                    var x = $("#user-center-show-body-"+i);
                    if (i == index) {
                        x.show()
                    }
                    else {
                        x.hide()
                    }
                    if (i >= 1 && i <= 4) {
                        var y = $("#user-nav-item-"+i);
                        if (i==index) {
                            y.addClass("active")
                        }
                        else {
                            y.removeClass("active")
                        }
                    }
                    else if(i>4) {
                        var y=$("#user-nav-bottom-item-"+i);
                        if (i==index) {
                            y.addClass("user-nav-bottom-item-active")
                        }
                        else {
                            y.removeClass("user-nav-bottom-item-active")
                        }
                    }
                }
                if (index == 2) {
                    if (isFulltextSubmit) {
                        return
                    }
                    index2Cal();
                }
            }
        );

    var isFulltextSubmit = false;
    var isFulltextPostBoth = false;
    var isRegisterInfoSubmit = false;
    function index2Cal() {
        isFulltextPostBoth = false;
        $('#oral_report_area').hide();
        swal(
            {
                title: "是否参与口头汇报？",
                type: "warning",
                text: "不做口头汇报，不予报销路费和住宿，并无法参加综合大奖的评选，但可以参加优秀海报奖的评选。",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "是",
                cancelButtonText: "否",
                closeOnConfirm: true
            }, function(){
                isFulltextPostBoth = true;
                $('#oral_report_area').show();
                return true;
            });
    };

    $('#btn-submit-fulltext').on('click', function () {
        var filePoster = $("input[name=filePoster]")[0].files[0];
        var fileFulltext = $("input[name=fileFulltext]")[0].files[0];
        if (filePoster == undefined) {
            swal('请上传海报');
            return;
        }

        if (isFulltextPostBoth && fileFulltext == undefined) {
            swal('请上传全文');
            return;
        }


        var isRecoVol = $("button[data-id='fulltext_reco_vol']").attr("title");
        if(isRecoVol=='请选择') {
            if (isFulltextPostBoth) {
                swal('请选择是否提交至全文集');
                return false
            }
            else {
                isRecoVol = "";
            }
        }


        var isRecoCol = $("button[data-id='fulltext_reco_col']").attr("title");
        if(isRecoCol=='FESE: Frontiers of Environmental Science & Engineering') {
            if (isFulltextPostBoth) {
                swal('请选择是否提交至期刊');
                return false
            }
            else{
                isRecoCol = "";
            }
        }


        var filePosterName = filePoster.name.split(".");//获取上传文件的后缀
        var filePosterSuf = filePosterName[filePosterName.length - 1];
        if( filePosterSuf!="pptx" && filePosterSuf!="ppt" ){
            swal("只能上传.pptx和.ppt的海报！");
            return
        }
        if(filePoster.name != "poster.ppt" && filePoster.name != "poster.pptx") {
            swal("请将海报命名为poster.ppt或者poster.pptx！");
            return
        }

        var isFull = "false";

        if (isFulltextPostBoth) {
            var fileFulltextName = fileFulltext.name.split(".");//获取上传文件的后缀
            var fileFulltextSuf = fileFulltextName[fileFulltextName.length - 1];
            if( fileFulltextSuf!="doc" && fileFulltextSuf!="docx" ){
                swal("只能上传.doc和.docx的文件！");
                return
            }
            if(fileFulltext.name != "fulltext.docx" && fileFulltext.name != "fulltext.doc") {
                swal("请将全文命名为fulltext.docx或者fulltext.doc！");
                return
            }
            isFull = "true";
        }


        swal(
            {
                title: "确定提交吗？",
                text: "每人只能提交一次，提交后信息将无法修改！",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定提交",
                closeOnConfirm: false
            }, function(){
                var data = new FormData();
                data.append('username', username);
                data.append('poster', filePoster);
                data.append('fulltext', fileFulltext);
                data.append('publish', isRecoCol);
                data.append('recommend', isRecoVol);
                data.append('isFull', isFull);

                $.ajax({
                    type: "POST",
                    url: url +"Document/submitDetail",
                    data: data,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.status == 1) {
                            swal("提交成功！", "", "success");
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
    });

    fullText(username);
    function fullText(username) {
        //请求稿件查询列表
        $.ajax({
            type: "Get",
            url:  url +"Document/getDetail?username=" + username,
            /*
            data: {
                username: username,
                type: 'all'
            },
            */
            /*type: "GET",
            url: "./json/show_product.json",*/
            dataType: 'json',
            success: function (res) {
                if(res.status==1){
                    var data = res.data;
                    if (!data) {
                        return
                    }
                    var area =$('#fulltext_uploaded');
                    var upload_input_area=$('#fulltext_ready_upload');
                    var ele =$('#fulltext_download_area');
                    isFulltextSubmit = true;
                    var htmlStr = "";
                    if ("fulltext" in data) {
                        if (data["fulltext"] != "") {
                            htmlStr += "<p style=\"font-size: 20px;margin-top: 20px;\"><a href=\"http://ndac.env.tsinghua.edu.cn/"+ data["fulltext"] +"\">已上传全文（点击下载）</a></p>"
                        }
                    }
                    if ("poster" in data) {
                        if (data["poster"] != "") {
                            htmlStr += "<p style=\"font-size: 20px;\"><a href=\"http://ndac.env.tsinghua.edu.cn/"+ data["poster"] +"\">已上传海报（点击下载）</a></p>"
                        }
                    }
                    ele.html(htmlStr);
                    upload_input_area.hide();
                    area.show();

                }
            }

        });


    }


    $('#btn-submit-acco').on('click', function () {
        var name = $.trim($('#acco_input_name').val());
        if(name=='') {
            swal('请填写姓名');
            return false
        }
        var sex = $.trim($('#acco_input_sex').val());
        if(sex=='') {
            swal('请填写性别');
            return false
        }
        var school = $.trim($('#acco_input_school').val());
        if(school=='') {
            swal('请填写学校');
            return false
        }

        var area_name = $("button[data-id='acco_input_area']").attr("title");
        var area_more = $.trim($('#acco_input_more_area').val());
        if(area_name=='请选择') {
            swal('请选择国家地区');
            return false
        }
        if(area_name=='其他国家') {
            if (area_more == "") {
                swal('您选择了其他国家，请输入具体国家名称');
                return false
            }
        }

        var meal = $("button[data-id='acco_input_meal']").attr("title");
        var meal_more = $.trim($('#acco_input_meal_more').val());
        if(meal=='请选择') {
            swal('请选择饮食要求');
            return false
        }
        if(meal=='其他(请注明)') {
            if (meal_more == "") {
                swal('您选择了其他饮食要求，请具体注明');
                return false
            }
            meal = meal+";"+meal_more
        }

        var schoolTravel = $("button[data-id='acco_input_school_travel']").attr("title");
        if(schoolTravel=='游览时间是10月17日下午4点-5点') {
            swal('请选择是否参加清华园游览');
            return false
        }

        var eveParty = $("button[data-id='acco_input_eve_party']").attr("title");
        if(eveParty=='晚宴时间是10月18日晚上6点-8点半') {
            swal('请选择是否参加欢迎晚宴');
            return false
        }

        var fieldTrip = $("button[data-id='acco_input_field_trip']").attr("title");
        if(fieldTrip=='10月19日上、下午，地点暂定为碧水源集团总部等') {
            swal('请选择是否参加field trip');
            return false
        }

        var accoChoice = $("button[data-id='acco_input_acco']").attr("title");
        if(accoChoice=='京内高校请选择否，只为京外参会人员提供住宿') {
            swal('请选择是否需要提供住宿');
            return false
        }
        var idType = "";
        var idNum  = "";
        var mobile = "";
        var boardDates = "";

        if(accoChoice=='是') {
            idType = $.trim($('#acco_input_id_type').val());
            if(idType=='') {
                swal('请填写证件类型');
                return false
            }
            idNum = $.trim($('#acco_input_id_num').val());
            if(idNum=='') {
                swal('请填写证件号码');
                return false
            }
            mobile = $.trim($('#acco_input_mobile').val());
            if(mobile=='') {
                swal('请填写手机号码');
                return false
            }
            boardDates = $("button[data-id='acco_input_board_dates']").attr("title");
            if(boardDates=='请选择，可多选') {
                swal('请选择住宿日期');
                return false
            }
        }


        swal(
            {
                title: "确定提交吗？",
                text: "每人只能提交一次，提交后信息将无法修改！",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定提交",
                closeOnConfirm: false
            }, function(){
                var data = new FormData();
                data.append('username', username);
                data.append('name', name);
                data.append('sex', sex);
                data.append('school', school);
                data.append('area', area_name);
                data.append('area_more', area_more);
                data.append('is_muslim', meal);
                data.append('is_school_travel', schoolTravel);
                data.append('is_eve_party', eveParty);
                data.append('is_field_trip', fieldTrip);
                data.append('is_acco', accoChoice);
                data.append('id_type', idType);
                data.append('id_num', idNum);
                data.append('mobile', mobile);
                data.append('board_dates', boardDates);


                $.ajax({
                    type: "POST",
                    url: url +"Document/addRegisterInfo",
                    data: data,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.status == 1) {
                            swal("提交成功！", "", "success");
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
    });

    registerInfo(username);
    function registerInfo(username) {
        //请求稿件查询列表
        $.ajax({
            type: "Get",
            url:  url +"Document/getRegisterInfo?username=" + username,
            //url:  "./json/register.json",
            dataType: 'json',
            success: function (res) {
                if(res){
                    $('.selectpicker').selectpicker('refresh')
                    var curData = res;
                    if (!curData) {
                        return
                    }
                    isRegisterInfoSubmit = true;
                    $('#volumn-download-items').show();
                    var nameEle =$('#acco_input_name');
                    var sexEle=$('#acco_input_sex');
                    var schoolEle =$('#acco_input_school');
                    var areaEle=$('#acco_input_area');
                    var areaMoreEle =$('#acco_input_more_area');
                    var isMuslimEle=$('#acco_input_meal');
                    var isMuslimMoreEle=$('#acco_input_meal_more');
                    var isSchoolTravelEle =$('#acco_input_school_travel');
                    var isEvePartyEle=$('#acco_input_eve_party');
                    var isFieldTripEle =$('#acco_input_field_trip');
                    var isAccoEle=$('#acco_input_acco');
                    var idTypeEle =$('#acco_input_id_type');
                    var idNumEle=$('#acco_input_id_num');
                    var mobileEle =$('#acco_input_mobile');
                    var boardDatesEle=$('#acco_input_board_dates');



                    nameEle.attr("value", curData["name"]);
                    if (curData["sex"] == "男") {
                        $("button[data-id='acco_input_sex']").attr("title", "男");
                        $("button[data-id='acco_input_sex'] .filter-option").text("男")
                    }
                    else if (curData["sex"] == "女"){
                        $("button[data-id='acco_input_sex']").attr("title", "女");
                        $("button[data-id='acco_input_sex'] .filter-option").text("女")
                    }
                    else {
                        $("button[data-id='acco_input_sex']").attr("title", "");
                        $("button[data-id='acco_input_sex'] .filter-option").text("")
                    }
                    schoolEle.attr("value", curData["school"]);
                    if (curData["area"] == "中国大陆") {
                        $("button[data-id='acco_input_area']").attr("title", "中国大陆");
                        $("button[data-id='acco_input_area'] .filter-option").text("中国大陆")
                    }
                    else if (curData["area"] == "中国香港"){
                        $("button[data-id='acco_input_area']").attr("title", "中国香港");
                        $("button[data-id='acco_input_area'] .filter-option").text("中国香港")
                    }
                    else if (curData["area"] == "中国澳门"){
                        $("button[data-id='acco_input_area']").attr("title", "中国澳门");
                        $("button[data-id='acco_input_area'] .filter-option").text("中国澳门")
                    }
                    else if (curData["area"] == "中国台湾"){
                        $("button[data-id='acco_input_area']").attr("title", "中国台湾");
                        $("button[data-id='acco_input_area'] .filter-option").text("中国台湾")
                    }
                    else if (curData["area"] == "其他国家"){
                        $("button[data-id='acco_input_area']").attr("title", "其他国家");
                        $("button[data-id='acco_input_area'] .filter-option").text("其他国家")

                        areaMoreEle.attr("value", curData["area_more"]);
                        $("#is_acco_implement_area").show()
                    }


                    var is_muslim = curData["is_muslim"].split(";")[0];
                    if (is_muslim == "清真") {
                        $("button[data-id='acco_input_meal']").attr("title", "清真");
                        $("button[data-id='acco_input_meal'] .filter-option").text("清真")
                    }
                    else if (is_muslim == "素食"){
                        $("button[data-id='acco_input_meal']").attr("title", "素食");
                        $("button[data-id='acco_input_meal'] .filter-option").text("素食")
                    }
                    else if (is_muslim == "其他(请注明)"){
                        $("button[data-id='acco_input_meal']").attr("title", "其他(请注明)");
                        $("button[data-id='acco_input_meal'] .filter-option").text("其他(请注明)");

                        if (curData["is_muslim"].split(";").length > 1) {
                            isMuslimMoreEle.attr("value", curData["is_muslim"].split(";")[1]);
                            $("#meal_more_area").show()
                        }

                    }
                    else if (is_muslim == "无特别要求"){
                        $("button[data-id='acco_input_meal']").attr("title", "无特别要求");
                        $("button[data-id='acco_input_meal'] .filter-option").text("无特别要求")
                    }


                    if (curData["is_school_travel"] == "是") {
                        $("button[data-id='acco_input_school_travel']").attr("title", "是");
                        $("button[data-id='acco_input_school_travel'] .filter-option").text("是")
                    }
                    else if (curData["is_school_travel"] == "否"){
                        $("button[data-id='acco_input_school_travel']").attr("title", "否");
                        $("button[data-id='acco_input_school_travel'] .filter-option").text("否")
                    } else {
                        $("button[data-id='acco_input_school_travel']").attr("title", "");
                        $("button[data-id='acco_input_school_travel'] .filter-option").text("")
                    }


                    if (curData["is_eve_party"] == "是") {
                        $("button[data-id='acco_input_eve_party']").attr("title", "是");
                        $("button[data-id='acco_input_eve_party'] .filter-option").text("是")
                    }
                    else if (curData["is_eve_party"] == "否"){
                        $("button[data-id='acco_input_eve_party']").attr("title", "否");
                        $("button[data-id='acco_input_eve_party'] .filter-option").text("否")
                    } else {
                        $("button[data-id='acco_input_eve_party']").attr("title", "");
                        $("button[data-id='acco_input_eve_party'] .filter-option").text("")
                    }


                    if (curData["is_field_trip"] == "是") {
                        $("button[data-id='acco_input_field_trip']").attr("title", "是");
                        $("button[data-id='acco_input_field_trip'] .filter-option").text("是")
                    }
                    else if (curData["is_field_trip"] == "否"){
                        $("button[data-id='acco_input_field_trip']").attr("title", "否");
                        $("button[data-id='acco_input_field_trip'] .filter-option").text("否")
                    } else {
                        $("button[data-id='acco_input_field_trip']").attr("title", "");
                        $("button[data-id='acco_input_field_trip'] .filter-option").text("")
                    }



                    if (curData["is_acco"] == "是") {
                        $("button[data-id='acco_input_acco']").attr("title", "是");
                        $("button[data-id='acco_input_acco'] .filter-option").text("是")

                        $("#is_acco_area").show();
                        if (curData["id_type"] == "中华人民共和国居民身份证") {
                            $("button[data-id='acco_input_id_type']").attr("title", "中华人民共和国居民身份证");
                            $("button[data-id='acco_input_id_type'] .filter-option").text("中华人民共和国居民身份证")
                        }
                        else if (curData["id_type"] == "港澳居民来往内地通行证"){
                            $("button[data-id='acco_input_id_type']").attr("title", "港澳居民来往内地通行证");
                            $("button[data-id='acco_input_id_type'] .filter-option").text("港澳居民来往内地通行证")
                        }
                        else if (curData["id_type"] == "台湾居民来往大陆通行证（台胞证）"){
                            $("button[data-id='acco_input_id_type']").attr("title", "台湾居民来往大陆通行证（台胞证）");
                            $("button[data-id='acco_input_id_type'] .filter-option").text("台湾居民来往大陆通行证（台胞证）")
                        }
                        else if (curData["id_type"] == "护照"){
                            $("button[data-id='acco_input_id_type']").attr("title", "护照");
                            $("button[data-id='acco_input_id_type'] .filter-option").text("护照")
                        }

                        idNumEle.attr("value", curData["id_num"]);
                        mobileEle.attr("value", curData["mobile"]);

                        $("button[data-id='acco_input_board_dates']").attr("title", curData["board_dates"]);
                        $("button[data-id='acco_input_board_dates'] .filter-option").text(curData["board_dates"])
                    }
                    else if (curData["is_acco"] == "否"){
                        $("button[data-id='acco_input_acco']").attr("title", "否");
                        $("button[data-id='acco_input_acco'] .filter-option").text("否")
                    } else {
                        $("button[data-id='acco_input_acco']").attr("title", "");
                        $("button[data-id='acco_input_acco'] .filter-option").text("")
                    }


                    nameEle.attr('disabled',true);
                    sexEle.attr('disabled',true);
                    schoolEle.attr('disabled',true);
                    areaEle.attr('disabled',true);
                    areaMoreEle.attr('disabled',true);
                    isMuslimEle.attr('disabled',true);
                    isMuslimMoreEle.attr('disabled',true);
                    isSchoolTravelEle.attr('disabled',true);
                    isEvePartyEle.attr('disabled',true);
                    isFieldTripEle.attr('disabled',true);
                    isAccoEle.attr('disabled',true);
                    idTypeEle.attr('disabled',true);
                    idNumEle.attr('disabled',true);
                    mobileEle.attr('disabled',true);
                    boardDatesEle.attr('disabled',true);

                    $("#btn-submit-acco").hide();

                }
            }

        });


    }

    $('#btn-submit-reimburse').on('click', function () {
        var name = $.trim($('#reimburse_input_name').val());
        if(name=='') {
            swal('请填写姓名');
            return false
        }

        var is_board_evi = $("button[data-id='reimburse_input_board_evidence']").attr("title");
        if(is_board_evi=='此证明仅用于报销去程路费！参会注册时领取') {
            swal('请选择是否需要住宿证明');
            return false
        }

        var is_ticket_evi = $("button[data-id='reimburse_input_ticket_evidence']").attr("title");
        if(is_ticket_evi=='此证明仅用于报销去程路费！参会注册时领取') {
            swal('请选择是否需要票务证明');
            return false
        }

        var zhifubao = $.trim($('#reimburse_input_zhifubao').val());
        if(zhifubao=='') {
            swal('请填写支付宝账号');
            return false
        }

        var is_contact = $("button[data-id='reimburse_input_contact']").attr("title");
        if(is_contact=='请选择') {
            swal('请选择是否高校联系人');
            return false
        }

        var ticket_type = $("button[data-id='reimburse_input_ticket_type']").attr("title");
        if(ticket_type=='请选择') {
            swal('请选择车票类型');
            return false
        }


        var traffic_id = "";
        var traffic_begin = "";
        var traffic_end = "";
        var seat_type = "";
        var traffic_price = "";
        var ret_traffic_id = "";
        var ret_traffic_begin = "";
        var ret_traffic_end = "";
        var ret_seat_type = "";
        var ret_traffic_price = "";
        if(ticket_type=='飞机票') {
            traffic_id = $.trim($('#reimburse_input_air_num').val());
            if(traffic_id=='') {
                swal('请输入航班号');
                return false
            }
            traffic_begin = $.trim($('#reimburse_input_air_begin').val());
            if(traffic_begin=='') {
                swal('请输入起点（市）');
                return false
            }
            var traffic_begin_airport = $.trim($('#reimburse_input_air_begin_port').val());
            if(traffic_begin_airport=='') {
                swal('请输入起点机场名');
                return false
            }
            traffic_begin = traffic_begin + ";" + traffic_begin_airport;

            traffic_end = $.trim($('#reimburse_input_air_end').val());
            if(traffic_end=='') {
                swal('请输入终点（市）');
                return false
            }
            var traffic_end_airport = $.trim($('#reimburse_input_air_end_port').val());
            if(traffic_end_airport=='') {
                swal('请输入终点机场名');
                return false
            }
            traffic_end = traffic_end + ";" + traffic_end_airport;

            seat_type = $("button[data-id='reimburse_input_air_type']").attr("title");
            if(seat_type=='请选择') {
                swal('请选择座位类型');
                return false
            }

            traffic_price =  $.trim($('#reimburse_input_air_price').val());
            if(traffic_price=='') {
                swal('请输入金额，不含保险');
                return false
            }
        }
        else if(ticket_type=='火车票') {
            traffic_id = $.trim($('#reimburse_input_railway_num').val());
            if(traffic_id=='') {
                swal('请输入车次');
                return false
            }
            traffic_begin = $.trim($('#reimburse_input_railway_begin').val());
            if(traffic_begin=='') {
                swal('请输入起点站名');
                return false
            }

            traffic_end = $.trim($('#reimburse_input_railway_end').val());
            if(traffic_end=='') {
                swal('请输入终点站名');
                return false
            }
            seat_type = $("button[data-id='reimburse_input_railway_type']").attr("title");
            if(seat_type=='请选择') {
                swal('请选择座位类型');
                return false
            }

            traffic_price =  $.trim($('#reimburse_input_railway_price').val());
            if(traffic_price=='') {
                swal('请输入金额，不含保险');
                return false
            }
        }

        if(is_contact=='是') {
            if (ticket_type=='飞机票') {
                ret_traffic_id = $.trim($('#reimburse_input_air_num_more').val());
                if (ret_traffic_id == '') {
                    swal('请输入航班号');
                    return false
                }
                ret_traffic_begin = $.trim($('#reimburse_input_air_begin_more').val());
                if (ret_traffic_begin == '') {
                    swal('请输入起点（市）');
                    return false
                }
                var ret_traffic_begin_airport = $.trim($('#reimburse_input_air_begin_port_more').val());
                if (ret_traffic_begin_airport == '') {
                    swal('请输入起点机场名');
                    return false
                }
                ret_traffic_begin = ret_traffic_begin + ";" + ret_traffic_begin_airport;

                ret_traffic_end = $.trim($('#reimburse_input_air_end_more').val());
                if (ret_traffic_end == '') {
                    swal('请输入终点（市）');
                    return false
                }
                var ret_traffic_end_airport = $.trim($('#reimburse_input_air_end_port_more').val());
                if (ret_traffic_end_airport == '') {
                    swal('请输入终点机场名');
                    return false
                }
                ret_traffic_end = ret_traffic_end + ";" + ret_traffic_end_airport;

                ret_seat_type = $("button[data-id='reimburse_input_air_type_more']").attr("title");
                if (ret_seat_type == '请选择') {
                    swal('请选择座位类型');
                    return false
                }

                ret_traffic_price = $.trim($('#reimburse_input_air_price_more').val());
                if (ret_traffic_price == '') {
                    swal('请输入金额，不含保险');
                    return false
                }
            } else if (ticket_type=='火车票') {
                ret_traffic_id = $.trim($('#reimburse_input_railway_num_more').val());
                if(ret_traffic_id=='') {
                    swal('请输入返程车次');
                    return false
                }
                ret_traffic_begin = $.trim($('#reimburse_input_railway_begin_more').val());
                if(ret_traffic_begin=='') {
                    swal('请输入返程起点站名');
                    return false
                }

                ret_traffic_end = $.trim($('#reimburse_input_railway_end_more').val());
                if(ret_traffic_end=='') {
                    swal('请输入返程终点站名');
                    return false
                }
                ret_seat_type = $("button[data-id='reimburse_input_railway_type_more']").attr("title");
                if(ret_seat_type=='请选择') {
                    swal('请选择返程座位类型');
                    return false
                }

                ret_traffic_price =  $.trim($('#reimburse_input_railway_price_more').val());
                if(ret_traffic_price=='') {
                    swal('请输入返程金额，不含保险');
                    return false
                }
            }

        }


        swal(
            {
                title: "确定提交吗？",
                text: "每人只能提交一次，提交后信息将无法修改！",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定提交",
                closeOnConfirm: false
            }, function(){
                var data = new FormData();
                data.append('username', username);
                data.append('name', name);
                data.append('is_board_evi', is_board_evi);
                data.append('is_ticket_evi', is_ticket_evi);
                data.append('zhifubao', zhifubao);
                data.append('is_contact', is_contact);
                data.append('ticket_type', ticket_type);
                data.append('traffic_id', traffic_id);
                data.append('traffic_begin', traffic_begin);
                data.append('traffic_end', traffic_end);
                data.append('seat_type', seat_type);
                data.append('traffic_price', traffic_price);
                data.append('ret_traffic_id', ret_traffic_id);
                data.append('ret_traffic_begin', ret_traffic_begin);
                data.append('ret_traffic_end', ret_traffic_end);
                data.append('ret_seat_type', ret_seat_type);
                data.append('ret_traffic_price', ret_traffic_price);


                $.ajax({
                    type: "POST",
                    url: url +"Document/addPaymentInfo",
                    data: data,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.status == 1) {
                            swal("提交成功！", "", "success");
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
    });

    reimbuseInfo(username);
    function reimbuseInfo(username) {
        $.ajax({
            type: "Get",
            url:  url +"Document/getPaymentInfo?username=" + username,
            //url:  "./json/reimburse.json",
            dataType: 'json',
            success: function (res) {
                if(res){
                    $('.selectpicker').selectpicker('refresh');
                    var curData = res;
                    if (!curData) {
                        return
                    }
                    $('#reimburse_input_name').attr("value", curData["name"]);

                    $("button[data-id='reimburse_input_board_evidence']").attr("title", curData["is_board_evi"]);
                    $("button[data-id='reimburse_input_board_evidence'] .filter-option").text(curData["is_board_evi"]);

                    $("button[data-id='reimburse_input_ticket_evidence']").attr("title", curData["is_board_evi"]);
                    $("button[data-id='reimburse_input_ticket_evidence'] .filter-option").text(curData["is_board_evi"]);

                    $('#reimburse_input_zhifubao').attr("value", curData["zhifubao"]);

                    $("button[data-id='reimburse_input_contact']").attr("title", curData["is_contact"]);
                    $("button[data-id='reimburse_input_contact'] .filter-option").text(curData["is_contact"]);

                    $("button[data-id='reimburse_input_ticket_type']").attr("title", curData["ticket_type"]);
                    $("button[data-id='reimburse_input_ticket_type'] .filter-option").text(curData["ticket_type"]);

                    if(curData["ticket_type"]=='飞机票') {
                        var traffic_begin = "";
                        var traffic_begin_airport="";
                        if (curData["traffic_begin"].split(";").length==2) {
                            traffic_begin = curData["traffic_begin"].split(";")[0];
                            traffic_begin_airport = curData["traffic_begin"].split(";")[1];
                        }

                        var traffic_end = "";
                        var traffic_end_airport="";
                        if (curData["traffic_end"].split(";").length==2) {
                            traffic_end = curData["traffic_end"].split(";")[0];
                            traffic_end_airport = curData["traffic_end"].split(";")[1];
                        }

                        $('#reimburse_input_air_num').attr("value", curData["traffic_id"]);
                        $('#reimburse_input_air_begin').attr("value", traffic_begin);
                        $('#reimburse_input_air_begin_port').attr("value", traffic_begin_airport);
                        $('#reimburse_input_air_end').attr("value", traffic_end);
                        $('#reimburse_input_air_end_port').attr("value", traffic_end_airport);

                        $("button[data-id='reimburse_input_air_type']").attr("title", curData["seat_type"]);
                        $("button[data-id='reimburse_input_air_type'] .filter-option").text(curData["seat_type"]);

                        $('#reimburse_input_air_price').attr("value", curData["traffic_price"]);
                        if(curData["is_contact"] == "是") {
                            var ret_traffic_begin = "";
                            var ret_traffic_begin_airport="";
                            if (curData["ret_traffic_begin"].split(";").length==2) {
                                ret_traffic_begin = curData["ret_traffic_begin"].split(";")[0];
                                ret_traffic_begin_airport = curData["ret_traffic_begin"].split(";")[1];
                            }

                            var ret_traffic_end = "";
                            var ret_traffic_end_airport="";
                            if (curData["ret_traffic_end"].split(";").length==2) {
                                ret_traffic_end = curData["ret_traffic_end"].split(";")[0];
                                ret_traffic_end_airport = curData["ret_traffic_end"].split(";")[1];
                            }

                            $('#reimburse_input_air_num_more').attr("value", curData["ret_traffic_id"]);
                            $('#reimburse_input_air_begin_more').attr("value", ret_traffic_begin);
                            $('#reimburse_input_air_begin_port_more').attr("value", ret_traffic_begin_airport);
                            $('#reimburse_input_air_end_more').attr("value", ret_traffic_end);
                            $('#reimburse_input_air_end_port_more').attr("value", ret_traffic_end_airport);

                            $("button[data-id='reimburse_input_air_type_more']").attr("title", curData["ret_seat_type"]);
                            $("button[data-id='reimburse_input_air_type_more'] .filter-option").text(curData["ret_seat_type"]);

                            $('#reimburse_input_air_price_more').attr("value", curData["ret_traffic_price"]);
                            $("#more_air_area").show()
                        }

                        $("#is_air_area").show()
                    }
                    else if(curData["ticket_type"]=='火车票') {
                        var traffic_begin = curData["traffic_begin"];
                        var traffic_end = curData["traffic_end"];

                        $('#reimburse_input_railway_num').attr("value", curData["traffic_id"]);
                        $('#reimburse_input_railway_begin').attr("value", traffic_begin);
                        $('#reimburse_input_railway_end').attr("value", traffic_end);

                        $("button[data-id='reimburse_input_railway_type']").attr("title", curData["seat_type"]);
                        $("button[data-id='reimburse_input_railway_type'] .filter-option").text(curData["seat_type"]);

                        $('#reimburse_input_railway_price').attr("value", curData["traffic_price"]);
                        if(curData["is_contact"] == "是") {
                            var ret_traffic_begin = curData["ret_traffic_begin"];
                            var ret_traffic_end = curData["ret_traffic_end"];

                            $('#reimburse_input_railway_num_more').attr("value", curData["ret_traffic_id"]);
                            $('#reimburse_input_railway_begin_more').attr("value", ret_traffic_begin);
                            $('#reimburse_input_railway_end_more').attr("value", ret_traffic_end);

                            $("button[data-id='reimburse_input_railway_type_more']").attr("title", curData["ret_seat_type"]);
                            $("button[data-id='reimburse_input_railway_type_more'] .filter-option").text(curData["ret_seat_type"]);

                            $('#reimburse_input_railway_price_more').attr("value", curData["ret_traffic_price"]);
                            $("#more_railway_area").show()
                        }

                        $("#is_railway_area").show()
                    }


                    $('#reimburse_input_name').attr('disabled',true);
                    $('#reimburse_input_board_evidence').attr('disabled',true);
                    $('#reimburse_input_ticket_evidence').attr('disabled',true);
                    $('#reimburse_input_zhifubao').attr('disabled',true);
                    $('#reimburse_input_contact').attr('disabled',true);
                    $('#reimburse_input_ticket_type').attr('disabled',true);
                    $('#reimburse_input_air_num').attr('disabled',true);
                    $('#reimburse_input_air_begin').attr('disabled',true);
                    $('#reimburse_input_air_begin_port').attr('disabled',true);
                    $('#reimburse_input_air_end').attr('disabled',true);
                    $('#reimburse_input_air_end_port').attr('disabled',true);
                    $('#reimburse_input_air_type').attr('disabled',true);
                    $('#reimburse_input_air_price').attr('disabled',true);
                    $('#reimburse_input_air_num_more').attr('disabled',true);
                    $('#reimburse_input_air_begin_more').attr('disabled',true);
                    $('#reimburse_input_air_begin_port_more').attr('disabled',true);
                    $('#reimburse_input_air_end_more').attr('disabled',true);
                    $('#reimburse_input_air_end_port_more').attr('disabled',true);
                    $('#reimburse_input_air_type_more').attr('disabled',true);
                    $('#reimburse_input_air_price_more').attr('disabled',true);
                    $('#reimburse_input_railway_num').attr('disabled',true);
                    $('#reimburse_input_railway_begin').attr('disabled',true);
                    $('#reimburse_input_railway_end').attr('disabled',true);
                    $('#reimburse_input_railway_type').attr('disabled',true);
                    $('#reimburse_input_railway_price').attr('disabled',true);
                    $('#reimburse_input_railway_num_more').attr('disabled',true);
                    $('#reimburse_input_railway_begin_more').attr('disabled',true);
                    $('#reimburse_input_railway_end_more').attr('disabled',true);
                    $('#reimburse_input_railway_type_more').attr('disabled',true);
                    $('#reimburse_input_railway_price_more').attr('disabled',true);

                    $("#btn-submit-reimburse").hide();

                }
            }

        });


    }

});
