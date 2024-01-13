// mc.js
var botController = (function() {})();

var uiController = (function() {})();


var controller = (function(botCntr, uiCntr) {
    var $chatCircle,
        $chatBox,
        $chatBoxClose,
        $chatBoxWelcome,
        $chatWraper,
        $submitBtn,
        $chatInput,
        $msg;

    /*toggle*/
    function hideCircle(evt) {
        evt.preventDefault();
        $chatCircle.hide('scale');
        $chatBox.show('scale');
        $chatBoxWelcome.show('scale');
    }

    function chatBoxCl(evt) {
        evt.preventDefault();
        $chatCircle.show('scale');
        $chatBox.hide('scale');
        $chatBoxWelcome.hide('scale');
        $chatWraper.hide('scale');
    }

    function chatBoxCl1(evt) {
        evt.preventDefault();
        $chatCircle.show('scale');
        $chatBox.hide('scale');
        $chatBoxWelcome.hide('scale');
        $chatWraper.hide('scale');
    }

    function chatOpenMessage(evt) {
        evt.preventDefault();
        $chatBoxWelcome.hide();
        $chatWraper.show();
    }

    //generate messages on submit click
    function submitMsg(evt) {
        evt.preventDefault();

        //1. get input message data
        msg = $chatSubmitBtn.val();

        //2.if there is no string button send shoudn't work
        if (msg.trim() == '') {
            return false;
        }
        //3. add message to bot controller
        callbot(msg);
        //4. display message to ui controller
        generate_message(msg, 'self');

    }

    function chatSbmBtn(evt) {
        if (evt.keyCode === 13 || evt.which === 13) {
            console.log("btn pushed");
        }
    }
    /* var input = uiCntr.getInput();*/
    /* $chatSubmitBtn.on("click", hideCircle);*/


    function init() {
        $chatCircle = $("#chat-circle");
        $chatBox = $(".chat-box");
        $chatBoxClose = $(".chat-box-toggle");
        $chatBoxClose1 = $(".chat-box-toggle1");
        $chatBoxWelcome = $(".chat-box-welcome__header");
        $chatWraper = $("#chat-box__wraper");
        $chatInput = $("#chat-input__text");
        $submitBtn = $("#chat-submit");

        //1. call toggle 
        $chatCircle.on("click", hideCircle);
        $chatBoxClose.on("click", chatBoxCl);
        $chatBoxClose1.on("click", chatBoxCl1);
        $chatInput.on("click", chatOpenMessage);

        //2. call wait message from CRM-human

        $submitBtn.on("click", chatSbmBtn);
        $chatInput.on("keypress", chatSbmBtn);


        //6. get message from bot controller-back end
        //7. display bot message to ui controller
    }

    return {
        init: init
    };

})(botController, uiController);


$('.chat-input__form').on('submit', function(e) {
    e.preventDefault();
    msg = $('.chat-input__text').val();

    $('.chat-logs').append('<div id="cm-msg-0" class="chat-msg background-warning push-right bot"><div class="cm-msg-text">' + msg + '</div><span class="msg-avatar"><img class="chat-box-overlay_robot" src="https://www.meetsource.com//userStyles/images/user.png"></span></div>');
    $('.chat-input__text').val('');
});


$(document).ready(controller.init);

know = {
    "hello": "hi",
    "how are you?": "good",
    "ok": ":)"
};

function talk() {
    var user = document.getElementById("userBox").value;
    document.getElementById("userBox").value = "";
    document.getElementById("chatLog").innerHTML += user + "<br>";
    if (user in know) {
        document.getElementById("chatLog").innerHTML += know[user] + "<br>";
    } else {
        document.getElementById("chatLog").innerHTML += "I don't understand...<br>";
    }
}

function continue_btn() {

    var y = $("#total_credit_amountid").val();
    var x = $("#mcbalanceid").html();
    var z = parseInt(x);
    var a = parseInt(y);
    var answer = a + z;
    console.log("answer :" + answer);
    answer = Math.round(answer * 100) / 100;


    $("#mcbalanceid").html(answer);
    $("#total_credit_amountid").val('');

}

/*
 * check app is active on this store
 * get current customer total credit balance
 */
var customer_id = $("#mc-section").data("customer");
var store_url = $("#mc-section").data("store");

var current_theme;


$.ajax({

    type: "POST",

    url: "https://makkpressapps.com/credit_app_copy/get_theme_info.php",


    data: {
        store_url: store_url
    },


    success: function(response) {

        current_theme = response;

    }




});

// if(current_theme == 'Xtra'){
// const trInTable = tableDrop[0].getElementsByTagName('tr');
// for (let i = 0; i < trInTable.length; i++) {
//     if (trInTable[i].classList.contains('sub') || trInTable[i].classList.contains('hidden')){
//         trInTable[i].classList.remove('sub');
//         trInTable[i].classList.remove('hidden');
//     }
// }
// }
const trtb = document.querySelector('tr');
// if()
if (trtb !== null) {
    trtb.classList.remove('sub', 'hidden');
  }

