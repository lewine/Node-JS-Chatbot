//reference from id in index.js
var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');
var user = {message:""};

function sendMessage(userMessage) {
    var messageElement = document.createElement('div');
    messageElement.style.textAlign = "right";
    messageElement.style.marginRight = "30px";
    messageElement.style.marginTop = "10px";

    messageElement.innerHTML = "<span> You: </span>" +
                            "<span>" +userMessage+ "</span>";

    chatContainer.appendChild(messageElement);
}

function chatbotResponse(userMessage) { //need to implement AI

    var chatbotmessage = "";

    if(userMessage == "Hi"){ 
        chatbotmessage = "Hello! How are you?"
    }

    var messageElement = document.createElement('div');

    messageElement.innerHTML = "<span> Chatbot: </span>" +
                            "<span>" + chatbotmessage + "</span>";

    chatContainer.appendChild(messageElement);
}

//listener for button
sendBtn.addEventListener('click', function(e) {
    var userMessage = textbox.value;
    if(userMessage == "") {
        alert('Please type a message');
    }else {
        let userMessageText = userMessage.trim();
        user.message = userMessageText;
        textbox.value = "";
        sendMessage(userMessageText);

        chatbotResponse(userMessageText);
    }
})