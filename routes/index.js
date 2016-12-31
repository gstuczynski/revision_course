var express = require('express');
var router = express.Router();

<<<<<<< HEAD
router.get('/', function(request, response) {
    response.render('index.html');
});
router.get('/main', function(request, response) {
    response.render('index.html');
});
router.get('/admin', function(request, response) {
    response.render('index.html');
});

module.exports = router;
=======
router.get('/', function(req, res){
  res.render('index.html');
});

module.exports = router;
>>>>>>> 58c6724edea466dbd6d81d241a0b784c09e096e4
