/* eslint-env browser */

const socket = io('http://localhost:3000')

socket.on('test', data  => {
	console.log(data);
})

function init() {

	setClickListener();
}

function setClickListener(){
	let joinRoomButton = document.querySelector(".joiningRoom"),
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