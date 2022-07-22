import "./../../App.css";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useSelector } from "react-redux";

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
