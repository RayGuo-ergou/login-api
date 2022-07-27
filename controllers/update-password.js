const User = require('../models/user');

const updatePassword = (req, res, next) => {
  const user = new User(req.user);
  console.log(req.user);

  user.changePassword(
    req.body.oldPassword,
    req.body.newPassword,
    (err, result) => {
      if (err) {
        err.status = 403;
        return next(err);
      }

      console.log('the result is: ');
      console.log(result);

      res.json({ message: 'Password has been updated successfully' });
    },
  );
};

module.exports = updatePassword;
