import React, { Component } from 'react';
import Card from './Card';

const data = [
  {
    title: 'Exam 2: Latin America 1883-1930',
    desc:
      'Duis veniam laborum excepteur aliqua. Ex ut voluptate in Lorem quis consectetur laborum in consequat aliquip fugiat ut pariatur.',
  },
];

class AnimatedCards extends Component {
  render() {
    return (
      <div>
        {data.map((item, index) => (
          <Card {...item} key={index} />
        ))}
      </div>
    );
  }
}

export default AnimatedCards;
