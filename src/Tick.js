import React, { Component } from 'react';

class Tick extends Component {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    // reset the timer if fps has been changed
    if (this.props.fps !== prevProps.fps) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  startTimer() {
    const { fps, onTick } = this.props;

    const frameInterval = 1000 / fps;

    this.timerId = setInterval(() => onTick(), frameInterval);
  }
}

export default Tick;
