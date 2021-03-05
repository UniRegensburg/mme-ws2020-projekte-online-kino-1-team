/* eslint-env browser */

//Client

// eslint-disable-next-line no-undef
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  //console.log("Client: " + socket.id);

});

function init() {
  setClickListener();
}

function setClickListener() {
  let joinRoomButton = document.querySelector(".joiningRoom"),
    closeDropDownMenu = document.querySelector(".closeDropDownMenu"),
	//dateButton = document.querySelector(".calender"),
	createButton = document.querySelector(".creatingRoom");
  joinRoomButton.addEventListener("click", showURLTextBox);
  closeDropDownMenu.addEventListener("click", hideURLTextBox);
  createButton.addEventListener("click", createNewRoom);
}


function createNewRoom(){
	socket.emit("createRoom", "Room1");
}

function showURLTextBox() {
  document.querySelector(".dropDownMenu").classList.remove("hidden");
}

function hideURLTextBox() {
  document.querySelector(".dropDownMenu").classList.add("hidden");
}

init();