if ((customer_id != undefined || customer_id != null || customer_id != "")) {

    $.ajax({
        url: "https://makkpressapps.com/credit_app_copy/customer_total_bl.php",
        type: "POST",
        data: {
            customer_id: customer_id,
            store_url: store_url
        },
        dataType: "json",
        beforeSend: function() {
            // $("#mc-section").css("display","none") ;
        },
        success: function(data) {
                // console.log(data); return false;
            if (data.status == "success") {

                // show app
                // $("#mc-section").css("display","block") ;


                $('span#mcbalanceid').html(data.message.remainingamount);
                $('span#accountRemainingBal').html(data.message.remainingamount);
                $('span#mcbalanceid').attr("data-mcbalance", data.message.remainingamount);
                $('span#mc-currency').html(data.message.currency);
                $('#coupon_show').hide();
                $('#totalamount_show').show();
                $('.coupon_h5').hide();

                //-------------------------coupon condition----------------//
                console.log(data);
                console.log(data.message.bg_image);

                if (data.message.couponexist == 1) {
                    let remainingamount_one = parseFloat(data.message.remainingamount)-parseFloat(data.message.coupon_amount)
                    $('.checkbox').hide();
                    $('.total_h5').hide();
                    $('#total_credit_amountid').hide();
                    $('.coupon_h5').show();
                    $('#coupon_show').show();
                    // $('#totalamount_show').hide();
                    $('span#mcbalanceid').html("");
                    $('span#mc-currency').html("");
                    $('span#showcouponid').html(data.message.coupon_code);
                    $('span#mccouponid').html(data.message.coupon_amount);
                    $('span#mcbalanceid').eq(0).html(remainingamount_one +' '+ data.message.currency);

                    $('.remaning_amount_in').html('Your Remainig Amount is '+ remainingamount_one +' '+ data.message.currency);
                    $('span#mccouponid').attr("data-mccoupon", data.message.coupon_amount);
                    $('span#coupon-currency').html(data.message.currency);
                    $("#total_credit_amountid").attr("placeholder", data.message.currency); //---------------placeholder currency

                    //-----------------------------customisation----------------//
                    $("#chat-circle").css('backgroundColor', data.message.bg); //---------backgroundcolor change change
                    $(".chat-box-welcome__header").css('backgroundColor', data.message.bg); //---------backgroundcolor change change
                    $(".chat-box-header").css('backgroundColor', data.message.bg); //---------backgroundcolor change change
                    $(".chat-box-welcome__company-name").css('color', data.message.customer_name_color); //---------customer text color change
                    $(".center-text").css('color', data.message.bg_text_color); //---------text color change
                    $(".checkbox h5").css('color', data.message.bg_text_color); //---------text color change
                    // -------image condition
                    if ((data.message.icon__bg_color) == "background color") {
                        $('.chat-circle_robot').hide();
                    } else {
                        console.log("error");
                    }
                    //---------cross icon------------------

                    // console.log(data.message.custom_cross_text);
                    // console.log(data.message.crossicon__text);

                    if ((data.message.crossicon__text) == "cross text") {
                        $('.material-icons').html(data.message.custom_cross_text);
                    } else {
                        $('.material-icons').html(("✖"));
                    }
                    //-----------------shape--------------

                    if ((data.message.shape_panels) == "Rounded Corners") {
                        $('.chat-box').css({
                            'background': 'none',
                            'box-shadow': 'none'
                        });
                        $('.chat-box-body').css('border-radius', '25px');
                    } else if ((data.message.shape_panels) == "Half And Half") {
                        $('.chat-box').css({
                            'background': 'none',
                            'box-shadow': 'none'
                        });
                        $('.chat-box-body').css('border-radius', '25px 0px');
                    } else {
                        $('.chat-box').css({
                            'background': 'none',
                            'box-shadow': 'none'
                        });

                    }
                    //---------------shap-launchar-------
                    if ((data.message.shape_launchar) == "Rounded") {

                        $('#chat-circle').css('border-radius', '20px');
                    } else if ((data.message.shape_launchar) == "capsule") {
                        $('#chat-circle').css({
                            'width': '200px',
                            'height': '75px',
                            'border-radius': '50px',
                            'text-align': '-webkit-center'
                        });

                    } else {


                    }
                    //------------------------placement-----------------
                    if ((data.message.placement) == "Top Left") {

                        $('#chat-circle').css({
                            'right': 'inherit',
                            'top': '50px'
                        });
                    } else if ((data.message.placement) == "Top Right") {
                        $('#chat-circle').css('top', '50px');

                    } else if ((data.message.placement) == "Middle Left") {
                        $('#chat-circle').css({
                            'bottom': '50%',
                            'right': 'inherit'
                        });

                    } else if ((data.message.placement) == "Middle Right") {
                        $('#chat-circle').css({
                            'bottom': '50%',
                            'right': '50px'
                        });


                    } else if ((data.message.placement) == "Bottom Left") {
                        $('#chat-circle').css({
                            'bottom': '50px',
                            'right': 'inherit'
                        });

                    } else {


                    }
                    //---------------background color and background image-------
                    if ((data.message.bg_img_and_color) == "Background Image") {

                        var imageUrl = data.message.bg_image;
                        $(".chat-box-welcome__header").css({
                            "background-image": "url(" + imageUrl + ")",
                            "background-size": "cover"
                        }); //---------bg image change
                    } else {
                        $("#chat-circle").css('backgroundColor', data.message.bg); //---------backgroundcolor change change
                    }

                    //---------------Brand logo condition-------
                    if ((data.message.brand_condition) == "New Brand logo") {


                        if (("https://makkpressapps.com/credit_app_copy/img/brand_logo/") == data.message.brand_logo) {
                            $(".image__logo").attr("src", "https://makkpressapps.com/credit_app_copy/img/default_logo/makk-press-logo.png"); //---------logo image change
                        } else {
                            $(".image__logo").attr("src", data.message.brand_logo); //---------logo image change
                            $(".logo_wrap").show();
                        }

                    } else {
                        $("#chat-circle").css('backgroundColor', data.message.bg); //---------backgroundcolor change change
                        $(".logo_wrap").hide();
                    }

                    //---------------icon and heading condition-------
                    if ((data.message.icon_and_text) == "icon") {
                        var condition_icon = data.message.icon;
                        if (condition_icon != "https://makkpressapps.com/credit_app_copy/img/icon/") {
                            $(".chat-circle_robot").attr("src", data.message.icon); //---------image change
                        } else {
                            $(".chat-circle_robot").attr("src", 'https://makkpressapps.com/credit_app_copy/img/default_logo/makk-press-logo.png'); //---------image change 
                        }
                        $("#icon_heading").hide();
                    } else {
                        $("#icon_heading").html(data.message.icon_text);
                        $("#icon_heading").show(); //---------image change
                        $(".chat-circle_robot").hide(); //---------image change
                    }
                    $("#heading1").html(data.message.current_balance_name); //---------text Name change
                    $("#heading3").html(data.message.asking_question); //---------text Name change
                    $("#heading5").html(data.message.check_para); //---------text Name change            
                    $("#totalamount_show h5").css('color', data.message.bg_text_color); //---------text color change
                    $("#coupon_show h5").css('color', data.message.bg_text_color); //---------text color change
                    $(".material-icons").css('color', data.message.bg_text_color); //---------text color change
                    $("#powered").css('color', data.message.bg_text_color); //---------text color change
                    $(".chat-box-toggle1").css('backgroundColor', data.message.cs_btn_bg_color); //---------backgroundcolor change
                    $(".chat-box-toggle1").val(data.message.cs_btn_bg_name); //---------name change
                    $(".chat-box-toggle1").css('color', data.message.cs_btn_bg_text_color); //---------button text color change
                    $("#btn_checkoute").css('backgroundColor', data.message.chko_btn_color); //---------backgroundcolor change
                    $("#btn_checkoute").val(data.message.chko_btn_name); //---------name change
                    $("#btn_checkoute").css('color', data.message.chko_btn_text_color); //---------button text color change
                    $("#btn_checkoute1").css('backgroundColor', data.message.chko_btn_color); //---------backgroundcolor change
                    $("#btn_checkoute1").val(data.message.chko_btn_name); //---------name change
                    $("#btn_checkoute1").css('color', data.message.chko_btn_text_color); //---------button text color change
                    $("#btn_checkoute2").css('backgroundColor', data.message.chng_btn_color); //---------backgroundcolor change
                    $("#btn_checkoute2").val(data.message.chng_btn_name); //---------name change
                    $("#btn_checkoute2").css('color', data.message.chng_btn_text_color); //---------button text color change
                    //----------wallet history------------//
                    // if (window.location.href.split('/')[4] == data.message.fetch_url) {
                    //     $(window).on("load", function () {
                    //         var customer_id = $("#mc-section").data("customer");
                    //         var store_url = $("#mc-section").data("store");
                    //         $.ajax({
                    //             url: "https://makkpressapps.com/credit_app_copy/wallet_history.php",
                    //             type: "POST",
                    //             dataType: "json",
                    //             data: {
                    //                 customer_id: customer_id,
                    //                 store_url: store_url

                    //             },
                    //             success: function (data) {
                    //                 $('#show_history').html(data.message);
                    //             }
                    //         });
                    //     });
                    // }
                    //--------------Plan id-------
                    $("#planid").val(data.message.plan_id);
                    //------------------plan_id condition-------------//
                    // var plan_id_con = $("#planid").val();

                    // if (plan_id_con == 0) {
                    //     $("#chat-circle").hide();
                    // } else {
                    //     $("#chat-circle").show();
                    // }

                    if ((data.message.cs_button_shape) == "Rounded Shape") {
                        $("#btn-continue").css({
                            "border-radius": " 15px"
                        }); //---------Rounded Shape change
                    } else {
                        $("#btn-continue").css({
                            "border-radius": " 1px"
                        }); //---------Square Shape change
                    }
                    if ((data.message.ck_button_shape) == "Rounded Shape") {
                        $("#btn_checkoute1").css({
                            "border-radius": " 15px"
                        }); //---------Rounded Shape change
                        $("#btn_checkoute").css({
                            "border-radius": " 15px"
                        }); //---------Rounded Shape change
                    } else {
                        $("#btn_checkoute1").css({
                            "border-radius": " 1px"
                        }); //---------Square Shape change
                        $("#btn_checkoute").css({
                            "border-radius": " 1px"
                        }); //---------Square Shape change
                    }
                    if ((data.message.chng_button_shape) == "Rounded Shape") {
                        $("#btn_checkoute2").css({
                            "border-radius": " 15px"
                        }); //---------Rounded Shape change
                    } else {
                        $("#btn_checkoute2").css({
                            "border-radius": " 1px"
                        }); //---------Square Shape change
                    }
                    $("#chat-circle").css('visibility', 'visible');

                } else if (data.message.couponexist == 0) {
                    $('span#mcbalanceid').html(data.message.remainingamount);
                    $('span#mcbalanceid').attr("data-mcbalance", data.message.remainingamount);
                    $('span#mc-currency').html(data.message.currency);
                    $('.coupon_h5').hide();
                    $('.total_h5').show();

                    //-----------------------------customisation----------------//
                    $("#chat-circle").css('backgroundColor', data.message.bg); //---------backgroundcolor change change
                    //---------backgroundcolor change change
                    $(".div-wrapper").css('backgroundColor', data.message.bg); //---------backgroundcolor change change
                    $(".chat-box-header").css('backgroundColor', data.message.bg); //---------backgroundcolor change change
                    $(".chat-box-welcome__company-name").css('color', data.message.customer_name_color); //---------customer text color change
                    $(".center-text").css('color', data.message.bg_text_color); //---------text color change
                    $(".checkbox h5").css('color', data.message.bg_text_color); //---------text color change
                    if ((data.message.icon__bg_color) == "background color") {
                        $('.chat-circle_robot').hide();
                    }
                    //---------cross icon and text------------------
                    // console.log(data.message.custom_cross_text);
                    // console.log(data.message.crossicon__text);
                    if ((data.message.crossicon__text) == "cross text") {
                        $('.material-icons').html(data.message.custom_cross_text);
                    } else {
                        $('.material-icons').html(("✖"));
                    }

                    //-----------------shape--------------

                    if ((data.message.shape_panels) == "Rounded Corners") {
                        $('.chat-box').css({
                            'background': 'none',
                            'box-shadow': 'none'
                        });
                        $('.chat-box-body').css('border-radius', '25px');
                    } else if ((data.message.shape_panels) == "Half And Half") {
                        $('.chat-box').css({
                            'background': 'none',
                            'box-shadow': 'none'
                        });
                        $('.chat-box-body').css('border-radius', '25px 0px');
                    } else {
                        $('.chat-box').css({
                            'background': 'none',
                            'box-shadow': 'none'
                        });

                    }
                    //---------------shap-launchar-------
                    if ((data.message.shape_launchar) == "Rounded") {

                        $('#chat-circle').css('border-radius', '20px');
                    } else if ((data.message.shape_launchar) == "capsule") {
                        $('#chat-circle').css({
                            'width': '200px',
                            'height': '75px',
                            'border-radius': '50px',
                            'text-align': '-webkit-center'
                        });

                    } else {


                    }
                    //------------------------placement-----------------
                    if ((data.message.placement) == "Top Left") {

                        $('#chat-circle').css({
                            'right': 'inherit',
                            'top': '50px'
                        });
                    } else if ((data.message.placement) == "Top Right") {
                        $('#chat-circle').css('top', '50px');

                    } else if ((data.message.placement) == "Middle Left") {
                        $('#chat-circle').css({
                            'bottom': '50%',
                            'right': 'inherit'
                        });

                    } else if ((data.message.placement) == "Middle Right") {
                        $('#chat-circle').css({
                            'bottom': '50%',
                            'right': '50px'
                        });


                    } else if ((data.message.placement) == "Bottom Left") {
                        $('#chat-circle').css({
                            'bottom': '50px',
                            'right': 'inherit'
                        });

                    } else {


                    }
                    //---------------background color and background image-------
                    if ((data.message.bg_img_and_color) == "Background Image") {

                        var imageUrl = data.message.bg_image;
                        $(".chat-box-welcome__header").css({
                            "background-image": "url(" + imageUrl + ")",
                            "background-size": "cover"
                        }); //---------bg image change
                    } else {
                        $("#chat-circle").css('backgroundColor', data.message.bg); //---------backgroundcolor change change
                    }

                    //---------------Brand logo condition-------
                    if ((data.message.brand_condition) == "New Brand logo") {
                        if (("https://makkpressapps.com/credit_app_copy/img/brand_logo/") == data.message.brand_logo) {
                            $(".image__logo").attr("src", "https://makkpressapps.com/credit_app_copy/img/default_logo/makk-press-logo.png"); //---------logo image change
                        } else {
                            $(".image__logo").attr("src", data.message.brand_logo); //---------logo image change
                            $(".logo_wrap").show();
                        }

                    } else {
                        $("#chat-circle").css('backgroundColor', data.message.bg); //---------backgroundcolor change change
                        $(".logo_wrap").hide();
                    }


                    //---------------icon and heading condition-------
                    if ((data.message.icon_and_text) == "icon") {
                        var condition_icon = data.message.icon;
                        if (condition_icon != "https://makkpressapps.com/credit_app_copy/img/icon/") {
                            $(".chat-circle_robot").attr("src", data.message.icon); //---------image change
                        } else {
                            $(".chat-circle_robot").attr("src", 'https://makkpressapps.com/credit_app_copy/img/default_logo/makk-press-logo.png'); //---------image change 
                        }
                        $("#icon_heading").hide()
                    } else {
                        $("#icon_heading").html(data.message.icon_text);
                        $("#icon_heading").show(); //---------image change
                        $(".chat-circle_robot").hide(); //---------image change
                    }
                    //---------------Header and Body Background Color-------
                    if ((data.message.header_and_body) == "Header Background Color") {
                        $(".chat-box__header-text").css('background', data.message.header_bg_color);
                    } else {
                        $(".chat-box__header-text").css('background', "none");
                    }
                    $("#heading1").html(data.message.current_balance_name); //---------text Name change
                    $("#heading3").html(data.message.asking_question); //---------text Name change
                    $("#heading5").html(data.message.check_para); //---------text Name change            
                    $("#totalamount_show h5").css('color', data.message.bg_text_color); //---------text color change
                    $("#coupon_show h5").css('color', data.message.bg_text_color); //---------text color change
                    $(".material-icons").css('color', data.message.bg_text_color); //---------text color change
                    $(".chat-box-toggle1").css('backgroundColor', data.message.cs_btn_bg_color); //---------backgroundcolor change
                    $(".chat-box-toggle1").val(data.message.cs_btn_bg_name); //---------name change
                    $(".chat-box-toggle1").css('color', data.message.cs_btn_bg_text_color); //---------button text color change
                    $("#btn_checkoute").css('backgroundColor', data.message.chko_btn_color); //---------backgroundcolor change
                    $("#btn_checkoute1").css('backgroundColor', data.message.chko_btn_color); //---------backgroundcolor change
                    $("#btn_checkoute").val(data.message.chko_btn_name); //---------name change
                    $("#btn_checkoute1").val(data.message.chko_btn_name); //---------name change
                    $("#btn_checkoute").css('color', data.message.chko_btn_text_color); //---------button text color change
                    $("#btn_checkoute1").css('color', data.message.chko_btn_text_color); //---------button text color change
                    $("#btn_checkoute").css('backgroundColor', data.message.chko_btn_color); //---------backgroundcolor change

                    // $("#total_credit_amountid").attr("placeholder", data.message.currency); //---------------placeholder currency

                    //----------wallet history------------//
                    // if (window.location.href.split('/')[4] == data.message.fetch_url) {
                    //     $(window).on("load", function () {
                    //         var customer_id = $("#mc-section").data("customer");
                    //         var store_url = $("#mc-section").data("store");
                    //         $.ajax({
                    //             url: "https://makkpressapps.com/credit_app_copy/wallet_history.php",
                    //             type: "POST",
                    //             dataType: "json",
                    //             data: {
                    //                 customer_id: customer_id,
                    //                 store_url: store_url

                    //             },
                    //             success: function (data) {
                    //                 $('#show_history').html(data.message);
                    //             }
                    //         });
                    //     });
                    // }
                    //--------------Plan id-------
                    $("#planid").val(data.message.plan_id);
                    //------------------plan_id condition-------------//
                    // var plan_id_con = $("#planid").val();

                    // if (plan_id_con == 0) {
                    //     $("#chat-circle").hide();
                    // } else {
                    //     $("#chat-circle").show();
                    // }

                    //--------------button shape-------
                    if ((data.message.cs_button_shape) == "Rounded Shape") {
                        $("#btn-continue").css({
                            "border-radius": " 15px"
                        }); //---------Rounded Shape change
                    } else {
                        $("#btn-continue").css({
                            "border-radius": " 1px"
                        }); //---------Square Shape change
                    }
                    if ((data.message.ck_button_shape) == "Rounded Shape") {
                        $("#btn_checkoute1").css({
                            "border-radius": " 15px"
                        }); //---------Rounded Shape change
                        $("#btn_checkoute").css({
                            "border-radius": " 15px"
                        }); //---------Rounded Shape change
                    } else {
                        $("#btn_checkoute1").css({
                            "border-radius": " 1px"
                        }); //---------Square Shape change
                        $("#btn_checkoute").css({
                            "border-radius": " 1px"
                        }); //---------Square Shape change
                    }

                    $("#chat-circle").css('visibility', 'visible');
                }

                //-------------------------end coupon condition----------------// 


            }
        }
    });
}

