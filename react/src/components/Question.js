import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [this.props.answer, this.props.wrong1, this.props.wrong2, this.props.wrong3],
      message: '',
      countdown: 0,
      timesUp: false,
      correct: false,
      didAnswer: null
    };
    this.shuffle = this.shuffle.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.tick = this.tick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
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
    this.setState({ answers: answers });
    this.timer = setInterval(this.tick, 50);
  }

  checkAnswer(answer) {
    if (!this.state.didAnswer) {
      if (!this.state.timesUp) {
        if (answer === this.props.answer) {
          this.setState({ message: 'correct' });
        } else {
          this.setState({ message: 'wrong' });
        }
      } else {
        this.setState({ message: 'wrong' });
      }
      this.setState({ didAnswer: true });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({ countdown: new Date() - this.props.start });
    let countdown = Math.round(this.state.countdown / 100);
    let seconds = (10 - (countdown / 10)).toFixed(1);
    if (seconds <= 0) {
      clearInterval(this.timer);
      seconds = "Time's up!";
      this.setState({ timesUp: true });
    }
  }

  timesUp() {
    this.setState({ message: 'wrong' });
  }

  nextQuestion() {
    console.log("create me!!!")
    // put logic here to go to the next question
  }

  render() {
    let classNames = require('classnames');

    let answerClasses;
    if (this.state.correct) {
      // put logic here to display the correct answer in green
    } else if (!this.state.correct) {
      // put logic here to display the correct answer in green and the user's answer in red
    } else {
      answerClasses = classNames({ // change the classes so that the wrong answer and right answer have different classes from the other answers
        'button': true,
        'answer': true
      });
    }

    let nextClasses = classNames({
      'hollow': true,
      'button': true,
      'defcon-5': true
    });

    let message = this.capitalize(this.state.message);

    let countdown = Math.round(this.state.countdown / 100);
    let seconds = (10 - (countdown / 10)).toFixed(1);
    if (seconds <= 0) {
      clearInterval(this.timer);
      seconds = "Time's up!";
    }

    let next;
    if (this.state.timesUp) {
      next = <button type="button" onClick={() => this.nextQuestion()} className={nextClasses}>Next Question</button>;
    }

    return (
      <div>
        {seconds}
        <h2>{this.props.category}</h2>
        <p className={this.state.message}>{message}</p>
        <p className="question">{this.props.question}</p>
        <button type="button" onClick={() => this.checkAnswer(this.state.answers[0])} className={answerClasses}>{this.state.answers[0]}</button>
        <button type="button" onClick={() => this.checkAnswer(this.state.answers[1])} className={answerClasses}>{this.state.answers[1]}</button>
        <button type="button" onClick={() => this.checkAnswer(this.state.answers[2])} className={answerClasses}>{this.state.answers[2]}</button>
        <button type="button" onClick={() => this.checkAnswer(this.state.answers[3])} className={answerClasses}>{this.state.answers[3]}</button>
        {next}
      </div>
    );
  }
}

export default Question;
