import React, { Component } from 'react';
import Quiz from './Quiz';

class QuizList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: []
    };
    this.getQuizzes = this.getQuizzes.bind(this);
  }

  getQuizzes() {
    fetch('https://s3.amazonaws.com/trivia-extraordinaire/questions.json')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json()) //if this doesn't work use JSON.stringify(response)
      .then(body => {
        this.setState({ quizzes: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

    componentDidMount() {
      this.getQuizzes();
    }

  render() {
    let quizzes = this.state.quizzes.map((quiz, index) => {
      return(
        <Quiz
         question={quiz.question}
         answer={quiz.answer}
         category={quiz.category}
         key={index + 1}
        />
      );
    });
    return (
      <div>
        {quizzes}
      </div>
    );
  }
}

export default QuizList;
