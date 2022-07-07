'use strict';

function init() {
    if (getCurrentPage() === "Game") {
        initGame()
    }
    initAccessWidget()
}

function getCurrentPage() {
    const activePage = document.getElementsByClassName("active");
    return (activePage[0].textContent);
}