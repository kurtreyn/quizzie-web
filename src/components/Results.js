import React from 'react';
// import { firebase, db } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import {
  setActiveGroup,
  setFinalResults,
  setFinalScore,
  setQuizReset,
  setViewResults,
  setGroups,
} from '../redux/controls';
import Button from './Button';
import '../styles/resultsStyle.css';

export default function Results() {
  const { final_results, final_score, points_possible } = useSelector(
    (state) => state.controls
  );
  const dispatch = useDispatch();

  const resetQuiz = () => {
    dispatch(setActiveGroup(null));
    dispatch(setFinalResults(null));
    dispatch(setFinalScore(null));
    dispatch(setViewResults(false));
    dispatch(setQuizReset(true));
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <span className="score-text">
          Final Score: {final_score} out of {points_possible}
        </span>
      </div>
      {final_results &&
        final_results.map((result, index) => {
          return (
            <div className="results-inner-container" key={index}>
              <span className="results-question-text">
                {result.askedQuestion}
              </span>
              <span
                className={
                  result.selectedAnswer === result.correctAnswer
                    ? 'results-correct-answer-text'
                    : 'results-wrong-answer-text'
                }
              >
                Selected Answer: {result.selectedAnswer}
              </span>
              <span className="results-correct-answer-text">
                Correct Answer: {result.correctAnswer}
              </span>
            </div>
          );
        })}
      <div className="results-footer">
        <Button btnType="reset" label="Reset Quiz" onClick={resetQuiz} />
      </div>
    </div>
  );
}
