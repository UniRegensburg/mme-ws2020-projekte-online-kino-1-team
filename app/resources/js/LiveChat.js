/* eslint-env node */

let messageTextField;

function addMessage(){
        var chat = document.querySelector(".chat"),
    message = document.createElement("div");
    message.innerHTML = messageTextField.value;
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
                addMessage();
            }
        });
    }
}