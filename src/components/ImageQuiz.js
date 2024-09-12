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
    let limit = 3;
    let { correct_answer } = currentObj;
    let { question } = currentObj;
    let wrongAnswers = [...answers];
    let answerOptions = [];
    let [idx] = wrongAnswers
      .map((answer) => {
        const answerOption = answer.answer;
        if (answerOption === correct_answer) {
          let index = wrongAnswers.indexOf(answer);
          return index;
        }
        return -1; // Return -1 if the answer is not the correct answer
      })
      .filter((index) => index !== -1); // Filter out -1 values
    // console.log("idx", idx);
    // console.log("correct_answer", correct_answer);
    // console.log("question", question);

    const correctAnswerObj = wrongAnswers.splice(idx, 1);
    // console.log("wrongAnswers", wrongAnswers);
    console.log("correctAnswerObj", correctAnswerObj);
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

  const handleSetSelectedImage = (answer) => {
    console.log("answer", answer);
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
    console.log("options", options);
  }, [disabled, options]);

  // console.log("group ", group);
  // console.log("imgArr", imgArr);
  // console.log("answers", answers);
  // console.log("options", options);

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
