/**
 * Created by semianchuk on 04.04.16.
 */
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var messages = __dirname + "/messages/";
var app = express().use(express.static(
    path.join(__dirname, '')
))

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get('/*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.use('/', express.static(messages));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
  next();
});
console.log('Server running: http://localhost:3000 __dirname-')
app.listen(3000);
