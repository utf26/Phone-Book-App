const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create": {
      return [
        body("firstName", "First Name is required.").exists(),
        body("lastName", "Last Name is required.").exists(),
        body("phoneNumber", "Phone Number is required.").exists(),
      ];
    }
    case "update": {
      return [
        body("firstName", "First Name is required.").exists(),
        body("lastName", "Last Name is required.").exists(),
        body("phoneNumber", "Phone Number is required.").exists(),
      ];
    }
  }
};
