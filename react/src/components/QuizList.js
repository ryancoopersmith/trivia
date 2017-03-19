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
    fetch('https://s3.amazonaws.com/trivia-extraordinaire/categories.json')
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
