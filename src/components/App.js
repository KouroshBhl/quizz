import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Error from './Error';
import Loader from './Loader';
import StartScreen from './StartScreen';
import Questions from './Questions';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Footer from './Footer';

const SECS_PER_QUESTION = 30;

const initialState = {
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  remainingSeconds: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return {
        ...state,
        status: 'ready',
        questions: action.payload,
      };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'startQuizz':
      return {
        ...state,
        status: 'active',
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
      };

    case 'answered':
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };

    case 'timer':
      if (state.remainingSeconds === 0) return { ...state, status: 'finished' };
      return { ...state, remainingSeconds: state.remainingSeconds - 1 };

    case 'finish':
      return { ...state, status: 'finished' };

    case 'resetQuiz':
      return { ...state, status: 'ready', index: 0, answer: null, points: 0 };

    default:
      throw new Error('uncaught status');
  }
}

export default function App() {
  const [
    { status, questions, index, answer, points, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionsNum = questions.length;
  const sumPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(function () {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataRecieved', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className='app'>
      <Header />

      <Main className='main'>
        {status === 'error' && <Error />}
        {status === 'loading' && <Loader />}
        {status === 'ready' && (
          <StartScreen questionsNum={questionsNum} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              questionsNum={questionsNum}
              index={index}
              points={points}
              sumPoints={sumPoints}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer remainingSeconds={remainingSeconds} dispatch={dispatch} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={index}
                questionsNum={questionsNum}
              />
            </Footer>
          </>
        )}

        {status === 'finished' && (
          <FinishScreen
            sumPoints={sumPoints}
            points={points}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