/**************/

//checkbox condition

/*
 * if user click on check box.
 */
function useAllAmount() {

    var z = $("#total_amountbox").prop("checked");
    var x = $("#mcbalanceid").data("mcbalance");
    var y = $("#total_credit_amountid");

    if (z) {

        if (x <= 0) {
            showMessage(" You do not have credit balance.");
            y.val("");

            $("#total_amountbox").prop("checked", false);
        } else {
            y.val(x);
            $("#mcbalanceid").html(0);
            $("#mcbalanceid").data("mcbalance", 0);
        }
    } else {

        $("#mcbalanceid").html(y.val());
        $("#mcbalanceid").data("mcbalance", y.val());
        y.val(0);
    }

}


/*
 * If user enters the amount
 */
$("#total_credit_amountid").on("keyup", function() {

    // alert( $(this).val()) ;

    var x = $("#mcbalanceid").data("mcbalance");

    if (x == 0) {
        showMessage(" You do not have credit balance.");
        $(this).val(0);
    } else {
        var y = $("#total_credit_amountid").val();
        var answer = x - y;
        $("#mcbalanceid").html(answer.toFixed(2));
        // $("#mcbalanceid").data("mcbalance",answer.toFixed(2));
    }
});

/**************************/


//checkout button

$("#btn_checkoute").on("click", function() {

    var coupon = $('#total_credit_amountid').val();
    var customer_id = $("#mc-section").data("customer");
    var store_url = $("#mc-section").data("store");
    // console.log(coupon);

    var btn_label = $('#btn_checkoute').text();
    var plan_id = $("#planid").val();


    $.ajax({
        url: "https://makkpressapps.com/credit_app_copy/create_coupon.php",
        type: "POST",
        data: {
            use_amount: coupon,
            customer_id: customer_id,
            plan_id: plan_id,
            store_url: store_url
        },
        dataType: "json",
        beforeSend: function() {
            $('#btn_checkoute').text("Please Wait....");
        },
        success: function(data) {

            $('#show_message').html(data.message);
            if (data.status == "error") {
                setTimeout(function() {
                    window.location.reload(1);
                }, 3000);
            } else {
                $('#total_credit_amountid').val("");

                console.log("https://" + window.location.hostname + "/checkout?&discount=" + data.coupon_code)
                window.location.href = "https://" + window.location.hostname + "/checkout?&discount=" + data.coupon_code;
            }

            // $('#btn_checkoute').html(data.message); 
        },
        complete: function() {
            $('#btn_checkoute').text(btn_label);
        }
    });
});


