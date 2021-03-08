/* eslint-env node */

//const { default: DBManager } = require("./server/MongoDB/DBManager.js");

//Server

var server,
  roomManager,
  dbClient;

const AppServer = require("./server/AppServer.js"),
  DBManager = require("./server/MongoDB/DBManager.js"),
  express = require("express"),
  RoomManager = require("./server/RoomManager.js"),
  httpServer = require("http").createServer(express),
  options = { cors: true, origin: "http:localhost:3000" },
  io = require("socket.io")(httpServer, options),
  uri =
  "mongodb+srv://Admin:MME2020@watchmates.jhgji.mongodb.net/WatchMatesDB?retryWrites=true&w=majority";

io.on("connection", (socket) => {
  //console.log("Connection on Client: " + socket.id);
  //Hier kommen alle Callbacks für Server-Client Communikation rein:
  socket.on("createRoom", (data) => roomManager.create(data));
});

httpServer.listen(3000, function() {

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
  dbClient.addRoom();
}

init();