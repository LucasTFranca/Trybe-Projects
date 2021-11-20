import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedBack extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const FEEDBACK_NUMBER = 3;
    return (
      <div data-testid="feedback-text">
        { assertions < FEEDBACK_NUMBER ? 'Podia ser melhor...' : 'Mandou bem!' }
        <p>
          <span data-testid="feedback-total-score">{ score }</span>
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
      </div>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

export default connect(mapStateToProps)(FeedBack);
