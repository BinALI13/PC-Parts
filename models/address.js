const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    country: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    block: {
        type: String,
        required: true
    },

    road: {
        type: String,
        required: true
    },

    building: {
        type: String,
        required: true
    }
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;