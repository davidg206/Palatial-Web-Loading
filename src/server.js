"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var express = require("express");
var app = express();
var https = require('https');
var PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/save', function (req, res) {
    console.log(req.body);
    var filename = req.body.filename;
    var data = req.body.data;
    var filepath = path.join(__dirname, 'assets', 'cache', filename); // =filename
    fs.writeFile(filepath, data, { flag: 'a' }, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error writing file');
        }
        console.log('File saved successfully');
        return res.status(200).json({ message: 'File saved successfully' });
    });
});
var privateKey = fs.readFileSync('/etc/letsencrypt/live/prophet.palatialxr.com/privkey.pem');
var certificate = fs.readFileSync('/etc/letsencrypt/live/prophet.palatialxr.com/fullchain.pem');

var httpsServer = https.createServer({
    key: privateKey,
    cert: certificate
}, app);
httpsServer.listen(PORT, function () {
    console.log("Server listening on port ".concat(PORT));
});
