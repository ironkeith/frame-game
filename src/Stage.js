import React, { Component } from 'react';
import Position from './Position.js';
import Target from './Target.js';
import Tick from './Tick.js';
import './Stage.css';

class Stage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        width: 0,
        height: 0
      }
    };
  }
  componentDidMount() {
    this.setStageSize();
    this.resizeWrapper = () => this.setStageSize();
    window.addEventListener('resize', this.resizeWrapper());
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeWrapper());
  }

  render() {
    const { targetHit, fps, velocity, onHit } = this.props;
    const { dimensions: stageDimensions } = this.state;
    return (
      <div className="stage">
        <Position
          boundaries={stageDimensions}
          velocity={velocity}
          onStop={onHit}
        >
          {(currentPosition, reposition, stop) => (
            <Tick onTick={reposition} fps={fps}>
              <Target
                isHit={targetHit}
                position={currentPosition}
                onClick={stop}
              />
            </Tick>
          )}
        </Position>
      </div>
    );
  }

  setStageSize() {
    // Weird to use window, but it's easy...
    const { innerWidth, innerHeight } = window;
    this.setState({
      dimensions: {
        width: innerWidth,
        height: innerHeight
      }
    });
  }
}

export default Stage;
