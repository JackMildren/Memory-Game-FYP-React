import React, { Component } from "react";

// User guide and home page React component

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="body">
          <p>
            Welcome to Memory Game Final year Project! This website has been
            designed to exercise your brain with the intention of assisting in
            preventing cognitive decline in the elderly, in particular, those
            who currently have dementia.
          </p>

          <p>
            On this site you will find 2 games, a simple maths game and a shape
            and colour based memory game. Both games have 3 levels of difficulty
            which you can select on the start screen.
          </p>

          <p>
            Use the tabs at the top of this site to navigate between pages and
            games
          </p>

          <p>
            To save your high scores and settings, log in with a google account
            by clicking the button in the top right, this will redirect you to
            google's login page.
          </p>

          <p>
            If you decide to clear your data and delete your account, navigate
            to the User tab and select "Clear All User Data"
          </p>

          <p>
            This site has designed to be as accessible as possible, as such, an
            accessibility widget has been added to the bottom left of the page,
            in this widget you can change the text size, word spacing, line
            spacing and enable an alternate colour palette for the shape game.
          </p>

          <p>
            To report any errors or bugs, please email me at
            UP864756@myport.ac.uk or report an issue to the GitHub page at (
            <a href="https://github.com/JackMildren/Memory-Game-FYP-React/issues">
              This Link
            </a>
            )
          </p>

          <p>Have fun!</p>
        </div>
      </div>
    );
  }
}
