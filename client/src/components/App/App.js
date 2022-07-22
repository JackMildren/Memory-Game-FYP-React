import "./../../App.css";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useSelector } from "react-redux";

// Main app component, only functionality that exists at this level
// is to apply accessibility preferences to the entire app

export default function App() {
  const newStyles = useSelector((state) => state.textSettings.value);

  return (
    <div className="app" style={{ ...newStyles }}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
