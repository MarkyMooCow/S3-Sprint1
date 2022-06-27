// Node.js common core global modules
const fs = require("fs");
const path = require("path");

const crc32 = require("crc/crc32");
//const { format } = require('date-fns/format');
//import { format } from 'date-fns';

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

var tokenCount = function () {
  if (DEBUG) console.log("token.tokenCount()");
  return new Promise(function (resolve, reject) {
    fs.readFile(__dirname + "/tokens.json", "utf-8", (error, data) => {
      if (error) reject(error);
      else {
        let tokens = JSON.parse(data);
        let count = Object.keys(tokens).length;
        console.log(`Current token count is ${count}.`);
        resolve(count);
      }
    });
  });
};

function newToken(username) {
  if (DEBUG) console.log("token.newToken()");

  let newToken = JSON.parse(`{
        "created": "1969-01-31 12:30:00",
        "username": "username",
        "email": "user@example.com",
        "phone": "5556597890",
        "token": "token",
        "expires": "1969-02-03 12:30:00",
        "confirmed": "tbd"
    }`);

  if (DEBUG) console.log("JSON.parse()");

  let now = new Date();
  let expires = addDays(now, 3);

  newToken.created = now;
  newToken.username = username;
  newToken.token = crc32(username).toString(16);
  newToken.expires = expires;

  // make an if statement
  if (fs.readFileSync(__dirname + "/tokens.json", "utf-8") == "") {
    // if file is empty let tokens = blank array take lines 62-70
    let tokens = [];
    tokens.push(newToken);
    let userTokens = JSON.stringify(tokens);

    fs.writeFile(__dirname + "/tokens.json", userTokens, (err) => {
      if (err) console.log(err);
      else {
        console.log(`New token ${newToken.token} was created for ${username}.`);
        //    myEmitter.emit('log', 'token.newToken()', 'INFO', `New token ${newToken.token} was created for ${username}.`);
      }
    });
  } else {
    // otherwise read and write to the file normally
    fs.readFile(__dirname + "/tokens.json", "utf-8", (error, data) => {
      if (error) throw error;
      let tokens = JSON.parse(data);

      tokens.push(newToken);
      userTokens = JSON.stringify(tokens);

      fs.writeFile(__dirname + "/tokens.json", userTokens, (err) => {
        if (err) console.log(err);
        else {
          console.log(
            `New token ${newToken.token} was created for ${username}.`
          );
          //    myEmitter.emit('log', 'token.newToken()', 'INFO', `New token ${newToken.token} was created for ${username}.`);
        }
      });
    });
  }

  return newToken.token;
}
function tokenApp() {
  const myArgs = process.argv.slice(2);
  if (DEBUG) console.log(myArgs);
  //Use this line of code to send the 3rd and beyond args to the console
  //if(myArgs.length > 1) console.log('the init.args: ', myArgs);
  switch (myArgs[1]) {
    case "--count":
      tokenCount();
      if (DEBUG) console.log("tokenApp.tokenCount() --count");
      break;
    case "--new":
      newToken(myArgs[2]);
      if (DEBUG) console.log("tokenApp.New() --new");
      break;
    case "--add":
      // add a function to either create new token with specified number or edit existing token
      if (DEBUG) console.log("tokenApp.Add() --add");
      break;
    case "--search":
      // add a function to seach through tokens
      // for loop to search for each token using username
      if (DEBUG) console.log("tokenApp.Search() --search");
      break;
    default:
      if (DEBUG) console.log("tokenApp - default");
      fs.readFile(__dirname + "/views/token.txt", (error, data) => {
        if (error) throw error;
        console.log(data.toString());
      });
  }
}
// function addTokenEmail() {}
// function addTokenPhone() {}

function searchTokens() {
  //input needs to be what the user inputs when searching username
  //node app token search <username>
  let input = "applebees"; // this input would take in the <username>

  //for a edit function you would take input in and let it equal whatever is trying to be changed
  //ex. token.name = input

  //reading json file and parsing to be able to use data
  let tokenFile = fs.readFileSync("tokens.json", "utf-8");
  let JSONTokens = JSON.parse(tokenFile);
  let tokens = JSONTokens;

  //search through json array for username that equals input username
  for (i = 0; i < tokens.length; i++) {
    if (tokens[i].username == input) {
      //if username is equal and does exist print all info of that token
      console.log(tokens[i]);

      //example of edit
      //tokens[i].phone = "12223333";
    }
  }
  // tokens = JSON.stringify(tokens);
  // fs.writeFileSync("tokens.json", tokens, "utf-8");
}

// searchTokens();

module.exports = {
  tokenApp,
};
// fill in switch statement and basically repeat for each other command argument
// myargs2 relates to the second part of the input command
// switch (myArgs[2]) {
//   case "p":
// for (i = 0; i < tokens.length; i++) {
//   if (tokens[i].username == myArgs[3]) {
//     //if username is equal and does exist print all info of that token
//     console.log(tokens[i]);

//     //example of edit
//     //tokens[i].phone = myArgs[4]; //node app token --add p applebees 1122333 // terminal input
//   }
// }
//
//}
