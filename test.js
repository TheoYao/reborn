$(document).ready(function() {
    //$("#slider-with-video").on('click', function(){});
    var left_index = 0;
    makeLeftFly();
    function makeLeftFly() {
        var left_items = $(".myFlyin");
        //$(left_items[left_index]).css({"display": "inline-block"});
        for(var i=0; i<left_items.length; i++) {
            $(left_items[i]).css({height:"50px", width:"50px", left:"520px",top:"200px", "z-index" :"1", opacity: 0.5});
        }
        $(left_items[left_index]).css("z-index", 99);
        $(left_items[left_index]).animate(
            {height:"300px", width:"300px",left:"100px", top:"100px",opacity: 1},
            500);

        var right_items = $(".myFlyout");
        //$(left_items[left_index]).css({"display": "inline-block"});
        for(var i=0; i<right_items.length; i++) {
            $(right_items[i]).css({height:"50px", width:"50px", right:"520px",top:"200px", "z-index" :"1", opacity: 0.5});
        }
        $(right_items[left_index]).css("z-index", 99);
        $(right_items[left_index]).animate(
            {height:"300px", width:"300px",right:"100px", top:"100px",opacity: 1},
            500);

        left_index  = left_index+1;
        left_index = left_index % left_items.length;
        timer = setTimeout(function() {
            makeLeftFly();
        }, 1500);
    }

});
