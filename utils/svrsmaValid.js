const joi = require("joi");
const schemaValidator = joi.object({
        title :joi.string().required(),
        description:joi.string().required(),
        image:joi.string().allow("",null),
        price:joi.number().min(0),
        location:joi.string().required(),
        country:joi.string().required(),
        
});
module.exports = {schemaValidator};
module.exports.reviewValidator = joi.object({
        rating:joi.number().required(),
        comment:joi.string().required(),
});
