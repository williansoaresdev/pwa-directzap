/**
 * Código motor da aplicação
*/

(function(){
    $(document).ready(function(){
        setTimeout(function(){
            $("#splashScreen").slideUp("normal",function(){
                $("#mainScreen").fadeIn("normal",function(){
                    $("#phoneNumber").focus();
                });
            });
        }, 2000);
    });
})();