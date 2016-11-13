var express = require("express");
var swig = require("swig");


var server = express();

server.engine("html", swig.renderFile);
server.set('view engine', 'html');
server.set('views', './')
server.use(express.static("./"));

server.get("./", function(request, response){
	response.render("index");

});
server.listen(8000);