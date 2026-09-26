const isSignedIn = require("../middleware/is-signed-in");
   const Product = require('../models/product.js');
   
const router = require("express").Router()


router.get('/',(req,res)=>{
    res.render('homepage.ejs')
})


router.post('/create' ,isSignedIn, async(req,res)=>{
const createdProduct = await Product.create({

productName: req.body.productName ,
productPrice: req.body.productPrice , 
productRiview: req.body.productRiview ,
owner: req.session.user._id
})
console.log(createdProduct)
res.redirect('/')
})

router.get('/create',isSignedIn, (req,res)=>{
    res.render('products/product.ejs')
})

router.get('/All-Product', isSignedIn, async (req, res) => {
    const AllProduct = await Product.find({ owner: req.session.user._id });
    res.render('products/all-products.ejs', { Product: AllProduct, user: req.session.user })
})


router.get("/:id/edit", isSignedIn, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product.owner || !product.owner.equals(req.session.user._id)) {
    return res.redirect("/products");
  }

  res.render("products/EditProducts.ejs", { Product : product});
});



router.put('/:id', isSignedIn, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product.owner || !product.owner.equals(req.session.user._id)) {
        return res.redirect('/Product/All-Product');
    }

    await Product.findByIdAndUpdate(req.params.id, {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productRiview: req.body.productRiview
    });

    res.redirect('/Product/All-Product');
})

router.delete('/:id', isSignedIn, async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product.owner || !product.owner.equals(req.session.user._id)) {
        return res.redirect('/Product/All-Product');
    }

    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/Product/All-Product');
})

// Store page - show all products
router.get("products/store", isSignedIn, async (req, res) => {
  try {
    const products = await Product.find({});

    res.render("store.ejs", {products,});}
     catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});



module.exports = router;
