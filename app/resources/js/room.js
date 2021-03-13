/* eslint-env node */

import {setLiveChatClickListener} from "./LiveChat.js";

let nicknameTextField;

function init(){
    setClickListener();
    setLiveChatClickListener();
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
    document.querySelector(".chat-header").classList.remove("disabled");
    document.querySelector(".typeField").disabled = false;
}

export function getNickName(){
    return nicknameTextField.value;
}

init();