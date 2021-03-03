/* eslint-env node */

const AppServer = require("./server/AppServer.js"),
  io = require('socket.io')(3000);

var server;

/**
 * Starts webserver to serve files from "/app" folder
 */
io.on('connection', socket => {
  socket.emit('test', 'Hello World')
})

function init() {
  // Access command line parameters from start command (see package.json)
  let appDirectory = process.argv[2], // folder with client files
    appPort = process.argv[3]; // port to use for serving static files
  server = new AppServer(appDirectory);
  server.start(appPort);
}

init();