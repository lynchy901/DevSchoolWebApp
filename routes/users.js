var express = require('express');
var otp = require('../helpers/onetimepad');
var pg = require('pg');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/test', function (req, res, next) {
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

<<<<<<< HEAD
router.post('/dec', function (req, res, next) {
    var message = req.body.data;
    var key = req.body.msg;
    res.send(
        {
            "cipherText": message,
            "key": key,
            "plainText": otp.oneTimePadDecrypt(message, key)
        }
    );
=======
router.post('/dec', function(req,res,next) {
   var message = req.body.data;
   var key = req.body.msg;
   res.send(
       {
          "cipherText": message,
           "key": key,
           "plainText": otp.oneTimePadDecrypt(message, key)
       }
   )
>>>>>>> 83eab108af36b312aec123d34f99495d6393048c
});

router.post('/msg', function (req, res, next) {
    var message = req.body.msg;
    var key = req.body.key;
    pg.defaults.ssl = true;
    var connectionString = "postgres://mlxdefbdargeyd:fe55945add0418c1dea76176f37812f28317229e54425f80149d0852f295e38f@ec2-23-23-86-179.compute-1.amazonaws.com:5432/ddnidtul6k6nan?ssl=require";
    var pgClient = new pg.Client(connectionString);
    pgClient.connect();
    var uid = "GUY";
    var cr = pgClient.query("SELECT ID from messages order by ID desc limit 1");
    var current = "";
    cr.on('row', function (row, res) {
        var num = row.id;
        if (message || key)
            var qr = pgClient.query("INSERT INTO messages (ID,sender,message,key) VALUES (" + (num + 1).toString() + ",'" + uid + "','" + message + "','" + key + "')");
    });
    cr.on('end', function () {
        var nr = pgClient.query("SELECT * from messages order by ID desc limit 5");
        var allMsg = []
        nr.on('row', function (row, res) {
            allMsg.push(row);
        });
        nr.on('end', function () {
            res.send(
                {
                    "message": allMsg
                }
            );
        });



    })




});

module.exports = router;
