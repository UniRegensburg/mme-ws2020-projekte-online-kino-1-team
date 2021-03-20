/* eslint-env node */

import { setLiveChatClickListener } from "./LiveChat.js";

let nicknameTextField,
    showChatIcon = document.querySelector(".chat-icon");

function init() {
    setClickListener();
    setLiveChatClickListener();
}

function setClickListener() {
    nicknameTextField = document.querySelector(".nickname");
    let hideChatIcon = document.querySelector(".chat-header-icon"),
        toggleOne = document.querySelector(".toggleOne"),
        toggleTwo = document.querySelector(".toggleTwo"),
        copyURLText = document.querySelector(".copy");
    nicknameTextField.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && nicknameTextField.value !== "") {
            enterNickname();
        }
    });
    hideChatIcon.addEventListener("click", hideChat);
    showChatIcon.addEventListener("click", showChat);
    toggleOne.addEventListener("mouseover", showOverlayOne);
    toggleTwo.addEventListener("mouseover", showOverlayTwo);
    toggleOne.addEventListener("mouseout", hideOverlayOne);
    toggleTwo.addEventListener("mouseout", hideOverlayTwo);
    copyURLText.addEventListener("click", copyURL);
}

function enterNickname() {
    nicknameTextField.classList.add("hidden");
    document.querySelector(".chat-header-title").classList.remove("disabled");
    document.querySelector(".typeField").disabled = false;
}

function hideChat() {
    document.querySelector(".chat").classList.add("hidden");
    document.querySelector(".playlist").style.width = "23%";
    showChatIcon.classList.remove("hidden");
}

function showChat() {
    document.querySelector(".chat").classList.remove("hidden");
    document.querySelector(".playlist").style.width = "30%";
    showChatIcon.classList.add("hidden");
}

function showOverlayOne() {
    document.querySelector(".overlay-toggleOne").classList.remove("hidden");
}

function showOverlayTwo() {
    document.querySelector(".overlay-toggleTwo").classList.remove("hidden");
}

function hideOverlayOne() {
    document.querySelector(".overlay-toggleOne").classList.add("hidden");
}

function hideOverlayTwo() {
    document.querySelector(".overlay-toggleTwo").classList.add("hidden");
}

function copyURL() {
    let elem = document.createElement("input"),
        url = window.location.href;
    document.body.appendChild(elem);
    elem.value = url;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    //Kann man machen, muss man aber nicht
    // eslint-disable-next-line no-alert
    alert("Url kopiert");
}

export function getNickName() {
    return nicknameTextField.value;
}

init();