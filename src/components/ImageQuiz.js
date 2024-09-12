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

export default function ImageQuiz({ subjectName, group }) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [rightAnswer, setRightAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const { post_q_a } = group;
  let answers = post_q_a.map((answer) => {
    return { answer: answer.correct_answer, image: answer.image[0] };
  });
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
    console.log("running quiz");
    if (index === post_q_a.length) {
      setDisabled(true);
      return;
    }
    let { correct_answer } = currentObj;
    let { question } = currentObj;
    let answerOptions = [...answers];

    shuffle(answerOptions);

    let qSet = {
      question: question,
      correctAnswer: correct_answer,
      answerOptions: answerOptions,
    };

    setCurrentQuestion(question);
    setRightAnswer(correct_answer);
    setOptions([qSet]);
    setIndex(index + 1);
  };

  const handleAnswer = (answer) => {
    if (answer === rightAnswer) {
      console.log("correct");
      setScore(score + 1);
    } else {
      console.log("incorrect");
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
    // console.log("rightAnswer", rightAnswer);
    // console.log("options", options);
    console.log("results", results);
    console.log("index", index);
  }, [disabled, options, results, index]);

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

        <div className="img-answer-section">
          <div className="img-answer-subsection">
            {options &&
              options.map((option, optionIndex) => {
                return (
                  option.answerOptions &&
                  option.answerOptions.map(
                    (answerOption, answerOptionIndex) => {
                      return (
                        <div
                          className="img-wrapper"
                          key={`${optionIndex}-${answerOptionIndex}`}
                          onClick={() => handleAnswer(answerOption.answer)}>
                          <img
                            src={answerOption.image}
                            alt="option"
                            className="img-answer"
                            id={answerOption.answer}
                          />
                        </div>
                      );
                    }
                  )
                );
              })}
          </div>

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
