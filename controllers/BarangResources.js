const express = require("express");
const { BarangModel } = require("../models/BarangModels");
const { default: mongoose } = require("mongoose");
const isAuthenticated = require("../middlewares/isAuthenticated");
const app = express();

app.post("/", [isAuthenticated] , async(req, res)=>{
    await BarangModel.create(req.body)
    res.status(201).json({detail:"Barang sudah terinput"})
})

app.get("", async(req,res)=>{
    const products = await BarangModel.find();
    res.status(200).json(products)
})

app.get("/:id", async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({detail: "404 Resource not found"});
    }

    const products = await BarangModel.findById(req.params.id)
    if (!products) {
        return res.status(404). json({detail: "404 Resource not found"});
    }
    res.status(200).json(products);
})

app.put("/:id", async(req,res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({detail: "404 Resource not found"});
    }
    const result = await BarangModel.findOneAndUpdate(
        {_id: req.params.id},
        {...req.body},
        {new: true}
    );

    return res.status(200).json(result)
})

app.delete("/:id", async(req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({detail: "404 Resource not found"});
    }
    await BarangModel.findOneAndDelete({_id: req.params.id});

    return res.status(204).json(null);
})

module.exports = app
