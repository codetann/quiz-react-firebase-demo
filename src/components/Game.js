import React, { Component, useEffect, useState, useCallback } from "react";
import Question from "./Question";
import HUD from "./HUD";
import SaveScoreForm from "./SaveScoreForm";

import { loadQuestions } from "../helpers/QuestionsHelper";

export default function Game({ history }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [done, setDone] = useState(false);
  // retrieve question set from API using the Fetch API
  // convert that response to a format that we want
  // choose the first question of that array and pass it to the question component

  useEffect(() => {
    loadQuestions()
      .then((questions) => setQuestions(questions))
      .catch((err) => console.log(err));
  }, []);

  const scoreSaved = () => {
    history.push("/");
  };

  const changeQuestion = (bonus = 0) => {
    // makes sure when no other code is ran when user is done
    if (questions.length === 0) {
      setDone(true);
      return setScore(score + bonus);
    }
    // get a random index of a question
    const randomQuestionIndex = Math.floor(Math.random() * questions.length);
    // we set the current question to the question at the radom index
    const currentQuestion = questions[randomQuestionIndex];
    // remove that question from the question going forward
    const remainingQuestions = [...questions];
    remainingQuestions.splice(randomQuestionIndex, 1);
    // update the state to reflect these changes

    setQuestions(remainingQuestions);
    setCurrentQuestion(currentQuestion);
    setLoading(false);
    setScore(score + bonus);
    setQuestionNumber(questionNumber + 1);
  };

  useEffect(() => {
    if (!currentQuestion && questions.length) {
      changeQuestion();
    }
  }, [currentQuestion, questions, changeQuestion]);

  return (
    <>
      {loading && !done && <div id="loader" />}

      {!done && !loading && currentQuestion && (
        <div>
          <HUD score={score} questionNumber={questionNumber} />
          <Question
            question={currentQuestion}
            changeQuestion={changeQuestion}
          />
        </div>
      )}
      {done && <SaveScoreForm score={score} scoreSaved={scoreSaved} />}
    </>
  );
}
