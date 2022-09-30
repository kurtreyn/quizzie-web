import React from 'react';
import trashIcon from '../assets/trash.svg';

import '../styles/groupContainerStyle.css';

export default function GroupContainer({ label, id, onClick, onMouseUp }) {
  return (
    <div className="group-container" id={id}>
      <div className="group-inner-container" onClick={onClick}>
        <span className="group-text">{label}</span>
      </div>
      <div className="edit-quiz-options-wrapper">
        <img
          src={trashIcon}
          alt="trash icon"
          className="group-container-icon"
          onMouseUp={onMouseUp}
        />
      </div>
    </div>
  );
}
