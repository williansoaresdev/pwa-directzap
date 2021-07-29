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

                    var noMask = function(content) {
                        return content.replace(/\D/g, '');
                    }

                    var prepareContactList = function() {

                        $("#listGrid").html("");

                        var countNames = database.contacts.length;
                        if (countNames=="")
                            $("#titleList").html("There are no contacts...");
                        else if (countNames == 1)
                            $("#titleList").html("There is 1 contact");
                        else
                            $("#titleList").html("There are "+countNames+" contacts");

                        if (countNames) {
                            for(var i=0; i < countNames; i++) {
                                var htmlLine = "<div class='row top10'>"
                                htmlLine += "<div class='col-xs-8'>";
                                htmlLine += "<span>"+database.contacts[i].name+"</span><br />";
                                htmlLine += "<span><small style='color:#ccc'>"+database.contacts[i].number+"</small></span><br />";
                                htmlLine += "</div><div class='col-xs-4' style='text-align:right'>";
                                htmlLine += "<button contactIndex='"+i+"' class='btn btn-xs btn-danger deleteButton'><i class='glyphicon glyphicon-trash'></i></button>";
                                htmlLine += "&nbsp;&nbsp;&nbsp;";
                                htmlLine += "<button contactNumber='"+database.contacts[i].number+"' class='btn btn-xs btn-success callButton'><i class='glyphicon glyphicon-earphone'></i></button>";
                                htmlLine += "</div></div>";

                                $("#listGrid").append(htmlLine);
                            }
                            $("#listGrid").append("<div>&nbsp;</div>");
                            $(".deleteButton").click(function(){
                                var contactIndex = ($(this).attr("contactIndex") * 1);
                                if (contactIndex >= 0) {
                                    database.contacts.splice(contactIndex, 1);
                                    saveDatabase();
                                    prepareContactList();
                                }
                            });
                            $(".callButton").click(function(){
                                newNumber = $(this).attr("contactNumber");
                                triggerCall();
                            });
                        }

                    }

                    var saveDatabase = function() {
                        if (window.localStorage) {
                            window.localStorage.setItem("zap_database",JSON.stringify(database));
                        }
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
                            $("#phoneNumber").val("");
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
                        $("#contactName").val("");
                    });

                    $("#btnSaveGo").click(function(){
                        var contactName = $.trim($("#contactName").val());
                        if (contactName!="") {
                            var done = false;
                            if (database.contacts.length) {
                                for (var i=0;i<database.contacts.length;i++) {
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

                        $("#contactName").val("");
                        $("#mainButtons").show();
                        $("#phoneNumber").attr("disabled","true");
                        $("#mainNameField").hide();
                        triggerCall();
                    });

                    $("#lkShowList").click(function(){
                        
                        prepareContactList();
                        $("#mainScreen").fadeOut("normal",function(){
                            $("#listScreen").fadeIn("normal");
                        });

                    });

                    $("#btnBackFromList").click(function(){
                        $("#listScreen").fadeOut("normal",function(){
                            $("#mainScreen").fadeIn("normal");
                        });
                    });

                    $("#phoneNumber").keyup(function(){
                        $("#phoneNumber").removeClass("bordered");
                    });

                    $("#phoneNumber").focus();
                });
            });
        }, 2000);
    });
})();