
require('dotenv').config()


const mongoose = require("mongoose");
const router = require('./app/routes/index');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const logger = require('morgan');

const environment = process.env.NODE_ENV;
const stage = require('./app/config/config')[environment];

// const rootRoutes = require('./root');
// const accountRoutes = require('./account.js');
// const router = express.Router();
//const routes = require('./api/routes');

const app = express();

if (environment !== 'production') {
  app.use(logger('dev'));
}


app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


router(app);


mongoose.connect("mongodb://localhost:27017/onlineshop", { useNewUrlParser: true }, function (err) {
  if (err) return console.log(err);

  app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
  });

});