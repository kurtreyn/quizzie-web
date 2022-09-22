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
import { colRef, db } from '../firebase';
import { getDocs, doc, deleteDoc, collectionGroup } from 'firebase/firestore';
import Menu from '../components/Menu';
import AddQuizForm from '../components/AddQuizForm';
import Quiz from '../components/Quiz';
import Instructions from '../components/Instructions';
import Button from '../components/Button';
import Results from '../components/Results';
import GroupContainer from '../components/GroupContainer';
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
  const [quizActive, setQuizActive] = useState(false);
  const [loading, setLoading] = useState(false);

  let groupLength;

  if (groups) {
    groupLength = groups.length;
  }

  const handleCreqteQuiz = () => {
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
    getDocs(colRef)
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
  }, [groupLength, quiz_reset]);

  console.log(`button_disabled`, button_disabled);
  console.log(`creating_quiz`, creating_quiz);
  console.log('groups', groups);

  return (
    <div className="home-container">
      <Menu />

      {groups && !quizActive && !creating_quiz && (
        <div className="main-section">
          <div className="controls-section">
            <>
              <Instructions insturctions={groupsPresent} />
              <Button
                label="Create Quiz"
                disabled={button_disabled}
                onClick={handleCreqteQuiz}
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
      )}

      {quizActive && (
        <div className="main-section">
          <div className="controls-section">
            {creating_quiz && (
              <>
                <Instructions insturctions={firstSetOfInstructions} />
                <Button
                  label="Create Quiz"
                  disabled={button_disabled}
                  onClick={handleCreqteQuiz}
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
        </div>
      )}

      {view_results && quizActive && <Results />}

      <div className="quiz-section">
        {quizActive && !view_results && <Quiz />}
      </div>
    </div>
  );
}
