import React from 'react';
import '../styles/groupContainerStyle.css';

export default function GroupContainer({ label, id }) {
  return (
    <div className="group-container" id={id}>
      <div className="group-inner-container">
        <span className="group-text">{label}</span>
      </div>
    </div>
  );
}
