import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Error from './Error';
import Loader from './Loader';
import StartScreen from './StartScreen';
import Questions from './Questions';

const initialState = {
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  questions: [],
  index: 0,
  answer: null,
  points: 0,
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

    default:
      break;
  }
}

export default function App() {
  const [{ status, questions, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const questionsNum = questions.length;

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
          <Questions
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}
