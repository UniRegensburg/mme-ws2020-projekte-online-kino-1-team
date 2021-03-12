/* eslint-env node */
class VideoPlayer {

    constructor(playlist) {
        // eslint-disable-next-line no-undef
        this.player = videojs("videoPlayer", {
            controls: true,
            preload: "metadata",
        });
        this.player.playlist(playlist);
        this.player.playlist.autoadvance(0);
    }

    updatePlaylist(playlist) {

        this.player.playlist(playlist);
        this.player.playlist.autoadvance(0);
    }

    pause() {
        this.player.pause();
    }

    play() {
        this.player.play();
    }

    getCurrentTime() {
        return this.player.currentTime();

    }

    // time in s
    setTime(time) {
        this.player.currentTime(time);
    }
}

export default VideoPlayer;