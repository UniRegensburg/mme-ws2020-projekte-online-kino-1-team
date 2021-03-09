/* eslint-env node */

var mongoose = require("mongoose"),
  RoomSchema,
  room,
  Room;

class DBManager {
  constructor(uri) {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    RoomSchema = mongoose.Schema;
    room = new RoomSchema({
      id: mongoose.Types.ObjectId,
      url: String,
      test: String,
    });
    Room = mongoose.model("Room", room);
  }

  addRoom(randomUrl) {
    let roomInstance = new Room({
      url: randomUrl,
    });
    roomInstance.save();
  }

  deleteRoom(roomID) {
    Room.find({ _id: roomID }).deleteOne().exec();
  }

  getRoom(roomID) {
    return Room.find({ _id: roomID });
  }

  getOpenRooms(){
    return Room.find({}, "url").exec();
  }
}

module.exports = DBManager;