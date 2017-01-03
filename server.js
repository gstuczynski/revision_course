const PORT = 3000 || process.env.PORT;

//const DB = "mongodb://localhost/pr3";
const conf = require("./conf");
const DB = conf.database;



var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');


var mainRouter = require('./routes/index');

var apiRouter = require('./routes/api');



//engine server
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

//routing
app.use('/', mainRouter);
app.use('/api', apiRouter)

//view engine
app.set('views', __dirname +'/client');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname,'client')));




//db connect
mongoose.connect(DB, function(err){
  if(err){
    console.log(err);
    return err;
  }else{
    console.log("Successfully connected to "+DB);
  }
});


app.listen(PORT, function(){
  console.log('Listening on port: '+ PORT);
});