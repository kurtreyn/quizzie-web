import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setPointsPossible,
  setFinalResults,
  setFinalScore,
  setViewResults,
} from "../redux/controls";
import Button from "./Button";
import "../styles/quizStyle.css";

export default function Quiz({ subjectName, group }) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [rightAnswer, setRightAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [longAnswerMode, setLongAnswerMode] = useState(false);
  const { post_q_a } = group;
  let answers = post_q_a.map((answer) => answer.correct_answer);
  let pointsPossible = answers.length;
  let longestAnswer = 0;

  for (let answer of answers) {
    if (answer.length > longestAnswer) {
      longestAnswer = answer.length;
    }
  }

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const runQuiz = (currentObj) => {
    if (index === post_q_a.length) {
      setDisabled(true);
      return;
    }
    let limit = 3;
    let { correct_answer } = currentObj;
    let { question } = currentObj;
    let wrongAnswers = [...answers];
    let answerOptions = [];
    let idx = wrongAnswers.indexOf(correct_answer);

    if (idx > -1) {
      wrongAnswers.splice(idx, 1);
    }
    shuffle(wrongAnswers);

    for (let i = 0; i < limit; i++) {
      answerOptions.push(wrongAnswers[i]);
    }
    answerOptions.push(correct_answer);

    let qSet = {
      question: question,
      correctAnswer: correct_answer,
      answerOptions: shuffle(answerOptions),
    };
    setCurrentQuestion(question);
    setRightAnswer(correct_answer);
    setOptions([qSet]);
    setIndex(index + 1);
  };

  const handleAnswer = (answer) => {
    if (answer === rightAnswer) {
      setScore(score + 1);
    }

    if (results.length === 0) {
      setResults([
        {
          askedQuestion: currentQuestion,
          selectedAnswer: answer,
          correctAnswer: rightAnswer,
        },
      ]);
    } else {
      setResults((prevState) => {
        return [
          ...prevState,
          {
            askedQuestion: currentQuestion,
            selectedAnswer: answer,
            correctAnswer: rightAnswer,
          },
        ];
      });
    }
    runQuiz(post_q_a[index]);
  };

  const handleEndQuiz = () => {
    setDisabled(true);
  };

  const handleViewResults = () => {
    dispatch(setViewResults(true));
  };

  useEffect(() => {
    if (!disabled) {
      runQuiz(post_q_a[index]);
    }
    if (disabled) {
      dispatch(setFinalResults(results));
      dispatch(setFinalScore(score));
      dispatch(setPointsPossible(pointsPossible));
    }
    if (longestAnswer > 100) {
      setLongAnswerMode(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, longestAnswer]);

  return (
    <div className="quiz-container">
      <div className="quiz-inner-container">
        <div className="quiz-header">
          <h1 className="quiz-header-text">{subjectName}</h1>
        </div>

        <div className="question-window">
          {options.map((option) => {
            return <span className="question-text">{option.question}</span>;
          })}
        </div>

        <div className="answer-section">
          {options.map((option, optionIndex) => {
            return (
              <React.Fragment key={optionIndex}>
                {option.answerOptions.map((answerOption, answerOptionIndex) => {
                  return (
                    answerOption && (
                      <Button
                        key={`${optionIndex}-${answerOptionIndex}`}
                        btnType={longAnswerMode ? "longAnswerBtn" : "answerBtn"}
                        label={answerOption}
                        onClick={() => handleAnswer(answerOption)}
                        disabled={disabled}
                      />
                    )
                  );
                })}
              </React.Fragment>
            );
          })}

          {!disabled && (
            <Button
              btnType="endQuiz"
              label="End Quiz"
              onClick={handleEndQuiz}
            />
          )}
          {disabled && (
            <Button
              btnType="viewResults"
              label="View Results"
              onClick={handleViewResults}
            />
          )}
        </div>
      </div>
    </div>
  );
}

