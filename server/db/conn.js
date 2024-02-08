const mongoose = require("mongoose");
require("dotenv").config();

const mongoDbConnection = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDb Connected...");
    })
    .catch((err) => console.log(err));
};

module.exports = {mongoDbConnection};
