import React from 'react';
import '../styles/groupContainerStyle.css';

export default function GroupContainer({ label, id, onClick }) {
  return (
    <div className="group-container" id={id} onClick={onClick}>
      <div className="group-inner-container">
        <span className="group-text">{label}</span>
      </div>
    </div>
  );
}
