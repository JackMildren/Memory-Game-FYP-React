import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
// import { createUser, getUser } from "../../../api/dbFuncs";

// Primary Login component, utilising Google's "Sign In With Google"

export default function Login() {
  // Initial States and Constants

  const INITIAL_USER = JSON.parse(localStorage.getItem("user")) || {};
  const [user, setUser] = useState(INITIAL_USER);

  // Hash function by bryc (github.com/bryc/code)
  // This is used to hash user's JWTs to be used as a user ID, may remove later
  function hashJWT(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 =
      Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
      Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 =
      Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
      Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }

  // When user successfully logs in through Google
  function handleCallbackResponse(response) {
    let userObject = jwt_decode(response.credential);
    setUser(userObject);

    // const setUserToDB = async (user) => {
    //   console.log(user.length);
    //   console.log(await createUser(user));
    // };
    // setUserToDB(response.credential);

    // Saving some user information to the database (in this case local
    // storage) to persist user account
    const currentUser = localStorage.getItem("user");
    const newUserHash = hashJWT(response.credential);

    // Currently only support one user logged in per device as it will
    // clear all data if a different user logs in
    if (currentUser === null || currentUser.id !== newUserHash.id) {
      localStorage.clear();
    }

    const newUser = {
      id: newUserHash,
      name: userObject.name,
      picture: userObject.picture,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
  }

  // On user loggin out
  async function handleSignOut(event) {
    setUser({});
    localStorage.clear();
    // console.log(await getUser(user));
  }

  // Set up Google authentication
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "967180034184-sbnk5okga1of3v3pdf6vmhfo9r3d4b4r.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  });

  return (
    <div className="Login">
      {Object.keys(user).length === 0 && <div id="signInDiv"></div>}

      {Object.keys(user).length !== 0 && (
        <div>
          <button onClick={(e) => handleSignOut(e)}>Logout</button>
          <img src={user.picture} alt={user.name}></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}
