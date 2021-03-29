/* eslint-env browser */
import { Calender, getUrlFromIndex } from "./Calender.js";
import {HOST} from "./constants.js";

//Client

// eslint-disable-next-line no-undef
const socket = io(HOST);

let dropDownMenu = document.querySelector(".dropDownMenu"),
  joinRoomButton = document.querySelector(".joiningRoom"),
  URLTextArea = document.querySelector(".URLTextArea");

socket.on("changeUrl", (data) => window.location.href =
  window.location.href + data);

socket.on("urlToClient", (data) => {
  getUrlFromIndex(data);
});

function init() {
  setClickListener();
  let calender = new Calender;
  calender.clickListenerCalender();
}

function setClickListener() {
  //console.log(test);
  let closeDropDownMenu = document.querySelector(".closeDropDownMenu"),
    creatingRoomButton = document.querySelector(".creatingRoom"),
    reloadPageButton = document.querySelector(".logo");
  dropDownMenu.addEventListener("keypress", onLinkEntered);
  joinRoomButton.addEventListener("click", showURLTextBox);
  closeDropDownMenu.addEventListener("click", hideURLTextBox);
  creatingRoomButton.addEventListener("click", createNewRoom);
  reloadPageButton.addEventListener("click", reloadPage);
}

function createNewRoom() {
  socket.emit("createRoom");
}

function reloadPage(){
  location.reload();
}

function showURLTextBox() {
  dropDownMenu.classList.remove("hidden");
  if (URLTextArea.value !== "") {
    joinRoomButton.addEventListener("click", function () {
      socket.emit("URLEnteredInTextField", (URLTextArea.value.split("/").pop()));
      socket.on("URLFound", (boolean) => {
        if (boolean) {
          window.location.href = window.location.href + URLTextArea.value.split("/").pop();
        } else {
          URLTextArea.value = "";
          URLTextArea.placeholder = "Die eingegebene URL ist fehlerhaft";
        }
      });
    });
  }
}

function hideURLTextBox() {
  dropDownMenu.classList.add("hidden");
}

function onLinkEntered(e) {
  if (e.key === "Enter" && URLTextArea.value !== "") {
    socket.emit("URLEnteredInTextField", (URLTextArea.value.split("/").pop()));
    socket.on("URLFound", (boolean) => {
      if (boolean) {
        window.location.href = window.location.href + URLTextArea.value.split("/").pop();
      } else {
        URLTextArea.value = "";
        URLTextArea.placeholder = "Die eingegebene URL ist fehlerhaft";
      }
    });
  }
}

export function sendDateToServer(date) {
  socket.emit("dateToServer", date);
}

init();