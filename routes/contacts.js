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
router.post(
  "/",
  [auth, [body("name", "Please add name").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, phone, type } = req.body;
      const newContact = Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();

      res.json({ contact });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    PUT api/contacts/:id
//@desc     Update contact
//@access   Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  //build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  try {
    console.log("req param" + req.params.id);
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.error("error occured" + error.message);
    res.status(500).send("Server Error");
  }
});

//@route    DELETe api/contacts/:id
//@desc     Delete contact
//@access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    console.log("req param" + req.params.id);
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact removed" });
  } catch (error) {
    console.error("error occured" + error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
