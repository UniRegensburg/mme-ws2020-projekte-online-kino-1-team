/* eslint-env node */

import { setLiveChatClickListener } from "./LiveChat.js";
import { Playlist } from "./Playlist.js";

let nicknameTextField,
    showChatIcon = document.querySelector(".chat-icon"),
    playlist;
// eslint-disable-next-line no-undef
const socket = io("http://localhost:3000");

function init() {
    setClickListener();
    setLiveChatClickListener();
    setFileUpload();

    socket.on("loadPlaylist", playlistFiles =>{
        playlist = new Playlist(playlistFiles);
        playlist.setDragAndDrop();
        playlist.initDeleteButton();
    });
   
    socket.on("addFileToPlaylist", file => {
        playlist.addFile([file]);
        playlist.setDragAndDrop();
        playlist.initDeleteButton();
    });

    socket.on("playlistObjectToClients", playlistObject => {
        if(window.location.href === playlistObject.roomID){
            playlist.addFile([playlistObject.playlistObject]);
            playlist.setDragAndDrop();
            playlist.initDeleteButton();
        }
    });
}

export function sendDeleteNumber(deleteNumber){
    //console.log("DELETE NUMBER: " + deleteNumber);
    socket.emit("deleteNumberToServer", deleteNumber);
}

function setClickListener() {
    nicknameTextField = document.querySelector(".nickname");
    let hideChatIcon = document.querySelector(".chat-header-icon"),
        toggleOne = document.querySelector(".toggleOne"),
        toggleTwo = document.querySelector(".toggleTwo"),
        copyURLText = document.querySelector(".copy");
    nicknameTextField.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && nicknameTextField.value !== "") {
            enterNickname();
        }
    });
    hideChatIcon.addEventListener("click", hideChat);
    showChatIcon.addEventListener("click", showChat);
    toggleOne.addEventListener("mouseover", showOverlayOne);
    toggleTwo.addEventListener("mouseover", showOverlayTwo);
    toggleOne.addEventListener("mouseout", hideOverlayOne);
    toggleTwo.addEventListener("mouseout", hideOverlayTwo);
    copyURLText.addEventListener("click", copyURL);
}

function enterNickname() {
    nicknameTextField.classList.add("hidden");
    document.querySelector(".chat-header-title").classList.remove("disabled");
    document.querySelector(".typeField").disabled = false;
}

function hideChat() {
    document.querySelector(".chat").classList.add("hidden");
    document.querySelector(".playlist").style.width = "23%";
    showChatIcon.classList.remove("hidden");
}

function showChat() {
    document.querySelector(".chat").classList.remove("hidden");
    document.querySelector(".playlist").style.width = "30%";
    showChatIcon.classList.add("hidden");
}

function showOverlayOne() {
    document.querySelector(".overlay-toggleOne").classList.remove("hidden");
}

function showOverlayTwo() {
    document.querySelector(".overlay-toggleTwo").classList.remove("hidden");
}

function hideOverlayOne() {
    document.querySelector(".overlay-toggleOne").classList.add("hidden");
}

function hideOverlayTwo() {
    document.querySelector(".overlay-toggleTwo").classList.add("hidden");
}

function copyURL() {
    let elem = document.createElement("input"),
        url = window.location.href;
    document.body.appendChild(elem);
    elem.value = url;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    //Kann man machen, muss man aber nicht
    // eslint-disable-next-line no-alert
    alert("Url kopiert");
}

export function getNickName() {
    return nicknameTextField.value;
}

function setFileUpload() {
    let playlistBox = document.querySelector(".playlist");
    var url2 = window.location.href;
    playlistBox.addEventListener("dragover", (e) => e.preventDefault());
    playlistBox.addEventListener("drop", (e) => {
      e.preventDefault();
      if(e.dataTransfer.files.length){
          //Hier kommt noch der eigentliche File upload mit Socketio-File-Upload

          // dummy data
          
          let data = {roomID: url2, title:"Calculated.mp4"};
        socket.emit("clientUploadsFile", data);
      }
  
    });
  }

init();