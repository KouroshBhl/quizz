import { useEffect } from 'react';

function Timer({ remainingSeconds, dispatch }) {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = Math.floor(remainingSeconds % 60);
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: 'timer' });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className='timer'>
      {minutes < 10 && '0'}
      {minutes}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
}

export default Timer;
