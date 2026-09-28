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
,
owner:{

    type:mongoose.Schema.Types.ObjectId, 
    ref:'user'
}
, 
image:{
type:String
}

})

const Product = mongoose.model("Product", productSchema);

module.exports = Product; 