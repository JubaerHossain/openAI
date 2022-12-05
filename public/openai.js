

$("#send").on("click",function(e) {

    var text = $("#chat_message").val();
    $(".messages").append("<li class='sent'>" + text + "</li>");
    $("#chat_message").val("");
    $.ajax({
        url: 'http://localhost:3000/chat',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({text: text}),
        success: function(data) {
            $(".messages").append("<li class='message'>" + data + "</li>");
        }
    });

})