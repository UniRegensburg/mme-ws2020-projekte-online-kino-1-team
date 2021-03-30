/* eslint-env node */

import { setLiveChatClickListener } from "./LiveChat.js";
import { Playlist, counterForElements } from "./Playlist.js";
import { VideoPlayer } from "./VideoPlayer.js";
import { HOST, SUPPORTED_FILES } from "./constants.js";

let nicknameTextField,
  showChatIcon = document.querySelector(".chat-icon"),
  playlist,
  uploader,
  localRoomID,
  videoPlayer;

// eslint-disable-next-line no-undef
const socket = io(HOST);

function init() {
  setClickListener();
  setLiveChatClickListener();
  localRoomID = window.location.href.split("/").pop();

  //Client Enters Room Sockets
  //load playlist
  socket.on("loadPlaylist", playlistFiles => {
    let tempPlaylist = [];
    playlistFiles.forEach(element => {
      tempPlaylist.push({ src: element, title: element.split("/").pop() });
    });

    playlist = new Playlist(tempPlaylist);
    playlist.setListener();
    playlist.initDeleteButton();

    videoPlayer = new VideoPlayer("my-player", playlistFiles, 0);
    videoPlayer.setAutoplay();
  });
  //datarequest to clients
  socket.on("sendDataRequestToClients", (url) => {
    var currentTrack;
    if (url === window.location.href) {
      currentTrack = videoPlayer.getCurrentTrackNumber();
      socket.emit("currentTrackInfoToServer", url, currentTrack);
    }
  });
  //current trackinfo to clients
  socket.on("currentTrackInfoToClients", (url, currentTrack) => {
    if (url === window.location.href) {
      videoPlayer.load(currentTrack);
    }
  });

  // Synchrones Video Sockets
  //videoPlayedToClients
  socket.on("videoPlayedToClients", (url, time) => {
    if (url === window.location.href) {
      videoPlayer.setCurrentTime(time);
      videoPlayer.play();
    }
  });
  //videoPausedToClients
  socket.on("videoPausedToClients", (url) => {
    if (url === window.location.href) {
      videoPlayer.pause();
    }
  });
  //videoEndedToClients
  socket.on("videoEndedToClients", (url, currentTrack) => {
    if (url === window.location.href) {
      videoPlayer.load(currentTrack);
    }
  });

  // Synchrone Playlist Sockets
  //Drag&Drop
  socket.on("DragDropPositionToClients", (roomID, iDrag, iDrop) => {
    if (window.location.href === roomID) {
      playlist.changeDragDropPosition(iDrag, iDrop);
      videoPlayer.updatePlaylist(playlist.getPlaylistSources());
    }
  });
  //videoclick
  socket.on("videoClickToClients", (url, currentTrack) => {
    if (url === window.location.href) {
      videoPlayer.load(currentTrack);
    }
  });
  //videokey
  socket.on("videoKeyToClients", (url, currentTrack) => {
    if (url === window.location.href) {
      videoPlayer.load(currentTrack);
    }
  });
  //upload File
  socket.on("playlistObjectToClients", playlistObject => {
    if (localRoomID === playlistObject.roomID) {
      playlist.addFile([playlistObject.playlistObject]);
      playlist.setListener();
      playlist.initDeleteButton();
      videoPlayer.updatePlaylist(playlist.getPlaylistSources());
    }
  });
  //delete File
  socket.on("deleteNumberToClients", (roomID, deleteNumber) => {
    if (window.location.href === roomID) {
      playlist.deletePlaylistEl(deleteNumber);
      videoPlayer.updatePlaylist(playlist.getPlaylistSources());
      if (videoPlayer.getCurrentTrackNumber() === deleteNumber) {
        videoPlayer.load(videoPlayer.getCurrentTrackNumber());
      }
    }
  });
  //handle Error
  socket.on("error" ,e => {
    console.error("Socketio error: " + e);
  });

  //Send Client Entered Room
  socket.emit("clientEntersRoom", (window.location.href));
  // eslint-disable-next-line no-undef
  uploader = new SocketIOFileUpload(socket);
  uploader.listenOnInput(document.getElementById("siofu_input"));
  uploader.listenOnDrop(document.querySelector(".playlist"));
  uploader.addEventListener("load", emitFileUpload);
  uploader.addEventListener("start", showUploadStarted);
}

function showUploadStarted(){
  document.querySelector(".uploadHint").classList.remove("hidden");
}

