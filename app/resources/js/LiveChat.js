/* eslint-env node */

// eslint-disable-next-line no-undef
const socket = io("http://localhost:3000");
let messageTextField;

socket.on("MessageToClients", (message) => {
    showMessage(message);
});

function addNewMessage(){
        var chat = document.querySelector(".chat"),
    message = document.createElement("div");
    message.innerHTML = "You:" + messageTextField.value;
    chat.insertBefore(message, document.querySelector(".typeField"));
    socket.emit("MessageToServer", messageTextField.value);
    }

function showMessage(messageFromServer){
    var chat = document.querySelector(".chat"),
    message = document.createElement("div");
    message.innerHTML = "User X: " + messageFromServer;
    chat.insertBefore(message, document.querySelector(".typeField"));
}

    export class LiveChat{
    constructor(){ 
        this.setClickListener();
    }
    
    setClickListener(){
        messageTextField = document.querySelector(".typeField");
        messageTextField.addEventListener("keypress", function (e){
            if(e.key === "Enter" && messageTextField.value !== ""){
                addNewMessage();
            }
        });
    }
}