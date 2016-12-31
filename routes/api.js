var express = require('express');
var router = express.Router();
var Model = require('../models/item.js')




//add item to db
router.post('/item', function(require, response){
  var item = new Model(require.body);
  item.save(function(err, resource){
    if(err){
      response.send(err).status(501);
    }else{
      response.json(resource).status(201);
    }
  });
});




router.get('/item', function(require, response){
  Model.find({}, function(err, resource){
    if(err){
      response.send(err).status(404);
    }else{
      response.send(resource).status(200);
    }
  });
});


router.delete('/items/:id', function(require, response){
  var id = require.params.id;
  Model.remove({_id: id}, function(err, resource){
    if(err){
      return response.send(err);
    }else{
      return response.json(resource);
    }
  })
});

<<<<<<< HEAD

/*
jednak logike wyboru powtorek przenoszę do MainService

router.get('/item/main', function(require, response){
var today = new Date()-1;
Model.find({"created_on": {"$gte": new Date(2016, 12, 19), "$lt": new Date(2016, 12, 31)}}).exec(function(err, users) {
  if (err){
    response.send(err).status(404);
  }else{
    response.send(resource).status(200);
  }

})
});
*/

=======
>>>>>>> 58c6724edea466dbd6d81d241a0b784c09e096e4
module.exports = router;