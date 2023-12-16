function FinishScreen({ sumPoints, points }) {
  const percentage = (points / sumPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🎉';
  if (percentage >= 50 && percentage < 80) emoji = '🤩';
  if (percentage < 50 && percentage > 0) emoji = '🤔';
  if (percentage === 0) emoji = '😕';

  return (
    <>
      <p className='result'>
        <span>{emoji}</span> you scored <strong>{points}</strong> out of{' '}
        {sumPoints} ({Math.ceil(percentage)}%)
      </p>

      <button className='btn btn-ui'></button>
    </>
  );
}

export default FinishScreen;
