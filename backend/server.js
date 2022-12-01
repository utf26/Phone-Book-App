const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 3000;

const app = express();

const corsOption = {
  origin: "*",
};

app.use(cors(corsOption));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
const databaseConnection = require("./app/models/index");

//Synchronize Database
databaseConnection.sequelize.sync();

//Get Routes
require("./app/routes/contacts.route")(app);

//Start Server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}.`);
});
