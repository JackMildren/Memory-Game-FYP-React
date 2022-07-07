import { useEffect, useState } from "react";

export default function AccessibilityWidget() {
    const [widgetOpen, updateWidget] = useState(false);

    let textSettings = {
        lineHeight: {
            current: 1.15,
            default: 1.15,
            max: 2.15
        },
        textSize: {
            current: 16,
            default: 16,
            max: 28
        },
        wordSpacing: {
            current: 0,
            default: 0,
            max: 16
        },
        textFont: {
            current: "Arial",
            default: "Arial"
        }
    };

    useEffect(() => {
        // console.log("HERE!")
        // let accessWidgetModal = document.getElementById("accessWidgetModal");
        // // const accessWidgetBtn = document.getElementById("accessWidgetBtn");
        // // const accessWidgetClose = document.getElementsByClassName("close")[0];

        // // accessWidgetBtn.onclick = () => accessWidgetModal.style.display = "block";
        // // accessWidgetClose.onclick = () => accessWidgetModal.style.display = "none";
        // window.onclick = function(event) {
        //     if (event.target === accessWidgetModal) {
        //         return accessWidgetModal.style.display = "none";
        //     }
        // }
    }, [widgetOpen]);

    function switchWidget() {
        updateWidget(!widgetOpen);
    }

    function toggleFonts() {
        if (textSettings.textFont.current === "Arial") {
            textSettings.textFont.current = "ODF";
        } else {
            textSettings.textFont.current = "Arial";
        }
        updateBodyText();
    }

    function resetAllTextSettings() {
        for (let setting in textSettings) {
            textSettings[setting].current = textSettings[setting].default;
        }
        updateBodyText();
    }

    function updateTextSetting(setting, increment) {
        textSettings[setting].current += increment;
        if (textSettings[setting].current > textSettings[setting].max) {
            textSettings[setting].current = textSettings[setting].default;
        }
        updateBodyText();
    }

    function updateBodyText() {
        const bodyText = document.getElementsByTagName("p");

        for (let element = 0; element < bodyText.length; element++) {
            bodyText[element].style.lineHeight = textSettings.lineHeight.current.toString();
            bodyText[element].style.fontSize = (textSettings.textSize.current.toString() + 'px');
            bodyText[element].style.wordSpacing = (textSettings.wordSpacing.current.toString() + 'px');
            bodyText[element].style.fontFamily = textSettings.textFont.current;
        }
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
                        <h3>Accessibility Settings</h3>
                        <button id="lineSpacingBtn" onClick={updateTextSetting("lineHeight", 0.5)}>Line Spacing</button>
                        <button id="textSizeBtn" onClick={updateTextSetting("textSize", 6)}>Text Size</button>
                        <button id="wordSpacingBtn" onClick={updateTextSetting("wordSpacing", 8)}>Word Spacing</button>
                        <button id="dyslexicFontBtn" onClick={toggleFonts()}>Dyslexic-Friendly Font</button>
                        <button id="resetBtn" onClick={resetAllTextSettings()}>Reset All</button>
                    </div>
                </div>
            }
            
        </div>
    )
}

