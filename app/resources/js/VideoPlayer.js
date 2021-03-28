/* eslint-env node */
import { onVideoPlayed, onVideoPaused, onVideoEnded } from "./room.js";

var videoPlayer,
  options = {
    controls: true,
    muted: true,
    controlBar: {
      playToggle: {
        playing: false,
      },
    },
    //f- fullscreen  m - mute  k - playpause  Space - playpause
    userActions: {
      hotkeys: true,
    },
  },
  diaPlayer;

const supportedFiles = { video: ["mp4", "webm"], audio: ["mp3", "wav"], image: ["jpg", "jpeg", "png"] };

export class VideoPlayer {

  constructor(videoJsID, playlist, currentTrack) {
    this.currentTrack = currentTrack;
    this.playlist = playlist;

    // eslint-disable-next-line no-undef
    videoPlayer = videojs(videoJsID, options);
    diaPlayer = document.querySelector(".imageID");

    this.load(currentTrack);

    videoPlayer.on("play", () => {
      console.log("play das Video");
      onVideoPlayed(videoPlayer.currentTime());
    });
    videoPlayer.on("pause", () => {
      onVideoPaused();
    });
  }

  getCurrentTrackNumber() {
    return this.currentTrack;
  }

  setAutoplay() {
    videoPlayer.on("ended", () => this.loadNext());
  }

  changeSrc(src) {

    if (src === undefined) { 
      console.log("falsche Src");
      return; }
      
    if (isVideo(src) || isAudio(src)) {
      changeToVideoJS();
      videoPlayer.src(src);
      console.log("Video wird abgespielt");
      return;
    }
    if (isImage(src)) {
      console.log("spiele Bild ab");
      changeToDia();
      diaPlayer.src = src;
    }
  }

  play() {
    //if(isImage){ return;}
    console.log("Abgespielt");
    videoPlayer.play();
  }
  pause() {
    //if(isImage){ return;}
    videoPlayer.pause();
  }

  loadNext() {
    if (this.currentTrack < this.playlist.length - 1) {
      this.currentTrack++;
      //this.changeSrc(this.playlist[this.currentTrack]);
      onVideoEnded(this.currentTrack);
    }
  }

  loadPrev() {
    if (this.currentTrack > 0) {
      this.currentTrack--;
    }
  }

  load(trackNumber) {
    if (this.playlist.length !== 0) {
      this.currentTrack = trackNumber;
      this.changeSrc(this.playlist[this.currentTrack]);
    }
  }

  addSource(source) {
    this.playlist.push(source);
    if (this.playlist.length <= 1) {
      this.load(0);
    }
  }

  updatePlaylist(playlist) {
    this.playlist = playlist;
  }
  getPlayer() {
    return videoPlayer;
  }

  getCurrentTime() {
    return videoPlayer.currentTime();
  }
  setCurrentTime(time) {
    videoPlayer.currentTime(time);
  }

}

export function isVideo(src) {
  let type = src.split(".").pop();
  return supportedFiles.video.includes(type);
}

export function isAudio(src) {
  let type = src.split(".").pop();
  return supportedFiles.audio.includes(type);
}

export function isImage(src) {
  let type = src.split(".").pop();
  return supportedFiles.image.includes(type);
}

function changeToVideoJS(){
  document.querySelector(".diashowContainer").classList.add("hidden"); 
  document.querySelector(".video-js").classList.remove("hidden");
}

function changeToDia(){
  document.querySelector(".diashowContainer").classList.remove("hidden");
  document.querySelector(".video-js").classList.add("hidden");
}