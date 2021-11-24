$(document).ready(function() {
//home page text switcher
    let variants = [
        [0, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
    ];
    let currentInterval = 0;
    setInterval(textSwitcher, 5000);
    function textSwitcher() {

        $("*[data-textswitcher]").each(function(index){
            let currentStatus = variants[currentInterval][index];
            let nextStatus = variants[ (currentInterval + 1) % variants.length][index];
            if(currentStatus != nextStatus) {
                let elem = $(this);
                elem.fadeOut(function () {
                    let oldHTML = elem.html();
                    elem.html(elem.attr("data-textswitcher"));
                    elem.attr("data-textswitcher", oldHTML)
                    elem.fadeIn();
                });
            }
        })

        currentInterval++;
        currentInterval %= variants.length;

    }
//end home page text switcher
//setting filter for the features
let featuresFilters = {
    "develop_rapidly":              "Develop rapidly",
    "develop_simply":               "Develop simply",
    "any_complexity":               "Any complexity",
    "any_amount_of_data":           "Any amount of data",
    "any_number_of_users":          "Any number of users",
    "any_infrastructure":           "Any infrastructure",
    "trust_the_system":             "Trust the system",
    "manage_the_system":            "Manage the system",
    "communicate_with_the_system":  "Communicate with the system",
    "own_the_system":               "Own the system",
    "extend_the_system":            "Extend the system",
    "scale_the_system":             "Scale the system",
}
    let featureClass = document.location.hash.substring(1);
    if(featureClass) {
        $("#features-nav .close").click(function(){
            $("#features-nav").hide();
            $("ul.features").removeClass("filterApplied").removeClass( document.location.hash.substring(1) )
        })
        $("#features-nav .prev").click(function(){
            currentFeature = Math.max(currentFeature - 1, 0);
            if(currentFeature == 0){
                $(this).addClass("disabled")
            }
            if(currentFeature < numberOfActiveFeatures - 1){
                $("#features-nav .next").removeClass("disabled")
            }
            scrollToFeature( currentFeature );
        })
        $("#features-nav .next").click(function(){
            currentFeature = Math.min(currentFeature + 1, numberOfActiveFeatures - 1);
            if(currentFeature + 1 == numberOfActiveFeatures){
                $(this).addClass("disabled")
            }
            if(currentFeature > 0){
                $("#features-nav .prev").removeClass("disabled")
            }
            scrollToFeature( currentFeature );
        })
        function scrollToFeature(index){
            if($("ul.features li." + featureClass).eq( index )) {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("ul.features li." + featureClass).eq(index).offset().top - 140
                }, 300);
                //updating nav
                $("#features-nav em").html("<span>" + (index + 1) + "</span>/" + numberOfActiveFeatures)
            }else{
                $("#features-nav em").html("<span>" + (numberOfActiveFeatures   ) + "</span>/" + numberOfActiveFeatures)
            }
        }

        let currentFeature = 0;
        let numberOfActiveFeatures = $("ul.features li." + featureClass).length;

        $(window).on("scroll resize", function () {
            if (numberOfActiveFeatures == 0) {
                return;
            }
            let moveToIndex = numberOfActiveFeatures - 1;
            let scrollTop = $(document).scrollTop();
            for (let i = numberOfActiveFeatures - 1; i >= 0; i--) {
                if ($("ul.features li." + featureClass).eq(i).offset().top - scrollTop >= 140) {
                    moveToIndex = i;
                }
            }
            currentFeature = moveToIndex;

            if (currentFeature + 1 == numberOfActiveFeatures) {
                $("#features-nav .next").addClass("disabled")
            } else {
                $("#features-nav .next").removeClass("disabled")
            }
            if (currentFeature == 0) {
                $("#features-nav .prev").addClass("disabled")
            } else {
                $("#features-nav .prev").removeClass("disabled")
            }

            $("#features-nav em").html("<span>" + (moveToIndex + 1) + "</span>/" + numberOfActiveFeatures)
        })

        if (featuresFilters[featureClass]) {
            //enabling navigation through items
            $("#features-nav strong").text(featuresFilters[featureClass])
            $("#features-nav em").html("<span>1</span>/" + numberOfActiveFeatures)
            $("#features-nav").show();

            $("ul.features").addClass("filterApplied").addClass(featureClass)

            scrollToFeature(0);
        }
    }
//end setting filter for the features;
//scrolling and highlighting at compare page (if id detected)
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    let id = getParameterByName('id');
    if(id){
        $("#comparetbl tr[data-id='" + id + "']").addClass("active");

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#comparetbl tr[data-id='" + id + "']").eq(0).offset().top - 350
        }, 100);

        setTimeout(function(){
            $("#comparetbl tr[data-id='" + id + "']").removeClass("active");
        }, 5000)
    }
