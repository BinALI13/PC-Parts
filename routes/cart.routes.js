const router = require("express").Router();
const Cart = require("../models/Cart.js");
const isSignedIn = require("../middleware/is-signed-in");
const generateCartPDF = require("../public/utils/pdf.js");

router.get("/", isSignedIn, async (req, res) => {
let cart = await Cart.findOne({
owner: req.session.user._id
}).populate("items.product");

if (!cart) {
cart = { items: [] };
}

res.render("cart.ejs", { cart });
});

router.post("/add/:productId", isSignedIn, async (req, res) => {
let cart = await Cart.findOne({
owner: req.session.user._id
});

if (!cart) {
cart = await Cart.create({
owner: req.session.user._id,
items: []
});
}

const existingItem = cart.items.find(
(item) => item.product.toString() === req.params.productId
);

if (existingItem) {
existingItem.quantity += 1;
} else {
cart.items.push({
product: req.params.productId,
quantity: 1
});
}

await cart.save();

res.redirect("/cart");
});

router.delete("/:itemId", isSignedIn, async (req, res) => {
const cart = await Cart.findOne({
owner: req.session.user._id
});

if (cart) {
cart.items.pull(req.params.itemId);
await cart.save();
}

res.redirect("/cart");
});

router.post("/checkout", isSignedIn, async (req, res) => {
try {
const cart = await Cart.findOne({
owner: req.session.user._id
}).populate("items.product");

if (!cart || cart.items.length === 0) {
return res.redirect("/cart");
}

const validItems = cart.items.filter(function(item) {
return item.product;
});

if (validItems.length === 0) {
return res.redirect("/cart");
}

const doc = generateCartPDF(cart, req.session.user);

res.setHeader("Content-Type", "application/pdf");
res.setHeader(
"Content-Disposition",
'attachment; filename="PC-Market-Receipt.pdf"'
);

doc.pipe(res);
doc.end();

} catch (error) {
console.log(error);
res.status(500).send("Something went wrong generating the PDF");
}
});

module.exports = router;