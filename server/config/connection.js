const mongoose = require("mongoose");
const dbURI = (process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/neupixl-db');

mongoose.connect(
  dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;

// 'mongodb+srv://jdellis490:Douglas7%21@cluster0.kib6k74.mongodb.net/neupixl-db'