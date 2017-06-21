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

router.post('/msg', function (req, res, next) {
    var message = req.body.msg;
    pg.defaults.ssl = true;
    var connectionString = "postgres://mlxdefbdargeyd:fe55945add0418c1dea76176f37812f28317229e54425f80149d0852f295e38f@ec2-23-23-86-179.compute-1.amazonaws.com:5432/ddnidtul6k6nan?ssl=require";
    var pgClient = new pg.Client(connectionString);
    pgClient.connect();
    var uid = "GUY";
    var cr = pgClient.query("SELECT ID from Messages order by ID desc limit 1");
    var current = "";
    cr.on('row', function (row, res) {
        var num = row.id;
        var qr = pgClient.query("INSERT INTO Messages (ID,SENDER,Message) VALUES (" + (num + 1).toString() + ",'" + uid + "','" + message + "')");
    });
    cr.on('end', function () {
        var nr = pgClient.query("SELECT ID,Message from Messages order by ID desc limit 5");
        var allMsg = []
        nr.on('row', function (row, res) {
            console.log(row.message);
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

router.post('/umsg', function (req, res, next) {
    pg.defaults.ssl = true;
    var connectionString = "postgres://mlxdefbdargeyd:fe55945add0418c1dea76176f37812f28317229e54425f80149d0852f295e38f@ec2-23-23-86-179.compute-1.amazonaws.com:5432/ddnidtul6k6nan?ssl=require";
    var pgClient = new pg.Client(connectionString);
    pgClient.connect();
    var uid = "GUY";
    var cr = pgClient.query("SELECT Message from Messages order by ID desc limit 5");
    var allMsg = []
    cr.on('row', function (row, res) {
        allMsg.push(row.Message);
    });
    var current = "";
    for (x in allMsg) {
        current += x + "\n";
    }

    console.log(message);
    res.send(
        {
            "message": current
        }
    );
});

module.exports = router;
