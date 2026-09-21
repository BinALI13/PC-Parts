const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({

productID:{
type : mongoose.Schema.Types.ObjectId , 
ref:'Product' 
} , 

Quntity:{
type:Number

}

})
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;