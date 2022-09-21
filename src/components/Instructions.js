import React from 'react';
import '../styles/instructionsStyle.css';

export default function Instructions({ insturctions }) {
  return <div className="instructions-container">{insturctions()}</div>;
}
