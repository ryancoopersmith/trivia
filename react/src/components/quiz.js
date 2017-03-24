import React, { Component } from 'react';
import Question from './Question';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      start: false
      // add a current_question state and change it when the user presses the next button
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.setMyFavorites = this.setMyFavorites.bind(this);
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

    fetch('http://localhost:3000/api/v1/favorite_categories.json', {
      credentials: 'same-origin',
      method: 'post',
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
    .then(response => response.json())
    .then(body => {
      console.log(body);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  startQuiz(category) {
    this.getQuestions(category);
    this.setState({ start: true });
    this.setMyFavorites(category)
  }

  render() {
    let classNames = require('classnames');

    let gridClasses = classNames({
      'card': true,
      'small-3': true,
      'columns': true
    })

    let startClasses = classNames({
      'hollow': true,
      'button': true,
      'defcon-5': true,
      'start': true
    })

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
          />
        );
      });
      return (
        <div>
          {questions}
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
