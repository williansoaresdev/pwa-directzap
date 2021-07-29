/**
 * Código motor da aplicação
*/

(function(){
    $(document).ready(function(){
        setTimeout(function(){
            $("#splashScreen").slideUp("normal",function(){
                $("#mainScreen").fadeIn("normal",function(){

                    var noMask = function(content) {
                        return content.replace(/\D/g, '');
                    }

                    var validNumber = function(number) {
                        $("#phoneNumber").removeClass("bordered");

                        if ((number.length < 10) || (number.length > 11)) {
                            $("#phoneNumber").addClass("bordered");
                            $("#phoneNumber").focus();
                            return false;
                        }

                        return true;
                    }

                    var triggerCall = function() {
                        $("#phoneNumber").attr("disabled","true");
                        $("#btnMemoGo").attr("disabled","true");
                        $("#btnJustGo").attr("disabled","true");

                        $("#mainTitle").html("Redirecting...");

                        setTimeout(function(){
                            var newWindow = window.open("https://api.whatsapp.com/send?phone=55"+newNumber+"&text=");
                            $("#mainTitle").html("Who you gonna call?");
                            $("#phoneNumber").removeAttr("disabled");
                            $("#btnMemoGo").removeAttr("disabled");
                            $("#btnJustGo").removeAttr("disabled");
                        },1000);
                    }

                    var askStoreContact = function(newNumber) {
                        $("#mainButtons").hide();
                        $("#phoneNumber").attr("disabled","true");
                        $("#mainNameField").fadeIn("normal",function(){
                            $("#contactName").focus();
                        });
                    }

                    $("#btnJustGo").click(function(){

                        var newNumber = noMask($.trim($("#phoneNumber").val()));

                        if (!validNumber(newNumber))
                            return;

                        triggerCall();

                    });

                    $("#btnMemoGo").click(function(){
                        var newNumber = noMask($.trim($("#phoneNumber").val()));

                        if (!validNumber(newNumber))
                            return;

                        askStoreContact();
                    });

                    $("#btnCancelMemo").click(function(){
                        $("#phoneNumber").removeAttr("disabled");
                        $("#mainButtons").show();
                        $("#mainNameField").hide();
                    });

                    $("#phoneNumber").focus();
                });
            });
        }, 2000);
    });
})();