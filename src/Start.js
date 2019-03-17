import React, { Component } from 'react';

class Start extends Component {
  render() {
    const { name, onNameChange, onStart } = this.props;
    return (
      <div className="container">
        <h1>Frame Game</h1>
        <p>
          Each game is five rounds. Click the bear as fast as you can, but watch
          out—the frame rate for this game is a little unusual.
        </p>

        <label htmlFor="name" className="sr-only">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => onNameChange(e.target.value)}
        />

        <button onClick={onStart}>Play Now!</button>
      </div>
    );
  }
}

export default Start;
