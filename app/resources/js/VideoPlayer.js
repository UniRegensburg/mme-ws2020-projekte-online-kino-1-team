/* eslint-env node */

var player,
  options = {
    controls: true,
  },
  playlist = [],
  currentTrack;

export class VideoPlayer {

  constructor(videoJsID, playlist, currentTrack) {
    var videoSource = document.getElementById("video-source");
    this.currentTrack = currentTrack;
    this.playlist = playlist;

    // console.log("constructor: " + playlist);
    //console.log("construktorthis: " + this.playlist);
    if (playlist.length === 0) {
      videoSource.src = "//vjs.zencdn.net/v/oceans.mp4";
    } else {
      videoSource.src = playlist[currentTrack];
    }
    // eslint-disable-next-line no-undef
    player = videojs(videoJsID, options);
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

  loadNext() {

    if (this.currentTrack < this.playlist.length -1 ) {
      console.log("in der if");
      this.currentTrack++;
      this.changeSrc(this.playlist[this.currentTrack]);
    this.play();
    }
  }

  loadPrev() {
    if (this.currentTrack > 0) {
      this.currentTrack--;
    }
  }

  load(trackNumber) {
    this.currentTrack = trackNumber;
    this.changeSrc(this.playlist[this.currentTrack]);
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
}