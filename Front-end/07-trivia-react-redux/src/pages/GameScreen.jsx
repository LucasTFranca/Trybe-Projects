import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { questActionThunk, scoreAction } from '../actions';

class GameScreen extends React.Component {
  constructor() {
    super();
    this.randomAnswer = this.randomAnswer.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.countdown = this.countdown.bind(this);
    this.timer = this.timer.bind(this);
    this.localStorageUpdate = this.localStorageUpdate.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.nextAnswer = this.nextAnswer.bind(this);

    this.state = {
      answers: [],
      correctAnswer: '',
      rigthBorder: '',
      wrongBorder: '',
      disable: false,
      countdown: 30,
      index: 0,
    };
  }

  async componentDidMount() {
    const { token, requestQuestions } = this.props;
    await requestQuestions(token);
    this.randomAnswer();
    this.countdown();
    this.timer();
  }

  randomAnswer() {
    const { index: questIndex } = this.state;
    const { quest } = this.props;
    const {
      incorrect_answers: incorrectAnswer,
      correct_answer: correctAnswer } = quest.results[questIndex];
    const arrayLength = incorrectAnswer.length + 1;
    const arrayAnswers = Array(arrayLength).fill('');
    const randomNumber = Math.floor(Math.random() * arrayLength);
    let count = 0;

    arrayAnswers.forEach((__, index) => {
      if (index === randomNumber) arrayAnswers[index] = correctAnswer;
      else {
        arrayAnswers[index] = incorrectAnswer[count];
        count += 1;
      }
    });

    this.setState({ answers: arrayAnswers, correctAnswer });
  }

  clickChange({ target }) {
    const { id } = target;
    const { countdown, index } = this.state;
    const { quest, scoreUpdater } = this.props;
    const { difficulty } = quest.results[index];
    const NUMBER_POINTS = 10;
    const HARD_POINTS = 3;
    let score = 0;

    if (id === 'correct-answer') {
      switch (difficulty) {
      case 'hard':
        score = NUMBER_POINTS + (countdown * HARD_POINTS);
        break;
      case 'medium':
        score = NUMBER_POINTS + (countdown * 2);
        break;
      default:
        score = NUMBER_POINTS + (countdown * 1);
      }
      scoreUpdater(score);
      this.localStorageUpdate(score);
    }

    this.setState({
      rigthBorder: 'green-border',
      wrongBorder: 'red-border',
      disable: true,
    });
  }

  localStorageUpdate(score = 0) {
    const { player: { name, gravatarEmail } } = this.props;

    if (localStorage.state) {
      const state = JSON.parse(localStorage.state);
      const { score: stateScore, assertions } = state.player;

      const playerObject = {
        player: {
          ...state.player,
          assertions: assertions + 1,
          score: score + stateScore,
        },
      };

      localStorage.state = JSON.stringify(playerObject);
    } else {
      const playerObject = { player: { name, assertions: 0, score: 0, gravatarEmail } };
      localStorage.state = JSON.stringify(playerObject);
    }
  }

  timer() {
    const TIME_LEFT = 30000;

    setTimeout(() => {
      this.setState({ disable: true });
    }, TIME_LEFT);
  }

  countdown() {
    const TIME_UPDATE = 1000;
    this.timeout = setInterval(() => {
      const { countdown } = this.state;
      this.setState({ countdown: countdown - 1 });
    }, TIME_UPDATE);
  }

  nextAnswer() {
    const { history } = this.props;
    const { index } = this.state;
    const INDEX_LIMIT = 4;

    if (index < INDEX_LIMIT) {
      this.setState({
        index: index + 1,
        disable: false,
        countdown: 30,
        rigthBorder: '',
        wrongBorder: '',
      }, () => {
        this.randomAnswer();
        this.countdown();
      });
    } else {
      history.push('/feedback');
    }
  }

  renderButtons() {
    const { quest } = this.props;
    const {
      answers,
      correctAnswer,
      rigthBorder,
      wrongBorder,
      disable,
      countdown,
      index: questIndex,
    } = this.state;
    return (
      <div>
        <h1 data-testid="question-category">{ quest.results[questIndex].category }</h1>
        <p data-testid="question-text">{ quest.results[questIndex].question }</p>
        <h3>{ countdown }</h3>
        { disable && clearInterval(this.timeout)}
        { answers && answers.map((answer, index) => {
          if (answer === correctAnswer) {
            return (
              <button
                data-testid="correct-answer"
                id="correct-answer"
                key={ answer }
                type="button"
                disabled={ disable }
                className={ rigthBorder }
                onClick={ this.clickChange }
              >
                { answer }
              </button>
            );
          }
          return (
            <button
              data-testid={ `wrong-answer-${index}` }
              key={ answer }
              disabled={ disable }
              className={ wrongBorder }
              onClick={ this.clickChange }
              type="button"
            >
              { answer }
            </button>
          );
        }) }
      </div>
    );
  }

  render() {
    if (!localStorage.state) this.localStorageUpdate();
    const { disable } = this.state;
    const { quest } = this.props;
    if (!quest.results) return <h1>loading</h1>;

    return (
      <div>
        { this.renderButtons() }
        { disable
          && (
            <button
              data-testid="btn-next"
              onClick={ this.nextAnswer }
              type="button"
            >
              Próxima
            </button>)}
      </div>
    );
  }
}

GameScreen.propTypes = {
  token: PropTypes.string,
  requestQuestions: PropTypes.objectOf(PropTypes.string),
  quest: PropTypes.objectOf(PropTypes.string),
}.isRequired;

const mapStateToProps = ({ token, quest, player }) => ({
  token,
  quest,
  player,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (token) => (dispatch(questActionThunk(token))),
  scoreUpdater: (score) => dispatch(scoreAction(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
