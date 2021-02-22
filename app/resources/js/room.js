let nicknametextField;

function init(){
    setClickListener();
}

function setClickListener(){
    nicknametextField = document.querySelector(".nickname");
    nicknametextField.addEventListener("keypress", function (e){
        if(e.key === "Enter" && nicknametextField.value !== ""){
            enterNickname();
        }
    });
}

function enterNickname(){
    nicknametextField.classList.add("hidden");
    document.querySelector(".chat").classList.remove("disabled");
    document.querySelector(".typeField").disabled = false;
}

init();