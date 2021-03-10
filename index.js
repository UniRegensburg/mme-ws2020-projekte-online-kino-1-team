/* eslint-env node */

//Server

const SOCKETPORT = 3000,
  path = require("path");

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
  //Hier kommen alle Callbacks für Server-Client Kommunikation rein:
  socket.on("createRoom", () => {
    let url = roomManager.createUrl();
    dbClient.addRoom(url);
    server.addRoom(url);
    socket.emit("changeUrl", url);
  });
  socket.on("MessageToServer", (message) => {
    console.log("Message received at SERVER", message);
    socket.broadcast.emit("MessageToClients", message);
  });
});

httpServer.listen(SOCKETPORT, function() {
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

init();