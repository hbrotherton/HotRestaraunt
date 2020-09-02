var express = require("express");
var path =require("path");
var fs =require("fs");

var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [
    
];

var waitlist = [
    
];

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
  
  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
  
  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });

  app.get("/api/tables", function(req, res) {
    return res.json(reservations);
  });

  app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });

  app.post("/api/tables", function(req, res) {

    var newReservation = req.body;

    if (reservations.length < 5) {
        reservations.push(newReservation);
        res.end("table");
    }else{
        waitlist.push(newReservation);     
        res.end("waiting");
    };

  });

  app.post("/api/clear", function(req, res) {
      reservations=[];
      waitlist=[];
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });