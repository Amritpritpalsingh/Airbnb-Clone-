const User = require("../Models/user.js");
const passport = require("passport");

module.exports.signFromrender = (req,res)=>{
    res.render("../views/user/signup.ejs")
}

module.exports.singupUser = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
    const newUser=new User({email,username});
    const registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
        next(err);
        }
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listing");})}
    catch(err){
        req.flash("failed","Username already exit");
        res.redirect("/signup");
}}

module.exports.loginFormrenderm = (req,res)=>{
    res.render("../views/user/login.ejs")
}

module.exports.loginUser = async(req,res)=>{
    req.flash("success","Welcome Back To Wanderlust!!");
    if(!(res.locals.redirectUrl)){
        res.redirect("/listing")
    }
    else{
        res.redirect(res.locals.redirectUrl)
    }

}

module.exports.logoutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
        next(err);}
        req.flash("success","Logout Successfully");
        res.redirect("/listing");
    })

}