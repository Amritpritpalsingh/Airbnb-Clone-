const express = require("express");
const Router = express.Router({mergeParams:true});
const {isOwner}= require("../utils/isOwner")
// Miscellaneous Functions 

const aserHandler = require("../utils/aserHandler.js");
const expressHandler = require("../utils/expressErr.js");
const {reviewValidator} = require("../utils/svrsmaValid.js");
const reviewSchema = require("../Models/review.js");
const reviewController = require("../controller/reviews.js")
const listing = require("../Models/listing.JS");

const vldrevMidware = (req,res,next)=>{
    const {error}= reviewValidator.validate(req.body);
    if(error){
        throw new expressHandler(400,error)
    }
    else{
        next();
    }
}


// Reviews Route

Router.post("/",vldrevMidware,aserHandler(reviewController.postReview));
 
 // Review Delete Route
 Router.delete("/:reviewId",aserHandler(reviewController.deleteReview));
 
 module.exports=Router;


 