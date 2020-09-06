const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const expressLayouts = require('express-ejs-layouts');
const path = require('path');


// Load config
dotenv.config({
    path: "./config/config.env",
});

const app = express();

//app.use(helmet());
app.use(morgan("tiny"));
//app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))

app.use("", require("./routes/index"));

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on ${port}`));
