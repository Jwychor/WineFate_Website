define(['methods','jquery','swal'], function(methods,$,swal) {
    
    $("#startbtn").click(methods.testStart);

    $("#response1").click({param1: "1"}, methods.listHandler);
    $("#response2").click({param1: "2"}, methods.listHandler);
    $("#response3").click({param1: "3"}, methods.listHandler);
    $("#response4").click({param1: "4"}, methods.listHandler);
    $("#response5").click({param1: "5"}, methods.listHandler);

    $("#next").click({param2: "next"}, methods.testMethod);
    $("#back").click({param2: "back"}, methods.testMethod);

    $("#submitbtn").click(methods.enter);
    $("#refresh").click(function(){
        location.reload();
    });
})