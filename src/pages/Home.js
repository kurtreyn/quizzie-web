import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setButtonDisabled,
  setCreatingQuiz,
  setGroups,
  setActiveGroup,
  setQuizReset,
  setViewResults,
} from '../redux/controls';
import {
  firstSetOfInstructions,
  secondSetOfInstructions,
  thirdSetOfInstructions,
  groupsPresent,
} from '../shared/quizInstructions';
import { colGroupRef, db } from '../firebase';
import { getDocs, doc, deleteDoc, collectionGroup } from 'firebase/firestore';
import Menu from '../components/Menu';
import AddQuizForm from '../components/AddQuizForm';
import Quiz from '../components/Quiz';
import Instructions from '../components/Instructions';
import Button from '../components/Button';
import Results from '../components/Results';
import GroupContainer from '../components/GroupContainer';

import ControlsSection from '../components/ControlsSection';
import QuizListandFormSection from '../components/QuizListandFormSection';
import qzzIcon from '../assets/icon.png';

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
  } = useSelector((state) => state.controls);
  const { current_user } = useSelector((state) => state.user);
  const [mode, setMode] = useState('new_user');
  const [quizActive, setQuizActive] = useState(false);
  const [loading, setLoading] = useState(false);

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
    console.log('handleQuizStatus theId:', theId);
    let chosenGroup = groups.map((group) => {
      if (group.id === theId) {
        return group;
      }
    });
    setQuizActive(true);
    dispatch(setActiveGroup(chosenGroup));
  };

  const runUnsubscribe = () => {
    getDocs(colGroupRef)
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
    runUnsubscribe();
    if (current_user) {
      setMode('returning_user');
    }
  }, [groupLength, quiz_reset]);

  // console.log(`button_disabled`, button_disabled);
  console.log('current_user', current_user);
  console.log(`creating_quiz`, creating_quiz);
  console.log('groups', groups);
  console.log('mode', mode);

  return (
    <div className="home-container">
      <Menu />
      <div className="main-section">
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
        <QuizListandFormSection
          mode={mode}
          groups={groups}
          handleQuizStatus={handleQuizStatus}
          creating_quiz={creating_quiz}
        />
      </div>

      {quizActive && !view_results && (
        <div className="quiz-section">
          <Quiz />
        </div>
      )}

      {quizActive && view_results && <Results />}
    </div>
  );
}
