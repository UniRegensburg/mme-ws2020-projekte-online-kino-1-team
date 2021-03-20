/* eslint-env node */

import { setLiveChatClickListener } from "./LiveChat.js";
import VideoPlayer from "./VideoPlayer.js";
import Playlist from "./playlist.js";

//eslint-disable-next-line no-undef
const socket = io("http://localhost:3000");

let nicknameTextField,
  player,
  playlist,
  uploader = new SocketIOFileUpload(socket),
  showChatIcon = document.querySelector(".chat-icon");

function init() {
    // eslint-disable-next-line no-unused-vars
  //player = new VideoPlayer(tempPlaylist);
  //playlist = new Playlist(temp4Playlist);

  setClickListener();
  setFileUpload();
  uploader.listenOnInput(document.getElementById("siofu_input"));
  uploader.listenOnDrop(document.querySelector(".playlist"));
  uploader.addEventListener("load", emitFileUpload);
}

function emitFileUpload(){
  let roomID = window.location.pathname.split("/")[2];
  socket.emit("fileUpload", roomID);
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
function setFileUpload() {
  let playlistBox = document.querySelector(".playlist");
  playlistBox.addEventListener("dragover", (e) => e.preventDefault());
  playlistBox.addEventListener("drop", (e) => {
    e.preventDefault(); 
  });
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

init();