const mongoose = require("mongoose");

exports.BarangModel = mongoose.model('Barang', new mongoose.Schema({
    nama: { type: String }
}))