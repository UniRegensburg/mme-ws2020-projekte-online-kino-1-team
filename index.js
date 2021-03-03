/* eslint-env node */

//Server


var server,
  rooms;

const AppServer = require("./server/AppServer.js"),
  express = require("express"),

  httpServer = require("http").createServer(express),
  options = {},
  io = require("socket.io")(httpServer, options);

io.on("connection", (socket) => {
  console.log("Connection on Client: " + socket.id);

  //Hier kommen alle Callbacks für Server-Client Communikation rein:

  socket.on("createRoom", date => createRoom(date));
  socket.on("date", date => {
    console.log(date);
  });

});

httpServer.listen(3000, function() {
  console.log("Ich höre auf socket IO Port 3000");
});

function createRoom(roomName){
    console.log("Create new Room" + roomName);
}
/**
 * Starts webserver to serve files from "/app" folder
 */
function init() {
    if (rooms === null){
        this.rooms = {};
    }
    else {
        this.rooms = rooms; 
    }
  // Access command line parameters from start command (see package.json)
  let appDirectory = process.argv[2], // folder with client files
    appPort = process.argv[3]; // port to use for serving static files
  server = new AppServer(appDirectory);
  server.start(appPort);
}

init();