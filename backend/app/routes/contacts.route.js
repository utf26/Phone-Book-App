module.exports = (app) => {
  const contacts = require("../controllers/contact.controller");
  const validation = require("../validators/contacts.validator");
  const router = require("express").Router();

  router.post("/", validation.validate("create"), contacts.create);

  router.get("/", contacts.index);

  router.get("/:id", contacts.show);

  router.patch("/:id", validation.validate("update"), contacts.update);

  router.delete("/:id", contacts.delete);

  app.use("/api/contacts", router);
};