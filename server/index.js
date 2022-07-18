const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

console.log("STARTING SERVER_SIDE");

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

//GET a user

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);

    res.json(user.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//GET all users

app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
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
