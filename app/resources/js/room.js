let nicknameTextField,
messageTextField;

function init(){
    setClickListener();
}

function setClickListener(){
    messageTextField = document.querySelector(".typeField");
    nicknameTextField = document.querySelector(".nickname");
    nicknameTextField.addEventListener("keypress", function (e){
        if(e.key === "Enter" && nicknameTextField.value !== ""){
            enterNickname();
        }
    });
    messageTextField.addEventListener("keypress", function (e){
        if(e.key === "Enter" && messageTextField.value !== ""){
            addMessage();
        }
    });
}

function enterNickname(){
    nicknameTextField.classList.add("hidden");
    document.querySelector(".chat").classList.remove("disabled");
    document.querySelector(".typeField").disabled = false;
}

function addMessage(){
    var chat = document.querySelector(".chat"),
    message = document.createElement("div");
    message.innerHTML = messageTextField.value;
    chat.insertBefore(message, document.querySelector(".typeField"));
}

init();