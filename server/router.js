const Router = require("express-promise-router");
const pool = require("./db");

const router = new Router();
module.exports = router;

//ROUTES//

//CREATE a user

router.get("/users", async (req, res) => {
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

router.get("/users/:id", async (req, res) => {
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

router.get("/users", async (req, res) => {
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
