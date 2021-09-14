const express = require("express");
const router = express.Router();

//@route    GET api/contacts
//@desc     Get all contcacts
//@access   Private
router.get("/", (req, res) => {
  res.send("Get all Contacts");
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
