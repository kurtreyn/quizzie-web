import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setActiveGroup,
  setFinalResults,
  setFinalScore,
  setQuizReset,
  setViewResults,
  setButtonDisabled,
} from '../redux/controls';
import Button from './Button';
import '../styles/resultsStyle.css';

export default function Results() {
  const { final_results, final_score, points_possible } = useSelector(
    (state) => state.controls
  );
  const dispatch = useDispatch();
  const finalPercent = (final_score / points_possible) * 100;

  const resetQuiz = () => {
    dispatch(setActiveGroup(null));
    dispatch(setFinalResults(null));
    dispatch(setFinalScore(null));
    dispatch(setViewResults(false));
    dispatch(setQuizReset(true));
    dispatch(setButtonDisabled(false));
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <span className="score-text">
          Final Score: {final_score} out of {points_possible} questions
        </span>
        <span className="score-text">{finalPercent}%</span>
      </div>
      {final_results &&
        final_results.map((result, index) => {
          return (
            <div className="results-inner-container" key={index}>
              <span className="results-question-text">
                Question: {result.askedQuestion}?
              </span>
              <span
                className={
                  result.selectedAnswer === result.correctAnswer
                    ? 'results-correct-answer-text'
                    : 'results-wrong-answer-text'
                }
              >
                <span className="results-question-title">Selected Answer:</span>{' '}
                {result.selectedAnswer}
              </span>
              <span className="results-correct-answer-text">
                <span className="results-question-title">Correct Answer:</span>{' '}
                {result.correctAnswer}
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
