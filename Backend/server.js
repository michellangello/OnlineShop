
require('dotenv').config()

const environment = process.env.NODE_ENV;

const cors = require('cors');
const stage = require('./app/config/config')[environment];
const logger = require('morgan');
const router = require('./app/routes/index');
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();

if (environment !== 'production') {
  app.use(logger('dev'));
  require('./app/seed');
}


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

router(app);

mongoose.connect("mongodb://localhost:27017/onlineshop", { useNewUrlParser: true }, function (err) {
  if (err) return console.log(err);
    app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
  });
});