const PORT = 3000 || process.env.PORT;
<<<<<<< HEAD
const DB = "mongodb://localhost/pr3";
=======
const DB = "mongodb://localhost/personalRepetition";
>>>>>>> 58c6724edea466dbd6d81d241a0b784c09e096e4

var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var path = require('path');

var mainRouter = require('./routes/index');
<<<<<<< HEAD
var apiRouter = require('./routes/api');
=======
var apiRouter = require('./routes/api')
>>>>>>> 58c6724edea466dbd6d81d241a0b784c09e096e4

//engine server
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

//routing
app.use('/', mainRouter);
app.use('/api', apiRouter)

//

//db connect
mongoose.connect(DB, function(err){
  if(err){
    return err;
  }else{
    console.log("Successfully connected to "+DB);
  }
});

//view engine
app.set('views', __dirname +'/client');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname,'client')));

app.listen(PORT, function(){
  console.log('Listening on port: '+ PORT);
});