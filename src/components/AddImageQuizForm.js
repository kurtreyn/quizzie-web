import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setHasQuizName,
  setNameOfQuizDispatch,
  setCreatingQuiz,
  setNewQuizAdded,
  setButtonDisabled,
  setIsImageQuiz,
  setQuizTypeSelected,
} from "../redux/controls";
import FirebaseClass from "../classes/FirebaseClass";
import { ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import "../styles/addQuizFormStyle.css";

export default function AddImageQuizForm({ handleCancelCreateQuiz }) {
  const dispatch = useDispatch();
  const { has_quiz_name, name_of_quiz } = useSelector(
    (state) => state.controls
  );
  const { current_user } = useSelector((state) => state.user);
  const [quizName, setQuizName] = useState(null);
  const [question, setQuestion] = useState("");
  const [number, setNumber] = useState(0);
  const [quizSet, setQuizSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const fb = new FirebaseClass();

  const handleAddQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleQuizNameStatus = () => {
    dispatch(setHasQuizName(true));
    dispatch(setNameOfQuizDispatch(quizName));
  };

  const handleAddQandA = async (e) => {
    e.preventDefault();
    setLoading(true);
    const answerId = uuidv4();
    const imageRef = formRef.current["file-input"].files[0];
    const downloadUrl = await fb.uploadSingleImage(
      imageRef,
      // answerId,
      quizName,
      current_user
    );

    // console.log("question", question);
    // console.log("answerId", answerId);
    // console.log("imageRef", imageRef);
    // console.log("downloadUrl", downloadUrl);

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

    setQuestion("");
    setNumber(number + 1);
    formRef.current.reset();
    setLoading(false);
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

  const handleSubmitImageQuiz = (e) => {
    e.preventDefault();
    setLoading(true);
    const postId = uuidv4();
    fb.addImageQuiz(current_user, name_of_quiz, quizSet, postId)
      .then(dispatch(setCreatingQuiz(false)))
      .then(dispatch(setNewQuizAdded(true)))
      .then(dispatch(setButtonDisabled(false)))
      .then(dispatch(setIsImageQuiz(false)))
      .then(dispatch(setQuizTypeSelected(false)))
      .then(setLoading(false));
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
            <Button
              label="Add Quiz Name"
              onClick={handleQuizNameStatus}
              disabled={loading}
            />
          </>
        )}

        {has_quiz_name && (
          <>
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
            <Button
              label="Add Question & Upload Image Answer"
              onClick={handleAddQandA}
              disabled={loading || formRef.current === null}
            />
            <Button
              btnType="submit"
              label="Submit Quiz"
              disabled={loading}
              onClick={(e) => handleSubmitImageQuiz(e)}
            />
            <Button
              btnType="reset"
              label="Reset"
              onClick={handleReset}
              disabled={loading}
            />
          </>
        )}
        <Button
          label="Cancel"
          btnType="cancel"
          disabled={loading}
          onClick={handleCancelCreateQuiz}
        />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={500}
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
