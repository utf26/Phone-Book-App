const db = require("../models");
const Contact = db.contacts;
const Op = db.Sequelize.Op;
const { validationResult } = require("express-validator");

// This function is used to create a new contact
exports.create = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const insertData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
  };

  Contact.create(insertData).then((data) => {
    res.status(200).json({ success: true, data });
  });
};

// This function is used to find a contact
exports.read = (req, res) => {
  const last_name = req.body.last_name;
  const condition = last_name
    ? { last_name: { [Op.iLike]: `${last_name}%` } }
    : null;

  Contact.findAll({ where: condition }).then((data) => {
    res.status(200).json({ success: true, data });
  });
};

// This function is used to get a contact by id
exports.getContact = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  Contact.findAll({ where: { id: req.body.id } }).then((data) => {
    res.status(200).json({ success: true, data });
  });
};

// This function is used to update a contact
exports.update = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const updateData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
  };
  Contact.update(updateData, {
    where: { id: req.body.id },
  }).then((response) => {
    if (response == 1) {
      res.status(200).json({
        success: true,
        data: { message: "Contact Succesfully Updated" },
      });
    } else {
      res
        .status(400)
        .json({ success: true, data: { message: "Unable to update contact" } });
    }
  });
};

// This function is used to detele a contact
exports.delete = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  Contact.destroy({
    where: { id: req.body.id },
  }).then((response) => {
    if (response == 1) {
      res.status(200).json({
        success: true,
        data: { message: "Contact Succesfully Deleted" },
      });
    } else {
      res
        .status(400)
        .json({ success: true, data: { message: "User ID was invalid" } });
    }
  });
};
