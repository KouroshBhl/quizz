function NextButton({ answer, dispatch, index, questionsNum }) {
  if (answer === null) return;

  if (index + 1 < questionsNum)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );

  if (questionsNum === index + 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'finish' })}
      >
        Finish
      </button>
    );
}

export default NextButton;