//-------------------coupon checkout button--------------//
$("#btn_checkoute1").on("click", function() {
    var coupon1 = $('#mccouponid').val();
    var coupon_code = $('#showcouponid').html();

    // console.log(coupon1);
    // console.log(coupon_code);
    if (coupon1 != null) {

        // console.log('https://makkpress-test-dilshad.myshopify.com/checkout?&discount='+coupon_code) ;

        window.location.href = "https://" + window.location.hostname + "/checkout?&discount=" + coupon_code;
    } else {
        console.log('error');
    }

});

//-------------------coupon change amount button--------------//

$("#btn_checkoute2").on("click", function() {
    var customer_id = $("#mc-section").data("customer");
    var store_url = $("#mc-section").data("store");
    var change_amount = $("#change_amount").val();
    //---------------condition card total amount-------------//

    var cart_total2 = Number($("#mc_condition").val());
    var coupon_amount2 = Number($("#change_amount").val());
    if ((cart_total2) < (coupon_amount2)) {

        $("#change_amount").val(cart_total2);

    } else {
        console.log(coupon_amount2);
    }
    //-----------confirm---------------------
    var conf = confirm('Are you sure want to previous delete coupon?');
    if (conf == true) {
        $("#changevalue_f").show();
    } else {
        $("#changevalue_f").hide();
    }


    $.ajax({
        url: "https://makkpressapps.com/credit_app_copy/delete_coupon.php",
        type: "POST",
        dataType: "json",
        data: {
            customer_id: customer_id,
            store_url: store_url,
            amount: change_amount,
            conf: conf

        },
        success: function(data) {
            // $('#total_credit_amountid').val(data.message);
            $('#msg_cart').html(data.message);
            if (data.status == "done") {
                setTimeout(window.location.reload(), 1000);
            }
        }
    });
});
//------------------------cart value get------------------

var refInterval = window.setInterval('update()', 1000);
var update = () =>{

    $.ajax({
        url: "https://" + window.location.hostname + "/cart.js",
        type: "GET",
        dataType: "json",
        async: false,
        // data: {},
        success: function(data) {
            // console.log((data.total_price / 100));
            // $("#totalamount_show").attr("data-mc_condition").html((data.total_price / 100));
            $("#mc_condition").val((data.total_price / 100));
            //------------------cart value 0-------------------//
            
            var cart_value = $("#mc_condition").val();
            if (cart_value == 0) {
                $("#msg_cart").html("First Add Products Your Cart !");
                $("#btn_checkoute").prop("disabled", true);
            } else {
                $("#msg_cart").html("");
                $("#btn_checkoute").prop("disabled", false);
            }

        
    }

    });
}


