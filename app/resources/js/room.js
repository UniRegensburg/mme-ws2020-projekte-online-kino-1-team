/* eslint-env node */
import VideoPlayer from "./VideoPlayer.js";

let nicknameTextField;
var player;

function init() {
    let tempPlaylist = [],
        temp2Playlist = [],
        sources1 = {
            sources: [{
                src: "resources/css/Bunny.mp4",
                type: "video/mp4",
            }],
        },
        sources2 = {
            sources: [{
                src: "resources/css/Testing.mp4",
                type: "video/mp4",
            }],
        };

    tempPlaylist.push(sources1, sources2);
    temp2Playlist.push(sources2, sources1);

    // eslint-disable-next-line no-unused-vars
    player = new VideoPlayer(tempPlaylist);

    setClickListener();
}

function setClickListener() {
    nicknameTextField = document.querySelector(".nickname");
    nicknameTextField.addEventListener("keypress", function (e) {
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

init();