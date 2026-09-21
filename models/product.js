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
module.exports = product ; 