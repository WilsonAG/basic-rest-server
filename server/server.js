const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./config/env');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require('./routes/user'));

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err, res) => {
    if (err) throw err;
    console.log('The database is connected');

    app.listen(process.env.PORT, () => {
      console.log(
        `The server is running at http://localhost:${process.env.PORT}`
      );
    });
  }
);
