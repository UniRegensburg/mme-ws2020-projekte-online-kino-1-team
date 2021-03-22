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
    return Room.find({ url: roomID });
  }

  getOpenRooms() {
    return Room.find({}, "url").exec();
  }

  getPlaylist(roomID) {
    return Room.find({ url: roomID }, "playlist").exec();
  }

  deletePlaylistEntry(roomID, playlistIndex) {
    Room.find({ url: roomID }, "playlist").exec().then(e => {
      let tempPlaylist = e[0].playlist;
      tempPlaylist.splice(playlistIndex, 1);
      Room.findOneAndUpdate({ url: roomID }, { playlist: tempPlaylist }).exec();
    });
  }

  addPlaylistEntry(roomID, playlistEntry) {
    Room.find({ url: roomID }, "playlist").exec().then(e => {
      let tempPlaylist = e[0].playlist;
      tempPlaylist.push(playlistEntry);
      Room.findOneAndUpdate({ url: roomID }, { playlist: tempPlaylist }).exec();
    });
  }

  changePlaylistPosition(roomID, iDrag, iDrop) {
    Room.find({ url: roomID }, "playlist").exec().then(e => {
      let startPlaylist = e[0].playlist,
        tempPlaylist = [],
        iDragEl = startPlaylist[iDrag];

      for (let index = 0; index < startPlaylist.length; index++) {
        if (index === iDrop) {
          tempPlaylist.push(iDragEl);
        }
        if (index !== iDrag) {
          tempPlaylist.push(startPlaylist[index]);
        }
      }
      Room.findOneAndUpdate({ url: roomID }, { playlist: tempPlaylist }).exec();
    });
  }

  updatePlaylist(roomID, playlist) {
    Room.findOneAndUpdate({ _id: roomID }, { playlist: playlist }).exec();
  }
}

module.exports = DBManager;