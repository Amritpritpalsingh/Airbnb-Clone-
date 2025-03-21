const express = require("express");
const Router = express.Router({mergeParams:true});
const User = require("../Models/user.js");
const passport = require("passport");
const {reOgurl}=require("../utils/postuserReq.js")
const userController = require("../controller/user.js")
// Miscellaneous Functions 

const aserHandler = require("../utils/aserHandler.js");

const expressHandler = require("../utils/expressErr.js");

Router.route("/signup")
.get(userController.signFromrender)
.post(aserHandler(userController.singupUser))

Router.route("/login")
.get(userController.loginFormrenderm)
.post(reOgurl,passport.authenticate("local",{failureRedirect:"/login",failureFlash: "Invalid username or password. Please try again."}),aserHandler(userController.loginUser))


// Logout
Router.get("/logout",userController.logoutUser);

module.exports = Router;