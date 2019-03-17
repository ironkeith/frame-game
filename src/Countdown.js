import React, { Component } from 'react';
import './Countdown.css';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: 3
    };
  }
  componentDidMount() {
    const { onComplete } = this.props;
    this.timerID = setInterval(() => {
      this.setState(prevState => {
        let timeRemaining = prevState.timeRemaining - 1;
        if (timeRemaining === 0) {
          onComplete();
          clearInterval(this.timerID);
        }
        return { timeRemaining };
      });
    }, 1000);
  }

  render() {
    const { timeRemaining } = this.state;
    return <h1 className="countdown_timer">{timeRemaining}</h1>;
  }
}

export default Countdown;
