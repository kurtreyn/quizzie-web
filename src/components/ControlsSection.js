import React from "react";
import Instructions from "./Instructions";
import Button from "./Button";

export default function ControlsSection({
  mode,
  groupsPresent,
  button_disabled,
  handleCreateQuiz,
  groups,
  creating_quiz,
  firstSetOfInstructions,
  secondSetOfInstructions,
  thirdSetOfInstructions,
  selectQuizTypeInstructions,
  has_quiz_name,
  quizTypeSelected,
}) {
  return (
    <div className="controls-section">
      {mode === "new_user" ||
        (mode === "returning_user" && !creating_quiz && groups.length === 0 && (
          <>
            <Instructions insturctions={firstSetOfInstructions} />
            <Button
              label="Create Quiz"
              disabled={button_disabled}
              onClick={handleCreateQuiz}
            />
          </>
        ))}

      {mode === "new_user" ||
        (mode === "returning_user" && creating_quiz && (
          <>
            {quizTypeSelected ? (
              <>
                {!has_quiz_name ? (
                  <Instructions insturctions={secondSetOfInstructions} />
                ) : (
                  <Instructions insturctions={thirdSetOfInstructions} />
                )}
                {!creating_quiz && (
                  <Button
                    label="Create Quiz"
                    disabled={button_disabled}
                    onClick={handleCreateQuiz}
                  />
                )}
              </>
            ) : (
              <Instructions insturctions={selectQuizTypeInstructions} />
            )}
          </>
        ))}

      {mode === "returning_user" && groups.length > 0 && !creating_quiz && (
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
