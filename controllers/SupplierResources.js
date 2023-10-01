const express = require("express");
const app = express();

app.get("/",(req, res) => res.send(`ini adalah SupplierListController`))

module.exports = app
