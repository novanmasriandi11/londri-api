const mongoose = require("mongoose");

exports.CustomerModel = mongoose.model('Customer', new mongoose.Schema({
    nama: { type: String, default: "" },
	hp: { type: String, default: "" },
	alamat: { type: String, default: "" }
}))