function cart_change_amount() {
    //---------------condition card total amount-------------//
    $("#btn_checkoute").val('Processing...');
    var cart_total1 = Number($("#mc_condition").val());
    var coupon_amount1 = Number($("#total_credit_amountid").val());
    if ((cart_total1) < (coupon_amount1)) {

        $("#total_credit_amountid").val(cart_total1);

    } else {
        console.log(coupon_amount1);
    }

}

function button_change_text() {
    $("#btn_checkoute").val('Processing...');

}


//------------------------logo default--------------//
$(".logo_wrap").show();
//-------------------------------------------------
//------------------------launchar default--------------//
// var refInterval1 = window.setInterval('launchar_show()', 1000);
// var launchar_show = function () {
// var plan___id=$("#planid").val();
// if (plan___id=="") {
//     $("#chat-circle").hide();

// }else{
//     $("#chat-circle").show(); 
// }
// }
//-------------------------------------------------


// ======================================================================

// function myFunction() {
//     var x = document.getElementById("myDIV");
//     x.style.display = "none";  
// }


function showMessage(text) {
    $("#show_message").text(text);
    setTimeout(function() {
        $("#show_message").text("")
    }, 5000);
}


// ====================================================
var checkCouponInterval = '';
setTimeout(function() {
    checkCoupon();
    checkCouponInterval = window.setInterval(checkCoupon, 10000);
}, 2000);

function checkCoupon() {

    // console.log(checkCoupon) ;

    if (($("#showcouponid").length > 0) && (customer_id != '' && store_url != '')) {

        if ($("#showcouponid").text() != "") {

            $.ajax({

                url: "https://makkpressapps.com/credit_app_copy/check-coupon.php",
                type: "POST",
                dataType: "json",
                data: {
                    customer_id: customer_id,
                    store_url: store_url
                }

            }).done(function(data) {
                // console.log(data) ;
                if (data == 0 || data == '0') {
                    // console.log("reload") ;
                    clearInterval(checkCouponInterval);
                    window.location.reload(1);
                } else {
                    clearInterval(checkCouponInterval);
                    checkCouponInterval = window.setInterval(checkCoupon, 10000);
                }
            }).fail(function(jqXHR, textStatus) {
                console.error("Request failed: " + textStatus);
            });
        }
    } else {
        clearInterval(checkCouponInterval);
    }

}

