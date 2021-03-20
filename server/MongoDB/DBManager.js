/* eslint-env node */

const { ObjectID } = require("bson");

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
      playlist: Array,
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
    return Room.find({ _id: roomID }).exec();
  }

  updatePlaylist(roomID, playlist) {
    Room.findOneAndUpdate({_id: roomID}, {playlist: playlist}).exec();
  }

  getPlaylist(roomID) {
    return Room.findOne({ _id: roomID }, "playlist").exec();
  }

  getOpenRooms() {
    return Room.find({}, "url").exec();
  }
}

module.exports = DBManager;