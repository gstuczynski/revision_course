const PORT = 3000 || process.env.PORT;

const DB = "mongodb://localhost/pr3";
const conf = require("./conf");
var schedule = require('node-schedule');
//const DB = conf.database;
var Model = require('./models/item.js')

var nodemailer = require('nodemailer');
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

//mailing
schedule.scheduleJob('* 12 * * *', function(){
var transporter = nodemailer.
createTransport('smtps://tentostertotester@gmail.com:toster123@smtp.gmail.com');

var msg = "Czy pamiętasz co znaczą te słówka: "
  Model.find({$or: [{plAnsCount: 0}, {engAnsCount: 0}]}, function(err, resource){
    for(r of resource){
      if(r.plAnsCount==0){
        msg+=r.plPhrase+"🐴, "
      }else{
        msg+=r.engPhrase+"🐴, "
      }

    }
  })
var mailOptions = {
    from: '"Przypominaczka" <tentostertotester@gmail.com>', // sender address 
    to: 'stuczynski.g@gmail.com', // list of receivers 
    subject: 'Pamiętaj mordo o powtórkach z angielskiego!!! 🐴', // Subject line 
    text: msg, // plaintext body 
    html: '<b>'+msg+'</b>' // html body 
};
 
// send mail with defined transport object 
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
})
});



//codziennie zmiejszam ilosc dni do powtorki, odzielnie po polsku i angielsku

schedule.scheduleJob('* 0 * * *', function(){
    Model.find({}, function(err, resource){
    if(err){
      console.log("Erron on find All i schedule")
    }else{
      for(r of resource){
        r.plAnsCount = r.plAnsCount+1;
        r.engAnsCount = r.engAnsCount+1;
        Model.update({_id: r._id},r, function(err, resource){
        if(err){
           console.log("Erron on update in schedule")
         }else{
         //   console.log("All data updated"+r.engAnsCount);
      }
    })
      }
    }
  });
});
