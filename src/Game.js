import React, { Component } from 'react';

import Countdown from './Countdown';
import Stage from './Stage.js';
import Start from './Start.js';

const ready = 'ready';
const countdown = 'countdown';
const playing = 'playing';
const roundComplete = 'roundComplete';
const gameComplete = 'gameComplete';

export const GameState = {
  ready,
  countdown,
  playing,
  roundComplete,
  gameComplete
};

const initialState = {
  gameState: ready,
  gameplayFPS: 60,
  gameplayVelocity: 600,
  name: '',
  round: { number: 0, params: { fps: 60 } },
  scores: []
};

const Rounds = [{ fps: 30 }, { fps: 8 }, { fps: 15 }, { fps: 2 }, { fps: 60 }];

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, initialState);
  }

  // Lifecycle events
  render() {
    const {
      gameState,
      gameplayVelocity,
      round: {
        params: { fps }
      }
    } = this.state;

    if (gameState === ready) {
      return (
        <Start
          onNameChange={name => this.setName(name)}
          onStart={() => this.start()}
        />
      );
    }

    if (gameState === countdown) {
      return <Countdown onComplete={() => this.countdownComplete()} />;
    }

    if ([playing, roundComplete].includes(gameState)) {
      return (
        <Stage
          fps={fps}
          targetHit={gameState !== playing}
          velocity={gameplayVelocity}
          onHit={() => this.hit()}
        />
      );
    }

    return 'TODO';
  }

  // Hooks
  countdownComplete() {
    this.setState({
      gameState: playing
    });
  }

  hit() {
    this.setState({ gameState: roundComplete });
    setTimeout(() => this.nextRound(), 2000);
  }

  restart() {
    const { name } = this.state;
    this.setState(Object.assign({}, this.state, { name }));
  }

  start() {
    this.nextRound();
  }

  setName(name) {
    this.setState({ name });
  }

  // Internal
  done() {
    this.setState({ gameState: gameComplete });
  }

  nextRound() {
    let {
      round: { number: roundNumber }
    } = this.state;
    const roundParams = Rounds[roundNumber];
    roundNumber++;
    if (roundNumber > Rounds.length) {
      return this.done();
    }
    this.setState({
      round: {
        number: roundNumber,
        params: { fps: roundParams.fps }
      }
    });
    this.startCountdown();
  }

  startCountdown() {
    this.setState({ gameState: countdown });
  }
}

export default Game;
