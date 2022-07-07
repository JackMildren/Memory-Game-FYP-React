'use strict';

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

function initAccessWidget() {
    let accessWidgetModal = document.getElementById("accessWidgetModal");
    const accessWidgetBtn = document.getElementById("accessWidgetBtn");
    const accessWidgetClose = document.getElementsByClassName("close")[0];

    accessWidgetBtn.onclick = () => accessWidgetModal.style.display = "block"; loadAccessWidget();
    accessWidgetClose.onclick = () => accessWidgetModal.style.display = "none";
    window.onclick = function(event) {
        if (event.target === accessWidgetModal) {
            return accessWidgetModal.style.display = "none";
        }
    }
}

function loadAccessWidget() {
    const lineSpacingBtn = document.getElementById("lineSpacingBtn");
    const textSizeBtn = document.getElementById("textSizeBtn");
    const wordSpacingBtn = document.getElementById("wordSpacingBtn");
    const resetBtn = document.getElementById("resetBtn");
    const dyslexicFontBtn = document.getElementById("dyslexicFontBtn");

    lineSpacingBtn.onclick = () => updateTextSetting("lineHeight", 0.5);
    textSizeBtn.onclick = () => updateTextSetting("textSize", 6);
    wordSpacingBtn.onclick = () => updateTextSetting("wordSpacing", 8);
    dyslexicFontBtn.onclick = () => toggleFonts();
    resetBtn.onclick = () => resetAllTextSettings();
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
    // textSettings[setting].current = textSettings[setting].default;
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
