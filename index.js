/* eslint-env node */

const { ObjectID } = require("bson");

//Server

const SOCKETPORT = 3000,
  path = require("path"),
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

  siofu = require("socketio-file-upload"),
  uri = "mongodb+srv://Admin:MME2020@watchmates.jhgji.mongodb.net/WatchMatesDB?retryWrites=true&w=majority";
io.on("connection", (socket) => {
  var uploader = new siofu(),
    roomID = socket.handshake.headers.referer.split("/")[4];
  fs.mkdir((__dirname + "/data/" + roomID), (err) => {
    //Fehlermeldung bei Raum-Ordner-Erstellung 
    //-4075 = Fehlercode für Ordner existiert schon
    if (err && err.errno !== -4075) {
      console.log(err);
    }
  });
  uploader.dir = __dirname + "/data/" + roomID;
  uploader.listen(socket);
  
  /*
  //logged alle files für den aktuellen Raum
  fs.readdir((__dirname + "/data/" + roomID), (err, files) => {
    if (err) {
      console.log(err);
    }
    if (files !== null) {
      files.forEach((file) => {
        //console.log(file);
      });
    }
  
  });*/

  //Hier kommen alle Callbacks für Server-Client Kommunikation rein:
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

  //Hier müsste der Server an andere des gleichen Raums die Aufforderung schicken, dass die Playlist updated werden soll
  //Als Callback könnte hier ein Thumbnail erstellt werden
  socket.on("fileUpload", roomID => fileUploadCallback(roomID));
});

httpServer.listen(SOCKETPORT, function () {
  //console.log("Ich höre auf socket IO Port 3000");
});

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

function fileUploadCallback(roomID){
  server.updatePlaylist(roomID);
  console.log("File Uploaded from room: " + roomID);
}

init();