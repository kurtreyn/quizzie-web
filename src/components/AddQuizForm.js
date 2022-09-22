import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHasQuizName, setNameOfQuizDispatch } from '../redux/controls';
import { colRef, db, auth } from '../firebase';
import { getDocs, doc, deleteDoc, collectionGroup } from 'firebase/firestore';
import Button from './Button';
import '../styles/addQuizFormStyle.css';

export default function AddQuizForm() {
  const dispatch = useDispatch();
  const { has_quiz_name, name_of_quiz } = useSelector(
    (state) => state.controls
  );
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);
  const [quizName, setQuizName] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [number, setNumber] = useState(0);
  const [quizSet, setQuizSet] = useState([]);

  const handleAddQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleAddQAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const handleQuizNameStatus = () => {
    dispatch(setHasQuizName(true));
    dispatch(setNameOfQuizDispatch(quizName));
  };

  const handleAddQandA = (e) => {
    e.preventDefault();
    if (quizSet === null) {
      setQuizSet([
        {
          question: question,
          correct_answer: answer,
          incorrect_answers: [],
        },
      ]);
    } else {
      setQuizSet((prevState) => {
        return [
          ...prevState,
          { question: question, correct_answer: answer, incorrect_answers: [] },
        ];
      });
    }
    setQuestion('');
    setAnswer('');
    setNumber(number + 1);
  };

  const handleReset = () => {
    dispatch(setHasQuizName(false));
    dispatch(setNameOfQuizDispatch(''));
    setQuizName('');
    setNumber(0);
  };

  const uploadPostToFirebase = (posts) => {
    // const unsubscribe = db
    //   .collection('users')
    //   .doc(auth().currentUser.email)
    //   .collectionGroup('posts')
    //   .add({
    //     user: currentLoggedInUser.username,
    //     profile_picture: currentLoggedInUser.profilePicture,
    //     owner_uid: auth().currentUser.uid,
    //     owner_email: auth().currentUser.email,
    //     subject_name: name_of_quiz,
    //     post_q_a: posts,
    //     createdAt: new Date(),
    //   });
    // return unsubscribe;
  };

  const handleSubmitQuiz = () => {
    uploadPostToFirebase(quizSet);
  };

  const getUserName = () => {
    // const user = auth().currentUser;
    // const unsubscribe = db
    //   .collection('users')
    //   .where('owner_uid', '==', user.uid)
    //   .limit(1)
    //   .onSnapshot((snapshot) =>
    //     snapshot.docs.map((doc) => {
    //       setCurrentLoggedInUser({
    //         username: doc.data().username,
    //         profilePicture: doc.data().profile_picture,
    //       });
    //     })
    //   );
    // return unsubscribe;
  };

  useEffect(() => {
    getUserName();
  }, []);

  //   console.log('quizName', quizName);
  console.log('name_of_quiz', name_of_quiz);
  console.log('question', question);
  console.log('answer', answer);
  console.log('number', number);
  console.log('quizSet', quizSet);

  return (
    <div className="add-quiz-container">
      <div className="form-container">
        {!has_quiz_name && (
          <>
            <form action="" className="add-quiz-form">
              <label htmlFor="quiz-name" className="add-quiz-label">
                Enter A Name for Your Quiz
              </label>
              <input
                id="quiz-name"
                type="text"
                placeholder="enter the quiz name here"
                className="add-quiz-input"
                onChange={(e) => setQuizName(e.target.value)}
              />
            </form>
            <Button label="Add Quiz Name" onClick={handleQuizNameStatus} />
          </>
        )}

        {has_quiz_name && (
          <>
            <form action="" className="add-quiz-form">
              <label htmlFor="question" className="add-quiz-label">
                Enter Question
              </label>
              <input
                id="question"
                type="text"
                value={question}
                placeholder="enter the question here"
                className="add-quiz-input"
                onChange={handleAddQuestion}
              />
              <label htmlFor="question" className="add-quiz-label">
                Enter Answer
              </label>
              <input
                id="answer"
                type="text"
                value={answer}
                placeholder="enter the answer here"
                className="add-quiz-input"
                onChange={handleAddQAnswer}
              />
            </form>
            <Button label="Add Question & Answer" onClick={handleAddQandA} />
            <Button
              btnType="submit"
              label="Submit"
              onClick={handleSubmitQuiz}
            />
            <Button btnType="reset" label="Reset" onClick={handleReset} />
          </>
        )}
      </div>
    </div>
  );
}
