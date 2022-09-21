import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPointsPossible,
  setFinalResults,
  setFinalScore,
} from '../redux/controls';
import '../styles/quizStyle.css';

export default function Quiz({ subjectName, group }) {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [rightAnswer, setRightAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const { post_q_a } = group;
  let answers = post_q_a.map((answer) => answer.correct_answer);
  let pointsPossible = answers.length;

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

  useEffect(() => {
    if (!disabled) {
      runQuiz(post_q_a[index]);
    }
    if (disabled) {
      dispatch(setFinalResults(results));
      dispatch(setFinalScore(score));
      dispatch(setPointsPossible(pointsPossible));
    }
  }, [disabled]);
  return <div>Quiz</div>;
}
