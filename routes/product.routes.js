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
    res.render('products/product.ejs')
})



router.get('/All-Product',isSignedIn , async(req,res)=>{

const AllProduct = await Product.find()
res.render('products/all-products.ejs' , {Product: AllProduct})

})


router.get('/:id/edit' , isSignedIn , async(req,res)=>{
    
const updateProducts = await Product.findById(req.params.id)

    res.render('products/EditProducts.ejs' , {Product : updateProducts} )
})


router.put('/:id',async(req,res)=>{
    const updatedItem = await Product.findByIdAndUpdate(req.params.id,{
        productName: req.body.productName ,
productPrice: req.body.productPrice , 
productRiview: req.body.productRiview

    },{new:true})

    res.redirect('/All-Product')
})





module.exports = Product;
module.exports = router;
