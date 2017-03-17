import React, { Component } from 'react';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
    this.getQuestions = this.getQuestions.bind(this)
  }

  getQuestions() {
      fetch('https://s3.amazonaws.com/jeopardy-questions-json/jeopardy-questions.json')
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
          this.setState({ questions: body.questions });
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    componentDidMount() {
      this.getQuestions();
    }

  render() {
    return (
      <h1>Question: {this.state.question.sample}</h1>
    );
  }
}

export default Quiz;
