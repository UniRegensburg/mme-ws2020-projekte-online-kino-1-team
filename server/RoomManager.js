var uuid = require("node-uuid");

class RoomManger {


  constructor(rooms) {
    if (rooms === null) {
      this.rooms = {};
    }
  }

  get(roomID) {

  }

  getIDs() {

  }

  create(roomID) {
    let randomURL = "localhost:8000/app/room:" + uuid.v4();
    console.log("RoomManager: Create Room with ID: " + roomID);
    this.rooms = {"room1" : { "roomURL": randomURL , "playlist": null}};
    this.rooms = {"room2" : { "roomURL": randomURL , "playlist": null}};
    console.log(this.rooms);
  }


  delete(roomID) {

  }

  update(roomID, data) {

  }
}

module.exports = RoomManger;