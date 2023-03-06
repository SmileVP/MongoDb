var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const { dbUrl } = require("../config/dbConfig");
const { UserModel } = require("../schema/usersSchema");

//to connect to db
mongoose.connect(dbUrl);

router.get("/all", async (req, res) => {
  try {
    let users = await UserModel.find();
    res.status(200).send({
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    let users = await UserModel.findOne(
      { _id: req.params.id },
      { password: 0 }
    );
    res.status(200).send({
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

router.post("/add-user", async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      let doc = new UserModel(req.body);
      await doc.save();
      res.status(201).send({
        message: "User added successfully",
      });
    } else {
      res.status(400).send({
        message: "Email already exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
});

router.put("/edit-user/:id", async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.params.id });
    if (user) {
      // user.firstName = req.body.firstName
      // user.lastName = req.body.lastName
      // user.email = req.body.email
      // user.password = req.body.password
      // await user.save()

      let doc = await UserModel.updateOne(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true }
      )

      res.status(201).send({
        message: "User edited successfully",
      });
    } else {
      res.status(400).send({
        message: "Invalid Id",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error
    });
  }
});

router.delete("/delete-user/:id", async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.params.id });
    if (user) {
      // user.firstName = req.body.firstName
      // user.lastName = req.body.lastName
      // user.email = req.body.email
      // user.password = req.body.password
      // await user.save()

      let doc = await UserModel.deleteOne(
        { _id: req.params.id }
      )

      res.status(201).send({
        message: "User deleted successfully",
      });
    } else {
      res.status(400).send({
        message: "Invalid Id",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
      error
    });
  }
});


module.exports = router;
