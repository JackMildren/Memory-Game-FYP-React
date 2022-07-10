import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { resetAll, setLineHeight, setFontSize, setWordSpacing, setFontFamily } from './textSettingsUpdater';

export default function AccessibilityWidget() {
    const [widgetOpen, updateWidget] = useState(false);
    const dispatch = useDispatch();

    let INITIAL_STATE = {
        lineHeight: {
            current: 0,
            values: ['120%', '200%', '300%']
        },
        textSize: {
            current: 0,
            values: ['100%', '200%', '300%']
        },
        wordSpacing: {
            current: 0,
            values: ['100%', '200%', '300%']
        },
        textFont: {
            current: 0,
            values: ['Arial', 'ODF']
        }
    };

    const [settings, setSettings] = useState({...INITIAL_STATE}) 

    useEffect(() => {
        // console.log("loaded widget")
    }, [widgetOpen]);

    function switchWidget() {
        updateWidget(!widgetOpen);
    }

    function toggleFonts() {
        let tempSettings = {...settings};

        tempSettings.textFont.current ++
        tempSettings.textFont.current %= tempSettings.textFont.values.length;

        let newFontFamily = tempSettings.textFont.values[tempSettings.textFont.current];

        setSettings(tempSettings);
        dispatch(setFontFamily(newFontFamily))
    }

    function resetAllTextSettings() {
        setSettings(INITIAL_STATE);
        dispatch(resetAll());
    }

    function increaseFontSize() {
        let tempSettings = {...settings};

        tempSettings.textSize.current ++
        tempSettings.textSize.current %= tempSettings.textSize.values.length;

        let newFontSize = tempSettings.textSize.values[tempSettings.textSize.current];

        setSettings(tempSettings);
        dispatch(setFontSize(newFontSize))
    }

    function increaseLineHeight() {
        let tempSettings = {...settings};

        tempSettings.lineHeight.current ++
        tempSettings.lineHeight.current %= tempSettings.lineHeight.values.length

        dispatch(setLineHeight(tempSettings.lineHeight.values[tempSettings.lineHeight.current]))
    }

    function increaseWordSpacing() {
        let tempSettings = {...settings};

        tempSettings.wordSpacing.current ++
        tempSettings.wordSpacing.current %= tempSettings.wordSpacing.values.length

        dispatch(setWordSpacing(tempSettings.wordSpacing.values[tempSettings.wordSpacing.current]))
    }

    return (
        <div className="AccessibilityWidget">
            { ! widgetOpen && 
                <button id="accessWidgetBtn" onClick={switchWidget}>Accessibility Settings</button>
            }

            { widgetOpen &&
                <div id="accessWidgetModal" className="modal">
                    <div className="accessWidgetContent">
                        <button className="close" onClick={switchWidget}>&times;</button>
                        <h2>Accessibility Settings</h2>

                        <div className="accessWidgetButtons">
                            <button id="lineSpacingBtn" onClick={() => increaseLineHeight()}>Line Spacing</button>
                            <button id="textSizeBtn" onClick={() => increaseFontSize()}>Text Size</button>
                            <button id="wordSpacingBtn" onClick={() => increaseWordSpacing()}>Word Spacing</button>
                            <button id="dyslexicFontBtn" onClick={() => toggleFonts()}>Dyslexic-Friendly Font</button>
                            <button id="resetBtn" onClick={() => resetAllTextSettings()}>Reset All</button>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    );
};