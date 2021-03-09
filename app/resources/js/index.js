/* eslint-env browser */

//Client

// eslint-disable-next-line no-undef
const socket = io("http://localhost:3000");

let dropDownMenu = document.querySelector(".dropDownMenu");

socket.on("connect", () => {
  //console.log("Client: " + socket.id);

});
socket.on("changeUrl", (data) => window.location.href =
  "http://localhost:8000/app/" + data);

function init() {
  setClickListener();
}

function setClickListener() {
  let joinRoomButton = document.querySelector(".joiningRoom"),
    closeDropDownMenu = document.querySelector(".closeDropDownMenu"),
    //dateButton = document.querySelector(".calender"),
    creatingRoomButton = document.querySelector(".creatingRoom");
  dropDownMenu.addEventListener("keypress", onLinkEntered);
  joinRoomButton.addEventListener("click", showURLTextBox);
  closeDropDownMenu.addEventListener("click", hideURLTextBox);
  creatingRoomButton.addEventListener("click", createNewRoom);
  console.log("Value hier: " + dropDownMenu.value);
}

function createNewRoom() {
  socket.emit("createRoom");
}

function showURLTextBox() {
  dropDownMenu.classList.remove("hidden");
}

function hideURLTextBox() {
  dropDownMenu.classList.add("hidden");
}

function onLinkEntered(e) {
  let URLTextArea = document.querySelector(".URLTextArea");
  if (e.key === "Enter" && URLTextArea.value !== "") {
    window.open(URLTextArea.value);
  }
}

init();