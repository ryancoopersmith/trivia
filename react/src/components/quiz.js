import React, { Component } from 'react';
import Question from './Question';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      start: false,
      question: 0,
      end: false,
      score: 0
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.setMyFavorites = this.setMyFavorites.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.goBack = this.goBack.bind(this);
    this.getScore = this.getScore.bind(this);
  }

  getScore() {
    fetch(`http://localhost:3000/api/v1/users/${this.props.userId}/scores.json`, {
      credentials: 'same-origin'
    }).then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    }).then(response => response.json())
    .then(body => {
      let length = body.length;
      let score = body[length - 1].score + body[length - 2].score + body[length - 3].score + body[length - 4].score + body[length - 5].score + body[length - 6].score;
      this.setState({ score: score });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  nextQuestion() {
    let question;
    if (this.state.question < 5) {
      question = this.state.question + 1;
      this.setState({ question: question });
    } else {
      this.setState({ end: true });
      this.getScore();
    }
  }

  goBack() {
    this.setState({ start: false });
    document.getElementsByClassName('search')[0].style.display = 'block';
    document.getElementsByClassName('paginate')[0].style.display = 'block';
    document.getElementsByClassName('paginate')[1].style.display = 'block';
    for (let i = 0; i < 36; i++) {
      document.getElementsByClassName('card-divider')[i].style.display = 'block';
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

  getQuestions(category) {
    let quizCategory = category.toLowerCase().replace(/:| /g, '-').replace(/\?|!|\(|\)|,|'|"|&|\.|\*/g, '');
    fetch(`https://s3.amazonaws.com/trivia-extraordinaire/categories/${quizCategory}.json`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ questions: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  setMyFavorites(category) {
    let jsonStringData = JSON.stringify(category);
    fetch(`http://localhost:3000/api/v1/users/${this.props.userId}/favorite_categories.json`, {
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

  startQuiz(category) {
    if (this.props.userId) {
      this.getQuestions(category);
      this.setState({ start: true });
      if (this.props.userId) {
        this.setMyFavorites(category);
      }

      for (let i = 0; i < 36; i++) {
        document.getElementsByClassName('card-divider')[i].style.display = 'none';
      }
      document.getElementsByClassName('search')[0].style.display = 'none';
      document.getElementsByClassName('paginate')[0].style.display = 'none';
    } else {
      document.getElementsByClassName('flash')[1].style.color = '#DB0000';
    }
  }

  render() {
    let classNames = require('classnames');

    let gridClasses = classNames({
      'card': true,
      'small-3': true,
      'columns': true
    });

    let startClasses = classNames({
      'hollow': true,
      'button': true,
      'defcon-5': true,
      'start': true
    });

    if (this.state.start) {
      let randomizedQuestions = this.shuffle(this.state.questions);
      let questions = randomizedQuestions.map((question, index) => {
        let randomizedAnswers = this.shuffle(this.state.questions);
        let wrongs = [randomizedAnswers[0].answer, randomizedAnswers[1].answer, randomizedAnswers[2].answer];
        let finalWrongs = [];
        let prevWrongs = [];
        wrongs.forEach((wrong) => {
          if (prevWrongs[0]) {
            prevWrongs.forEach((prevWrong) => {
              while (prevWrong === wrong) {
                wrong = randomizedAnswers[Math.floor(Math.random() * randomizedAnswers.length)].answer;
              }
            });
          }
          while (wrong === question.answer) {
            wrong = randomizedAnswers[Math.floor(Math.random() * randomizedAnswers.length)].answer;
          }
          prevWrongs.push(wrong);
          finalWrongs.push(wrong);
        });
        return(
          <Question
           key={index + 1}
           category={question.category}
           question={question.question}
           answer={question.answer}
           wrong1={finalWrongs[0]}
           wrong2={finalWrongs[1]}
           wrong3={finalWrongs[2]}
           start={new Date()}
           onClick={this.nextQuestion}
           back={this.goBack}
           end={this.state.end}
           whichQuestion={this.state.question}
           userId={this.props.userId}
           score={this.state.score}
          />
        );
      });
      return (
        <div>
          {questions[this.state.question]}
        </div>
      );
    } else {
      return (
      <div className={gridClasses}>
        <div className="card-divider">
          <div className="card-section">
            <button className="category" type="button" onClick={() => this.startQuiz(this.props.category)}>{this.props.category}</button>
            <button className={startClasses} type="button" onClick={() => this.startQuiz(this.props.category)}>Start Quiz</button>
          </div>
        </div>
      </div>
      );
    }
  }
}

export default Quiz;
