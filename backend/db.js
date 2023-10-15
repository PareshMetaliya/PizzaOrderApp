// file for connect to database mongodb

const mongoose = require("mongoose");


const mongooseURI = process.env.MONGO_URI;


const connectTomongoos = () => {
  mongoose.connect(mongooseURI);

  
};

module.exports = connectTomongoos;
