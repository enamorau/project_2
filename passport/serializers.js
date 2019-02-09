const passport = require('passport');
const User = require('../models/User');

passport.serializeUser((loggedInUser, cbs) => {
  cbs(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cbs) => {
  User.findById(userIdFromSession)
  .then(userDocument => {
    cbs(null, userDocument);
  })
  .catch(err => {
  cbs(err);
  })
});
