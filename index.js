/* eslint-env node */

//Server
const SOCKETPORT = 3000,
  path = require("path"),
  siofu = require("socketio-file-upload"),
  fs = require("fs");

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
    "mongodb+srv://Admin:MME2020@watchmates.jhgji.mongodb.net/WatchMatesDB?retryWrites=true&w=majority";
io.on("connection", (socket) => {
  let uploader = new siofu(),
    roomID;

  socket.on("clientEntersRoom", url => {
    roomID = url.split("/").pop();
    uploader.dir = path.join(__dirname, "/data/" + roomID);
    createRoomFolder(uploader.dir);
    uploader.listen(socket);

    dbClient.getPlaylist(roomID).then(e => {
      socket.emit("loadPlaylist", e[0].playlist);
    });

  });
  socket.on("createRoom", () => {
    let url = roomManager.createUrl();

    dbClient.addRoom(url);
    server.addRoom(url);
    socket.emit("changeUrl", url);
  });
  // receive Message on Server
  socket.on("MessageToServer", (message, nickname, room) => {
    socket.broadcast.emit("MessageToClients", message, nickname, room);
  });
  socket.on("dateToServer", () => {
    let url = roomManager.createUrl();
    dbClient.addRoom(url);
    server.addRoom(url);
    socket.emit("urlToClient", url);
  });

  socket.on("fileUpload", (roomID, srcName, name, type) => {
    let tempSrc = roomID + "/" + name + "." + srcName.split(".").pop(),
      playlistObject = {
        roomID: roomID,
        playlistObject: { src: tempSrc, title: tempSrc.split("/").pop() },
      };

    io.emit("playlistObjectToClients", playlistObject);

    dbClient.addPlaylistEntry(roomID,tempSrc);
  });

  socket.on("deleteNumberToServer", (roomID, numberDelete) => {
    io.emit("deleteNumberToClients", roomID, numberDelete);

    dbClient.deletePlaylistEntry(roomID.split("/").pop(), numberDelete);
  });

  socket.on("DragDropPositionToServer", (roomID, iDrag, iDrop) => {
    io.emit("DragDropPositionToClients", roomID, iDrag, iDrop);

    dbClient.changePlaylistPosition(roomID.split("/").pop(), iDrag, iDrop);
  });
});

httpServer.listen(SOCKETPORT, function () {
  //console.log("Ich höre auf socket IO Port 3000");
});

function createRoomFolder(roomDir) {
  fs.mkdirSync(roomDir, { recursive: true });
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

  dbClient.getOpenRooms().then((e) => server.openRooms(e));
}

init();