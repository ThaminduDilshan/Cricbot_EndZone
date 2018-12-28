var accessToken = "9860a654f3f6493da454fd7b7712149f";
var baseUrl = "https://api.api.ai/v1/";


$(document).ready(function() {
    $("#input").keypress(function(event) {
        if (event.which == 13) {
            $('.chatBox').append('<span class="userInput">' + 'you : '+ $('input').val() + '</span><br><br>')
            event.preventDefault();
            let query  = $('input').val()
            $('input').val('')
            send(query);
        }
    });

    $("#rec").click(function(event) {
        $('.chatBox').append('<span class="userInput">' + 'you : '+ $('input').val() + '</span><br><br>')
        event.preventDefault();
        let query  = $('input').val()
        $('input').val('')
        send(query);
    });
});


function send(query) {
    var text = query;
    $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20180101",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
        success: function(data) {
            $(".chatBox span").last().remove();
            setResponse(data);
        },
        error: function() {
            $(".chatBox span").last().remove();
            manualResponse("Internal Server Error");
        }
    });
    manualResponse("Typing...");
}


function setResponse(val) {
    $(".chatBox").append('<span class="responseData">'+ 'cricbot : ' + val.result.fulfillment.speech + '</span><br/><br/>');
}

function manualResponse(val) {
    $(".chatBox").append('<span class="responseData">'+ 'cricbot : ' + val + '</span>');
}


