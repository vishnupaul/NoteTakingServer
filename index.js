const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// connect to DB

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('we are connected');
  })
  .catch((err) => {
    console.log(err);
  });
// Routes
app.use('/', require('./routes'));

// Listen Server
app.listen(PORT, () => {
  console.log('Server is running on PORT', PORT);
});
