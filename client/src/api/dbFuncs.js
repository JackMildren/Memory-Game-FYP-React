const connectionString =
  "postgresql://doadmin:" +
  process.env.REACT_APP_DB_PASS +
  "@memory-game-db-do-user-12033416-0.b.db.ondigitalocean.com:25060/memoryGame?sslmode=require";

//CREATE a new user

export async function createUser(user) {
  try {
    const body = { user };
    const response = await fetch(connectionString + "/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error.message);
  }
}

//GET a user

export async function getUser(user) {
  try {
    const body = { user };
    const response = await fetch(connectionString + "/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error.message);
  }
}
