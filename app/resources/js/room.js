/* eslint-env node */
import VideoPlayer from "./VideoPlayer.js";
import Playlist from "./playlist.js";

//eslint-disable-next-line no-undef
const socket = io("http://localhost:3000");

let nicknameTextField;
var player,
  playlist;

function init() {
  let tempPlaylist = [],
    temp4Playlist = [],
    sources1 = {
      sources: [{
        src: "resources/css/SampleVideo_1280x720_2mb.mp4",
        type: "video/mp4",
      }],
    },
    sources2 = {
      sources: [{
        src: "resources/css/Testing.mp4",
        type: "video/mp4",
      }],
    };

  temp4Playlist = [{
      poster: "https://kuscheltiere.biz/media/2342/catalog/haschen-urmel-hase-bunny-kaninchen-gelb-weis-kuscheltier-19-cm.jpg?size=256",
      titel: "Erster Titel",
    },
    {
      poster: "https://media.istockphoto.com/photos/gray-rabbit-bunny-baby-isolated-on-white-background-picture-id176985426",
      titel: "2. cooler Titel",
    },
    {
      poster: "https://media.istockphoto.com/photos/gray-rabbit-bunny-baby-isolated-on-white-background-picture-id176985426",
      titel: "2. cooler Titel",
    },
  ];

  tempPlaylist.push(sources1, sources2);

  // eslint-disable-next-line no-unused-vars
  player = new VideoPlayer(tempPlaylist);
  playlist = new Playlist(temp4Playlist);

  setClickListener();
  setFileUpload();
}

function setClickListener() {
  nicknameTextField = document.querySelector(".nickname");
  nicknameTextField.addEventListener("keypress", function(e) {
    if (e.key === "Enter" && nicknameTextField.value !== "") {
      enterNickname();
    }
  });
}

function enterNickname() {
  nicknameTextField.classList.add("hidden");
  document.querySelector(".chat").classList.remove("disabled");
  document.querySelector(".typeField").disabled = false;
}

function setFileUpload() {
  let playlistBox = document.querySelector(".playlist");
  playlistBox.addEventListener("dragover", (e) => e.preventDefault());
  playlistBox.addEventListener("drop", (e) => {
    e.preventDefault();
    if(e.dataTransfer.files.length){
      
      /*let files = e.dataTransfer.files,
      url = window.URL || window.webkitURL,
      fileUrl = url.createObjectURL(files[0]);*/

    playlist.addFile([{
      poster: "https://kuscheltiere.biz/media/2342/catalog/haschen-urmel-hase-bunny-kaninchen-gelb-weis-kuscheltier-19-cm.jpg?size=256",
      titel: "Erster Titel",
    }]);
    socket.emit("fileUpload", "testVideo");
    }

  });
}

init();