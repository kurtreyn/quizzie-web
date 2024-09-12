export const firstSetOfInstructions = () => {
  return (
    <div className="instructions-wrapper">
      <h1 className="instructions-header">Welcome to Quizzie!</h1>
      <p className="instructions-text">
        Now that you've signed up, let's start making some quizzes! Start by
        pressing the "<strong className="click-reference">Create Quiz</strong>"
        button.
      </p>
    </div>
  );
};

export const secondSetOfInstructions = () => {
  return (
    <div className="instructions-wrapper">
      <p className="instructions-text">
        Let's get started by adding a name for your quiz.
      </p>
    </div>
  );
};

export const thirdSetOfInstructions = () => {
  return (
    <div className="instructions-wrapper">
      <p className="instructions-text">
        Solid name! Now lets add some questions and answers. When you're
        finished, just click the{" "}
        <strong className="click-reference">Submit Quiz</strong> button.
        <br />
        Or, if you need to start over click the{" "}
        <strong className="click-reference">Reset Button</strong>
      </p>
    </div>
  );
};

export const groupsPresent = () => {
  return (
    <div className="instructions-wrapper">
      <p className="instructions-text">
        Looks like you have some quizes already. If you want to review one of
        your existing quizes, just click on the Quiz you would like to take.
        <br />
        Or, if you want to add another Quiz, click the{" "}
        <strong className="click-reference">Create Quiz</strong> button.
      </p>
    </div>
  );
};

export const selectQuizTypeInstructions = () => {
  return (
    <div className="instructions-wrapper">
      <p className="instructions-text">
        Select which type of quiz you would like to create.
      </p>
    </div>
  );
};

export const imageQuizSetupInstructions = () => {
  return (
    <div className="instructions-wrapper">
      <p className="instructions-text">
        Solid name! Now lets add some questions and answers. When you're
        finished, just click the{" "}
        <strong className="click-reference">Submit Quiz</strong> button.
        <br />
        Or, if you need to start over click the{" "}
        <strong className="click-reference">Reset Button</strong>
      </p>
      <br />
      <ul className="instruction-text-list">
        <li className="instructions-text-li">
          <strong>First:</strong> Type out your question in the Enter Question
          input field
        </li>
        <li className="instructions-text-li">
          <strong>Second:</strong> Click the "Choose image file(s)" button to
          select an image file for the answer
        </li>
        <li className="instructions-text-li">
          <strong>Third:</strong> Click the "Add Question & Answer" button to
          add the question and answer to the quiz
        </li>
        <li className="instructions-text-li">
          <strong>Finally:</strong> When you have entered all the questions and
          answers, click the "Submit Quiz" button to submit the quiz
        </li>
      </ul>
    </div>
  );
};
