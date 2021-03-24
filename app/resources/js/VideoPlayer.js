/* eslint-env node */

import { onVideoPlayed, onVideoPaused } from "./room.js";

var player,
  options = {
    controls: true,
    muted: true,
    controlBar: {
      playToggle: {
        playing: false,
      },
    },
  };

export class VideoPlayer {

  constructor(videoJsID, playlist, currentTrack) {
    var videoSource = document.getElementById("video-source");
    this.currentTrack = currentTrack;
    this.playlist = playlist;

    if (playlist.length === 0) {
      videoSource.src = "//vjs.zencdn.net/v/oceans.mp4";
    } else {
      videoSource.src = playlist[currentTrack];
    }
    // eslint-disable-next-line no-undef
    player = videojs(videoJsID, options);
    console.log("Player", player);
    player.on("play", () => {
      console.log("PLAY");
      onVideoPlayed(player.currentTime());
    });
    player.on("pause", () => {
      console.log("Paused");
      onVideoPaused();
    });
  }

  getCurrentTrackNumber() {
    return this.currentTrack;
  }

  setAutoplay() {
    player.on("ended", () => this.loadNext());
  }

  changeSrc(src) {
    player.src(src);
  }

  play() {
    player.play();
  }
  pause() {
    player.pause();
  }

  loadNext() {
    if (this.currentTrack < this.playlist.length - 1) {
      this.currentTrack++;
      this.changeSrc(this.playlist[this.currentTrack]);
      //this.play();
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
    return player;
  }
  
  getCurrentTime() {
    var time = player.currentTime();
    console.log("TIMEXDDD: " + time);
    return player.currentTime();
  }
  setCurrentTime(time){
    player.currentTime(time);
  }
}
