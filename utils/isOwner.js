const Listing = require("../Models/listing");  // Ensure consistent naming

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params
    try {
        // Fetch the listing from the database
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing not found");
            res.redirect("/listing");
        }

    // Check ownership
        if (!listing.owner.equals(res.locals.currUser._id)) {
            req.flash("error", "You don't have permission to edit this listing");
            return res.redirect(`/listing/${id}`);
        }

            // Proceed to next middleware
            next();
        } catch (error) {
            req.flash("error", "Please Login first");
            res.redirect("/listing");
            next(error)
        }
    };
