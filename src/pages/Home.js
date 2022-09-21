import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setButtonDisabled, setCreatingQuiz } from '../redux/controls';
import Menu from '../components/Menu';
import AddQuizForm from '../components/AddQuizForm';
import Quiz from '../components/Quiz';
import Instructions from '../components/Instructions';
import Button from '../components/Button';
import {
  firstSetOfInstructions,
  secondSetOfInstructions,
  thirdSetOfInstructions,
} from '../shared/quizInstructions';
import qzzIcon from '../assets/icon.png';

import '../styles/homeStyle.css';

export default function Home() {
  const dispatch = useDispatch();
  const { button_disabled, creating_quiz, has_quiz_name } = useSelector(
    (state) => state.controls
  );

  const handleCreqteQuiz = () => {
    dispatch(setButtonDisabled(true));
    dispatch(setCreatingQuiz(true));
  };

  console.log(`button_disabled`, button_disabled);
  console.log(`creating_quiz`, creating_quiz);

  return (
    <div className="home-container">
      <Menu />
      <div className="main-section">
        <div className="controls-section">
          {creating_quiz ? null : (
            <>
              <Instructions insturctions={firstSetOfInstructions} />
              <Button
                label="Create Quiz"
                disabled={button_disabled}
                onClick={handleCreqteQuiz}
              />
            </>
          )}

          {creating_quiz && !has_quiz_name && (
            <Instructions insturctions={secondSetOfInstructions} />
          )}

          {creating_quiz && has_quiz_name && (
            <Instructions insturctions={thirdSetOfInstructions} />
          )}
        </div>
        <div className="quiz-and-list-section">
          {creating_quiz && <AddQuizForm />}
        </div>
      </div>
    </div>
  );
}
