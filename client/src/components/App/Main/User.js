import React, { useEffect } from "react";
import { getFromFile, writeToFile } from "./../contactDB";
import { useDispatch } from "react-redux";

export default function User() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFromFile());
    dispatch(writeToFile({ foo: true }));
  });

  return (
    <div className="User">
      <h1>User</h1>
      <p>some text</p>
    </div>
  );
}
