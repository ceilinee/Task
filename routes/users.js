var express = require('express');
var router = express.Router();
var Send = require('../models/Send');
var Retrieve = require('../models/Retrieve');
/* GET users listing. */
router.get('/:email?/:password?', function(req, res, next) {
    if (req.params.email && req.params.password) {
    Retrieve.getLogin(req.params.email, req.params.password, function(err, data){
      if (err) {
        res.json(err);
      }
      else if(data.length > 0){
        console.log(data)
          var result = {
            status: "Accepted",
            Activated: data[0]
          }
          res.json(result);
      }else {
          res.json("Failed Login")
      }
    });
  }
});

router.post('/', function(req, res, next) {
  Send.addName(req.body, function(err, rows){
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});
router.post('/project', function(req, res, next) {
  Send.addProject(req.body, function(err, rows){
    if (err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});
module.exports = router;
