import React from 'react';
import Instructions from './Instructions';
import Button from './Button';
// import GroupContainer from './GroupContainer';

export default function ControlsSection({
  mode,
  groupsPresent,
  button_disabled,
  handleCreateQuiz,
  groups,
  handleQuizStatus,
  creating_quiz,
  firstSetOfInstructions,
  secondSetOfInstructions,
  thirdSetOfInstructions,
  has_quiz_name,
}) {
  return (
    <div className="controls-section">
      {mode === 'new_user' ||
        (mode === 'returning_user' && !creating_quiz && groups.length === 0 && (
          <>
            <Instructions insturctions={firstSetOfInstructions} />
            <Button
              label="Create Quiz"
              disabled={button_disabled}
              onClick={handleCreateQuiz}
            />
          </>
        ))}

      {mode === 'new_user' ||
        (mode === 'returning_user' && creating_quiz && (
          <>
            {!has_quiz_name ? (
              <Instructions insturctions={secondSetOfInstructions} />
            ) : (
              <Instructions insturctions={thirdSetOfInstructions} />
            )}
            <Button
              label="Create Quiz"
              disabled={button_disabled}
              onClick={handleCreateQuiz}
            />
          </>
        ))}

      {mode === 'returning_user' && groups.length > 0 && !creating_quiz && (
        <>
          <Instructions insturctions={groupsPresent} />
          <Button
            label="Create Quiz"
            disabled={button_disabled}
            onClick={handleCreateQuiz}
          />
        </>
      )}
    </div>
  );
}
