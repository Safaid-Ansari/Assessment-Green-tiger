const Emp = require("../models/Employ");

module.exports.addEmploy = (req, res) => {
  console.log(req.body);

  const newEmp = new Emp(req.body);

  newEmp.save();
};
