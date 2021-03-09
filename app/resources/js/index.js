/* eslint-env browser */

// eslint-disable-next-line no-undef
const socket = io("http://localhost:3000");

let dropDownMenu = document.querySelector(".dropDownMenu");

socket.on("changeUrl", (data) => window.location.href =
  window.location.href + data);

function init() {
  setClickListener();
}

function setClickListener() {
  let joinRoomButton = document.querySelector(".joiningRoom"),
    closeDropDownMenu = document.querySelector(".closeDropDownMenu"),
    creatingRoomButton = document.querySelector(".creatingRoom");
  dropDownMenu.addEventListener("keypress", onLinkEntered);
  joinRoomButton.addEventListener("click", showURLTextBox);
  closeDropDownMenu.addEventListener("click", hideURLTextBox);
  creatingRoomButton.addEventListener("click", createNewRoom);
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
    window.location.href = window.location.href + URLTextArea.value;
  }
}

init();