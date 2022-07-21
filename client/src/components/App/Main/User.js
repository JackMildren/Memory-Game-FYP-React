export default function User() {
  function resetData() {
    localStorage.clear();
  }

  return (
    <div className="User">
      <button onClick={() => resetData()}>CLEAR ALL USER DATA</button>
    </div>
  );
}
