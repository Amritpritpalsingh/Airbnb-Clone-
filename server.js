if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const listingRouter = require("./Routes/listing");
const reviewRouter = require("./Routes/reviews.js")
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const User = require('./Models/user');
const userRouter = require("./Routes/user.js");
const multer = require("multer");
const upload = multer({dest:"uploads/"})
const mongoStore = require("connect-mongo")
const sessionOptions = session({secret:process.env.SECERT,
    store,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
    }

});
const store = mongoStore.create({mongoUrl:process.env.ATLASDB,
    crypto:{
        secret:process.env.SECERT
    },
    touchAfter: 24*3600

})
store.on("error",()=>{
    console.log("Error Detected");
    console.log(err);
    
    
})

// Middlewares
app.set('view engine', 'ejs');  // or 'pug', 'hbs'
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("Method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(cookieParser());
app.use(sessionOptions);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.deleted=req.flash("deleted");
    res.locals.reviewee = req.flash("reviewee");
    res.locals.revieweeDel = req.flash("revieweeDel");
    res.locals.listingNexit = req.flash("listingNexit");
    res.locals.failed = req.flash("failed")
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

 // Connection With MongoDB
async function main(){
    await mongoose.connect(process.env.ATLASDB)
}

main()
.then(()=>{
    console.log("Connected Succesfully To Database!!!");
    
})
.catch((err)=>{
    console.log(err);
    
});

// Miscellaneous Functions 
const expressHandler = require("./utils/expressErr.js");


 // Port Listing 
app.listen(8080,()=>{
    console.log("Listing at port 8080!!!");
    
});



// All  Router
app.use("/listing",listingRouter);
app.use("/listing/:id/reviews",reviewRouter);
app.use("/",userRouter);

 
// Error Handling Middleware
app.all("*",(req,res,next)=>{
    next(new expressHandler(404,"Page Not!!"));
})
app.use((err,req,res,next)=>{
    let { status = 500 , message="Something Wrong "} = err;
    res.render("listings/error.ejs",{message})
});