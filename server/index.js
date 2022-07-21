const express = require("express");
const app = express();
const cors = require("cors");
const mountRoutes = require("./router");
require("dotenv").config();

console.log("STARTING SERVER_SIDE");
console.log(process.env.DB_PASS);

// middleware
app.use(cors());
app.use(express.json());

mountRoutes(app);

app.listen(25060, () => {
  console.log("server has started on port 25060");
});
