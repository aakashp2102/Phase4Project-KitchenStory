const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require("config");


// Configuring the database
const dbUrl = config.get('url');
const mongoose = require('mongoose');

//setting up parsers
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// for handling CORS errors
app.use(cors())

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log("Successfully connected to the database !");
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Express backend server is listening at this port...."
    });
})


//  routes imported
require('./routes/foodItem')(app);
require('./routes/auth')(app);
require('./routes/admin')(app);


app.listen(3001, (err) => {
    if (err) console.log("Server not able to start !")
    console.log("Backend server running on port 3001 !");
})