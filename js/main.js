/**
 * Código motor da aplicação
*/

(function(){
    $(document).ready(function(){
        setTimeout(function(){
            $("#splashScreen").slideUp("normal",function(){
                $("#mainScreen").fadeIn("normal",function(){

                    var newNumber = "";

                    var database = {
                        contacts: []
                    }

                    if (window.localStorage) {
                        var strDatabase = window.localStorage.getItem("zap_database");
                        if ((typeof(strDatabase)=="string") && (strDatabase!="")) {
                            database = JSON.parse(strDatabase);
                        }
                    }

                    var saveDatabase = function() {
                        if (window.localStorage) {
                            window.localStorage.setItem("zap_database",JSON.stringify(database));
                        }
                    }

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

                        newNumber = noMask($.trim($("#phoneNumber").val()));

                        if (!validNumber(newNumber))
                            return;

                        triggerCall();

                    });

                    $("#btnMemoGo").click(function(){
                        newNumber = noMask($.trim($("#phoneNumber").val()));

                        if (!validNumber(newNumber))
                            return;

                        askStoreContact();
                    });

                    $("#btnCancelMemo").click(function(){
                        $("#phoneNumber").removeAttr("disabled");
                        $("#mainButtons").show();
                        $("#mainNameField").hide();
                    });

                    $("#btnSaveGo").click(function(){
                        var contactName = $.trim($("#contactName").val());
                        if (contactName!="") {
                            var done = false;
                            if (database.contacts.length) {
                                for (i=0;i<database.contacts.length;i++) {
                                    if (database.contacts[i].name == contactName) {
                                        database.contacts[i] = {"name":contactName,"number":newNumber};
                                        done = true;
                                        break;
                                    }
                                }
                            }
                            if (!done) {
                                database.contacts.push({"name":contactName,"number":newNumber});
                            }
                            saveDatabase();
                        }

                        triggerCall();
                    });

                    $("#lkShowList").click(function(){
                        alert('developing...')
                    });

                    $("#phoneNumber").focus();
                });
            });
        }, 2000);
    });
})();