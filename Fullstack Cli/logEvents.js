const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

//import emmitters from modules
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

// Node.js common core global modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

//change logevents to an emitter function
myEmitter.on("log1", (event, level, message) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${level}\t${event}\t${message}\t${uuid()}`;
  if (DEBUG) console.log(logItem);
  try {
    // TODO: include year and month when managing folders
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      // include ./logs/yyyy/mmmm
      fs.mkdir(path.join(__dirname + "/logs"), (err) => {
        if (err) console.log(err);
        else console.log("logs directory created");
      });
    }
    // Include todays date in filename
    const fileName = `${format(new Date(), "yyyyMMdd")}` + "_events.log";
    fs.appendFile(
      path.join(__dirname, "logs", fileName),
      logItem + "\n",
      (err) => {
        if (err) console.log(err);
        else console.log("event logged");
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// myEmitter.on("log2", (event, level, message) => {
//   const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
//   const logItem = `${dateTime}\t${level}\t${event}\t${message}\t${uuid()}`;

//   createNewLog();
//   function createNewLog() {
//     if (!fs.existsSync(path.join(__dirname, "/logs"))) {
//       fs.mkdir(path.join(__dirname + "/logs"));
//     }
//   }
// });

//create log events function to call the emitter class when called for
function logEvents(event, level, message) {
  myEmitter.emit("log1", event, level, message);
}

module.exports = { logEvents };
