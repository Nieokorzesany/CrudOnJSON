var express = require("express");
var fs = require("fs");
bodyParser = require("body-parser");
var app = express();
var stringifyFile = "";

app.use(bodyParser.json());
app.use("/", function(req, res, next) {
  fs.readFile("./package.json", "utf8", function(err, data) {
    if (err) throw err;
    stringifyFile = data;
    next();
  });
});

app.get("/getNote", function(req, res) {
  res.send(stringifyFile);
});

app.post("/updateNote/:note", function(req, res) {
  stringifyFile += req.params.note;
  fs.writeFile("./package.json", stringifyFile, function(err) {
    if (err) throw err;
    res.send(stringifyFile);
  });
});

app.listen(3000);
