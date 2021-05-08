const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const database = require('./database');

//Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log("Database connected")
    },
    error => {
        console.log("Database could't be connected to: " + error)
    })

const postAPI = require('../backend/routes/post.route')
const app = express()
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))
app.use(cors());

//API
app.use('/api', postAPI)

//create port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Connected to port ' + port)
})

//error hanler
app.use(function(err, req, res) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});