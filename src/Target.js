import React, { Component } from 'react';
import './Target.css';
import hieee from './hieee.png';
import ow from './ow.png';
import yay from './yay.png';

class Target extends Component {
  render() {
    const {
      position: { x, y }
    } = this.props;
    const styles = {
      left: `${x}px`,
      top: `${y}px`
    };
    return (
      <div className="target" style={styles}>
        <img src={hieee} alt="click me!" />
      </div>
    );
  }
}

export default Target;
