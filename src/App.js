import React, { Component } from 'react';
import './App.css';
import Position from './Position.js';
import Stage from './Stage.js';
import Target from './Target.js';
import Tick from './Tick.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Stage>
          {stageDimensions => (
            <Position boundaries={stageDimensions} velocity={600}>
              {(currentPosition, reposition) => (
                <Tick onTick={reposition} fps={60}>
                  <Target position={currentPosition} />
                </Tick>
              )}
            </Position>
          )}
        </Stage>
      </div>
    );
  }
}

export default App;
