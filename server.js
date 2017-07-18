var express = require("express");
var app = express();

app.use("/", express.static(__dirname + "/public"));

app.get("/", function (req, res){
  res.sendFile(__dirname + "/src/" + "index.html");
});

app.listen(1234, function(){
	console.log("listening on 1234");
});
