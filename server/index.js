const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//CREATE a user

app.post("/users", async (req, res) => {
  try {
    console.log(req.body);
    const { user_jwt } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (user_jwt) VALUES($1) RETURNING *",
      [user_jwt]
    );
    res.json("New user created!");
  } catch (error) {
    console.error(error.message);
  }
});

//GET user score

//UPDATE user score

//UPDATE user difficulty

//UPDATE accessibility settings

app.listen(4000, () => {
  console.log("server has started on port 4000");
});
