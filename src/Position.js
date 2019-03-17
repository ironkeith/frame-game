import React, { Component } from 'react';

const getRandom = max => Math.random() * max;
const getRoundedRandom = max => Math.round(getRandom(max));

const randomizeDirection = () => {
  const generateDirection = () => (Math.random() > 0.5 ? 1 : -1);
  return {
    vertical: generateDirection(), // positive is down
    horizontal: generateDirection() // positive is to the right
  };
};

class Position extends Component {
  direction = null;
  virtualTickID = null;
  virtualTickDuration = 15;

  constructor(props) {
    super(props);
    const { velocity } = this.props;

    this.direction = randomizeDirection();

    const currentPosition = {
      x: null,
      y: null
    };

    // angle is in radians
    // we'll limit it to < 90deg for now to make life easy when
    // trying to calculate the horizontal and vertical vectors
    const angle = getRandom(Math.PI / 2);

    // velocity is in seconds, tick is in milliseconds
    const velocityPerTick = (velocity / 1000) * this.virtualTickDuration;
    // how far will the target move per tick?
    const vectors = {
      dx: Math.cos(angle) * velocityPerTick,
      dy: Math.sin(angle) * velocityPerTick
    };

    this.state = {
      vectors,
      currentPosition,
      virtualPosition: Object.assign({}, currentPosition)
    };
  }

  componentDidMount() {
    this.virtualTickID = setInterval(
      () => this.recalculateVirtualPosition(),
      this.virtualTickDuration
    );
  }

  componentWillUnmount() {
    clearInterval(this.virtualTickID);
  }

  render() {
    const { children } = this.props;
    const { currentPosition } = this.state;
    return children(currentPosition, () => this.reposition());
  }

  // non-lifecycle methods
  moveDown(y, dy) {
    const {
      boundaries: { height }
    } = this.props;
    let newY = y + dy;
    if (newY > height) {
      newY = height - (newY - height);
      this.reverseY();
    }
    return newY;
  }

  moveUp(y, dy) {
    let newY = y - dy;
    if (newY < -138) {
      newY = -138 + (-138 - newY);
      this.reverseY();
    }
    return newY;
  }

  moveLeft(x, dx) {
    let newX = x - dx;
    if (newX < -165) {
      newX = -165 + (-165 - newX);
      this.reverseX();
    }
    return newX;
  }

  moveRight(x, dx) {
    const {
      boundaries: { width }
    } = this.props;
    let newX = x + dx;
    if (newX > width) {
      newX = width - (newX - width);
      this.reverseX();
    }
    return newX;
  }

  recalculateVirtualPosition() {
    const {
      boundaries: { width: stageWidth, height: stageHeight }
    } = this.props;

    let {
      virtualPosition: { x, y },
      vectors: { dx, dy }
    } = this.state;

    // randomize values on first run
    if (x === null || y === null) {
      debugger;
      x = getRoundedRandom(stageWidth);
      y = getRoundedRandom(stageHeight);
    }

    const newX =
      this.direction.horizontal > 0
        ? this.moveRight(x, dx)
        : this.moveLeft(x, dx);
    const newY =
      this.direction.vertical > 0 ? this.moveDown(y, dy) : this.moveUp(y, dy);

    this.setState({
      virtualPosition: {
        x: newX,
        y: newY
      }
    });
  }

  reposition() {
    this.setState({
      currentPosition: Object.assign({}, this.state.virtualPosition)
    });
  }

  reverseX() {
    this.direction.horizontal *= -1;
  }

  reverseY() {
    this.direction.vertical *= -1;
  }
}

export default Position;
