import React, { Component } from 'react';
import styled from '@emotion/styled';
import BezierEasing from 'bezier-easing';

var easing = BezierEasing(0.21, -0.03, 0.92, 1.38);

interface CardProps {
  title: string;
  desc: string;
}

function animate(
  render: (p: number) => void,
  duration: number,
  easing: BezierEasing.EasingFunction,
) {
  var start = Date.now();
  (function loop() {
    var p = (Date.now() - start) / duration;
    if (p > 1) {
      render(1);
    } else {
      requestAnimationFrame(loop);
      render(easing(p));
    }
  })();
}

const Container = styled.div`
  width: 300px;
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  padding: 20px;
`;

class Card extends Component<CardProps> {
  state = {
    x: 0,
    y: 0,
  };

  animate = () => {
    animate(
      p => {
        this.setState({ x: 500 * p, y: 200 * p });
      },
      300,
      easing,
    );
  };

  render() {
    console.log(this.props);
    return (
      <Container
        style={{ transform: `translate(${this.state.x}px, ${this.state.y}px)` }}
      >
        <h2>{this.props.title}</h2>
        <p>{this.props.desc}</p>
        <button onClick={this.animate}>Animate</button>
      </Container>
    );
  }
}

export default Card;