var i = 1;
//==========================default order history account ===========
setTimeout(function() {
    // console.log(store_url);
    // var page = window.location.href.split('/')[3] ;

    var page = window.location.href;
    // console.log(page);
    if (page == "https://" + store_url + "/account" || page == "https://" + store_url + "/account/") {
        if (store_url != '') {

            $.ajax({
                url: "https://makkpressapps.com/credit_app_copy/ajax_refund_status_settings.php",
                type: "POST",
                dataType: "json",
                async: false,
                data: {
                    store_url: store_url,
                },
                success: function(data) {


                    if (data.refund_status == 1) {


                        var refund_statuses = data;




                        $('<th class="refund_column" id="refund" scope="col" role="columnheader">Refund</th>').insertAfter($('th:last'));

                        // $('<th id="refund" scope="col" role="columnheader"><button class="btn store_credit_refund_btn">Refund</button><div style="display:none;" class="refund_btn_cl"> <button type="button" class="btn full_refund_btn" onclick="modal_box();"> Full Refund </button> <button class="btn partial_request_btn" type="button" onclick="modal_box2(this);"> Partial Refund </button></div><div class="cancel_btn_class" style="display:none;"><button type="button" onclick="cancel_modal_box(this);" class="cancel_btn">Cancel Order</button></div><div style="display:none;" class="already_refunded">Already Fully-Refunded</div><div style="display:none;" class="pending">Pending</div><div style="display:none;" class="rejected">Rejected</div><div style="display:none;" class="cancelled">Order Cancelled</div></th>').insertAfter($('[data-label="Total"]'));



                        $.ajax({
                            url: "https://makkpressapps.com/credit_app_copy/refund-btn.php",
                            type: "POST",
                            dataType: "json",
                            async: false,
                            data: {
                                store_url: store_url,
                                customer_id: customer_id
                            },
                            success: function(data) {

                                $.each(data, function(item, value) {

                                    // console.log(value);

                                    $('tr').each(function(index, element) {
                                        if (index !== 0) {
                                        var text = $(this).children().find('a').attr('href');
                                        if (text) {

                                            text = text.split('/');
                                            token = text[5];


                                            if (token == value.order_token) {


                                                if (value.approve_status == 0) {

                                                    $(this).last('td').append('<td class="refund_column" id="refund" scope="col" data-label="Refund" role="columnheader"><button class="btn store_credit_refund_btn">Pending</button><div style="display:none;" class="refund_btn_cl"> <button type="button" class="btn full_refund_btn" onclick="modal_box();"> Full Refund </button> <button class="btn partial_request_btn" type="button" onclick="modal_box2(this);"> Partial Refund </button></div><div class="cancel_btn_class" style="display:none;"><button type="button" onclick="cancel_modal_box(this);" class="cancel_btn">Cancel Order</button></div><div style="display:none;" class="already_refunded">Already Fully-Refunded</div><div style="display:none;" class="pending">Pending</div><div style="display:none;" class="rejected">Rejected</div><div style="display:none;" class="cancelled">Order Cancelled</div></td>');

                                                } else if (value.approve_status == 1) {



                                                    $(this).last('td').append('<td class="refund_column" id="refund" scope="col" data-label="Refund" role="columnheader"><button class="btn store_credit_refund_btn">Order Refunded</button><div style="display:none;" class="refund_btn_cl"> <button type="button" class="btnfull_refund_btn" onclick="modal_box();"> Full Refund </button> <button class="btn partial_request_btn" type="button" onclick="modal_box2(this);"> Partial Refund </button></div><div class="cancel_btn_class" style="display:none;"><button type="button" onclick="cancel_modal_box(this);" class="cancel_btn">Cancel Order</button></div><div style="display:none;" class="already_refunded">Already Fully-Refunded</div><div style="display:none;" class="pending">Pending</div><div style="display:none;" class="rejected">Rejected</div><div style="display:none;" class="cancelled">Order Cancelled</div></td>');


                                                } else if (value.approve_status == 3) {

                                                    $(this).last('td').append('<td class="refund_column" id="refund" data-label="Refund" scope="col" role="columnheader"><button class="btn store_credit_refund_btn">Order Cancelled</button><div style="display:none;" class="refund_btn_cl"> <button type="button" class="btn full_refund_btn" onclick="modal_box();"> Full Refund </button> <button class="btn partial_request_btn" type="button" onclick="modal_box2(this);"> Partial Refund </button></div><div class="cancel_btn_class" style="display:none;"><button type="button" onclick="cancel_modal_box(this);" class="cancel_btn">Cancel Order</button></div><div style="display:none;" class="already_refunded">Already Fully-Refunded</div><div style="display:none;" class="pending">Pending</div><div style="display:none;" class="rejected">Rejected</div><div style="display:none;" class="cancelled">Order Cancelled</div></td>');


                                                } else if (value.approve_status == 2) {

                                                    $(this).last('td').append('<td class="refund_column" id="refund" data-label="Refund" scope="col" role="columnheader"><button class="btn store_credit_refund_btn">Request Rejected</button><div style="display:none;" class="refund_btn_cl"> <button type="button" class="btn full_refund_btn" onclick="modal_box();"> Full Refund </button> <button class="btn partial_request_btn" type="button" onclick="modal_box2(this);"> Partial Refund </button></div><div class="cancel_btn_class" style="display:none;"><button type="button" onclick="cancel_modal_box(this);" class="cancel_btn">Cancel Order</button></div><div style="display:none;" class="already_refunded">Already Fully-Refunded</div><div style="display:none;" class="pending">Pending</div><div style="display:none;" class="rejected">Rejected</div><div style="display:none;" class="cancelled">Order Cancelled</div></td>');


                                                } else {

                                                    if (value.financial_status == 'pending') {

                                                        $(this).last('td').append('<td class="refund_column" id="refund" data-label="Refund" scope="col" role="columnheader"><button class="btn store_credit_refund_btn">Cancel</button><div style="display:none;" class="refund_btn_cl"> <button type="button" class="btn full_refund_btn" onclick="modal_box();"> Full Refund </button> <button class="btn partial_request_btn" type="button" onclick="modal_box2(this);"> Partial Refund </button></div><div class="cancel_btn_class" style="display:none;"><button type="button" onclick="cancel_modal_box(this);" class="cancel_btn">Cancel Order</button></div><div style="display:none;" class="already_refunded">Already Fully-Refunded</div><div style="display:none;" class="pending">Pending</div><div style="display:none;" class="rejected">Rejected</div><div style="display:none;" class="cancelled">Order Cancelled</div></td>');

                                                    } else {

                                                        var full_refund_status = refund_statuses.full_refund_status;

                                                        var partial_refund_status = refund_statuses.partial_refund_status;

                                                        console.log(refund_statuses);


                                                        var custom_html = '<td class="refund_column" id="refund" data-label="Refund" scope="col" role="columnheader"><button class="btn store_credit_refund_btn">Refund</button><div style="display:none;" class="refund_btn_cl">';

                                                        if (full_refund_status == 0) {


                                                            custom_html += '<button type="button" class="btn full_refund_btn" onclick="modal_box();" style="display:none;"> Full Refund </button>';


                                                        } else {

                                                            custom_html += '<button type="button" class="btn full_refund_btn" onclick="modal_box();"> Full Refund </button>';

                                                        }

                                                        if (partial_refund_status == 0) {

                                                            custom_html += '<button class="btn partial_request_btn" type="button" onclick="modal_box2(this);" style="display:none;"> Partial Refund </button></div></td>';


                                                        } else {

                                                            custom_html += '<button class="btn partial_request_btn" type="button" onclick="modal_box2(this);"> Partial Refund </button></div></th>';
                                                        }



                                                        $(this).last('td').append(custom_html);
                                                    }



                                                }




                                                // $('<th id="refund" scope="col" role="columnheader"><button class="btn store_credit_refund_btn">Refund</button><div style="display:none;" class="refund_btn_cl"> <button type="button" class="btn full_refund_btn" onclick="modal_box();"> Full Refund </button> <button class="btn partial_request_btn" type="button" onclick="modal_box2(this);"> Partial Refund </button></div><div class="cancel_btn_class" style="display:none;"><button type="button" onclick="cancel_modal_box(this);" class="cancel_btn">Cancel Order</button></div><div style="display:none;" class="already_refunded">Already Fully-Refunded</div><div style="display:none;" class="pending">Pending</div><div style="display:none;" class="rejected">Rejected</div><div style="display:none;" class="cancelled">Order Cancelled</div></th>').insertAfter($(this).last('td'));

                                            }

                                        }

                                    }

                                    });

                                })
                            }

                        });


                        $('<style>    .mpopup {      display: none;      position: fixed;      z-index: 1;       left: 0;      top: 0;      width: 100%;      height: 100%;      overflow: auto;      background-color: rgb(0, 0, 0);      background-color: rgba(0, 0, 0, 0.4);    }    .popup_sdtrh {      position: relative;      background-color: #fff;      margin: auto;      padding: 0;      width: 450px;      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);      -webkit-animation-name: animatetop;      -webkit-animation-duration: 0.4s;      animation-name: animatetop;      animation-duration: 0.4s;      border-radius: 0.3rem;    }    .popup_header {      padding: 2px 12px;      background-color: #ffffff;      color: #333;      border-bottom: 1px solid #e9ecef;      border-top-left-radius: 0.3rem;      border-top-right-radius: 0.3rem;    }    .popup_header h2 {      font-size: 1.25rem;      margin-top: 14px;      margin-bottom: 14px;    }    .popup_body {      padding: 2px 12px;    }    .popup_footer {      padding: 1rem;      background-color: #ffffff;      color: #333;      border-top: 1px solid #e9ecef;      border-bottom-left-radius: 0.3rem;      border-bottom-right-radius: 0.3rem;      text-align: right;    }    .close {      color: #888;      float: right;      font-size: 28px;      font-weight: bold;    }    .close:hover,    .close:focus {      color: #000;      text-decoration: none;      cursor: pointer;    }    /* add animation effects */    @-webkit-keyframes animatetop {      from {        top: -300px;        opacity: 0      }      to {        top: 0;        opacity: 1      }    }    @keyframes animatetop {      from {        top: -300px;        opacity: 0      }      to {        top: 0;        opacity: 1      }    }  </style>                                                                                                                                                                                                                                                                                                                                                                                        <!-- Modal popup box -->    <div id="mpopupBox" class="mpopup refund_pop">      <!-- Modal content -->      <div class="popup_sdtrh">        <div class="popup_header">    <span class="close_popup_refund" style="float: right; color: white;"><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg></span>     <h2>full refund Popup</h2>        </div>        <div class="popup_body">     <div class="full_msg"></div>    <div class="reason_s" >     <label>full refund reason          </label>          <textarea            class="fullrefund full_refund_class"            cols="40"            rows="10"></textarea>   </div>     </div>        <div class="popup_footer">          <button type="button" class="btn btn-primary full_btn">Send Request          </button>        </div>      </div>    </div>                                                                                                                                                                                                                                                                                                                                                                                                                 <!-----mpopupbox1----><div id="mpopupBox1" class="mpopup refund_pop">      <!-- Modal content -->      <div class="popup_sdtrh">        <div class="popup_header">     <span class="close_popup_refund" style="float: right; color: white;"><?xml version="1.0" ?><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg></span>     <h2>partial refund Popup</h2>    </div>        <div class="popup_body">          <div class="partial_msg"></div>       <h3>Select the product(s) to refund and enter a quantity</h3>                <div id="refund_products"></div>         <div class="reason_s"><label>Partial refund reason          </label>  <textarea            class="par_refund"            cols="40"            rows="10"></textarea>    </div>    </div>        <div class="popup_footer">          <button type="button" class="btn btn-primary partial_btn">Send Request          </button>        </div>      </div>    </div>                                                                                                                                                                                                       <!-----cancelbox---->                                                                                                           <div id="cancel_modal_box" class="mpopup refund_pop">      <!-- Modal content -->      <div class="popup_sdtrh">        <div class="popup_header">    <span class="close_popup_refund" style="float: right; color: white;"><?xml version="1.0" ?><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg></span>     <h2>Order Cancel Popup</h2>        </div>        <div class="popup_body">     <div class="cancel_msg"></div>    <div class="reason_s" >      <label>Cancel reason</label><br>          <textarea            class="cancel cancel_refund_class"            cols="40"            rows="10"></textarea>  </div>      </div>        <div class="popup_footer">          <button type="button" class="btn btn-primary cancel_request_btn">Send Request          </button>        </div>      </div>    </div>').insertAfter($('table'));

                        i++;


                    }



                }



            });


        }
        //     });
        // }

    }




}, 1000);



