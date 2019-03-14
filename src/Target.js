import React, { Component } from 'react';
import './Target.css';
import hieee from './hieee.png';
import ow from './ow.png';
import yay from './yay.png';

class Target extends Component {
  render() {
    return (
      <div className="target">
        <img src={hieee} alt="click me!" />
      </div>
    );
  }
}

export default Target;
