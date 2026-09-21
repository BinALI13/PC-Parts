const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

productName:{
    type:String
} , 
ProductPrice : {
    type : Number
}
, 
ProductRiview : {

    type:String
}



})

const Product = mongoose.model("Product", productSchema);

module.exports = Product; 