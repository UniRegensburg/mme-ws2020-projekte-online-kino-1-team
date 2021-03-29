/* eslint-env node */

/* if HOST gets changed also change it in index.ejs line 64 
    and in room.ejs line 76
*/
export const HOST = "http://localhost:3000",
    SUPPORTED_FILES = {
        video: ["mp4", "webm"],
        audio: ["mp3", "wav", "flac"],
        image: ["jpg", "jpeg", "png"],
    };

/*
    if you want to change the Port of the Server
     change it in package.json line 11 and 12
*/ 