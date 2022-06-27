// Remember to type | npm init -y | into the console to launch this puppy!

const http = require("http");
const routes = require("./routes.js");
const events = require("events");
const eventEmitter = new events.EventEmitter();
// fresh from stevie boi
const { parse } = require("querystring");

// I'm going to make a simple switch tracker with the event function.
var switchcount = 0;
var counter = function () {
  ++switchcount;
  if (switchcount == 1) {
    console.log(`The amount of times switched so far is ${switchcount}`);
    console.log("Oh hey, a first timer! Welcome!");
  } else {
    console.log(`The amount of times switched so far is ${switchcount}`);
  }
};

// Here's our event established!
eventEmitter.on("counter", counter);

// This is pretty much the core of how the website is ran.
// Well, it's more the modules doing that we imported, really.
const server = http.createServer((req, res) => {
  res.writeHead(200, { Content_Type: "text/html" });
  if (req.method ==="POST"){
    // This is where my post code will go!
    /* if (
      req.header["content-type"] === "application/x-www-form-urlencoded"
    ){*/
      // code to run when the content-type is application/x-www-form-urlencoded
      // get data from the request
      let data = '';
      req.on('data',(chunk) => {
        data += chunk.toString();
      });
      req.on('end',() => {
        let parsedData = parse(data, '&', '=');
        // This is where we are going to build our find user token function and pass info into it!
        // RIGHT HERE BUDDY
        console.log(parsedData);
        console.log(parsedData.userName);
      })
    // }
  } else {
  switch (req.url) {
    case "/":
      routes.indexPage("home.html", res);
      break;
    case "/confirm":
      routes.indexPage("confirm.html", res);
      break;
    default:
      routes.indexPage("default.html", res);
      // For some reason the emitter it runs twice everywhere else but here.
      // Can't figure it out why for the life of me.
      eventEmitter.emit("counter");
      break;
  }}
});

server.listen(3000, "localhost", () => {
  console.log("Web servers boot up now. On port 3000.");
});