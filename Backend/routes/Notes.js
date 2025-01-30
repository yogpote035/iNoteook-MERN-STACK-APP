const express = require("express");
const fetchUser = require("../middlewares/fetchUser");
const router = express.Router();
const Note = require("../models/Notes");
const { AllNote, AddNote, UpdateNote, DeleteNote } = require("../controllers/NoteController");
const { body } = require("express-validator");

router.get("/notes", fetchUser, AllNote);


router.post("/notes", [body("title").notEmpty().withMessage("Must Provide Valid title"), body("description").notEmpty().withMessage("description cannot be Empty")], fetchUser, AddNote);



router.put("/update/:id", [body("title").notEmpty().withMessage("Must Provide Valid title"), body("description").notEmpty().withMessage("description cannot be Empty")], fetchUser, UpdateNote);


router.delete("/delete/:id", fetchUser, DeleteNote);




module.exports = router;