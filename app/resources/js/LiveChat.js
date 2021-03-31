/* eslint-env node */

import { getNickName } from "./room.js";
import { HOST} from "./constants.js";
// eslint-disable-next-line no-undef
const socket = io(HOST);
var messageTextField,
    messageSendIcon;

//set click listener on symbol and on enter key
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

//plays sound when massage received and not muted
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

//checks if nickname is entered to be able to chat
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

//enables chat when nickname is entered
function removeDisabled() {
    var user = document.getElementsByClassName("receivedUser"),
        message = document.getElementsByClassName("receivedMessage");

    for (let i = 0; i < user.length; i++) {
        user[i].classList.remove("disabled");
        message[i].classList.remove("disabled");
    }
}

//handles scrolling in livechat
function pageScroll() {
    var scrollNumber = 3;
    let autoScroll = document.querySelector(".chat-body"),
        scrolldelay;
    autoScroll.scrollBy(0, 1);
    // eslint-disable-next-line no-unused-vars
    scrolldelay = setTimeout(pageScroll, scrollNumber);
}
