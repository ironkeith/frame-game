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
  gameplayVelocity: 150,
  name: '',
  round: { number: 0, params: {} },
  scores: []
};

const Rounds = [{ fps: 2 }, { fps: 30 }, { fps: 8 }, { fps: 15 }, { fps: 60 }];

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, initialState);
  }

  // Lifecycle events
  render() {
    const { gameplayVelocity, gameState, name, round, scores } = this.state;

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
          targetHit={gameState !== playing}
          velocity={gameplayVelocity}
          onHit={() => this.hit()}
        />
      );
    }

    return 'TODO';

    // return children(gameState, name, round, scores, {
    //   hit: () => this.hit(),
    //   restart: () => this.restart(),
    //   start: () => this.start(),
    //   setName: () => this.setName(name)
    // });
  }

  componentWillUnmount() {}

  // Hooks
  countdownComplete() {
    const {
      round: { number }
    } = this.state;
    this.setState({ gameState: playing, round: { params: Rounds[number] } });
  }

  hit() {
    console.log('HIT');
    this.setState({ gameState: roundComplete });
    // setTimeout(() => this.nextRound(), 3000);
  }

  restart() {
    const { name } = this.state;
    this.setState(Object.assign({}, this.state, { name }));
  }

  start() {
    this.nextRound();
  }

  setName(name) {
    console.log(name);
    this.setState({ name });
  }

  // Internal
  done() {
    this.setState({ gameState: gameComplete });
  }

  nextRound() {
    let {
      round: { number: roundNumber, params }
    } = this.state;

    roundNumber++;
    if (roundNumber + 1 > Rounds.length) {
      return this.done();
    }
    this.startCountdown();
  }

  startCountdown() {
    this.setState({ gameState: countdown });
  }
}

export default Game;
