/* eslint-env node */

import {LiveChat} from "./LiveChat.js";

// eslint-disable-next-line no-undef
//const socket = io("http://localhost:3000");

let nicknameTextField,
liveChatInstance;

function init(){
    setClickListener();
    liveChatInstance = new LiveChat();
}

function setClickListener(){
    nicknameTextField = document.querySelector(".nickname");
    nicknameTextField.addEventListener("keypress", function (e){
        if(e.key === "Enter" && nicknameTextField.value !== ""){
            enterNickname();
        }
    });
}

function enterNickname(){
    nicknameTextField.classList.add("hidden");
    document.querySelector(".chat").classList.remove("disabled");
    document.querySelector(".typeField").disabled = false;
}

init();