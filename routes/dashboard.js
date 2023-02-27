var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/getAll', function(req, res, next) {
  res.send({message:'You are in dashboard route'});
});

module.exports = router;
