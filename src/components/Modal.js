import React from 'react';
import '../styles/modalStyle.css';

export default function Modal({ onClick, onMouseUp }) {
  return (
    <div className="modal-container">
      <span className="modal-text">
        WARNING: This cannot be undone.
        <br />
        Are you sure you want to delete the Quiz?
      </span>
      <div className="modal-options-wrapper">
        <span className="modal-confirm" onMouseUp={onMouseUp}>
          Delete
        </span>
        <span className="modal-cancel" onClick={onClick}>
          Cancel
        </span>
      </div>
    </div>
  );
}
