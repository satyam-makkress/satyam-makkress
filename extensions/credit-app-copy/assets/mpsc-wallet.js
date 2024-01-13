/*
* Wallet history functionality
**/ 

setTimeout(function() {

    // check wallet history page
    var show_history = $("#show_history").length ;
    if ( show_history > 0 ) {

        var is_admin = window.parent.location.href.indexOf("admin");
        var customer = document.getElementById("stcid").value ;       
        // console.log("is_admin : "+is_admin) ;
        // console.log("customer : "+customer);

        var section = document.getElementById("mc-section");

        if ( (is_admin > 0) && (customer == undefined || customer == null || customer == "") ) {
            // alert("1") ;
            $(".mpsc-history-section").html("<h2 class='mpsc-admin-head'>Currently viewing as admin!</h2><p class='mpsc-admin-text'>Please login as customer to see full functionlity.</p>") ;
        }
        // else if ( (customer != undefined || customer != null || customer != "")  || (is_admin > 0) ) {
        //     alert("history =>1");
        //     $(".mpsc-history-section").html("<p class='mpsc-admin-text'>Please login to your account to see your credit history.</p>") ;
        // }
        else {

            // alert("2") ;

            var customer = $("#show_history").data("customer") ;
            var store = $("#show_history").data("store") ;
            var page = window.location.href ;

            $.ajax({
                url: "https://makkpressapps.com/credit_app_copy/check-history-page.php",
                type: "POST",
                dataType: "json",
                async: true,
                data: {
                    customer_id: customer,
                    store_url: store,
                    page:page
                },
                success: function (data) {
                    // console.log(data);
                    if ( data.status == "done" ) {

                        console.log(data);
                        let alert = ()=>{return false};

                        $('#show_history').html(data.message);


                        // let table = new DataTable('#history_id');
                        

                        
                    }
                    else {
                        if ( data.code == "1" ) {
                            $('#show_history').html(data.message);
                        }
                        else {
                            console.error(data.message) ;
                        }
                    }
                }
            }) ;
        }
    }

},1000) ;
// =============================================================

