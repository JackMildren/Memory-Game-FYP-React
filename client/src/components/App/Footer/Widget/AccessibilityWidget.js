import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  resetAll,
  setLineHeight,
  setFontSize,
  setWordSpacing,
  setColorPalette,
} from "./textSettingsUpdater";

export default function AccessibilityWidget() {
  const [widgetOpen, updateWidget] = useState(false);
  const dispatch = useDispatch();

  let INITIAL_STATE = {
    lineHeight: {
      current: 0,
      values: ["120%", "200%", "300%"],
    },
    textSize: {
      current: 0,
      values: ["100%", "200%", "300%"],
    },
    wordSpacing: {
      current: 0,
      values: ["100%", "200%", "300%"],
    },
    colorPalette: {
      current: 0,
      values: ["true", "alt"],
    },
  };

  const [settings, setSettings] = useState({ ...INITIAL_STATE });

  const shapebtnColorList = ["lightblue", "white"];
  console.log(JSON.parse(localStorage.getItem("accessSettings")).colorPalette);
  const INITIAL_PALETTE =
    JSON.parse(localStorage.getItem("accessSettings")).colorPalette || 0;
  const [shapeBtnColor, setShapeBtnColor] = useState(
    INITIAL_PALETTE === "true" ? 0 : 1
  );

  useEffect(() => {}, [widgetOpen]);

  function switchWidget() {
    updateWidget(!widgetOpen);
  }

  function resetAllTextSettings() {
    setSettings(INITIAL_STATE);
    dispatch(resetAll());
  }

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
              <button id="lineSpacingBtn" onClick={() => increaseLineHeight()}>
                Line Spacing
              </button>
              <button id="textSizeBtn" onClick={() => increaseFontSize()}>
                Text Size
              </button>
              <button id="wordSpacingBtn" onClick={() => increaseWordSpacing()}>
                Word Spacing
              </button>
              <button
                id="colorPalette"
                onClick={() => changeColorPalette()}
                style={{ backgroundColor: shapebtnColorList[shapeBtnColor] }}
              >
                Shape Game Colour Palette
              </button>
              <button id="resetBtn" onClick={() => resetAllTextSettings()}>
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
