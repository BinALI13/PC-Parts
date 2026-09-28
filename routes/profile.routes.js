const router = require("express").Router();

const User = require("../models/User.js");
const Address = require("../models/Address.js");
const isSignedIn = require("../middleware/is-signed-in");

router.get("/", isSignedIn, async (req, res) => {

    const user = await User.findById(req.session.user._id);

    const address = await Address.findOne({
        owner: req.session.user._id
    });

    res.render("profile.ejs", {
        user: user,
        address: address
    });
});


router.post("/address", isSignedIn, async (req, res) => {

    const oldAddress = await Address.findOne({
        owner: req.session.user._id
    });

    if (oldAddress) {

        oldAddress.country = req.body.country;
        oldAddress.city = req.body.city;
        oldAddress.block = req.body.block;
        oldAddress.road = req.body.road;
        oldAddress.building = req.body.building;

        await oldAddress.save();

    } else {

        await Address.create({
            owner: req.session.user._id,
            country: req.body.country,
            city: req.body.city,
            block: req.body.block,
            road: req.body.road,
            building: req.body.building
        });

    }

    res.redirect("/profile");
});

router.delete("/address", isSignedIn, async (req, res) => {

    await Address.findOneAndDelete({
        owner: req.session.user._id
    });

    res.redirect("/profile");
});
module.exports = router;