import React from 'react';
import Instructions from './Instructions';
import Button from './Button';
import GroupContainer from './GroupContainer';

export default function ExistingGroup({
  groupsPresent,
  button_disabled,
  handleCreateQuiz,
  groups,
  handleQuizStatus,
}) {
  return (
    <div className="existing-group">
      <div className="controls-section">
        <>
          <Instructions insturctions={groupsPresent} />
          <Button
            label="Create Quiz"
            disabled={button_disabled}
            onClick={handleCreateQuiz}
          />
        </>
      </div>
      <div className="quiz-and-list-section">
        <div className="group-wrapper">
          {groups.map((group, index) => {
            return (
              <GroupContainer
                id={group.id}
                key={index}
                label={group.subject_name}
                group={group}
                onClick={() => handleQuizStatus(group.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/*
GROUPS && !QUIZACTIVE && !CREATEQUIZ
  <div className="controls-section">
            <>
              <Instructions insturctions={groupsPresent} />
              <Button
                label="Create Quiz"
                disabled={button_disabled}
                onClick={handleCreateQuiz}
              />
            </>
          </div>
          <div className="quiz-and-list-section">
            <div className="group-wrapper">
              {groups.map((group, index) => {
                return (
                  <GroupContainer
                    id={group.id}
                    key={index}
                    label={group.subject_name}
                    group={group}
                    onClick={() => handleQuizStatus(group.id)}
                  />
                );
              })}
            </div>
          </div>

-----------------------------------------------

QUIZ_ACTIVE && 
   <div className="controls-section">
            {creating_quiz && (
              <>
                <Instructions insturctions={firstSetOfInstructions} />
                <Button
                  label="Create Quiz"
                  disabled={button_disabled}
                  onClick={handleCreateQuiz}
                />
              </>
            )}

            {creating_quiz && !has_quiz_name && (
              <Instructions insturctions={secondSetOfInstructions} />
            )}

            {creating_quiz && has_quiz_name && (
              <Instructions insturctions={thirdSetOfInstructions} />
            )}
          </div>

           <div className="quiz-and-list-section">
            {creating_quiz && <AddQuizForm />}
          </div>
-----------------------------------------------

 {view_results && quizActive && <Results />}

 ----------------------------------------------


  <div className="quiz-section">
        {quizActive && !view_results && <Quiz />}
      </div>





          <div className="group-wrapper">
              {groups.map((group, index) => {
                return (
                  <GroupContainer
                    id={group.id}
                    key={index}
                    label={group.subject_name}
                    group={group}
                    onClick={() => handleQuizStatus(group.id)}
                  />
                );
              })}
            </div>
*/
