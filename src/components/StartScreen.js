function StartScreen({ questionsNum, dispatch }) {
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionsNum} questions to test your React mastery</h3>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'startQuizz' })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
