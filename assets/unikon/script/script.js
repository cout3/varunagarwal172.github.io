$(window).on('load', function (e) {
    setTimeout(() => {
        $('html, body').scrollTop(0);
    });

    $("img:not('.no-img-ll')").each(function (e) {
        $(this).attr({"src": $(this).attr("data-src") + "?version=1", "title": "Click for larger view"}).removeAttr("data-src");
    });

    $.ajax({
        url : '/unikon/product-data/products.json',
        method : "GET",
        dataType : "json",
        success: function (data) {
            var html = "",
                loc = location.pathname,
                param = location.search ? location.search.split("=")[1].split("%20").join(" ") : "";

            $(".effectL2RWrapper").hide();

            if(loc == "/unikon/" || loc == "/unikon/index.php") {
                $.each(data, function (i,v) {
                    getInitFans(i, v);
                });
            }
            else if(loc == "/unikon/views/product-listing.php") {
                    html = '<div class="section-heading col-lg-12 col-md-12 col-sm-12 col-xs-12">List of ' + param + '</div>';
                    getFanList(data, param, html);
            }
        },
        error: function (data) {
            //console.log(data);
        }
    }).done(function () {
        $("[data-toggle]").on("click", function (e) {
            
            let src = $(this).attr("src"),
                target = $(this).attr("data-target"),
                caption = $(this).attr("data-caption");

            $(target).find("img").attr({"src": src});
            $(target).find(".caption p").html(caption);
            
            $("body").addClass("modal-open");
            $("#enlargeImg, .modal-backdrop").addClass("in");
        });

        $(".close").on("click", function(e) {
            $("body").removeClass("modal-open");
            $("#enlargeImg, .modal-backdrop").removeClass("in");
        });
    });

    function getInitFans(i, v) {
        var html = "",
            additionalClass = "";

            if(i == "Pedestal Fan") {
                additionalClass = "long-fan";
            }

        html =  '<div class="row product-thumbnail-main-wrapper">' + 
                '<div class="product-thumbnail-heading col-lg-12 col-md-12 col-sm-12 col-xs-12">' + i + 
                '<a href="/unikon/views/product-listing.php?prod=' + i + '" class="see-all-products">See All</a>' +
                '</div>' +
                '<div class="product-thumbnail-wrapper ' + additionalClass + ' col-lg-12 col-md-12 col-sm-12 col-xs-12">';

        $.each(v, function (i,v) {
            html += '<img src="' + v.img_src + 
                    '"data-toggle="modal" data-target="#enlargeImg"' +  
                    'data-caption="<b>Model: ' + v.model + '</b><br/>' + 
                    'Sweep: ' +  v.sweep + '<br/>' + 
                    'Colors: ' + v.color + '" />';
                    
        });
        html += '</div></div>';

        $("#product-thumbnail-container").append(html);
    }

    function getFanList(data, param, html) {
        var additionalClass = "";

        $.each(data[param], function (i,v) {
            html += '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 product-list">' + 
                '<img class="col-lg-4 col-md-4 col-sm-4 col-xs-4" src="' + v.img_src + '" />' +
                '<div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 product-info-wrapper">' +
                '<div class="product-info-modal">Model: ' + v.model + '</div>' +
                '<div class="product-info-content">Sweep: ' + v.sweep + '</div>' + 
                '<div class="product-info-content">Colors: ' + v.color + '</div>' + 
                '</div></div>' ;
        });
        $(".product-list-wrapper").append(html);


    }
});

$(document).ready(function (e) {

    $(window).scroll(function () {
        let win = $(this),
            sT = win.scrollTop(),
            wH = win.height();
        $(".product-thumbnail-wrapper").each(function () {
            if($(this).offset().top <  parseInt(sT + wH - 100)) {
                $(this).css({'left':0});
            }
        });

        (sT > 40) ? $("#top-header").css({'top' : '-100%'}) : $("#top-header").css({'top' : '0'});
        
    });

    $("form").find("input, textarea").on("keyup", function (e) {
        var parForm  = $(this).closest("form"),
            btnEnableFlag = true;
        parForm.find("input, textarea").each(function (e) {
            if($.trim($(this).val()) == "") {
                btnEnableFlag = false;
            }
        });
        (btnEnableFlag) ? parForm.find(".btn.btn-primary").removeAttr("disabled") : parForm.find(".btn.btn-primary").attr("disabled","disabled");
    });

    $("input, textarea").on("blur", function (e) {
        if($.trim($(this).val()) == "") {
            $(this).addClass("error");
        }
        else {
            $(this).removeClass("error");
        }
    });

    $( "#send_enquiry" ).on('submit', function(e) {
        let name = $("#name").val(),
            email = $("#email").val(),
            message = $("#message").val(),
            subject = $("#subject").val();

        var dataString = {"name": name, "email":email, "subject": subject, "message":message}

        $.ajax({
            method:"POST",
            url:"/unikon/views/email.php",
            data: dataString,
            success: function(data) {
                data = JSON.parse(data);
                $("#sendEquiryFeedbackMsg").html(data.message);
                $("#sendEquiryModalBtn").trigger("click");
                $("form").find("input, textarea").val("");
            },
            error: function(error) {
                $("#sendEquiryFeedbackMsg").html(error + "Error");

                $("#sendEquiryModalBtn").trigger("click");

            }
        });

        e.preventDefault();
    });

});