import React from 'react';
import '../styles/buttonStyle.css';

export default function Button({ label, disabled, onClick }) {
  return (
    <button className="btn" disabled={disabled} onClick={onClick}>
      <span className="btn-text">{label}</span>
    </button>
  );
}