function emitFileUpload(e) {
  document.querySelector(".uploadHint").classList.add("hidden");
  let roomID = window.location.pathname.split("/")[2];
  if (isVideo(e.file.name) || isAudio(e.file.name) || isImage(e.file.name)) {
    socket.emit("fileUpload", roomID, e.file.name, e.name);
  }
  else {
    socket.emit("deleteFile", roomID, e.file.name, e.name);
  }
}

export function sendDeleteNumber(deleteNumber) {
  var roomID = window.location.href;
  socket.emit("deleteNumberToServer", roomID, deleteNumber);
}

export function sendDragDropPosition(iDrag, iDrop) {
  var roomID = window.location.href;
  socket.emit("DragDropPositionToServer", roomID, iDrag, iDrop);
}

function setClickListener() {
  nicknameTextField = document.querySelector(".nickname");
  let hideChatIcon = document.querySelector(".chat-header-icon"),
    //toggleOne = document.querySelector(".toggleOne"),
    toggleTwo = document.querySelector(".toggleTwo"),
    copyURLText = document.querySelector(".copy"),
    loadStartPageButton = document.querySelector(".logoRoom");
  nicknameTextField.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && nicknameTextField.value !== "") {
      enterNickname();
    }
  });

  hideChatIcon.addEventListener("click", hideChat);
  showChatIcon.addEventListener("click", showChat);
  toggleTwo.addEventListener("mouseover", showOverlayTwo);
  toggleTwo.addEventListener("mouseout", hideOverlayTwo);
  copyURLText.addEventListener("click", copyURL);
  loadStartPageButton.addEventListener("click", loadStartPage);
}

function enterNickname() {
  nicknameTextField.classList.add("hidden");
  document.querySelector(".chat-header-title").classList.remove("disabled");
  document.querySelector(".chat-footer-icon").classList.remove("disabledIcon");
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

function showOverlayTwo() {
  document.querySelector(".overlay-toggleTwo").classList.remove("hidden");
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
  // eslint-disable-next-line no-alert
  alert("Url kopiert");
}

function loadStartPage() {
  window.open("http://localhost:8000/app/", "_self");
}

export function getNickName() {
  return nicknameTextField.value;
}

export function changeVideoOnClick(e) {
  let liElement = e.target.parentNode,
    tempLi = liElement,
    deleteButtons = document.querySelectorAll(".deleteButtonPlaylist"),
    isDeleteButton,
    counter = 0;

  deleteButtons.forEach(e => {
    if (liElement === e) {
      isDeleteButton = true;
    }
  });
  if (!isDeleteButton) {
    if (liElement.parentNode.tagName === "LI") {
      liElement = liElement.parentNode;
      tempLi = liElement;
    }
    while (tempLi.previousSibling !== null) {
      if (tempLi.previousSibling.tagName === "LI") {
        counter++;
      }
      tempLi = tempLi.previousSibling;
    }
    socket.emit("videoClickToServer", window.location.href, counter);
  }
}

export function changeVideoOnKeypress(e) {
  let counter = 0;

  if (e.key === "ArrowRight") {
    if (videoPlayer.getCurrentTrackNumber() < counterForElements - 1) {
      counter = videoPlayer.getCurrentTrackNumber();
      counter++;
      socket.emit("videoKeyToServer", window.location.href, counter);
    }
  } else if (e.key === "ArrowLeft") {
    if (videoPlayer.getCurrentTrackNumber() > 0) {
      counter = videoPlayer.getCurrentTrackNumber();
      counter--;
      socket.emit("videoKeyToServer", window.location.href, counter);
    }
  }
}

export function onVideoPlayed(time) {
  socket.emit("videoPlayedToServer", window.location.href, time);
}
export function onVideoPaused() {
  socket.emit("videoPausedToServer", window.location.href);
}
export function onVideoEnded(currentTrack) {
  socket.emit("videoEndedToServer", window.location.href, currentTrack);
}

export function isVideo(src) {
  let type = src.toLowerCase().split(".").pop();
  return SUPPORTED_FILES.video.includes(type);
}

export function isAudio(src) {
  let type = src.toLowerCase().split(".").pop();
  return SUPPORTED_FILES.audio.includes(type);
}

export function isImage(src) {
  let type = src.toLowerCase().split(".").pop();
  return SUPPORTED_FILES.image.includes(type);
}

init();