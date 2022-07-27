const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

/**
 * Do not need password because the password local mongoose would auto-generate
 * required only username and email
 * password requirement can done in the front end
 */
const userSchema = new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  city: String,
  cityId: Number,
  country: String,
});

//plugin the password mongoose
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

/* PASSPORT LOCAL AUTHENTICATION */
//create a strategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
module.exports = User;
