//requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/user.js');
var path = require('path');
// Eventful API requires
var eventful = require('eventful-node');
var client = new eventful.Client('mtf59wmLgBnDkmLw');


// router GET function to retrieve events from API
router.get('/', function (req, res) {
    // search events
    client.searchEvents({
        location: 'minneapolis',
        // keyword: 'concert',
        date: 'this week',
        page_size: 75,
        sort_order: 'popularity'
    }, function (err, data) {
        //error handling
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } //END if error
        console.log('Received' + data.search.total_items + 'events');
        // send events to service
        res.send(data);
    }); //END searchEvents
}) //END router GET


//EXPORT
module.exports = router;