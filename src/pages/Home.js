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
import { db } from '../firebase';
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
  let groupLength;

  if (groups) {
    groupLength = groups.length;
  }

  const handleCreqteQuiz = () => {
    dispatch(setButtonDisabled(true));
    dispatch(setCreatingQuiz(true));
  };

  const handleQuizStatus = (theId) => {
    let chosenGroup = groups.filter((group) => {
      if (group.id === theId) {
        return group;
      }
    });
    setQuizActive(!quizActive);
    dispatch(setActiveGroup(chosenGroup));
  };

  const runUnsubscribe = () => {
    const unsubscribe = db
      .collectionGroup('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        dispatch(
          setGroups(
            snapshot.docs.map((post) => ({ id: post.id, ...post.data() }))
          )
        );
      });

    return unsubscribe;
  };

  const deleteGroup = (postId) => {
    console.log('deleting id:', postId);
    const unsubscribe = db
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
        runUnsubscribe();
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
    return unsubscribe;
  };

  const handleDeleteQuiz = (postId) => {
    deleteGroup(postId);
  };

  useEffect(() => {
    // setQuizActive(false);
    // dispatch(setQuizReset(false));
    // runUnsubscribe();
  }, [groupLength, quiz_reset]);

  console.log(`button_disabled`, button_disabled);
  console.log(`creating_quiz`, creating_quiz);

  return (
    <div className="home-container">
      <Menu />

      {groups && (
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
      )}

      {!quizActive && (
        <div className="main-section">
          <div className="controls-section">
            {creating_quiz ? null : (
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
