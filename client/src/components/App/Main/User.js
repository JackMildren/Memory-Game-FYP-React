import { useDispatch } from "react-redux";
import { resetAll } from "../Footer/Widget/textSettingsUpdater";

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
