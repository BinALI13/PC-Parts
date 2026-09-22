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
productRiview: req.body.productRiview



})
console.log(createdProduct)
res.redirect('/')
})

router.get('/create',isSignedIn, (req,res)=>{
    res.render('product.ejs')
})



router.get('/All-Product',isSignedIn , async(req,res)=>{

const AllProduct = await Product.find()
res.render('all-products.ejs' , {Product: AllProduct})

})









module.exports = Product;
module.exports = router;
