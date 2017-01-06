var express = require('express');
var router = express.Router();
var Model = require('../models/item.js')
var conf = require('../conf')
console.log(conf.passwd)



//add item to db
router.post('/item', function(require, response){
  console.log(require.body)
  var item = new Model(require.body);
  item.save(function(err, resource){
    if(err){
      response.send(err).status(501);
    }else{
      response.json(resource).status(201);
    }
  });
});




router.get('/items', function(require, response){
  Model.find({}, function(err, resource){
    if(err){
      response.send(err).status(404);
    }else{
      response.send(resource).status(200);
    }
  });
});


router.delete('/item/:id', function(require, response){
  var id = require.params.id;
  Model.remove({_id: id}, function(err, resource){
    if(err){
      return response.send(err);
    }else{
      return response.json(resource);
    }
  })
});



router.put('/itemup/:id', function(require, response){
  var item = require.body;
  console.log("api"+item);
  var updItem = {};
  if(item.engPhrase){
    updItem.engPhrase = item.engPhrase;
  }
  if(item.plPhrase){
    updItem.plPhrase = item.plPhrase;
  }
  if(item.engPhrase){
    updItem.description = item.description;
  }
    if(item.creationDate){
    updItem.creationDate = item.creationDate;
  }
  if(item.nextRepeat){
    updItem.nextRepeat = item.nextRepeat;
  }

  if(updItem){
    var id = require.params.id;
    Model.update({_id: id},updItem, function(err, resource){
      if(err){
        return response.send(err);
      }else{
        console.log(resource);
        return response.json(resource);
      }
    })

  }


});
/*
wcześniejsza wersja - zwracająca dane dla dzisiaj
router.get('/itemsToday', function(require, response){
var start = new Date();
start.setHours(0,0,0,0);

var end = new Date();
end.setHours(23,59,59,999);

  Model.find({nextRepeat: {$gte: start, $lt: end}}, function(err, resource){
    if(err){
      response.send(err).status(404);
    }else{
      response.send(resource).status(200);
    }
  });
});
*/

router.post('/passwd', function(require, response){
  response.send(conf.passwd).status(200);
});

router.get('/itemsToday', function(require, response){
  Model.find({}, function(err, resource){
 // Model.find({$or: [{plAnsCount: 0}, {engAnsCount: 0}]}, function(err, resource){
    if(err){
      response.send(err).status(404);
    }else{
      response.send(resource).status(200);
    }
  });
});


module.exports = router;