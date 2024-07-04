const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()
let userRoutes  =  require('./Router/userRoutes')
require('./db')

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to Voting Application");
});

    
app.use("/user", userRoutes);

// Server PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});