module.exports = (app) => {
  const contacts = require("../controllers/contact.controller");
  const validation = require("../validators/contacts.validator");
  const router = require("express").Router();

  router.post("/create", validation.validate("create"), contacts.create);

  router.post("/read", contacts.read);

  router.post("/get_datshowa_by_id", validation.validate("id_validation"), contacts.getContact);

  router.post("/update", validation.validate("update"), contacts.update);

  router.post("/delete", validation.validate("delete"), contacts.delete);

  app.use("/api/contacts", router);
};

/*
get | index - list
post | create / store - save single item
get | show/:id - show single item
put/patch | update - update
delete | delete/destroy - delete
 */