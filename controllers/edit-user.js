const User = require('../models/user');

const editUser = (req, res, next) => {
  const { username } = req.body;

  User.findOneAndUpdate(
    { username: username },
    { $set: req.body },
    { new: true },
    (error, user) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        error = new Error('User not found with username ' + username);
        error.status = 404;
        return next(error);
      }

      console.log('user updated for username ' + username);
      return res.json(user);
    },
  );
};

module.exports = editUser;
