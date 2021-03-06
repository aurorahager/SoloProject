//requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/user.js');
var path = require('path');


router.put('/', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        // send back user object from database
        console.log('logged in', req.user.username);
        console.log('req.body:', req.body.data);
        var user = req.user.username;
        var place = req.body.data;

        Users.updateOne({
            username: user
        }, {
            $push: {
                faveplaces: place
            }
        }, {
            upsert: true
        }, function (err, results) {
            //Error handling
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } //END if || Error handling
            else {
                res.sendStatus(200);
            } //END else || Send results from database
        }); //END updateOne

    } else {
        // failure best handled on the server. do redirect here.
        console.log('not logged in');
        // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
        res.send(false);
    } //END else
}); //END router PUT

router.get('/', function (req, res) {
    Users.find({
        username: "rory"
    }, {
        password: 0,
        username: 0,
        _id: 0,
        __v: 0
    }, function (err, results) {
        //Error handling
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } //END if || Error handling
        else {
            console.log('results from db Faves:', results);
            res.send(results);
        } //END else || Send results from database
    }) // END find
    // res.send(places);
}); //END router GET


router.put('/delete', function (req, res) {
    // check if logged in
    if (req.isAuthenticated()) {
        // send back user object from database
        console.log('logged in', req.user.username);
        console.log('req.body:', req.body.data);
        var user = req.user.username;
        var place = req.body.data;

        Users.updateOne({
            username: user
        }, {
            $pull: {
                faveplaces: place
            }
        }, function (err, results) {
            //Error handling
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } //END if || Error handling
            else {
                res.sendStatus(200);
            } //END else || Send status
        }); //END updateOne
    } else {
        // failure best handled on the server. do redirect here.
        console.log('not logged in');
        // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
        res.send(false);
    } //END else
}) //END router PUT

module.exports = router;