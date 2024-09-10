import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setHasQuizName,
  setNameOfQuizDispatch,
  setCreatingQuiz,
  setNewQuizAdded,
  setButtonDisabled,
} from "../redux/controls";
import { db } from "../firebase";
import FirebaseClass from "../classes/FirebaseClass";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import "../styles/addQuizFormStyle.css";

export default function AddQuizForm({ handleCancelCreateQuiz }) {
  const dispatch = useDispatch();
  const { has_quiz_name, name_of_quiz } = useSelector(
    (state) => state.controls
  );
  const { current_user } = useSelector((state) => state.user);
  const [quizName, setQuizName] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [number, setNumber] = useState(0);
  const [quizSet, setQuizSet] = useState([]);
  const [isImgQuiz, setIsImgQuiz] = useState(false);
  const formRef = useRef(null);
  const fb = new FirebaseClass();

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

  const handleAddQandA = async (e) => {
    e.preventDefault();
    if (!isImgQuiz) {
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
            {
              question: question,
              correct_answer: answer,
              incorrect_answers: [],
            },
          ];
        });
      }
    } else {
      const answerId = uuidv4();
      const imageRef = formRef.current["file-input"].files[0];
      const downloadUrl = await fb.uploadSingleImage(
        imageRef,
        answerId,
        current_user
      );

      console.log("question", question);
      console.log("answerId", answerId);
      console.log("imageRef", imageRef);
      console.log("downloadUrl", downloadUrl);

      if (quizSet === null) {
        setQuizSet([
          {
            question: question,
            correct_answer: answerId,
            incorrect_answers: [],
            image: downloadUrl,
          },
        ]);
      } else {
        setQuizSet((prevState) => {
          return [
            ...prevState,
            {
              question: question,
              correct_answer: answerId,
              incorrect_answers: [],
              image: downloadUrl,
            },
          ];
        });
      }
    }

    setQuestion("");
    setAnswer("");
    setNumber(number + 1);
    formRef.current.reset();
  };

  useEffect(() => {
    console.log("quizSet updated", quizSet);
  }, [quizSet]);

  const handleReset = () => {
    dispatch(setHasQuizName(false));
    dispatch(setNameOfQuizDispatch(""));
    setQuizName("");
    setNumber(0);
  };

  const uploadPostToFirebase = async (posts) => {
    const postRef = collection(db, "users", `${current_user.email}`, `posts`);
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

  const handleSubmitImageQuiz = (e) => {
    e.preventDefault();
    fb.addImageQuiz(current_user, name_of_quiz, quizSet)
      .then(dispatch(setCreatingQuiz(false)))
      .then(dispatch(setNewQuizAdded(true)))
      .then(dispatch(setButtonDisabled(false)));
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
              <div className="add-img-section">
                <label htmlFor="img-quiz" className="add-quiz-label-sm">
                  Check here if you want to use upload images for your quiz
                  answers.
                </label>
                <label className="add-quiz-label-sm">
                  <input
                    type="checkbox"
                    id="img-quiz"
                    name="img-quiz"
                    onChange={() => setIsImgQuiz(!isImgQuiz)}
                  />
                  I want to upload images for my quiz answers.
                </label>
              </div>
            </form>
            <Button label="Add Quiz Name" onClick={handleQuizNameStatus} />
          </>
        )}

        {has_quiz_name && (
          <>
            {!isImgQuiz ? (
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
            ) : (
              <form action="" className="add-quiz-form" ref={formRef}>
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
                <label htmlFor="file-input" className="add-quiz-label">
                  Add image file for the answer
                </label>
                <input
                  id="file-input"
                  type="file"
                  placeholder="Choose image file(s)"
                  className="form-control file-selection-input"
                />
              </form>
            )}
            <Button label="Add Question & Answer" onClick={handleAddQandA} />
            <Button
              btnType="submit"
              label="Submit Quiz"
              onClick={(e) =>
                !isImgQuiz ? handleSubmitQuiz() : handleSubmitImageQuiz(e)
              }
            />
            <Button btnType="reset" label="Reset" onClick={handleReset} />
          </>
        )}
        <Button
          label="Cancel"
          btnType="cancel"
          onClick={handleCancelCreateQuiz}
        />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
