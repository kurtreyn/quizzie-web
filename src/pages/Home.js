import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setButtonDisabled,
  setCreatingQuiz,
  setGroups,
  setActiveGroup,
  setQuizReset,
} from '../redux/controls';
import {
  firstSetOfInstructions,
  secondSetOfInstructions,
  thirdSetOfInstructions,
  groupsPresent,
} from '../shared/quizInstructions';
import { db } from '../firebase';
import { getDocs, doc, deleteDoc, collection } from 'firebase/firestore';
import Menu from '../components/Menu';
import Quiz from '../components/Quiz';
import Results from '../components/Results';
import ControlsSection from '../components/ControlsSection';
import QuizListandFormSection from '../components/QuizListandFormSection';
import '../styles/homeStyle.css';

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
  } = useSelector((state) => state.controls);
  const { current_user } = useSelector((state) => state.user);
  const [mode, setMode] = useState('new_user');
  const [quizActive, setQuizActive] = useState(false);
  let groupLength;
  if (groups) {
    groupLength = groups.length;
  }

  const handleCreateQuiz = () => {
    console.log('creating quiz');
    dispatch(setButtonDisabled(true));
    dispatch(setCreatingQuiz(true));
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
    const postRef = collection(db, 'users', `${current_user.email}`, `posts`);
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

  const deleteGroup = (postId) => {
    const docRef = doc(db, 'posts', postId);
    deleteDoc(docRef).then(() => {
      console.log('deleted post:', postId);
    });
  };

  const handleDeleteQuiz = (postId) => {
    deleteGroup(postId);
  };

  useEffect(() => {
    setQuizActive(false);
    dispatch(setQuizReset(false));
    runFetchQuizzes();
    if (current_user && groups) {
      setMode('returning_user');
    }
  }, [groupLength, quiz_reset, new_quiz_added]);

  return (
    <div className="home-container">
      <Menu />
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
          />
        )}
        {!quizActive && (
          <QuizListandFormSection
            mode={mode}
            groups={groups}
            handleQuizStatus={handleQuizStatus}
            creating_quiz={creating_quiz}
            runFetchQuizzes={runFetchQuizzes}
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
    </div>
  );
}
