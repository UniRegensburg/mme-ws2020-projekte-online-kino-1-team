/* eslint-env node */

//Server
const SOCKETPORT = 3000,
  path = require("path"),
  siofu = require("socketio-file-upload"),
  fs = require("fs"),
  schedule = require("node-schedule");

var server,
  roomManager,
  dbClient;

const AppServer = require("./server/AppServer.js"),
  DBManager = require("./server/MongoDB/DBManager.js"),
  express = require("express"),
  RoomManager = require("./server/RoomManager.js"),
  httpServer = require("http").createServer(express),
  appDir = path.join(__dirname, "../", process.argv[2]),
  options = { cors: true, origin: appDir },
  io = require("socket.io")(httpServer, options),
  uri =
  "mongodb+srv://Admin:MME2020@watchmates.jhgji.mongodb.net/WatchMatesDB?retryWrites=true&w=majority",
  DELETE_INTERVAL_FOR_SCHEDULE = "0 3 * * *",
  DELETE_AFTER_IN_MS = 604800000,
  convertDate = (date, time) => {
    let exportDate = date + "T" + time + ":00";
    return new Date(exportDate);
  };

io.on("error", e => {
  console.error(e);
});

io.on("connection", (socket) => {
  let uploader = new siofu(),
    roomID;

  uploader.on("error", e => {
    console.error(e);
  });

  //Client Enters Room Sockets
  //createRoom
  socket.on("createRoom", () => {
    let url = roomManager.createUrl(),
      currentDate = new Date(Date.now());
    dbClient.addRoom(url, currentDate);
    server.addRoom(url);
    socket.emit("changeUrl", url);
  });
  //enterRoom
  socket.on("clientEntersRoom", url => {
    roomID = url.split("/").pop();
    uploader.dir = path.join(__dirname, "/data/" + roomID);
    createRoomFolder(uploader.dir);
    uploader.listen(socket);
    dbClient.getPlaylist(roomID).then(e => {
      socket.emit("loadPlaylist", e[0].playlist);
      socket.broadcast.emit("sendDataRequestToClients", url);
    });
  });
  // init
  socket.on("currentTrackInfoToServer", (url, currentTrack) => {
    socket.broadcast.emit("currentTrackInfoToClients", url,
      currentTrack);
  });

  //Synchrones Video Sockets
  //onVideoPlayed
  socket.on("videoPlayedToServer", (url, time) => {
    io.emit("videoPlayedToClients", url, time);
  });
  //onVideoPaused
  socket.on("videoPausedToServer", (url) => {
    io.emit("videoPausedToClients", url);
  });
  //onVideoEnded
  socket.on("videoEndedToServer", (url, currentTrack) => {
    io.emit("videoEndedToClients", url, currentTrack);
  });

  //Synchrone Playlist Sockets
  //drag&drop
  socket.on("DragDropPositionToServer", (roomID, iDrag, iDrop) => {
    io.emit("DragDropPositionToClients", roomID, iDrag, iDrop);
    dbClient.changePlaylistPosition(roomID.split("/").pop(), iDrag,
      iDrop);
  });
  //videoclick
  socket.on("videoClickToServer", (url, currentTrack) => {
    io.emit("videoClickToClients", url, currentTrack);
  });
  //videokey
  socket.on("videoKeyToServer", (url, currentTrack) => {
    io.emit("videoKeyToClients", url, currentTrack);
  });
  //upload File
  socket.on("fileUpload", (roomID, srcName, name) => {
    let tempSrc = roomID + "/" + name + "." + srcName.split(".").pop(),
      playlistObject = {
        roomID: roomID,
        playlistObject: {
          src: tempSrc,
          title: tempSrc.split("/").pop(),
        },
      };
    io.emit("playlistObjectToClients", playlistObject);

    dbClient.addPlaylistEntry(roomID, tempSrc);
  });
  //delete File
  socket.on("deleteNumberToServer", (roomID, numberDelete) => {
    io.emit("deleteNumberToClients", roomID, numberDelete);
    dbClient.getPlaylist(roomID.split("/").pop()).then(e => deleteFile(
      "data/" + e[0].playlist[numberDelete]));
    dbClient.deletePlaylistEntry(roomID.split("/").pop(), numberDelete);
  });

  //LiveChat Sockets
  //receive Message on Server
  socket.on("MessageToServer", (message, nickname, room) => {
    socket.broadcast.emit("MessageToClients", message, nickname, room);
  });

  //standard Sockets
  //delete
  socket.on("dateToServer", (date) => {
    let url = roomManager.createUrl();
    dbClient.addRoom(url, convertDate(date.date, date.time));
    server.addRoom(url);
    socket.emit("urlToClient", url);
  });
  //url entered
  socket.on("URLEnteredInTextField", (roomID) => {
    dbClient.getRoom(roomID).then((room) => {
      socket.emit("URLFound", room[0]);
    });
  });
  //deleteFile
  socket.on("deleteFile", (roomID, srcName, name) => {
    let tempSrc = "data/" + roomID + "/" + name + "." + srcName.split(
      ".").pop();
    deleteFile(tempSrc);
  });
});

httpServer.listen(SOCKETPORT, function() {
  //console.log("Ich höre auf socket IO Port 3000");
});

function createRoomFolder(roomDir) {
  fs.mkdirSync(roomDir, { recursive: true });
}

function deleteFile(src) {
  fs.unlink(src, err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return;
    }
  });
}
/**
 * Starts webserver to serve files from "/app" folder
 */

function init() {
  // Access command line parameters from start command (see package.json)
  let appDirectory = process.argv[2],
    appPort = process.argv[3];
  // port to use for serving static files
  server = new AppServer(appDirectory);
  server.start(appPort);

  roomManager = new RoomManager();

  dbClient = new DBManager(uri);
  checkForOldRooms();
  dbClient.getOpenRooms().then((e) => server.openRooms(e));

}

function checkForOldRooms() {
  schedule.scheduleJob(DELETE_INTERVAL_FOR_SCHEDULE, () => {
    dbClient.getOpenRooms().then((rooms) => {
      rooms.forEach(room => {
        if (room.date === undefined) {
          return;
        }
        let roomDateInMS = room.date.getTime();
        if (Date.now() - roomDateInMS > DELETE_AFTER_IN_MS) {
          dbClient.deleteRoom(room.url);
          fs.readdir(("data/" + room.url), (err, files) => {
            if (err) { return; }
            files.forEach(file => {
              deleteFile("data/" + room.url + "/" + file);
            });
          });
        }
      });
    });
  });
}

init();