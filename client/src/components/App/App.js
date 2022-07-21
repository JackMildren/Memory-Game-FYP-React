import React, { useEffect } from "react";
import "./../../App.css";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { loadSavedSettings } from "./Footer/Widget/textSettingsUpdater";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.getItem("accessSettings") && dispatch(loadSavedSettings());
  }, []);

  const newStyles = useSelector((state) => state.textSettings.value);

  return (
    <div className="app" style={{ ...newStyles }}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