$("body").on("click", ".store_credit_refund_btn", function() {
    var token = $(this).parents("tr").find("td").first().find("a").prop('href').trim();

    token = token.split('/');
    token = token[5];

    var element = $(this);

    $.ajax({
        url: "https://makkpressapps.com/credit_app_copy/check-refund.php",
        type: "POST",
        dataType: "json",
        data: {
            customer_id: customer_id,
            token: token,
            store_url: store_url

        },
        success: function(data) {


            // if(data.status == "Refunded"){

            //     console.log('refunded');

            //     element.next('.refund_btn_cl').next('.cancel_btn_class').next('.already_refunded').show();

            // }else if(data.status == "Pending"){

            // element.next('.refund_btn_cl').next('.cancel_btn_class').next('.already_refunded').next('.pending').show();

            // }
            // else if(data.status == "Rejected"){

            // element.next('.refund_btn_cl').next('.cancel_btn_class').next('.already_refunded').next('.pending').next('.rejected').show();

            // }
            if (data.status == "done") {

                // console.log(this);

                element.next('.refund_btn_cl').toggle();

                if (data.coupon == 1) {

                    element.next().children('.partial_request_btn').attr('disabled', true);

                    element.next().children('.partial_request_btn').html('Partial Refund not available if coupon was applied!');


                }
            } else if (data.status == 'cancel') {

                element.next('.refund_btn_cl').next('.cancel_btn_class').toggle();

            }
            //     else if(data.status == 'Cancelled'){

            // element.next('.refund_btn_cl').next('.cancel_btn_class').next('.already_refunded').next('.pending').next('.rejected').next('.cancelled').show();

            //     }

        }
    });




    console.log(token);


});

//open full refund modal
function modal_box() {

    // Select modal
    var mpopup = document.getElementById('mpopupBox');

    // Select trigger link
    // var mpLink = document.getElementById(btn);


    // Open modal once the link is clicked

    mpopup.style.display = "block";


    console.log('clicked!');



    // full = btn;


    // console.log(btn);

}

//open cancel modal
function cancel_modal_box() {

    // Select modal
    var mpopup = document.getElementById('cancel_modal_box');

    // Select trigger link
    // var mpLink = document.getElementById(btn);


    // Open modal once the link is clicked

    mpopup.style.display = "block";


    console.log('clicked!');



    // full = btn;


    // console.log(btn);

}

var current_cancel_token = null;

//get global token for cancelling orders
$("body").on("click", ".cancel_btn", function() {

    var url = $(this).parent().parent().parents("tr").find("td").first().find("a").prop('href').trim()

    // console.log(url);

    token = url.split('/');
    token = token[5];

    current_cancel_token = token;



});


//submit cancel request
$("body").on("click", ".cancel_request_btn", function() {

    if ($(".cancel").val() != '') {

        var reason = $('.cancel').val();
        // var store = $("#show_history").data("store");
        // var order_no = full;
        // var customer = $("#show_history").data("customer");
        $.ajax({
            url: "https://makkpressapps.com/credit_app_copy/cancel_order_request.php",
            type: "POST",
            dataType: "json",
            data: {
                customer_id: customer_id,
                token: current_cancel_token,
                reason: reason,
                store_url: store_url

            },
            success: function(data) {
                if (data.status == "done") {
                    $(".full_msg").html(data.message);
                    setTimeout(window.location.reload(), 2000);


                } else {
                    $(".full_msg").html(data.message);
                    setTimeout(window.location.reload(), 2000);


                }
            }
        });

    } else {

        $(".cancel_msg").html("<div style='color:red;'>Reason cannot be Blank!</div>");

    }

});


var current_token = null;

//get global token for full refund orders
$("body").on("click", ".full_refund_btn", function() {

    var url = $(this).parent().parent().parents("tr").find("td").first().find("a").prop('href').trim()

    // console.log(url);

    token = url.split('/');
    token = token[5];

    current_token = token;

});




//submit full refund request request
$("body").on("click", ".full_btn", function() {

    if ($(".fullrefund").val() != '') {

        var reason = $('.fullrefund').val();
        // var store = $("#show_history").data("store");
        // var order_no = full;
        // var customer = $("#show_history").data("customer");
        $.ajax({
            url: "https://makkpressapps.com/credit_app_copy/full-refund.php",
            type: "POST",
            dataType: "json",
            data: {
                customer_id: customer_id,
                token: current_token,
                reason: reason,
                store_url: store_url

            },
            success: function(data) {
                if (data.status == "done") {
                    $(".full_msg").html(data.message);
                    setTimeout(window.location.reload(), 2000);


                } else {
                    $(".full_msg").html(data.message);
                    setTimeout(window.location.reload(), 2000);


                }
            }
        });

    } else {

        $(".full_msg").html("<div style='color:red;'>Reason cannot be Blank!</div>");

    }

});



function modal_box2(btn) {



    var mpopup = document.getElementById('mpopupBox1');

    // Select trigger link
    // var mpLink = document.getElementById(btn);

    // Select close action element
    // {% comment %}
    //   var close = document.getElementsByClassName("close")[1];{% endcomment %}

    // Open modal once the link is clicked

    mpopup.style.display = "block";


    // Close modal once close element is clicked
    // {% comment %}close.onclick = function() {
    //     mpopup.style.display = "none";
    //   };{% endcomment %}


    modal_box_ajax2(btn);

}


function modal_box_ajax2(btn) {
    // $('#' + btn).click(function() {

    var url = $(btn).parent().parent().parents("tr").find("td").first().find("a").prop('href').trim()

    // console.log(url);


    token = url.split('/');
    token = token[5];

    $("#refund_products").html("");
    // var store = $("#show_history").data("store");
    // var order_no = $(btn).attr('data-p_order_no');
    // var customer = $("#show_history").data("customer");
    $.ajax({
        url: "https://makkpressapps.com/credit_app_copy/partial-data-refund.php",
        type: "POST",
        dataType: "json",
        data: {
            customer_id: customer_id,
            token: token,
            store_url: store_url

        },
        success: function(data) {

            if (data.status == "done") {

                const obj = JSON.parse(data.message);


                for (var i in obj) {

                    if (obj[i].quantity != 0) {

                        $("#refund_products").append("<li><div class='price_name'> <div class='product_name'> <input type='checkbox' onchange=\"$('#quantity_div" + obj[i].product_id + "').toggle();\" value='" + obj[i].product_id + "' class=' products__list ' data-orderno='" + token + "'> " + obj[i].name + " </div><span class='p_price'> " + data.currency + " " + obj[i].price + '</span> </div> <div class="quantity_s" style="display: none;" id="quantity_div' + obj[i].product_id + '">Quantity: <span>Total: ' + obj[i].quantity + '/</span><input type="number" class="pro_quantity" id="' + obj[i].product_id + '" min="1" value="' + obj[i].quantity + '" max="' + obj[i].quantity + "\" onkeyup='check_val(this);'></div><br></li>");

                    }



                }


            }

            if (document.getElementById('refund_products').innerHTML == '') {



            }

        }
    });

    console.log('before submit_click');




}

