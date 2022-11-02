const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/crud-for-tiger", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connect to the database ");
  })
  .catch((err) => {
    console.log("Error to connect db ", err);
  });
