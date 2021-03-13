/* eslint-env node */

import { getNickName } from "./room.js";

// eslint-disable-next-line no-undef
const socket = io("http://localhost:3000");
let messageTextField;

export function setLiveChatClickListener() {
    messageTextField = document.querySelector(".typeField");
    messageTextField.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && messageTextField.value !== "") {
            addNewMessage();
        }
    });
}

socket.on("MessageToClients", (message, nickname, room) => {
    var clientRoom = window.location.href;
    // only send message to users in the same room using the link
    if (room === clientRoom) {
        showMessage(message, nickname);
    }
});

// add own message and send to server
function addNewMessage() {
    var chat = document.querySelector(".chat-body"),
        message = document.createElement("p"),
        room = window.location.href;
    message.className = "message";
    message.innerHTML = "Du: " + messageTextField.value;
    chat.appendChild(message, document.querySelector(".chat-header"));
    // send Message to Server
    socket.emit("MessageToServer", messageTextField.value, getNickName(), room);
    messageTextField.value = "";
}

// show message from other clients
function showMessage(messageFromServer, nickname) {
    var chat = document.querySelector(".chat-body"),
        message = document.createElement("p");
        message.className = "message";
    message.innerHTML = nickname + ": " + messageFromServer;
    chat.appendChild(message, document.querySelector(".chat-header"));
}
