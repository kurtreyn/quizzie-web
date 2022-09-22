import React from 'react';
// import Instructions from './Instructions';
// import Button from './Button';
import GroupContainer from './GroupContainer';
import AddQuizForm from './AddQuizForm';

export default function QuizListandFormSection({
  mode,
  groups,
  handleQuizStatus,
  creating_quiz,
}) {
  return (
    <div className="quiz-and-list-section">
      {mode === 'new_user' ||
        (mode === 'returning_user' && creating_quiz && <AddQuizForm />)}

      {mode === 'returning_user' && groups && !creating_quiz && (
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
      )}
    </div>
  );
}
