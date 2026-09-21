const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({

userAddress:{

type:String   

}




})
const Address = mongoose.model("Address", addressSchema);

module.exports = Address;