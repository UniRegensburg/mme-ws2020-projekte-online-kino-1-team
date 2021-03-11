/* eslint-env node */

import { getNickName } from "./room.js";

// eslint-disable-next-line no-undef
const socket = io("http://localhost:3000");
let messageTextField;

socket.on("MessageToClients", (message, nickname) => {
    showMessage(message, nickname);
});

// add own message and send to server
function addNewMessage() {
    var chat = document.querySelector(".chat"),
        message = document.createElement("div");
    message.innerHTML = "You: " + messageTextField.value;
    chat.insertBefore(message, document.querySelector(".typeField"));
    // send Message to Server
    socket.emit("MessageToServer", messageTextField.value, getNickName());
    messageTextField.value = "";
}

// show message from other clients
function showMessage(messageFromServer, nickname) {
    var chat = document.querySelector(".chat"),
        message = document.createElement("div");
    message.innerHTML = nickname + ": " + messageFromServer;
    chat.insertBefore(message, document.querySelector(".typeField"));
}

export class LiveChat {
    constructor() {
        this.setClickListener();
    }

    setClickListener() {
        messageTextField = document.querySelector(".typeField");
        messageTextField.addEventListener("keypress", function (e) {
            if (e.key === "Enter" && messageTextField.value !== "") {
                addNewMessage();
            }
        });
    }
}