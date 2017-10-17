//requires
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// Mongoose Schema
var UserSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true}
});//END user Schema

// Called before adding a new user to the DB. Encrypts password.
UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) {
      return next();
    }//END if

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        //error handling
        if(err) {
          return next(err);
        }//END error handling
        bcrypt.hash(user.password, salt, function(err, hash) {
            //error handling
            if(err) {
              return next(err);
            }//END error handling
            //IF WE WERE TO CONSOLE LOG RIGHT MEOW, user.password would be 12345
            user.password = hash;
            next();
        });//END bcrypt hash
    });//END bcrypt salt
});//END userSchema.pre

// Used by login methods to compare login form password to DB password
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    // 'this' here refers to this instance of the User model
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        //error handling
        if(err) {
          return callback(err);
        }//END error handling

        callback(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);
