const express = require("express");
const { UserModel } = require("../models/UserModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

//endpoint sign up user
app.post("/signup", async(req, res) => {
    //ambil data dari body
    //cek data user sudah tersedia di DB
    const oldUser = await UserModel.findOne({email: req.body.email});

    if (oldUser) {
        return res.status(400).json({
            detail:"Email sudah terdaftar, silahkan lakukan signin."
        });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    await UserModel.create(req.body)
    return res.status(201).json({detail: "Pendaftaran Berhasil"});
})

//endpoint sign in user
app.post("/signin", async(req,res) =>{
    const user = await UserModel.findOne({email: req.body.email});

    if (!user) {
        return res.status(400).json({detail:"User belum terdaftar"})
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)

    if (!isValidPassword) {
        return res.status(400).json({detail:"Password tidak valid"});
    }

    //Create JWT Token
    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "1h"}
    );

    return res.status(200).json(token)
})

module.exports = app