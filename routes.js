const express = require("express");
const app = express();
const { ROUTES } = require("./config/Settings");

app.use(express.json());

for (let router of ROUTES) {
    app.use(`/${router.path}`, require(`./controllers/${router.resource}`));
}

module.exports = app