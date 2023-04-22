// here we willdefine the methods for end points
const User = require("../model/user.js");
exports.getAllUser = (req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(404).json({ message: "user not found", error: err.message });
    });
};

exports.postUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.json({ message: "User Added Successfully ", user }))
    .catch((err) =>
      res.status(400).json({ message: "Failed to add user", err: err.message })
    );
};

exports.getMaleUser = (req, res) => {
  User.find({ gender: "m" })
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(404).json({ message: "user not found", error: err.message });
    });
};

exports.getFemaleUser = (req, res) => {
  User.find({ gender: "f" })
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(404).json({ message: "user not found", error: err.message });
    });
};

exports.getAdultUsers = (req, res) => {
  User.find({ age: { $gte: 18 } })
    .then((user) => res.json(user))
    .catch((err) => {
      res.status(404).json({ message: "user not found", error: err.message });
    });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id, req.body)
    .then((data) => res.json({ message: "user deleted successfully".data }))
    .catch((err) =>
      res.status(404).json({ message: "user not found", error: err.message })
    );
};
