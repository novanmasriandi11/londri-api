require("dotenv").config();
const mongoose = require("mongoose");

module.exports = mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log("Success, connect to database"))
    .catch((err) => console.error("Failed Connection", err));