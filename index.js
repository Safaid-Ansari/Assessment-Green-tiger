const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./config/connection");
const Emp = require("./models/Employ");
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// we will handle get request  and show data in the home page
app.get("/", (req, res) => {
  Emp.find({}, (err, emp) => {
    if (err) {
      console.log("Error in fetching contact from Database ");
      return;
    }
    res.json({
      Emp: emp,
    });
  });
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const DataById = await Emp.findById(id);
  if (!DataById) {
    res.status(404).json({
      data: {
        message: "Product not found ",
      },
    });
  }
  res.send(DataById);
});

app.patch("/update/:id", async (req, res) => {
  const id = req.params.id;

  const updateEmp = await Emp.findById(id);
  // console.log(typeof req.query.number);
  updateEmp.Name = req.body.Name;
  updateEmp.Age = req.body.Age;
  updateEmp.Dept = req.body.Dept;
  updateEmp.DOJ = req.body.DOJ;

  updateEmp.save();

  if (!updateEmp) {
    res.status(404).json({
      data: {
        message: "Product not found ",
      },
    });
  }
  res.status(200).json({
    data: {
      updateEmp: updateEmp,
    },
    message: "Updated Successfully ",
  });
});

//  we will handle post request
app.post("/add", (req, res) => {
  console.log(req.body);

  Emp.create(
    {
      Name: req.body.Name,
      Age: req.body.Age,
      Dept: req.body.Dept,
      DOJ: req.body.DOJ,
    },
    function (err, newTodo) {
      if (err) {
        console.log("error is creating a todo ", err);
        return;
      }
      console.log(newTodo);
      newTodo.save();
      res.status(200).json({
        message: "Add Successfully",
        Emp: newTodo,
      });
    }
  );
});

//  we will handle delete request for delete the data in the database
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const deleteEmp = await Emp.findByIdAndDelete(id);

  if (!deleteEmp) {
    res.status(404).json({
      data: {
        message: "Emp not found ",
      },
    });
  }
  res.json({
    data: {
      message: "EMp Deleted",
    },
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error Connect to the Server ", err);
  }
  console.log("Our Server is Running t port number ", PORT);
});
