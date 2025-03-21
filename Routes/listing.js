const express = require("express");
const Router = express.Router();
const listing = require("../Models/listing.js");
const {isOwner}= require("../utils/isOwner")
const listingsController =require("../controller/listing.js")
const multer = require("multer");
const {storage} = require("../cloudCongi")
const upload = multer({storage})
// Miscellaneous Functions 

const aserHandler = require("../utils/aserHandler.js");
const expressHandler = require("../utils/expressErr.js");
const {schemaValidator} = require("../utils/svrsmaValid.js");
const {userAuth} = require("../utils/userAuthenticate.js")

const vldMidware = (req,res,next)=>{
    const {error}= schemaValidator.validate(req.body);
    if(error){
        throw new expressHandler(400,error)
    }
    else{
        next();
    }
}
//

Router.route("/")
.get(aserHandler(listingsController.index))
.post(upload.single("image"),vldMidware,aserHandler(listingsController.createListing));

// New And Create Route
Router.get("/new",userAuth,aserHandler(listingsController.newFormrendring));


//
Router.route("/:id")
.get(aserHandler(listingsController.showListing))
.put(upload.single("image"),vldMidware,userAuth,isOwner,aserHandler(listingsController.updateListing))
.delete(userAuth,aserHandler(listingsController.deleteListing));




// Edit And Update Route
Router.get("/:id/edit",aserHandler(listingsController.renderEditform));


module.exports = Router;
