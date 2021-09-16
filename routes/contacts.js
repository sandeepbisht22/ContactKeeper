const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");
const Contact = require("../models/Contact");
//@route    GET api/contacts
//@desc     Get all contcacts
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    console.log("data is " + contacts);
    res.json(contacts);
  } catch (error) {
    console.error("Error while fetching contacts" + error);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/contacts
//@desc     Add contact
//@access   Private
router.post("/", (req, res) => {
  res.send("Add contact");
});

//@route    PUT api/contacts/:id
//@desc     Update contact
//@access   Private
router.put("/:id", (req, res) => {
  res.send("Update contact");
});

//@route    DELETe api/contacts/:id
//@desc     Delete contact
//@access   Private
router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
