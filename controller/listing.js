const listing = require("../Models/listing.JS");
module.exports.index = async (req,res)=>{
    const allData =  await listing.find({});
        res.render("listings/index.ejs",{allData});
}

module.exports.newFormrendring = async(req,res)=>{
    res.render("listings/new.ejs");}
    
module.exports.showListing = async (req,res)=>{
    const id = req.params.id;
    const listingData = await listing.findById(id).populate({
        path: "review",
        populate: { path:"author"},
      })
      .populate("owner");
   
    if(!listingData){
        req.flash("listingNexit","Listing Not Exit");
    }
    res.render("listings/show.ejs",{listingData});
}

module.exports.createListing = async(req,res,next)=>{
    const listingData = req.body;
    let url = req.file.path;
    let filename = req.file.filename;
    listingData.owner = req.user._id
    listingData.image={url,filename};
    await listing.insertOne(listingData);
    req.flash("success","Listing Added Successfully")
    res.redirect("/listing");

}
module.exports.renderEditform = async(req,res)=>{
    const id = req.params.id;
    const userData=await listing.findById(id);
    res.render("listings/edit.ejs",{userData});
}

module.exports.deleteListing= async(req,res)=>{
    const id = req.params.id;
    await listing.findByIdAndDelete(id);
    req.flash("deleted","Delete Successfully");
    res.redirect("/listing");

}

module.exports.updateListing=async(req,res)=>{
    const id = req.params.id;
    const userData = req.body;
    if(!userData){
        throw new expressHandler(400,"Please Retry");
    }
    let listings=  await listing.findByIdAndUpdate(id,{...userData});
    if(typeof(req.file) !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listings.image={url,filename};
    await  listings.save();
}
    req.flash("success","Listing Update Successfully")
    res.redirect("/listing");
}