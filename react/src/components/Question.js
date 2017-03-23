import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [this.props.answer, this.props.wrong1, this.props.wrong2, this.props.wrong3],
      message: ''
    };
    this.shuffle = this.shuffle.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  capitalize(string) {
    if (string !== '') {
      return string.charAt(0).toUpperCase() + string.slice(1) + '!';
    }
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

  componentDidMount() {
    let answers = this.shuffle(this.state.answers);
    this.setState({ answers: answers })
  }

  checkAnswer(answer) {
    if (answer === this.props.answer) {
      this.setState({ message: 'correct' });
    } else {
      this.setState({ message: 'wrong' });
    }
  }

  render() {
    let classNames = require('classnames');

    let answerClasses = classNames({
      'button': true,
      'answer': true
    });

    let message = this.capitalize(this.state.message);

    return (
      <div>
        <h2>{this.props.category}</h2>
        <p className={this.state.message}>{message}</p>
        <p className="question">{this.props.question}</p>
        <button type="button" onClick={() => this.checkAnswer(this.state.answers[0])} className={answerClasses}>{this.state.answers[0]}</button>
        <button type="button" onClick={() => this.checkAnswer(this.state.answers[1])} className={answerClasses}>{this.state.answers[1]}</button>
        <button type="button" onClick={() => this.checkAnswer(this.state.answers[2])} className={answerClasses}>{this.state.answers[2]}</button>
        <button type="button" onClick={() => this.checkAnswer(this.state.answers[3])} className={answerClasses}>{this.state.answers[3]}</button>
      </div>
    );
  }
}

export default Question;
