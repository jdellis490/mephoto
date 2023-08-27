const mongoose = require("mongoose");
const dbURI = process.env.MONGODB_URI;

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
