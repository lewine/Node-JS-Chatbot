var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');

function sendMessage(userMessage) {
    var messageElement = document.createElement('div');
    messageElement.style.textAlign = "right";
    messageElement.style.marginRight = "30px";
    messageElement.style.marginTop = "10px";

    messageElement.innerHTML = "<span> You: </span>" +
        "<span>" + userMessage + "</span>";

    chatContainer.appendChild(messageElement);
}

function chatbotResponse(chatbotMessage) {
    var messageElement = document.createElement('div');

    messageElement.innerHTML = "<span> Chatbot: </span>" +
        "<span>" + chatbotMessage + "</span>";

    chatContainer.appendChild(messageElement);
}

sendBtn.addEventListener('click', async function () {
    var userMessage = textbox.value;
    if (userMessage === "") {
        alert('Please type a message');
    } else {
        let userMessageText = userMessage.trim();
        textbox.value = "";
        sendMessage(userMessageText);

        //Send user message to the backend and get the chatbot response
        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessageText }),
            });

            const data = await response.json();
            chatbotResponse(data.response);

        } catch (error) {
            console.error('Error:', error);
            chatbotResponse('Sorry, something went wrong.');
        }
    }
});
