//CREATE a user

app.post("/users", async(req, res) => {
    try {
        console.log(req.body);
        const { user_jwt } = req.body;
        const newUser = await pool.query("INSERT INTO users (user_jwt) VALUES($1) RETURNING *", [user_jwt]);
        res.json(newUser);
    } catch (error) {
        console.error(error.message);
    }
});

//GET all users

app.get("/users", async(req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users")
        res.json(allUsers.rows)
    } catch (error) {
        console.error(error.message);
    }
})

//GET a user

app.get("/users/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);

        res.json(user.rows)
    } catch (error) {
        console.error(error.message);
    }
})

//UPDATE a user

app.put("/users/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { user_jwt } = req.body;

        const updateJWT = await pool.query("UPDATE users SET user_jwt = $1 WHERE user_id = $2", [user_jwt, id]);
        res.json("User was updated");
    } catch (error) {
        console.error(error.message);
    }
})

//DELETE a user

app.delete("/users/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [id])
        res.json("User was deleted")
    } catch (error) {
        console.error(error.message);
    }
})