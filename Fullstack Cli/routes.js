const fs = require("fs");

function indexPage(path, res) {
  fs.readFile(path, function (err, data) {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.writeHead(200, { Content_Type: "text/html" });
      res.end(data);
    }
  });
}

module.exports = {
  indexPage,
};
