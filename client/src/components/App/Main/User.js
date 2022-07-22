import { useDispatch } from "react-redux";
import { resetAll } from "../Footer/Widget/textSettingsUpdater";

// User page, currently this page's only purpose is to clear all user data

export default function User() {
  const dispatch = useDispatch();

  function resetData() {
    dispatch(resetAll());
  }

  return (
    <div className="User">
      <button onClick={() => resetData()}>CLEAR ALL USER DATA</button>
    </div>
  );
}
