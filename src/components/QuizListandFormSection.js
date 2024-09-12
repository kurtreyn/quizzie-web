import React from "react";
// import { setQuizType, setIsImageQuiz } from "../redux/controls";
// import { useDispatch } from "react-redux";
import GroupContainer from "./GroupContainer";
import AddQuizForm from "./AddQuizForm";
import AddImageQuizForm from "./AddImageQuizForm";
import QuizTypeForm from "./QuizTypeForm";
import Modal from "./Modal";

export default function QuizListandFormSection({
  mode,
  groups,
  handleQuizStatus,
  handleCancelCreateQuiz,
  creating_quiz,
  // runFetchQuizes,
  handleDeleteQuiz,
  showModal,
  setShowModal,
  setQuizId,
  isImageQuiz,
  quizTypeSelected,
}) {
  // const dispatch = useDispatch();
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
      {mode === "new_user" ||
        (mode === "returning_user" &&
          creating_quiz &&
          (!quizTypeSelected ? (
            <QuizTypeForm />
          ) : isImageQuiz ? (
            <AddImageQuizForm handleCancelCreateQuiz={handleCancelCreateQuiz} />
          ) : (
            <AddQuizForm handleCancelCreateQuiz={handleCancelCreateQuiz} />
          )))}

      {mode === "returning_user" && groups && !creating_quiz && (
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