//end compare page

    $(document).click(function(e){

        let target = e.target;

        if( $(target).is(".language") || $(target).closest(".language").size() > 0 ){
            $("div.language").toggleClass("active");
        }else{
            $("div.language").removeClass("active");
        }
    })
    $(".menu-link").click(function(e){$(this).toggleClass("active");e.preventDefault()})

    $("body").on("click", ".dropdown", function(e){
        $(this).toggleClass("active");
        e.stopPropagation();
    })
    $(document).click(function(){
        $(".dropdown").removeClass("active");
    });
    $(".dropdown ul li").click(function(){
        $(this).closest(".dropdown").find("li.active").removeClass("active")
        $(this).addClass("active");
        let text = $(this).text();
        $(this).closest(".dropdown").find("em").text( text )

        let _id = $(this).closest(".dropdown").attr("data-apply-to")
        $("#" + _id).attr("class", _id + " " + text.replace(/ /, ""))
    })
//try page
    $("body").on("click", ".dd", function(e){
        if( $(this).hasClass("active")){
            $(this).toggleClass("active");
        }else{
            $(this).toggleClass("active");
            e.stopPropagation();
        }
    })
    $(document).click(function(){
        $(".dd").removeClass("active");
    });
    $(document).on("click", ".dd ul li", function(){

        $(this).closest(".dd").find("li.active").removeClass("active")
        $(this).addClass("active");
        let text = $(this).text();
        $(this).closest(".dd").find("em").text( text )

        $(this).closest(".tryfeature").find(".code").val( $(this).attr("data-value") )
    })

    $("textarea.code").focus(function(){
        $(this).removeClass("loading");
        $(this).closest(".tryfeature").find(".start").removeClass("disabled");
    })
    let server = 'https://tryonline.lsfusion.org';
    if( $("textarea.code").size() > 0) {
        for (let t = 0; t < 2; t++) {
            let currentTab = $(".tryfeature").eq( t );
            $.ajax(server + "/exec?action=Main.getExamples", {
                    data: btoa(unescape(encodeURIComponent(JSON.stringify({'mode': t, 'locale': 'en'})))),
                    contentType: "text/plain",
                    method: "POST",

                    success: function (response) {
                        let list = currentTab.find(".dd ul");

                        for (i in response) {
                            let listItem = $("<li></li>").attr("tab", i).attr("data-value", response[i].text).text( response[i].caption );
                            list.append(listItem)

                            if (i == 0) {//TODO:
                                currentTab.find(".dd em").text( listItem.text() );
                                currentTab.find(".code").removeClass("loading").val( listItem.attr("data-value") )
                                currentTab.find(".results").removeClass("loading");
                                currentTab.find(".start").removeClass("disabled")
                            }
                        }
                    }
                }
            );
        }
    }
    $(".start").click(function(){
        if( $(this).closest(".try-database").length > 0 ){
            $(this).closest(".tryfeature").find(".results").text("").addClass("loading")

            $(this).closest(".tryfeature").find(".code").val()

            let request = $.ajax("https://demo.lsfusion.org/mm/eval", {
                    data: $(this).closest(".tryfeature").find(".code").val(),
                    contentType: "text/plain",
                    method: "POST",

                    success: function (response) {

                        let contentType = request.getResponseHeader('Content-Type');

                        if (contentType.startsWith('application/json')) {

                            $(".try-database .results").text( JSON.stringify(JSON.parse(new TextDecoder('utf-8').decode(response)), null, 2) ).removeClass("loading")

                            //getResultArea().value = JSON.stringify(JSON.parse(new TextDecoder('utf-8').decode(this.response)), null, 2);
                        } else if (contentType.startsWith('application/') && !contentType.startsWith('application/xml')) {
                            var blob = new Blob([this.response], { type: contentType });
                            var link = document.createElement('a');
                            link.href = window.URL.createObjectURL(blob);
                            link.download = 'response';

                            document.body.appendChild(link);

                            getResultArea().value = '';
                            link.click();

                            document.body.removeChild(link);
                        } else {
                            $(".try-database .results").text( new TextDecoder('utf-8').decode(response) ).removeClass("loading")
                        }




                    }
                },
                "arraybuffer",
            );

            return;
        }
        //it is platform
        start_server = true;
        $(this).closest(".buttons").find(".stop").removeClass("disabled");

        startServer()

    })
    $(".stop").click(function(){
        $(this).addClass("disabled")
        stopServer();
    })

    function sendRequest(url, request, responseType) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");
        if (responseType != null) {
            xhr.responseType = responseType;
        }
        xhr.send(request);
        return xhr;
    }

    function sendEscapedRequest(url, request) {
        return sendRequest(url, btoa(unescape(encodeURIComponent(JSON.stringify(request)))));
    }

    function stopServer(){
        let xhr = sendEscapedRequest(server + "/exec?action=Main.stopServer", {'server': window.serverStartReturn});

        stopLogServerScheduler();
        //getResultArea().value = '';

        start_server = false;
        //rmiStarted = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                return this.responseText;
            }
        });
    }
    function startServer(){
        window.lastServerReturn = 0;

        let xhr = sendEscapedRequest(server + "/exec?action=Main.startServer", {'code': $(".platform .code").val()});

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let response = JSON.parse(this.responseText);
                rmiPort = response.port;
                window.serverStartReturn = response.server;

                $(".open").removeClass("disabled").attr("href", "https://tryonline.lsfusion.org/?port=" + response.port)

                startLogServerScheduler();
                return this.responseText;
            }
        });

    }
    function startLogServerScheduler() {

        if(window.getServerLogScheduler == null) {
            window.getServerLogScheduler = window.setInterval(function () {
                if(!window.isRunning) {
                    getServerLog();
                }
            }, 1000);
        }
    }

    function getServerLog() {
        window.isRunning = true;

        let xhr = sendEscapedRequest(server + "/exec?action=Main.getServerLog", {'server': window.serverStartReturn, 'lastAnswer': window.lastServerReturn});

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let oldTextareaValue = $(".platform .results").text();
                let response = JSON.parse(this.responseText);

                if(response != null && response.text != null) {
                    $(".platform .results").append(response.text)
                    return;


                    resultArea.value = oldTextareaValue + response.text;

                    if(!rmiStarted) {
                        let match = /.*Exporting\sRMI\sLogics\sobject\s\(port:\s(\d+)\).*/g.exec(resultArea.value);
                        if (match) {
                            window.open(server + '/?port=' + rmiPort, '_blank');
                            showOpenTabButton();
                            rmiStarted = true;
                        }
                    }

                    resultArea.scrollTop = resultArea.scrollHeight;
                    window.lastServerReturn = response.answer;
                } else if (window.start_server && oldTextareaValue === '') {
                    resultArea.value = 'Server is starting...\n';
                }
            }
            window.isRunning = false;
        });
    }

    function stopLogServerScheduler() {
        //выключаем получение логов
        window.clearInterval(window.getServerLogScheduler);
        window.getServerLogScheduler = null;
    }



    let start_server = false;
    window.onbeforeunload = function() {
        if (window.start_server) {

            stopServer();
            window.start_server = false;

            stopLogServerScheduler();
            return "Are you sure?";
        }
    };

})