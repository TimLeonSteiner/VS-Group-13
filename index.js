const express = require("express");
const server = express();
const port = 3001;

server.get("/hello", function (req, res) {
    res.send("Hello IMIs!");
});

server.get("/", function(req,res){
    res.send(`
        It’s working :) — check out <a href="/hello">/hello</a>.`);
});

server.listen(port, function () {
    console.log("Express listening on " + port);
});

