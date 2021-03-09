/* eslint-env node */

var uuid = require("node-uuid"),
  randomUrl;

class RoomManger {

  constructor(rooms) {
    if (rooms === null) {
      this.rooms = {};
    }
  }

  createUrl() {
    randomUrl = uuid.v4();
    //console.log("http://localhost:8000/app/" + randomUrl);
    return randomUrl;
  }

}

module.exports = RoomManger;