const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const ensureLogin = require("connect-ensure-login");
const Project = require("../models/Project")


router.get('/dashboard', ensureLogin.ensureLoggedIn(), (req, res) => {
  User.findById(req.user._id).populate("matchedWithProjects")
  .then(user => {
    res.render('session/dashboard.hbs' ,{layout: 'session/layout-user.hbs' , user: user});
  })

});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;