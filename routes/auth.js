const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require('../config/cloudinary.js');


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", (req,res,next)=> {console.log(req.body); next()},passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", uploadCloud.single('photo'), (req, res, next) => {
  const {email, password, fullName, occupation, lookingFor, bio, link} = req.body;

  console.log(req.body)
  console.log(1)
  if (email === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }
console.log(2)

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      console.log("email null")
      res.render("auth/signup", { message: "The email has allready been registered" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const imgPath = req.file.url;
    const imgName = req.file.originalname;

    const newUser = new User({
      email,
      password: hashPass,
      fullName, 
      occupation, 
      lookingFor, 
      bio, 
      link,
      imgPath,
      imgName
    });

    newUser.save()
    .then(() => {
      console.log(3)
      res.redirect("/");
    })
    .catch(err => {
      console.log(4)
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
