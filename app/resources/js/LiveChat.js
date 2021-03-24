/* eslint-env node */

import { getNickName } from "./room.js";
// eslint-disable-next-line no-undef
const socket = io("http://localhost:3000");
var messageTextField,
    messageSendIcon;

export function setLiveChatClickListener() {
    messageTextField = document.querySelector(".typeField");
    messageSendIcon = document.querySelector(".chat-footer-icon");

    messageTextField.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && messageTextField.value !== "") {
            addNewMessage();
        }
    });
    messageSendIcon.addEventListener("click", function () {
        if (messageTextField.value !== "") {
            addNewMessage();
        }
    });
    pageScroll();
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
    var chat = document.querySelector(".chat-messages"),
        message = document.createElement("p"),
        user = document.createElement("p"),
        room = window.location.href;

    message.className = "message";
    user.className = "user";
    message.innerHTML = messageTextField.value;
    user.innerHTML = "Du:";
    chat.appendChild(user, chat);
    chat.appendChild(message, chat);
    // send Message to Server
    socket.emit("MessageToServer", messageTextField.value, getNickName(), room);
    messageTextField.value = "";
}

// show message from other clients
function showMessage(messageFromServer, nickname) {
    var chat = document.querySelector(".chat-messages"),
        message = document.createElement("p"),
        user = document.createElement("p");
    message.className = "receivedMessage disabled";
    user.className = "receivedUser disabled";
    message.innerHTML = messageFromServer;
    user.innerHTML = nickname + ":";
    chat.appendChild(user, chat);
    chat.appendChild(message, chat);

    playSound();
    checkIfNicknameEntered();

}

function playSound() {
    var audio = document.querySelector(".audioFile"),
        muteCheckBox = document.getElementById("toggleButtonTwo");

    if (!muteCheckBox.checked) {
        audio.volume = 0.3;
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
}

function checkIfNicknameEntered() {
    var nicknameTextField = document.querySelector(".nickname");

    if (nicknameTextField.classList.contains("hidden")) {
        removeDisabled();
    }

    nicknameTextField.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && nicknameTextField.value !== "") {
            removeDisabled();
        }
    });
}

function removeDisabled() {
    var user = document.getElementsByClassName("receivedUser"),
        message = document.getElementsByClassName("receivedMessage");

    for (let i = 0; i < user.length; i++) {
        user[i].classList.remove("disabled");
        message[i].classList.remove("disabled");
    }
}

function pageScroll() {
    var scrollNumber = 3;
    let autoScroll = document.querySelector(".chat-body"),
        scrolldelay;
    autoScroll.scrollBy(0, 1);
    // eslint-disable-next-line no-unused-vars
    scrolldelay = setTimeout(pageScroll, scrollNumber);
}
