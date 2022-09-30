import React from 'react';
import GroupContainer from './GroupContainer';
import AddQuizForm from './AddQuizForm';
import Modal from './Modal';

export default function QuizListandFormSection({
  mode,
  groups,
  handleQuizStatus,
  creating_quiz,
  runFetchQuizes,
  handleDeleteQuiz,
  showModal,
  setShowModal,
  setQuizId,
}) {
  const handleSetQuizId = (id) => {
    setQuizId(id);
    setShowModal(true);
  };

  const handleCancelDelete = () => {
    setQuizId(null);
    setShowModal(false);
  };

  return (
    <div className="quiz-and-list-section">
      {mode === 'new_user' ||
        (mode === 'returning_user' && creating_quiz && (
          <AddQuizForm runFetchQuizes={runFetchQuizes} />
        ))}

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
                onMouseUp={() => handleSetQuizId(group.id)}
              />
            );
          })}
        </div>
      )}

      {showModal && (
        <Modal onMouseUp={handleDeleteQuiz} onClick={handleCancelDelete} />
      )}
    </div>
  );
}
