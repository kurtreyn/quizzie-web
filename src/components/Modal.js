import React from 'react';
import '../styles/modalStyle.css';

export default function Modal({ onClick, onMouseUp, warning, message }) {
  return (
    <div className="modal-container">
      <span className="modal-text">
        {warning}
        <br />
        {message}
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
