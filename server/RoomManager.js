/* eslint-env node */

var uuid = require("node-uuid"),
  randomUrl;

class RoomManger {

  constructor(rooms) {
    if (rooms === null) {
      this.rooms = {};
    }
  }
  /*
   get(roomID) {

   }

   getIDs() {

   }

   delete(roomID) {

   }

   update(roomID, data) {

   }
   */

  createUrl() {
    /*let randomURL = "localhost:8000/app/room:" + uuid.v4();
    console.log("RoomManager: Create Room with ID: " + roomID);
    this.rooms = {"room1" : { "roomURL": randomURL , "playlist": null}};
    this.rooms = {"room2" : { "roomURL": randomURL , "playlist": null}};
    console.log(this.rooms);*/
    //randomUrl = "localhost:8000/room/" + uuid.v4();
    randomUrl = uuid.v4();

    console.log("http://localhost:8000/room/" + randomUrl);
    return randomUrl;
  }

}

module.exports = RoomManger;