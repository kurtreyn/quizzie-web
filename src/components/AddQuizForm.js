import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHasQuizName,
  setNameOfQuizDispatch,
  setCreatingQuiz,
  setNewQuizAdded,
  setButtonDisabled,
} from '../redux/controls';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Button from './Button';
import '../styles/addQuizFormStyle.css';

export default function AddQuizForm() {
  const dispatch = useDispatch();
  const { has_quiz_name, name_of_quiz } = useSelector(
    (state) => state.controls
  );
  const { current_user } = useSelector((state) => state.user);
  const [quizName, setQuizName] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [number, setNumber] = useState(0);
  const [quizSet, setQuizSet] = useState([]);

  const handleAddQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleAddQAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const handleQuizNameStatus = () => {
    dispatch(setHasQuizName(true));
    dispatch(setNameOfQuizDispatch(quizName));
  };

  const handleAddQandA = (e) => {
    e.preventDefault();
    if (quizSet === null) {
      setQuizSet([
        {
          question: question,
          correct_answer: answer,
          incorrect_answers: [],
        },
      ]);
    } else {
      setQuizSet((prevState) => {
        return [
          ...prevState,
          { question: question, correct_answer: answer, incorrect_answers: [] },
        ];
      });
    }
    setQuestion('');
    setAnswer('');
    setNumber(number + 1);
  };

  const handleReset = () => {
    dispatch(setHasQuizName(false));
    dispatch(setNameOfQuizDispatch(''));
    setQuizName('');
    setNumber(0);
  };

  const uploadPostToFirebase = async (posts) => {
    const postRef = collection(db, 'users', `${current_user.email}`, `posts`);
    addDoc(postRef, {
      owner_uid: current_user.uid,
      owner_email: current_user.email,
      subject_name: name_of_quiz,
      post_q_a: quizSet,
      createdAt: serverTimestamp(),
    })
      .then(dispatch(setCreatingQuiz(false)))
      .then(dispatch(setNewQuizAdded(true)))
      .then(dispatch(setButtonDisabled(false)));
  };

  const handleSubmitQuiz = () => {
    uploadPostToFirebase();
  };

  return (
    <div className="add-quiz-container">
      <div className="form-container">
        {!has_quiz_name && (
          <>
            <form action="" className="add-quiz-form">
              <label htmlFor="quiz-name" className="add-quiz-label">
                Enter A Name for Your Quiz
              </label>
              <input
                id="quiz-name"
                type="text"
                placeholder="enter the quiz name here"
                className="add-quiz-input"
                onChange={(e) => setQuizName(e.target.value)}
              />
            </form>
            <Button label="Add Quiz Name" onClick={handleQuizNameStatus} />
          </>
        )}

        {has_quiz_name && (
          <>
            <form action="" className="add-quiz-form">
              <label htmlFor="question" className="add-quiz-label">
                Enter Question
              </label>
              <input
                id="question"
                type="text"
                value={question}
                placeholder="enter the question here"
                className="add-quiz-input"
                onChange={handleAddQuestion}
              />
              <label htmlFor="question" className="add-quiz-label">
                Enter Answer
              </label>
              <input
                id="answer"
                type="text"
                value={answer}
                placeholder="enter the answer here"
                className="add-quiz-input"
                onChange={handleAddQAnswer}
              />
            </form>
            <Button label="Add Question & Answer" onClick={handleAddQandA} />
            <Button
              btnType="submit"
              label="Submit Quiz"
              onClick={handleSubmitQuiz}
            />
            <Button btnType="reset" label="Reset" onClick={handleReset} />
          </>
        )}
      </div>
    </div>
  );
}
