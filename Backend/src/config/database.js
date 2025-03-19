const mongoose = require("mongoose");

connectDB=async() => {
    await mongoose.connect(process.env.MONGODBKEY)};

module.exports = connectDB;
