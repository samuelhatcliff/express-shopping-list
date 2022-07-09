const express = require("express");
const app = express();
const routes = require("./routes.js")
const ExpressError = require("./expressError.js")
app.use(express.json())
app.use('/items', routes)

module.exports = app;
