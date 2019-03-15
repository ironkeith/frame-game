import React, { Component } from 'react';

class Position extends Component {
  componentWillMount() {
    this.setState({
      currentPosition: {
        top: 0,
        left: 0
      },
      virtualPosition: {
        top: 0,
        left: 0
      },
      angle: 0.2 * Math.PI, // .785398,
      distanceRemainingOnPath: null
    });
  }

  componentDidMount() {
    this.virtualTimerId = setInterval(
      () => this.recalculateVirtualPosition(),
      15
    );
  }

  componentWillUnmount() {
    clearInterval(this.virtualTimerId);
  }

  recalculateVirtualPosition() {
    const {
      boundaries: { width: stageWidth, height: stageHeight },
      velocity
    } = this.props;
    const {
      virtualPosition: { top, left },
      angle,
      distanceRemainingOnPath
    } = this.state;
    // velocity is px/s, but this is called every 15ms
    const dx = (Math.cos(angle) * velocity) / 66.6;
    const dy = (Math.sin(angle) * velocity) / 66.6;

    this.setState({
      virtualPosition: {
        top: top + dy,
        left: left + dx
      }
    });
  }

  reposition() {
    const {
      virtualPosition: { top, left }
    } = this.state;
    this.setState({
      currentPosition: {
        top,
        left
      }
    });
  }

  render() {
    const { children } = this.props;
    const { currentPosition } = this.state;
    return children(currentPosition, () => this.reposition());
  }
}

export default Position;
