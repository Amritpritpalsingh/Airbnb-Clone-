const mongoose = require("mongoose");
const express = require("express");
const dataBase = require("./data.js");
const listing = require("../Models/listing.js")

// Connection With MongoDB
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
}

main()
.then(()=>{
    console.log("Connected Succesfully To Database!!!");
    
})
.catch((err)=>{
    console.log(err);
});
 async function addData(){
    await listing.deleteMany({});
    dataBase.data=dataBase.data.map((obj)=>({...obj ,owner : '67d9abc4a0151c3e2d7fdeff'}))
    await listing.insertMany(dataBase.data);
}
addData();