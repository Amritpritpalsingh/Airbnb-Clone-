module.exports.userAuth= (req,res,next)=>{
    
if(!req.isAuthenticated()){
    req.flash("error","Please Logged In First");
    req.session.reOgurl = req.originalUrl;
    res.redirect("/login");
}
else{
    next();
}}
