const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

productName:{
    type:String
} , 
productPrice : {
    type : Number
}
, 
productRiview : {

    type:String
}



})

const Product = mongoose.model("Product", productSchema);

module.exports = Product; 