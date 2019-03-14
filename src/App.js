import React, { Component } from 'react';
import './App.css';
import Stage from './Stage.js';
import Target from './Target.js';
import Tick from './Tick.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Stage velocity={60}>
          {stageDimensions => (
            <Tick onTick={() => console.log('TICK')} fps={1}>
              <Target boundaries={stageDimensions} />
            </Tick>
          )}
        </Stage>
      </div>
    );
  }
}

export default App;
