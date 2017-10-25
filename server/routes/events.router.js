//requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/user.js');
var path = require('path');
var eventful = require('eventful-node');
var client = new eventful.Client('mtf59wmLgBnDkmLw');


router.get('/', function (req, res){
    client.searchEvents({
        location: 'minneapolis', keyword: 'concert', date: 'this week', page_size: 100, sort_order: 'popularity'}, function (err, data) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }
        console.log('Recieved ' + data.search.total_items + ' events');
        res.send(data);
    });
})//END router GET

module.exports = router;