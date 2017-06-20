var express = require('express');
var otp = require('../helpers/onetimepad');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/test', function(req,res,next) {
  var message = req.body.data;
  var key = otp.generateKey(message.length);
  console.log(key);
  res.send(
      {
          "plainText": message,
          "key": key,
          "cipherText": otp.oneTimePad(message, key)
      }
  );
});

router.post('/dec', function(req,res,next) {
  var message = req.body.data;
  var key = req.body.msg;
  res.send(
      {
          "cipherText": message,
          "key": key,
          "plainText": otp.oneTimePadDecrypt(message, key)
      }
  );
});

module.exports = router;
