const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const isSignedIn = require("../middleware/is-signed-in");

router.get("/", isSignedIn, async (req, res) => {
  try {
    const products = await Product.find({});

    res.render("products/store.ejs", {
      products: products
    });

  } catch (error) {
    console.log(error);
    res.send("Error loading store");
  }
});

module.exports = router;