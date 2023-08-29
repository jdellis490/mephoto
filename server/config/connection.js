const mongoose = require("mongoose");
// const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/neupixl-db';

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
