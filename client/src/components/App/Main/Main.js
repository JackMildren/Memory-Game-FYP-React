import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import NumberGame from "./Games/NumberGame";
import ShapeGame from "./Games/ShapeGame";
import User from "./User";

const Main = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/numberGame" element={<NumberGame />}></Route>
      <Route exact path="/shapeGame" element={<ShapeGame />}></Route>
      <Route exact path="/user" element={<User />}></Route>
    </Routes>
  );
};

export default Main;
