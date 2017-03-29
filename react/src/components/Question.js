import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [this.props.answer, this.props.wrong1, this.props.wrong2, this.props.wrong3],
      message: '',
      countdown: 0,
      timesUp: false,
      didAnswer: false,
      answerClasses1: null,
      answerClasses2: null,
      answerClasses3: null,
      answerClasses4: null,
      answer: null
    };
    this.shuffle = this.shuffle.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.tick = this.tick.bind(this);
    this.setClasses = this.setClasses.bind(this);
    this.setScore = this.setScore.bind(this);
  }

  setScore(score) {
    let jsonStringData = JSON.stringify(score);
    fetch(`http://localhost:3000/api/v1/users/${this.props.userId}/scores.json`, {
      credentials: 'same-origin',
      method: "post",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: jsonStringData
    }).then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        message: '',
        countdown: 0,
        timesUp: false,
        didAnswer: false,
        answerClasses1: null,
        answerClasses2: null,
        answerClasses3: null,
        answerClasses4: null,
        answer: null
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
    answers.forEach((answer, index) => {
      if (answer === this.props.answer) {
        this.setState({ answer: index + 1 });
      }
    });
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
          if (this.props.userId) {
            let countdown = Math.round(this.state.countdown / 100);
            let seconds = (10 - (countdown / 10)).toFixed(1);
            let newScore = 10 * Math.ceil(seconds);
            this.setScore(newScore);
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
          this.setScore(0);
        }
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
      this.timesUp();
    }
  }

  timesUp() {
    document.getElementsByClassName('timer')[0].style.backgroundColor = "#E55A51";
    this.setState({ timesUp: true });
    this.setScore(0);

    let classNames = require('classnames');
    let correctAnswerClasses = classNames({
      'button': true,
      'answer': true,
      'correctAnswer': true
    });

    if (this.state.answer === 1) {
      this.setState({ answerClasses1: correctAnswerClasses });
    } else if (this.state.answer === 2) {
      this.setState({ answerClasses2: correctAnswerClasses });
    } else if (this.state.answer === 3) {
      this.setState({ answerClasses3: correctAnswerClasses });
    } else if (this.state.answer === 4) {
      this.setState({ answerClasses4: correctAnswerClasses });
    }
  }

  render() {
    if (!this.props.end) {
      let classNames = require('classnames');
      let nextClasses = classNames({
        'paginate': true,
        'button': true,
        'next': true
      });

      let gridClasses = classNames({
        'found': true,
        'small-6': true,
        'columns': true
      });

      let message = this.capitalize(this.state.message);

      let seconds;
      if (!this.state.didAnswer) {
        let countdown = Math.round(this.state.countdown / 100);
        seconds = (10 - (countdown / 10)).toFixed(1);
        if (seconds <= 0) {
          clearInterval(this.timer);
          seconds = "Time's up!";
        }
      }

      let next;
      if (this.state.timesUp || this.state.didAnswer) {
        if (this.props.whichQuestion < 5) {
          next = <button type="button" onClick={this.props.onClick} className={nextClasses}>Next Question</button>;
        } else {
          next = <button type="button" onClick={this.props.onClick} className={nextClasses}>Finish</button>;
        }
      }

      let randomAnswers = [this.state.answers[0], this.state.answers[1], this.state.answers[2], this.state.answers[3]];

      return (
        <div>
          <div className="big-card">
            <div className="timer"><p className="seconds">{seconds}</p></div>
            <h2 className="quizCategory">{this.props.category}</h2>
            <p className={this.state.message}>{message}</p>
            <p className="question">{this.props.question}</p>
            <div className="row">
              <div className={gridClasses}>
                <button type="button" onClick={() => this.checkAnswer(this.state.answers[0], randomAnswers, 1)} className={this.state.answerClasses1}>{this.state.answers[0]}</button>
              </div>
              <div className={gridClasses}>
                <button type="button" onClick={() => this.checkAnswer(this.state.answers[1], randomAnswers, 2)} className={this.state.answerClasses2}>{this.state.answers[1]}</button>
              </div>
            </div>
            <div className="row">
              <div className={gridClasses}>
                <button type="button" onClick={() => this.checkAnswer(this.state.answers[2], randomAnswers, 3)} className={this.state.answerClasses3}>{this.state.answers[2]}</button>
              </div>
              <div className={gridClasses}>
                <button type="button" onClick={() => this.checkAnswer(this.state.answers[3], randomAnswers, 4)} className={this.state.answerClasses4}>{this.state.answers[3]}</button>
              </div>
            </div>
            </div>
            <div className="buttonWrapper">
              <button type="button" onClick={this.props.back} className={nextClasses}>Exit</button>
              {next}
            </div>
          </div>
      );
    } else {
      return (
        <div className="big-card">
          <p>END OF GAME</p>
          <p>{this.props.score}</p>
          <a className="twitter-share-button"
            href={`https://twitter.com/intent/tweet?text=I%20scored%20${this.props.score}%20points%20in%20${this.props.category}%20on%20Trivia%20Extraordinaire!&hashtags=TriviaExtraordinaire`}
            data-size="large"
            target="_blank">
            Brag to your friends on Twitter!
          </a>
        </div>
      );
    }
  }
}

export default Question;
