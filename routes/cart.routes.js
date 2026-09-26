const isSignedIn = require("../middleware/is-signed-in");
const Cart = require("../models/Cart.js");
const Product = require("../models/product.js");
const router = require("express").Router();

// Show the cart
router.get("/", isSignedIn, async (req, res) => {
  let cart = await Cart.findOne({ owner: req.session.user._id }).populate("items.product");

  if (!cart) {
    cart = { items: [] };
  }

  res.render("cart.ejs", { cart });
});

// Add a product to the cart
router.post("/add/:productId", isSignedIn, async (req, res) => {
  let cart = await Cart.findOne({ owner: req.session.user._id });

  if (!cart) {
    cart = await Cart.create({ owner: req.session.user._id, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === req.params.productId
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ product: req.params.productId, quantity: 1 });
  }

  await cart.save();
  res.redirect("/cart");
});

// Update quantity of one item
router.put("/:itemId", isSignedIn, async (req, res) => {
  const cart = await Cart.findOne({ owner: req.session.user._id });
  const item = cart.items.id(req.params.itemId);

  if (item) {
    item.quantity = Math.max(1, parseInt(req.body.quantity));
  }

  await cart.save();
  res.redirect("/cart");
});

// Remove one item
router.delete("/:itemId", isSignedIn, async (req, res) => {
  const cart = await Cart.findOne({ owner: req.session.user._id });
  cart.items.pull(req.params.itemId);
  await cart.save();
  res.redirect("/cart");
});

module.exports = router;