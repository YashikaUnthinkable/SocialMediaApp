const mongoose = require("mongoose");

const mongoDbConnection = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDb Connected...");
    })
    .catch((err) => console.log("no Connection"));
};

module.exports = {mongoDbConnection};
