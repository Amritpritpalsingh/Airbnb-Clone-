module.exports.reOgurl = (req,res,next)=>{
    
    if(req.session.reOgurl){
        res.locals.redirectUrl = req.session.reOgurl;
        
    }
    next(); 
};