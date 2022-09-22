export const firstSetOfInstructions = () => {
  return (
    <div className="instructions-wrapper">
      <h1 className="instructions-header">Welcome to Quizzie!</h1>
      <p className="instructions-text">
        Now that you've signed up, let's start making some quizzes! Start by
        pressing the "<strong>Create Quiz</strong>" button.
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
        finished, just click the <strong>Submit Quiz</strong> button.
        <br />
        Or, if you need to start over click the <strong>Reset Button</strong>
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
        Or, if you want to add another Quiz, click the{' '}
        <strong>Create Quiz</strong> button.
      </p>
    </div>
  );
};
