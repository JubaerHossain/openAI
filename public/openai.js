
$(document).ready(function() {
$(".main__chat_window").animate({ scrollTop: $('.messages').height() }, "fast");
function ChatBot(){
    var text = $("#chat_message").val();
    if (text == "") {
    $("#chat_message").focus();
    return false;
    }
    $(".messages").append("<li class='sent'>" + text + "</li>");
    // messages section scroll to bottom
    $
    $(".main__chat_window").animate({ scrollTop: $('.messages').height() }, "fast");
    $("#chat_message").val("");
    $.ajax({
        url: 'http://localhost:3000/chat',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({text: text}),
        success: function(data) {
            // console.log(data);
            $(".messages").append("<li class='message'>" + data + "</li>");
            $(".main__chat_window").animate({ scrollTop: $('.messages').height() }, "fast");
        },
        error: function(err) {
            console.log(err);
        }

    });
}

$("#send").on("click",function(e) {
    e.preventDefault();
    ChatBot();   

})

$("#chat_message").on('keyup ',function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        ChatBot();
    }
});

});