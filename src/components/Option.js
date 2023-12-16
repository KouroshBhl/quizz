function Option({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className='options'>
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? 'answer' : ''} ${
              hasAnswered
                ? question.correctOption === index
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            key={option}
            onClick={() => dispatch({ type: 'answered', payload: index })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Option;
