import React from "react";
import {
  setQuizType,
  setIsImageQuiz,
  setQuizTypeSelected,
} from "../redux/controls";
import { useDispatch } from "react-redux";
import Button from "./Button";

export default function QuizTypeForm({}) {
  const dispatch = useDispatch();

  const selectImageQuiz = () => {
    dispatch(setIsImageQuiz(true));
    dispatch(setQuizTypeSelected(true));
  };

  const selectStandardQuiz = () => {
    dispatch(setIsImageQuiz(false));
    dispatch(setQuizTypeSelected(true));
  };

  return (
    <div className="quiz-and-list-section">
      <Button
        btnType="imgQzBtn"
        label="Quiz With Images For Answers"
        onClick={selectImageQuiz}
      />
      <Button
        label="Standard Quiz With Text For Answers"
        onClick={selectStandardQuiz}
      />
    </div>
  );
}
