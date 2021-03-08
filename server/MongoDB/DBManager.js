/* eslint-env node */

var mongoose = require("mongoose"),
  db,
  RoomSchema,
  room,
  Room;

class DBManager {
  constructor(uri) {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
    RoomSchema = mongoose.Schema;
    room = new RoomSchema({
      id: mongoose.Types.ObjectId,
      url: String,
      test: String,
    });
    Room = mongoose.model("Room", room);
    db.on("error", console.error.bind(console, 'MongoDB connection error:'));
  }

  /*testMongoose() {
    
    if (!err) { console.log("läuft!"); } else { console.log(err); }

    Room.find({}, function(err,
      Room) {
      if (!err) {
        Room.forEach(e => console.log(e));
      }
    });

    //SomeModel.findOneAndRemove({_id: "60462f26aa7b142f8830f594"});
    //SomeModel.remove({SomeModel});
  }
}*/

  addRoom() {
    let roomInstance = new Room({
      url: "http://localhost:8000/app",
      test: "test6",
    });
    roomInstance.save();
  }

  deleteRoom(roomID) {
    Room.find({ _id: roomID }).deleteOne().exec();
  }

  getRoom(roomID) {
    return Room.find({ _id: roomID });
  }
  /*
  updatePlaylist(playlist, roomID) {
  }

  getPlaylist(roomID) {

  }
  */
}

module.exports = DBManager;