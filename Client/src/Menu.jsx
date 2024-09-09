import React from "react";
import './Menu.css'

const Menu = ({startGame}) => {
    return (
        <div className="wrapper">
          <div>
            <button
              onClick={startGame}
              className="start">
                Start game
            </button>
          </div>
        </div>
      );
}

export default Menu;

