const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//CREATE a user

//GET user score

//UPDATE user score

//UPDATE user difficulty

//UPDATE accessibility settings

app.listen(4000, () => {
  console.log("server has started on port 4000");
});
