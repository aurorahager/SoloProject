//requires
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

// Store this user's unique id in the session for later reference
// Only runs during authentication
// Stores info on req.session.passport.user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});// END serial user

// Runs on every request after user is authenticated
// Look up the user's id in the session and use it to find them in the DB for each request
// result is stored on req.user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if(err) {
      done(err);
    }//END if
    done(null, user);
  });//END find by ID
});//END deserialize user

// Does actual work of logging in
// Called by middleware stack
passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'username'
  }, function(req, username, password, done) {
    // mongoose stuff
    User.findOne({username: username}, function(err, user) {
      //error handling
      if(err) {
        throw err;
      }//END error handling
      // user variable passed to us from Mongoose if it found a match to findOne() above
      if(!user) {
        // user not found
        console.log('userStrategy.js :: no user found');
        return done(null, false, {message: 'Incorrect credentials.'});
      } else {
        // found user! Now check their given password against the one stored in the DB
        // comparePassword() is defined in the schema/model file!
        user.comparePassword(password, function(err, isMatch) {
          //error handling
          if(err) {
            throw err;
          }//END  error handling 
          if(isMatch) {
            // all good, populate user object on the session through serializeUser
            console.log('userStrategy.js :: all good');
            return(done(null, user));
          } else {
            // no good.
            console.log('userStrategy.js :: password incorrect');
            done(null, false, {message: 'Incorrect credentials.'});
          }//END else no match
        });//END comparePassword
      } //END else no error
    }); // END findOne
  } // END callback
));//END passport use

module.exports = passport;
