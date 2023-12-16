function Progress({ questionsNum, index, points, sumPoints, answer }) {
  return (
    <header className='progress'>
      <progress value={index + Number(answer !== null)} max={questionsNum} />
      <p>
        {index + 1} / {questionsNum} Question
      </p>
      <p>
        {points} / {sumPoints} Points
      </p>
    </header>
  );
}

export default Progress;
