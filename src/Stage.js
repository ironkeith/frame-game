import React, { Component } from 'react';
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
    const { children } = this.props;
    const { dimensions } = this.state;
    return <div className="stage">{children(dimensions)}</div>;
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
