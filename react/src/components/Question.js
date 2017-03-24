import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [this.props.answer, this.props.wrong1, this.props.wrong2, this.props.wrong3],
      message: '',
      countdown: 0,
      timesUp: false,
      didAnswer: null,
      answerClasses1: null,
      answerClasses2: null,
      answerClasses3: null,
      answerClasses4: null
    };
    this.shuffle = this.shuffle.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.tick = this.tick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setClasses = this.setClasses.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('hi');
    if (this.props !== nextProps) {
      this.setState({
        message: '',
        countdown: 0,
        timesUp: false,
        didAnswer: null,
        answerClasses1: null,
        answerClasses2: null,
        answerClasses3: null,
        answerClasses4: null
      });
    }
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
    this.setClasses();
    this.timer = setInterval(this.tick, 50);
  }

  setClasses() {
    let classNames = require('classnames');

    let answerClasses = classNames({
      'button': true,
      'answer': true
    });

    this.setState({ answerClasses1: answerClasses });
    this.setState({ answerClasses2: answerClasses });
    this.setState({ answerClasses3: answerClasses });
    this.setState({ answerClasses4: answerClasses });
  }

  checkAnswer(answer, all, num) {
    let classNames = require('classnames');
    let correctAnswerClasses = classNames({
      'button': true,
      'answer': true,
      'correctAnswer': true
    });
    let wrongAnswerClasses = classNames({
      'button': true,
      'answer': true,
      'wrongAnswer': true
    });

    if (!this.state.didAnswer) {
      if (!this.state.timesUp) {
        if (answer === this.props.answer) {
          this.setState({ message: 'correct' });
          if (num === 1) {
            this.setState({ answerClasses1: correctAnswerClasses });
          } else if (num === 2) {
            this.setState({ answerClasses2: correctAnswerClasses });
          } else if (num === 3) {
            this.setState({ answerClasses3: correctAnswerClasses });
          } else if (num === 4) {
            this.setState({ answerClasses4: correctAnswerClasses });
          }
        } else {
          this.setState({ message: 'wrong' });
          if (num === 1) {
            this.setState({ answerClasses1: wrongAnswerClasses });
          } else if (num === 2) {
            this.setState({ answerClasses2: wrongAnswerClasses });
          } else if (num === 3) {
            this.setState({ answerClasses3: wrongAnswerClasses });
          } else if (num === 4) {
            this.setState({ answerClasses4: wrongAnswerClasses });
          }
        }
      } else {
        this.setState({ message: 'wrong' });
      }
      this.setState({ didAnswer: true });
      all.forEach((rand, index) => {
        if (rand === this.props.answer && index === 0) {
          this.setState({ answerClasses1: correctAnswerClasses });
        } else if (rand === this.props.answer && index === 1) {
          this.setState({ answerClasses2: correctAnswerClasses });
        } else if (rand === this.props.answer && index === 2) {
          this.setState({ answerClasses3: correctAnswerClasses });
        } else if (rand === this.props.answer && index === 3) {
          this.setState({ answerClasses4: correctAnswerClasses });
        }
      });
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
    // put logic here to go to the next question after componentWillReceiveProps
  }

  render() {
    let classNames = require('classnames');
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

    let randomAnswers = [this.state.answers[0], this.state.answers[1], this.state.answers[2], this.state.answers[3]];

    return (
      <div>
        {seconds}
        <h2>{this.props.category}</h2>
        <p className={this.state.message}>{message}</p>
        <p className="question">{this.props.question}</p>
        <button type="button" onClick={() => this.checkAnswer(this.state.answers[0], randomAnswers, 1)} className={this.state.answerClasses1}>{this.state.answers[0]}</button>
        <button type="button" onClick={() => this.checkAnswer(this.state.answers[1], randomAnswers, 2)} className={this.state.answerClasses2}>{this.state.answers[1]}</button>
        <button type="button" onClick={() => this.checkAnswer(this.state.answers[2], randomAnswers, 3)} className={this.state.answerClasses3}>{this.state.answers[2]}</button>
        <button type="button" onClick={() => this.checkAnswer(this.state.answers[3], randomAnswers, 4)} className={this.state.answerClasses4}>{this.state.answers[3]}</button>
        {next}
      </div>
    );
  }
}

export default Question;
