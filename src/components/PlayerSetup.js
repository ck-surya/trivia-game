import React, { useState } from "react";
import "./../App.css";

const PlayerSetup = ({ onStartGame }) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const startGame = () => {
    if (player1 && player2) {
      onStartGame(player1, player2);
    }
  };

  return (
    <div className="player-setup">
      <h2>Player Setup</h2>
      <div className="input-box">
        <input
          type="text"
          placeholder="Player 1 Name"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Player 2 Name"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
};

export default PlayerSetup;
