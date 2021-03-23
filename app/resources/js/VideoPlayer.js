/* eslint-env node */

var player,
  options = {
    controls: true,
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
  }

  getCurrentTrackNumber(){
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

  loadNext() {
    if (this.currentTrack < this.playlist.length - 1) {
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
    if(this.playlist.length !== 0){
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
}