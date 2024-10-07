import React, { useState, useEffect } from "react";
import axios from "axios";

const TriviaGame = ({ player1, player2, category }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [isFetchingPanding, setIsFetchingPanding] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const easyQuestions = await axios.get(
          `https://the-trivia-api.com/api/questions?categories=${category}&limit=2&difficulty=easy`
        );
        const mediumQuestions = await axios.get(
          `https://the-trivia-api.com/api/questions?categories=${category}&limit=2&difficulty=medium`
        );
        const hardQuestions = await axios.get(
          `https://the-trivia-api.com/api/questions?categories=${category}&limit=2&difficulty=hard`
        );
        const combinedQuestions = [
          ...easyQuestions.data,
          ...mediumQuestions.data,
          ...hardQuestions.data,
        ];

        setQuestions(combinedQuestions);
        if(combinedQuestions.length  === 6){
             setIsFetchingPanding(true);
        }
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };

    fetchQuestions();
  }, [category]);

  const handleAnswer = (isCorrect, difficulty) => {
    let points = 0;
    if (isCorrect) {
      if (difficulty === "easy") points = 10;
      if (difficulty === "medium") points = 15;
      if (difficulty === "hard") points = 20;
    }

    setScores((prevScores) => ({
      ...prevScores,
      [currentPlayer]: prevScores[currentPlayer] + points,
    }));

    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
  };

  if(isFetchingPanding) {
    return (
      <div> Questions Fetching...</div>
    )
  }
  if (currentQuestion >= questions.length) {
    return (
      <div className="result">
        <h2>Game Over!</h2>
        <p>
          {player1}: {scores.player1} points
        </p>
        <p>
          {player2}: {scores.player2} points
        </p>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const answers = [...question.incorrectAnswers, question.correctAnswer].sort();

  return (
    <div className="display">
      <h2>{currentPlayer}'s Turn</h2>
      <p>
        <b>Question:</b> {question.question}
      </p>
      <div className="options">
        {answers.map((answer) => (
          <button
            key={answer}
            onClick={() =>
              handleAnswer(
                answer === question.correctAnswer,
                question.difficulty
              )
            }
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TriviaGame;
