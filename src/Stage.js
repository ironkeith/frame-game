import React, { Component } from 'react';
import './Stage.css';

class Stage extends Component {
  componentDidMount() {
    this.setStageSize();
    window.addEventListener('resize', this.setStageSize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setStageSize);
  }

  render() {
    const { children, dimensions } = this.props;
    return <div className="stage">{children(dimensions)}</div>;
  }

  setStageSize() {
    // Weird to use window, but it's easy...
    const { innerWidth, innerHeight } = window;
    this.setState((state, props) => ({
      dimensions: {
        width: innerWidth,
        height: innerHeight
      }
    }));
  }
}

export default Stage;
