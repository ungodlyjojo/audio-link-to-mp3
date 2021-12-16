// NODEJS required packages (EJS is template engine so we can use JS in HTML file)
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

// express server creation
const app = express();

// server port # (string represents designated vs local port)
const PORT = process.env.PORT || 3000;

// set template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// server loading..
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})