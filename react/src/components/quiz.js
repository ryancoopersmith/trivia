import React, { Component } from 'react';
import Question from './Question';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  getQuestions() {
    let category = this.props.category.toLowerCase().replace(/:| /g, '-').replace(/\?|!|\(|\)|,|'|"|&|\.|\*/g, '');
    fetch(`https://s3.amazonaws.com/trivia-extraordinaire/categories/${category}.json`)
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

  render() {
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
    if (this.state.questions) {
      return (
        <div>
          <button type="button" onClick={this.getQuestions()}>{this.props.category}</button>
        </div>
      );
    } else {
      return (
        <div>
          {questions}
        </div>
      );
    }
  }
}

export default Quiz;
