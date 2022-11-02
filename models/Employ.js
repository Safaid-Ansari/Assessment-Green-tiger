const mongoose = require("mongoose");

const EmploySchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  Age: {
    type: Number,
    require: true,
  },
  Dept: {
    type: String,
    require: true,
  },
  DOJ: {
    type: String,
    require: true,
  },
});

const Employ = new mongoose.model("Employ", EmploySchema);

module.exports = Employ;
