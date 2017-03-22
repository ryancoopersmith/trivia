import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.shuffle = this.shuffle.bind(this);
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  render() {
    let correctAnswer = this.props.answer;
    let answers = this.shuffle([this.props.answer, this.props.wrong1, this.props.wrong2, this.props.wrong3]);
    return (
      <div>
        <h2>{this.props.category}</h2>
        <p className="question">{this.props.question}</p>
        <p className="answer">{answers[0]}</p>
        <p className="answer">{answers[1]}</p>
        <p className="answer">{answers[2]}</p>
        <p className="answer">{answers[3]}</p>
      </div>
    );
  }
}

export default Question;
