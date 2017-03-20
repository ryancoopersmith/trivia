import React, { Component } from 'react';
import Question from './Question';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      start: false
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
  }

  getQuestions(category) {
    let quizCategory = category.toLowerCase().replace(/:| /g, '-').replace(/\?|!|\(|\)|,|'|"|&|\.|\*/g, '');
    fetch(`https://s3.amazonaws.com/trivia-extraordinaire/categories/${quizCategory}.json`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`;
          let error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ questions: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  startQuiz(category) {
    this.getQuestions(category);
    this.setState({ start: true });
  }

  render() {
    if (this.state.start) {
      let questions = this.state.questions.map((question, index) => {
        return(
          <Question
          category={question.category}
          question={question.question}
          answer={question.answer}
          key={index + 1}
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
        <div>
          <button type="button" onClick={() => this.startQuiz(this.props.category)}>{this.props.category}</button>
        </div>
      );
    }
  }
}

export default Quiz;
