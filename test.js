$(document).ready(function() {
    //$("#slider-with-video").on('click', function(){});
    var left_index = 0;
    makeLeftFly();
    function makeLeftFly() {
        var left_items = $(".myFlyin");
        for(var i=0; i<left_items.length; i++) {
            if (i==left_index || i == (left_index+1)%left_items.length){
                continue
            }
            $(left_items[i]).css({height:"50px", width:"50px", left:"520px",top:"200px", "z-index" :"1", opacity: 0.5});
        }
        $(left_items[left_index]).css("z-index", 99);
        $(left_items[left_index]).animate(
            {height:"300px", width:"300px",left:"100px", top:"100px",opacity: 1},
            500);

        $(left_items[(left_index+1)%left_items.length]).css("z-index", 98);
        $(left_items[(left_index+1)%left_items.length]).animate(
            {height:"200px", width:"200px",left:"350px", top:"150px",opacity: 0.8},
            500);


        var right_items = $(".myFlyout");
        //$(left_items[left_index]).css({"display": "inline-block"});
        for(var i=0; i<right_items.length; i++) {
            if (i==left_index || i == (left_index+1)%right_items.length){
                continue
            }
            $(right_items[i]).css({height:"50px", width:"50px", right:"520px",top:"200px", "z-index" :"1", opacity: 0.5});
        }
        $(right_items[left_index]).css("z-index", 99);
        $(right_items[left_index]).animate(
            {height:"300px", width:"300px",right:"100px", top:"100px",opacity: 1},
            500);

        $(right_items[(left_index+1)%right_items.length]).css("z-index", 98);
        $(right_items[(left_index+1)%right_items.length]).animate(
            {height:"200px", width:"200px",right:"350px", top:"150px",opacity: 0.8},
            500);

        left_index  = left_index+1;
        left_index = left_index % left_items.length;
        timer = setTimeout(function() {
            makeLeftFly();
        }, 1500);
    }

});
