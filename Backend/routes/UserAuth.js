const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { signup, login, getUser } = require("../controllers/UserController");
const { body } = require("express-validator");
const fetchUser = require("../middlewares/fetchUser");

// signup 
router.post("/", [body("name").isLength({ min: 2 }).withMessage("name must be 2 or more letter").notEmpty().withMessage("name cannot be empty"),

body("email").notEmpty().withMessage("email not empty").isEmail().withMessage("Must Provide Valid Email"),

body("password").notEmpty().withMessage("Password cannot be Empty").isLength({ min: 4 }).withMessage("password min length is 4")],
    signup)




router.post("/login", [body("email").notEmpty().withMessage("email not empty").isEmail().withMessage("Must Provide Valid Email"), body("password").notEmpty().withMessage("Password cannot be Empty").isLength({ min: 4 }).withMessage("password min length is 4")], login)


router.post("/getUser", fetchUser, getUser);

module.exports = router;