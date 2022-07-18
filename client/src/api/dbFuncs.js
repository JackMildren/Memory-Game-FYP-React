//CREATE a new user

export async function createUser(user) {
  try {
    const body = { user };
    const response = await fetch("http://localhost:4000/users", {
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
    const response = await fetch("http://localhost:4000/users", {
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
