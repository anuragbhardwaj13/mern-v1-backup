const express = require("express");

const router = express.Router();
const {
  getAllUser,
  postUser,
  getMaleUser,
  getFemaleUser,
  getAdultUsers,
  deleteUser,
} = require("../controller/user.js");
/** 
 @route GET api/user
 @description get list of all users
*/
router.get("/", getAllUser);

/** 
 @route GET api/user/maleUser
 @description get list of all male users
*/
router.get("/maleUser", getMaleUser);

/** 
 @route GET api/user/femaleUser
 @description get list of all female users
*/
router.get("/femaleUser", getFemaleUser);

/** 
 @route GET api/user/adult
 @description get list of all users above 18
*/
router.get("/adult", getAdultUsers);

/** 
 @route GET api/user/
 @description post user to database
*/
router.post("/", postUser);

/** 
 @route DELETE api/user/
 @description Delete user from database
*/
router.delete("/:id", deleteUser);

module.exports = router;
