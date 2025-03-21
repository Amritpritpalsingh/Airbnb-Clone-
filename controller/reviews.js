const reviewSchema = require("../Models/review.js");
const listing = require("../Models/listing.JS");


module.exports.postReview = async(req,res)=>{
    const listingData = await listing.findById(req.params.id);
    const review = new reviewSchema(req.body);
    review.author = req.user._id;
    listingData.review.push(review._id);
    await review.save();
    await listingData.save();  
    req.flash("reviewee","Thank you For Gave Us Valueable Review")
    res.redirect(`/listing/${listingData._id}`)
}

module.exports.deleteReview = async(req,res)=>{
     const {id,reviewId}=req.params;
     await listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
     await reviewSchema.findByIdAndDelete(reviewId);
     req.flash("revieweeDel","Review Deleted")
     res.redirect(`/listing/${id}`);
 
 }