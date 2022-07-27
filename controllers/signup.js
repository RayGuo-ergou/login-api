const User = require('../models/user');

const signup = (req, res, next) => {
  //register new user
  User.register(
    /**
     * create a new user
     * uses application/json so the paras is in req.body
     */
    new User({
      username: req.body.username,
      email: req.body.email,
    }),
    req.body.password, // the password will hash and salt then store the hash and salt into db instead of plaintext
    (err) => {
      // error catch
      if (err) {
        console.log(`error  happened`);
        err.status = 400;
        return next(err);
      }
      console.log('user registered');
      res.redirect('/login');
    },
  );
};

module.exports = signup;
