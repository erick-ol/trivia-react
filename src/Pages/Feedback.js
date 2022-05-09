import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Components/Header';
import styles from './css/feedback.module.css';
import FeedbackSvg from '../Components/SVG/FeedbackSvg';
import { resetPlayer } from '../store/player';

const Feedback = () => {
  const { name, score, assertions, image } = useSelector(
    (state) => state.player,
  );
  const [message, setMessage] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Feedback message
    if (assertions < 3) {
      setMessage('Podia ser melhor...');
    } else setMessage('Mandou bem!');

    // Saving at ranking
    const playerRank = {
      picture: image,
      name,
      score,
    };
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([playerRank]));
    } else {
      const players = JSON.parse(localStorage.getItem('ranking'));
      players.push(playerRank);
      localStorage.setItem('ranking', JSON.stringify(players));
    }

    return () => {
      dispatch(resetPlayer());
    };
  }, [assertions, name, score, dispatch, image]);

  return (
    <>
      <div className={styles.purple_aside}>
        <div className={styles.elements_purple}>
          <div className={styles.svg_feedback}>
            <FeedbackSvg />
          </div>
          <div className={styles.feedback_title}>
            <h1>Feedback</h1>
          </div>
        </div>
      </div>

      <div className={styles.white_side}>
        <Header />
        <div className={styles.feedback_text}>
          <p className={styles.message}>{message}</p>
          <p>Você obteve {assertions} acertos</p>
          <p>Um total de {score} pontos</p>
        </div>
        <div className={styles.feedback_btns}>
          <Link to="/ranking">
            <button type="button">Ver Ranking</button>
          </Link>
          <Link to="/">
            <button type="button">Jogar novamente</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Feedback;
