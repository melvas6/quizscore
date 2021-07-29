$(document).ready(function(){
    var val;
    var plu;
    $("nav").find("em").click(function(e){
        e.stopPropagation();
        val = parseInt($(this).closest("div").find("span").text());
        plu = parseInt($(this).text());
        let tot = val + plu
        $(this).closest("div").find("span")  
        let id=$(this).closest("div").find("span").attr('id')
        dbRef.update({
            [id] : tot
        })
        $(this).closest("div").find("span").html(val+plu);
        //Mostly appropriated from https://codepen.io/shivasurya/pen/FatiB
        $(this).closest("div").find("span").each(function () {
            $(this).closest("div").find("span").prop('Counter',val).animate({
                Counter: $(this).closest("div").find("span").text()
            }, {
                duration: Math.abs(45*plu),
                easing: 'swing',
                step: function (now) {
                    $(this).closest("div").find("span").text(Math.ceil(now));
                }
            });
        });
        val = val+plu;
        let arr=[]
        $(this).closest("div").siblings().find("span").map((i,el)=>arr[i]=el.innerHTML)
        let min = Math.min( ...arr )
        let max = Math.max( ...arr );
        if(val>max){
            let ele = $(this).closest("div").siblings().filter(function(){
                // Chrome returns "rgb(255, 102, 0)" instead of "#FF6600"
            if($(this).css('border-color') === "rgb(255, 0, 0)")
            return $(this)
            });
            $(this).closest("div").siblings().not(ele).css("border-color","#151515")
            $(this).closest("div").css("border-color","yellow");
        }else if(min>val){
            let ele = $(this).closest("div").siblings().filter(function(){
            // Chrome returns "rgb(255, 102, 0)" instead of "#FF6600"
            if($(this).css('border-color') === "rgb(255, 255, 0)")
            return $(this)
        });
            $(this).closest("div").siblings().not(ele).css("border-color","#151515") 
            $(this).closest("div").css("border-color","red");
        }
    });
})