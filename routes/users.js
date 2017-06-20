var express = require('express');
var otp = require('../helpers/onetimepad');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  otp.generateKey(10);
});

router.post('/test', function(req,res,next) {
  var message = req.body.data.toLowerCase();
  var key = otp.generateKey(message.length);
  res.send(
      {
          "originalMessage": message,
          "key": key,
          "encryptedMessage": otp.oneTimePad(message, key)
      }
  );
});

module.exports = router;
