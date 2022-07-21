import { handleSignOut } from "../Header/Login";

export default function User() {
  function resetData() {
    localStorage.clear();
    handleSignOut();
  }

  return (
    <div className="User">
      <button onClick={() => resetData()}>RESET ALL USER DATA</button>
    </div>
  );
}
