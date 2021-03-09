let nicknameTextField;

function init(){
    setClickListener();
    console.log("Room.js");
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