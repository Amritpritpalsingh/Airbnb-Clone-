const cloudinary = require("cloudinary").v2
const {CloudinaryStorage} = require("multer-storage-cloudinary");


cloudinary.config({ 
    cloud_name: 'dw7njmzdl', 
    api_key: '477219989479226', 
    api_secret: 'CCRBPZX_49qQEoWpFBKJO-2X5jg' // Click 'View API Keys' above to copy your API secret
});
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"wanderlustDev",
        alloweedForamts:["png","jpg","jpeg"]
    },
});
module.exports ={cloudinary,storage}
    
    