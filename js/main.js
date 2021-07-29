/**
 * Código motor da aplicação
*/

(function(){
    $(document).ready(function(){
        setTimeout(function(){
            $("#splashScreen").slideUp("normal",function(){
                $("#mainScreen").fadeIn("normal",function(){

                    var validNumber = function(number) {
                        if ((number.length < 10) || (number.length > 11)) {
                            $("#phoneNumber").addClass("bordered");
                            $("#phoneNumber").focus();
                            return false;
                        }

                        return true;
                    }

                    $("#btnJustGo").click(function(){

                        var newNumber = $.trim($("#phoneNumber").val());

                        if (!validNumber(newNumber))
                            return;

                        $("#phoneNumber").attr("disabled","true");
                        $("#btnMemoGo").attr("disabled","true");
                        $("#btnJustGo").attr("disabled","true");

                    });

                    $("#phoneNumber").focus();
                });
            });
        }, 2000);
    });
})();