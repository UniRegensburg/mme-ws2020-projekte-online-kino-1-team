/* eslint-env node */
import { onVideoPlayed, onVideoPaused, onVideoEnded, isAudio, isImage, isVideo } from "./room.js";

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

export class VideoPlayer {

  constructor(videoJsID, playlist, currentTrack) {
    this.currentTrack = currentTrack;
    this.playlist = playlist;

    // eslint-disable-next-line no-undef
    videoPlayer = videojs(videoJsID, options);
    diaPlayer = document.querySelector(".imageID");

    this.load(currentTrack);

    videoPlayer.on("play", () => {
      onVideoPlayed(videoPlayer.currentTime());
    });
    videoPlayer.on("pause", () => {
      onVideoPaused();
    });
  }

  getCurrentTrackNumber() {
    return this.currentTrack;
  }

  getPlaylist() {
    return this.playlist;
  }

  setAutoplay() {
    videoPlayer.on("ended", () => this.loadNext());
  }

  changeSrc(src) {

    if (src === undefined) {
      //Testvideo
      this.changeSrc("./resources/css/Beispielvideo.mp4");
      return;
    }

    if (isVideo(src) || isAudio(src)) {
      changeToVideoJS();
      videoPlayer.src(src);
      return;
    }
    if (isImage(src)) {
      changeToDia();
      diaPlayer.src = src;
    }
  }

  play() {
    videoPlayer.play();
  }

  pause() {
    videoPlayer.pause();
  }

  loadNext() {
    if (this.currentTrack < this.playlist.length - 1) {
      this.currentTrack++;
      onVideoEnded(this.currentTrack);
    }
  }

  loadPrev() {
    if (this.currentTrack > 0) {
      this.currentTrack--;
    }
  }

  load(trackNumber) {
    if (this.playlist.length > 0) {
      this.currentTrack = trackNumber;
      this.changeSrc(this.playlist[this.currentTrack]);
    } else if (this.playlist.length === 0) {
      this.changeSrc();
    }
  }

  addSource(source) {
    this.playlist.push(source);
    // console.log("add");
    if (this.playlist.length <= 1) {
      this.load(0);
    }
  }

  updatePlaylist(playlist) {
    // console.log("update");
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

function changeToVideoJS() {
  document.querySelector(".diashowContainer").classList.add("hidden");
  document.querySelector(".video-js").classList.remove("hidden");
}

function changeToDia() {
  document.querySelector(".diashowContainer").classList.remove("hidden");
  document.querySelector(".video-js").classList.add("hidden");
  videoPlayer.pause();
}