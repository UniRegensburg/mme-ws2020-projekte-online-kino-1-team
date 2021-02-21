/* eslint-env browser */

let joinRoomButton, closeDropDownMenu;

function init() {
	setClickListener();
}

function setClickListener(){
	joinRoomButton = document.querySelector(".joiningRoom");
	closeDropDownMenu = document.querySelector(".closeDropDownMenu");
	joinRoomButton.addEventListener("click", showURLTextBox);
	closeDropDownMenu.addEventListener("click", hideURLTextBox);
}

function showURLTextBox(){
	document.querySelector(".dropDownMenu").classList.remove("hidden");
}

function hideURLTextBox(){
	document.querySelector(".dropDownMenu").classList.add("hidden");
}

init();