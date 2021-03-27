/* eslint-env browser */

var image = document.querySelector(".imageID");

export class Diashow {

    constructor(playlist, currentTrack) {
        this.playlist = playlist;
        this.currentTrack = currentTrack;
    }

    load(trackNumber) {
        if(!isVideo(this.playlist[trackNumber])){
            if (this.playlist.length !== 0) {
                this.currentTrack = trackNumber;
                this.changeSrc(this.playlist[this.currentTrack]);
            }
        }
    }

    /*loadNext(){

    }

    loadPrev(){

    }*/

    changeSrc(src) {
        console.log("SRC: " + src);
        console.log("Image: ", image);
        image.src = src;
    }
    addSource(source) {
        this.playlist.push(source);
        /*if (this.playlist.length <= 1) {
            this.load(0);
        }*/
    }
    updatePlaylist(playlist) {
        this.playlist = playlist;
      }

}

function isVideo(videoSrc){
    let type = videoSrc.split(".").pop();
    return (type === "mp4" || type === "mp3" || type === "wav" || type === "webm");
  }