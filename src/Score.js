import React, { Component } from 'react';

class Score extends Component {
  handleFocus = event => event.target.select();

  assembleScores = scores => {
    const { name } = this.props;
    return scores
      .map(score => {
        const {
          started,
          ended,
          misses,
          params: { fps }
        } = score;
        return `"${name}",${fps},${started},${ended},${ended -
          started},${misses}`;
      })
      .join('\n');
  };

  render() {
    const { scores, onRestart } = this.props;
    const formattedScore = this.assembleScores(scores);
    return (
      <div className="container">
        <h1>You did it!</h1>
        <p>Please copy and share your score data</p>
        <textarea onFocus={this.handleFocus} value={formattedScore} />
        <button onClick={onRestart}>Play Again</button>
      </div>
    );
  }
}

export default Score;