window.onclick = (event) => {

    if (event.target == document.getElementById('mpopupBox')) {

        document.getElementById('mpopupBox').style.display = "none";

        $("textarea").val('');

    } else if (event.target == document.getElementById('mpopupBox1')) {

        document.getElementById('mpopupBox1').style.display = "none";

        $("textarea").val('');

    } else if (event.target == document.getElementById('cancel_modal_box')) {

        document.getElementById('cancel_modal_box').style.display = "none";

        $("textarea").val('');

    }
}



$("body").on("click", ".close_popup_refund", function(event) {


    $(this).parents().find('.mpopup').css('display', 'none');

    $("textarea").val('');


});



$("body").on("click", ".partial_btn", function() {


    // $(".partial_btn").click(function() {

    console.log('submit');

    // console.log($(this).parent());

    var token = $(this).parent('.popup_footer').parent('.popup_sdtrh').children().find('li').eq(0).find('[data-orderno]').attr('data-orderno');

    var website_id = $(".products__list:checked");
    var product_id = [];
    for (let i = 0; i < website_id.length; i++) {

        var website__id = website_id[i];

        product_id.push({
            'id': $(website__id).val(),

            'quantity': $('#' + $(website__id).val()).val()
        });


    }

    console.log(product_id);
    if ($(".products__list:checked").length != 0 && $(".par_refund").val() != '') {


        console.log('inside if');


        var customer = $("#show_history").data("customer");
        var reason = $('.par_refund').val();
        var store = $("#show_history").data("store");
        $.ajax({
            url: "https://makkpressapps.com/credit_app_copy/partial-refund.php",
            type: "POST",
            dataType: "json",
            data: {
                customer_id: customer_id,
                token: token,
                reason: reason,
                product_id: product_id,
                store_url: store_url

            },
            success: function(data) {
                if (data.status == "done") {
                    $(".partial_msg").html(data.message);
                    setTimeout(window.location.reload(), 2000);


                } else {
                    $(".partial_msg").html(data.message);
                    setTimeout(window.location.reload(), 2000);
                }
            }
        });

    } else {

        if ($(".par_refund").val() == '') {

            console.log('empty reason');

            $(".partial_msg").html("<div style='color:red;'>Reason cannot be Blank!</div>");

        } else {

            $(".partial_msg").html("<div style='color:red;'>Checkbox can't be blank</div>");

        }




        setTimeout(function() {
            $(".partial_msg").empty();
        }, 2000);

    }

    // });

})

function check_val(element) {

    if (parseInt($(element).val()) > parseInt($(element).attr('max'))) {

        $(element).val(($(element).attr('max')));


    }



}
// show  History below the icons panel

function show_history_php(user){
    var chatBox = document.querySelector('.chat-box');
    let users = user.getAttribute('user');
    let store_url = user.getAttribute('shop');
    let tranction = document.querySelector('.all-tranction')
    chatBox.style.display = (chatBox.style.display === 'none' || chatBox.style.display === '') ? 'block' : 'none';
    document.querySelector('.chat-box-welcome__header').style.display = 'block'
    let chatwrapper = document.querySelector('.chat-wrapper');
    chatwrapper.classList.add('chat-wrappper-overlay');
    // tranction.classList.contains('tranction-show') ?tranction.classList.remove('tranction-show') :tranction.classList.add('tranction-show')
    // if(!tranction.classList.contains('tranction-show')){
    tranction.innerHTML = '';
        $.ajax({
            type: "POST",
            url: "https://makkpressapps.com/credit_app_copy/user_front_history.php",
            data: {
                id:users,
                store_url: store_url
            },
            success: function(transactions) {
                let transaction = [] || 0;
                try {
                    transaction = JSON.parse(transactions); // Convert the string to a JavaScript array
                } catch (error) {
                    console.error("Error parsing response:", error);
                    return;
                }
    
                console.log(transaction);
                console.log(typeof transaction);
    
                let transactionHTML = "<div class='history'>";
                for(var i=0;i<transaction.length;i++){
                                    // let parsedDate = new Date(transaction[i].Date.replace(/\\|\//g, ''));
                                    let trans = (transaction[i].note == null || transaction[i].note.trim() === "") ? "-" : transaction[i].note;

                                    let balance =  'profit';
                                    transaction[i].amount.includes('-') ? balance = 'losses' : balance = 'profit';
                                    // let formattedDate = parsedDate.toLocaleDateString( { month: 'short', day: 'numeric', year: 'numeric' });
                                    transactionHTML += "<div class='transaction "+balance+"'>";
                                    transactionHTML += "<span class='amount '>" + transaction[i].amount + "</span>";
                                    transactionHTML += "<div class='note_Date'><span class='note'>" + trans + "</span><span class='date'>"  + transaction[i].Date + "</span> </div>";
                                    transactionHTML += "<span class='order'>Order: " + transaction[i].order + "</span>";
                                    transactionHTML += "</div>";
                        }
                transactionHTML += "</div>";
                tranction.innerHTML = transactionHTML;
            }
        });
    // }
    }

    function closechat(){
        let chatContainer = document.querySelector('.chat-wrapper');

        // Check if 'tranction-show' class is present, then remove it
        if (chatContainer.classList.contains('chat-wrappper-overlay')) {
            chatContainer.classList.remove('chat-wrappper-overlay');
        }    }




       //account page and cart page checout button with credit
        if(window.location.pathname.indexOf('/account') == 0){
            let Side_Amount_container = document.querySelector('.Side_Amount_container')
            let users_id = Side_Amount_container.getAttribute('user');
            let store_url_shop = Side_Amount_container.getAttribute('shop'); 
            let currency_for = Side_Amount_container.getAttribute('currency'); 
            let create_chk = document.createElement('div')
            create_chk.classList.add('checkout_button_h')
            create_chk.innerHTML = ` <p>you have <span id="accountRemainingBal"></span><span> ${currency_for} </span> store credit</p> <button class="checkout_button_b" shop="${store_url_shop}" user="${users_id}" onclick="show_history_php(this)" >Checkout Using Store credit</button>`
            let parent_node = document.querySelector('.customer__title').parentElement
            parent_node.insertAdjacentElement('afterend', create_chk);
     }else if(window.location.pathname.indexOf('/cart') == 0){
  
        let Side_Amount_container = document.querySelector('.Side_Amount_container')
        let users_id = Side_Amount_container.getAttribute('user');
        let store_url_shop = Side_Amount_container.getAttribute('shop'); 
        let currency_for = Side_Amount_container.getAttribute('currency'); 
        let create_chk = document.createElement('div')
        create_chk.classList.add('checkout_button_h')
        create_chk.innerHTML = ` <p>you have <span id="accountRemainingBal"></span> <span> ${currency_for} </span>store credit </p> <button class="checkout_button_b button" shop="${store_url_shop}" user="${users_id}" onclick="show_history_php(this)" >Checkout Using Store credit</button>`
        let parent_node = document.querySelector('.cart__blocks [name="checkout"]').parentElement
        parent_node.insertAdjacentElement('afterend', create_chk);

     }


// Code for pop up

        // Get references to the elements
        // var showChatBtn = document.getElementById('showChatBtn');
        // var chatBox = document.querySelector('.chat-box');

        // Show/hide the chat box when the button is clicked
        // showChatBtn.addEventListener('click', function () {
            // Toggle the display of the chat box
            // chatBox.style.display = (chatBox.style.display === 'none' || chatBox.style.display === '') ? 'block' : 'none';
        // });
   
