let regMessage = ["Your mission is to...Uhhh...Relax?", "Your mission is to travel to Egypt to assassinate Dio Brando"];
let emrgMessage = ["GET ME PICTURES OF SPODERMEN", "Snake? SNAKE?! SNAAAAAAAAAAAAAKE!"];

let agentID = 100
let agentName = "Twilight"
let city = "Detroit"
let rMessage = 'Yeah Agent can you get me a pizza?'
let eMessage = 'I WANT PICTURES OF SPIDERMAN'

// Making our array and queue here
regMessage.push(
  rMessage);
emrgMessage.push(
  eMessage);

// Grabbing our information to send here.
let rMessageSend = regMessage.pop();
let eMessageSend = emrgMessage.shift();

// file system module to perform file operations
const fs = require("fs");

// json data
var jsonDataR = 
  `{"${agentID}":[{"message":"${rMessageSend}"},{"name":"${agentName}","city":"${city}"}]}`;
var jsonDataE = 
  `{"${agentID}":[{"message":"${eMessageSend}"},{"name":"${agentName}","city":"${city}"}]}`;

function messageJsonCreator(jsonData, fileName){
// parse json
  var jsonObj = JSON.parse(jsonData);
  console.log(jsonObj);

  // stringify JSON Object
  var jsonContent = JSON.stringify(jsonObj);
  console.log(jsonContent);

  fs.writeFile(fileName, jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}

// Now lets run our code!
messageJsonCreator(jsonDataR, "update.json")
messageJsonCreator(jsonDataE, "emergency.json")
