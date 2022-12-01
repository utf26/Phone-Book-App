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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
  };

  Contact.create(insertData).then((data) => {
    res.status(200).json({ success: true, data });
  });
};

// This function is used to find a contact
exports.index = (req, res) => {
  const search = req.query.search;
  const where = search ? { lastName: { [Op.iLike]: `%${search}%` } } : null;

  Contact.findAll({ where }).then((data) => {
    res.status(200).json({ success: true, data });
  });
};

// This function is used to get a contact by id
exports.show = (req, res) => {
  Contact.findAll({ where: { id: req.params.id } }).then((data) => {
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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
  };

  Contact.update(updateData, {
    where: { id: req.params.id },
  }).then((response) => {
    if (response[0] === 1) {
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
    where: { id: req.params.id },
  }).then((response) => {
    if (response === 1) {
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
