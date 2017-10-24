//requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/user.js');
var path = require('path');
var eventful = require('eventful-node');
var client = new eventful.Client('mtf59wmLgBnDkmLw');


router.get('/', function (req, res){
    client.searchEvents({ location: 'minneapolis' }, function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log('Recieved ' + data.search.total_items + ' events');
        console.log('Event listings: ');
        //print the title of each event 
        for (var i in data.search.events) {
            console.log(data.search.events[i].title);
            console.log(data.search.events);
            
        }
    });
})//END router GET

module.exports = router;