const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const Port = process.env.PORT;

app.use(cors());

app.get("/", (req, res) => {
  res.send("server is running on" + " " + Port);
});

app.listen(Port, () => console.log(`Server running on ${Port}`));
