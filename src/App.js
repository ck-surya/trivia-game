import React, { useState } from 'react';
import PlayerSetup from './components/PlayerSetup';
import CategorySelection from './components/CategorySelection';
import TriviaGame from './components/TriviaGame';
import "./App.css"

function App() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [category, setCategory] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);

  const handleStartGame = (p1, p2) => {
    setPlayer1(p1);
    setPlayer2(p2);
    setGameStarted(true);
  };

  const handleCategorySelect = (category) => {
    setCategory(category);
    setCategorySelected(true);
  };

  return (
    <div className='game-zone'>
      {!gameStarted ? (
        <PlayerSetup onStartGame={handleStartGame} />
      ) : !categorySelected ? (
        <CategorySelection onCategorySelect={handleCategorySelect} />
      ) : (
        <TriviaGame player1={player1} player2={player2} category={category} />
      )}
    </div>
  );
}

export default App;
