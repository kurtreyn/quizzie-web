import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setButtonDisabled,
  setCreatingQuiz,
  setGroups,
  setActiveGroup,
  setQuizReset,
  setIsImageQuiz,
  setQuizTypeSelected,
  setHasQuizName,
  // setEditQuiz,
} from "../redux/controls";
import {
  firstSetOfInstructions,
  secondSetOfInstructions,
  thirdSetOfInstructions,
  groupsPresent,
  selectQuizTypeInstructions,
  imageQuizSetupInstructions,
} from "../shared/quizInstructions";
import { db } from "../firebase";
import {
  getDocs,
  doc,
  deleteDoc,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { ToastContainer } from "react-toastify";
import Menu from "../components/Menu";
import Quiz from "../components/Quiz";
import Results from "../components/Results";
import ControlsSection from "../components/ControlsSection";
import QuizListandFormSection from "../components/QuizListandFormSection";
import FirebaseClass from "../classes/FirebaseClass";
import AlertClass from "../classes/AlertClass";
import "../styles/homeStyle.css";

export default function Home() {
  const dispatch = useDispatch();
  const {
    groups,
    active_group,
    button_disabled,
    creating_quiz,
    has_quiz_name,
    quiz_reset,
    view_results,
    new_quiz_added,
    // edit_quiz,
    isImageQuiz,
    quizTypeSelected,
  } = useSelector((state) => state.controls);
  const { current_user } = useSelector((state) => state.user);
  const [mode, setMode] = useState("new_user");
  const [quizActive, setQuizActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const fb = new FirebaseClass();
  const ac = new AlertClass();
  let groupLength;
  if (groups) {
    groupLength = groups.length;
  }

  const handleCreateQuiz = () => {
    dispatch(setButtonDisabled(true));
    dispatch(setCreatingQuiz(true));
  };

  const handleCancelCreateQuiz = () => {
    reset();
  };

  const reset = () => {
    dispatch(setButtonDisabled(false));
    dispatch(setCreatingQuiz(false));
    dispatch(setQuizReset(true));
    dispatch(setIsImageQuiz(false));
    dispatch(setQuizTypeSelected(false));
    dispatch(setHasQuizName(false));
  };

  const handleQuizStatus = (theId) => {
    let chosenGroup = groups.filter((group) => {
      if (group.id === theId) {
        return group;
      }
    });

    setQuizActive(true);
    dispatch(setActiveGroup(chosenGroup));
  };

  const runFetchQuizzes = () => {
    const postRef = query(
      collection(db, "users", `${current_user.email}`, `posts`),
      orderBy("createdAt", "desc")
    );
    getDocs(postRef)
      .then((snapshot) => {
        let posts = [];
        snapshot.docs.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        dispatch(setGroups(posts));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteQuizPost = async (postId) => {
    const docRef = doc(db, "users", `${current_user.email}`, `posts`, postId);
    await deleteDoc(docRef)
      .then(ac.successAlert("Quiz deleted successfully"))
      .then(runFetchQuizzes())
      .catch((error) => {
        alert(error);
      });
  };

  const deleteQuiz = async (postId) => {
    let includesImage = false;
    const docRef = doc(db, "users", `${current_user.email}`, `posts`, postId);
    const post = groups.filter((group) => group.id === postId);
    if (post[0].post_q_a[0].image) {
      includesImage = true;
    }
    if (includesImage) {
      const quizName = post[0].subject_name;
      await fb
        .deletePost(postId, current_user, quizName)
        .then(() => {
          ac.successAlert("Quiz deleted successfully");
          reset();
          runFetchQuizzes();
        })
        .catch((error) => {
          ac.errorAlert("Error deleting quiz", error);
        });
    } else {
      await deleteQuizPost(postId);
    }
  };

  const handleDeleteQuiz = () => {
    deleteQuiz(quizId);
    setShowModal(false);
    setQuizId(null);
  };

  useEffect(() => {
    setQuizActive(false);
    dispatch(setQuizReset(false));
    dispatch(setCreatingQuiz(false));
    runFetchQuizzes();
    if (current_user && groups) {
      setMode("returning_user");
    }
  }, [groupLength, quiz_reset, new_quiz_added]);

  return (
    <div className="home-container">
      <Menu handleCancelCreateQuiz={handleCancelCreateQuiz} />
      <div className="main-section">
        {!quizActive && (
          <ControlsSection
            mode={mode}
            groupsPresent={groupsPresent}
            button_disabled={button_disabled}
            handleCreateQuiz={handleCreateQuiz}
            groups={groups}
            creating_quiz={creating_quiz}
            has_quiz_name={has_quiz_name}
            firstSetOfInstructions={firstSetOfInstructions}
            secondSetOfInstructions={secondSetOfInstructions}
            thirdSetOfInstructions={thirdSetOfInstructions}
            selectQuizTypeInstructions={selectQuizTypeInstructions}
            imageQuizSetupInstructions={imageQuizSetupInstructions}
            isImageQuiz={isImageQuiz}
            quizTypeSelected={quizTypeSelected}
          />
        )}
        {!quizActive && (
          <QuizListandFormSection
            mode={mode}
            groups={groups}
            handleQuizStatus={handleQuizStatus}
            creating_quiz={creating_quiz}
            runFetchQuizzes={runFetchQuizzes}
            handleDeleteQuiz={handleDeleteQuiz}
            handleCancelCreateQuiz={handleCancelCreateQuiz}
            showModal={showModal}
            setShowModal={setShowModal}
            quizId={quizId}
            setQuizId={setQuizId}
            isImageQuiz={isImageQuiz}
            quizTypeSelected={quizTypeSelected}
          />
        )}
      </div>

      {quizActive && !view_results && (
        <div className="quiz-section">
          {active_group &&
            active_group.map((group, index) => {
              return (
                <Quiz
                  group={group}
                  key={index}
                  subjectName={group.subject_name}
                />
              );
            })}
        </div>
      )}

      {quizActive && view_results && <Results />}
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
