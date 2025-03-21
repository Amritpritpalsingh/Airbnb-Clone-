const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const  listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    review:[{
        type:Schema.Types.ObjectId,
        ref:"review"
    },],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});
listingSchema.post("findOneAndDelete",async(data)=>{
    if(data){
        await reviewSchema.deleteMany({_id:{$in:data.review}})
    }
    else{
        console.log("Something is Worng");
        
    }
    
})
const reviewSchema = require("./review");
const listings = mongoose.models.Listings || mongoose.model("Listings", listingSchema);
module.exports = listings;


