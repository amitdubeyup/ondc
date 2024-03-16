require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const apiRoutes = require('./routes');
const port = 3000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 100,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
};

mongoose.connect(process.env.DB_URL, options);

app.use('/api', apiRoutes);

// Use app.get for the default route handler
app.get('/*', function (req, res) {
  res.send({
    success: true,
    message: 'Welcome to the coolest API on earth!',
  });
});

app.listen(port);
console.log(`Hotel app is running on http://localhost:${port}`);
