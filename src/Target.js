import React, { Component } from 'react';
import './Target.css';
import hieee from './hieee.png';
import ow from './ow.png';
import yay from './yay.png';

class Target extends Component {
  render() {
    const {
      isHit,
      position: { x, y },
      onClick
    } = this.props;

    const styles = {
      left: `${x}px`,
      top: `${y}px`
    };
    return (
      <div className="target" style={styles} onPointerDown={onClick}>
        <img
          src={isHit ? yay : hieee}
          alt="click me!"
          className={isHit ? 'target_img--hit' : ''}
        />
      </div>
    );
  }
}

export default Target;
