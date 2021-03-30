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
      date: Date,
    });
    Room = mongoose.model("Room", room);
  }

  addRoom(randomUrl, date) {
    let roomInstance = new Room({
      url: randomUrl,
      date: date,
    });
    roomInstance.save();
  }

  deleteRoom(roomID) {
    Room.find({ url: roomID }).deleteOne().exec();
  }

  getRoom(roomID) {
    return Room.find({ url: roomID });
  }

  getOpenRooms() {
    return Room.find({}).exec();
  }

  getPlaylist(roomID) {
    return Room.find({ url: roomID }, "playlist").exec();
  }

  getDate(roomID){
    return Room.find({ url: roomID }, "date").exec();
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
  // updates playlist in database for specified room
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
    Room.findOneAndUpdate({ url: roomID }, { playlist: playlist }).exec();
  }
}

module.exports = DBManager;