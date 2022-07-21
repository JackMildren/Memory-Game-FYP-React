import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { createUser, getUser } from "../../../api/dbFuncs";

export default function Login() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    let userObject = jwt_decode(response.credential);
    setUser(userObject);

    const setUserToDB = async (user) => {
      console.log(user.length);
      console.log(await createUser(user));
    };
    setUserToDB(response.credential);

    document.getElementById("signInDiv").hidden = true;
  }

  async function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
    console.log(await getUser(user));
  }

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
  }, []);

  return (
    <div className="Login">
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Logout</button>
      )}

      {user && (
        <div>
          <img src={user.picture} alt={user.name}></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}
