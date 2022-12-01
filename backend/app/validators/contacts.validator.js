const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create": {
      return [
        body("first_name", "First Name is required.").exists(),
        body("last_name", "Last Name is required.").exists(),
        body("phone_number", "Phone Number is required.").exists(),
      ];
    }
    case "update": {
      return [
        body("id", "id is required.").exists(),
        body("first_name", "First Name is required.").exists(),
        body("last_name", "Last Name is required.").exists(),
        body("phone_number", "Phone Number is required.").exists(),
      ];
    }
    case "delete": {
      return [body("id", "id is required.").exists()];
    }
    case "id_validation": {
      return [body("id", "id is required.").exists()];
    }
  }
};
