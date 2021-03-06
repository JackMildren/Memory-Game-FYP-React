import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAll,
  setLineHeight,
  setFontSize,
  setWordSpacing,
  setColorPalette,
} from "./textSettingsUpdater";

// Accessibility widget component

export default function AccessibilityWidget() {
  // Initial set up of states and constants

  const [widgetOpen, updateWidget] = useState(false);
  const dispatch = useDispatch();

  let INITIAL_STATE = {
    lineHeight: {
      current: 0,
      values: ["120%", "150%", "200%"],
    },
    textSize: {
      current: 0,
      values: ["100%", "150%", "200%"],
    },
    wordSpacing: {
      current: 0,
      values: ["100%", "150%", "200%"],
    },
    colorPalette: {
      current: 0,
      values: ["true", "alt"],
    },
  };

  const [settings, setSettings] = useState({ ...INITIAL_STATE });

  const colPal = useSelector((state) => state.textSettings.value.colorPalette);
  const shapebtnColorList = ["lightblue", "white"];
  const [shapeBtnColor, setShapeBtnColor] = useState(colPal === "true" ? 0 : 1);

  useEffect(() => {
    setShapeBtnColor(colPal === "true" ? 0 : 1);
  }, [colPal]);

  // OnClick event handlers

  // Opens and closes the widget
  function switchWidget() {
    updateWidget(!widgetOpen);
  }

  // Resets the text settings
  function resetAllTextSettings() {
    setSettings(INITIAL_STATE);
    setShapeBtnColor(0);
    dispatch(resetAll());
  }

  // All functions from here function practically identically,
  // creating a temporary variable,
  // cycling to the next value in the array,
  // updating the state,
  // then finally updating the redux store

  function increaseFontSize() {
    let tempSettings = { ...settings };

    tempSettings.textSize.current++;
    tempSettings.textSize.current %= tempSettings.textSize.values.length;

    let newFontSize =
      tempSettings.textSize.values[tempSettings.textSize.current];

    setSettings(tempSettings);
    dispatch(setFontSize(newFontSize));
  }

  function increaseLineHeight() {
    let tempSettings = { ...settings };

    tempSettings.lineHeight.current++;
    tempSettings.lineHeight.current %= tempSettings.lineHeight.values.length;

    dispatch(
      setLineHeight(
        tempSettings.lineHeight.values[tempSettings.lineHeight.current]
      )
    );
  }

  function increaseWordSpacing() {
    let tempSettings = { ...settings };

    tempSettings.wordSpacing.current++;
    tempSettings.wordSpacing.current %= tempSettings.wordSpacing.values.length;

    dispatch(
      setWordSpacing(
        tempSettings.wordSpacing.values[tempSettings.wordSpacing.current]
      )
    );
  }

  function changeColorPalette() {
    let tempSettings = { ...settings };

    tempSettings.colorPalette.current++;
    tempSettings.colorPalette.current %=
      tempSettings.colorPalette.values.length;

    setShapeBtnColor((shapeBtnColor + 1) % 2);

    dispatch(
      setColorPalette(
        tempSettings.colorPalette.values[tempSettings.colorPalette.current]
      )
    );
  }

  return (
    <div className="AccessibilityWidget">
      {!widgetOpen && (
        <button id="accessWidgetBtn" onClick={switchWidget}>
          Accessibility Settings
        </button>
      )}

      {widgetOpen && (
        <div id="accessWidgetModal" className="modal">
          <div className="accessWidgetContent">
            <button className="close" onClick={switchWidget}>
              &times;
            </button>
            <h2>Accessibility Settings</h2>

            <div className="accessWidgetButtons">
              <button
                className="accessWidgetButton"
                id="lineSpacingBtn"
                onClick={() => increaseLineHeight()}
              >
                Line Spacing
              </button>
              <button
                className="accessWidgetButton"
                id="textSizeBtn"
                onClick={() => increaseFontSize()}
              >
                Text Size
              </button>
              <button
                className="accessWidgetButton"
                id="wordSpacingBtn"
                onClick={() => increaseWordSpacing()}
              >
                Word Spacing
              </button>
              <button
                className="accessWidgetButton"
                id="colorPalette"
                onClick={() => changeColorPalette()}
                style={{ backgroundColor: shapebtnColorList[shapeBtnColor] }}
              >
                Shape Game Colour Palette
              </button>
              <button
                className="accessWidgetButton"
                id="resetBtn"
                onClick={() => resetAllTextSettings()}
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
