import { Login } from "../Header/Login";

export default function User() {
  function resetData() {
    localStorage.clear();
    Login.handleSignOut();
  }

  return (
    <div className="User">
      <button onClick={() => resetData()}>RESET ALL USER DATA</button>
    </div>
  );
}
