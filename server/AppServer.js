/* eslint-env node */

const path = require("path"),
  express = require("express"),
  siofu = require("socketio-file-upload");

/**
 * AppServer
 *
 * Creates a simple web server by using express to static serve files from a given directory.
 *
 * @author: Alexander Bazo
 * @version: 1.0
 */

class AppServer {

  /**
   * Creates full path to given appDir and constructors express application with
   * static "/app" route to serve files from app directory.
   * 
   * @constructor
   * @param  {String} appDir Relative path to application dir (from parent)
   */
  constructor(appDir) {
    this.appDir = path.join(__dirname, "../", appDir);
    this.app = express();
    this.app.set("view engine", "ejs");
    this.app.get("/app", (req, res) => res.render("index"));
    this.app.use("/app", express.static(this.appDir));
    this.app.use("/app", express.static("public"));
    this.app.use(siofu.router);
  }

  /**
   * Starts server on given port
   * 
   * @param  {Number} port Port to use for serving static files
   */
  start(port) {
    this.server = this.app.listen(port, function () {
      /*console.log(
        `AppServer started. Client available at http://localhost:${port}/app`,
      );*/
    });
  }

  openRooms(rooms) {
    rooms.forEach(e => {
      this.app.get("/app/" + e.url, (req, res) => res.render("room"));
      this.app.use("/app/" + e.url, express.static("data/" + e.url));
    });
  }

  /**
   * Stops running express server
   */
  stop() {
    if (this.server === undefined) {
      return;
    }
    this.server.close();
  }
  //mounts new data folder for the new created room
  addRoom(url) {
    var randomLink = "/app/" + url;
    this.app.set("view engine", "ejs");
    this.app.use(express.static(path.join(__dirname, "app")));
    this.app.get(randomLink, (req, res) => res.render("room"));
    this.app.use("/app/" + url, express.static("data/" + url));
    return url;
  }
}

module.exports = AppServer;