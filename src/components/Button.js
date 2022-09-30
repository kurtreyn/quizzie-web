import React, { useState, useEffect } from 'react';
import '../styles/buttonStyle.css';

export default function Button({ label, disabled, onClick, btnType, type }) {
  const [buttonClass, setButtonClass] = useState('btn');

  useEffect(() => {
    if (btnType === 'submit') {
      setButtonClass('submitBtn');
    }
    if (btnType === 'reset') {
      setButtonClass('resetBtn');
    }
    if (btnType === 'answerBtn') {
      setButtonClass('answerBtn');
    }
    if (btnType === 'longAnswerBtn') {
      setButtonClass('longAnswerBtn');
    }
    if (btnType === 'endQuiz') {
      setButtonClass('endQuizBtn');
    }
    if (btnType === 'viewResults') {
      setButtonClass('viewResultsBtn');
    }
    if (btnType === 'login') {
      setButtonClass('loginBtn');
    }
    if (btnType === 'signup') {
      setButtonClass('signupBtn');
    }
  }, [btnType]);

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      <span className="btn-text">{label}</span>
    </button>
  );
}
