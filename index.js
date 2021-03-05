/* eslint-env node */

//Server

var server,
  roomManager;

const AppServer = require("./server/AppServer.js"),
  express = require("express"),
  RoomManager = require("./server/RoomManager.js"),
  httpServer = require("http").createServer(express),
  options = { cors: true, origin: "http:localhost:3000" },
  io = require("socket.io")(httpServer, options),
  { MongoClient } = require("mongodb"),
  uri =
  "mongodb+srv://Admin:MME2020@watchmates.jhgji.mongodb.net/test?retryWrites=true&w=majority",
  dbClient = new MongoClient(uri, { useUnifiedTopology: true });

async function testDB() {

  try {
    await dbClient.connect();
    
    await listDatabases(dbClient);
  } catch (e) {
    console.error(e);
  } finally {
    await dbClient.close();
  }
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

io.on("connection", (socket) => {
  console.log("Connection on Client: " + socket.id);
  let id = socket.id;
  //Hier kommen alle Callbacks für Server-Client Communikation rein:
  socket.on("createRoom", (data) => roomManager.create(data));
});

httpServer.listen(3000, function() {

  console.log("Ich höre auf socket IO Port 3000");
});

/**
 * Starts webserver to serve files from "/app" folder
 */
function init() {

  // Access command line parameters from start command (see package.json)
  let appDirectory = process.argv[2],
    appPort = process.argv[3]; // port to use for serving static files
  server = new AppServer(appDirectory);
  server.start(appPort);
  roomManager = new RoomManager();
}
init();
testDB().catch(console.error);