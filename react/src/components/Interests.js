import React, { Component } from 'react';
import Quiz from './Quiz';
import QuizList from './QuizList';

class Interests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      interests: [],
    };
    this.getMyQuizzes = this.getMyQuizzes.bind(this);
    this.getMyInterests = this.getMyInterests.bind(this);
  }

  getMyQuizzes() {
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
        let myQuizzes = body;
        this.setState({ quizzes: myQuizzes });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getMyInterests() {
    fetch('http://localhost:3000/api/v1/interests.json', {credentials: 'same-origin'})
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

        this.setState({ interests: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidMount() {
    this.getMyQuizzes();
    this.getMyInterests();
  }

  render() {
    let classNames = require('classnames');

    let paginateClasses = classNames({
      'button': true,
      'paginate': true
    });

    let groupSize = 4;

    let myQuizzes = this.state.interests.map((myInterest, index) => {
      return this.state.quizzes.map((quiz, index2) => {
        if (quiz.category.toLowerCase().indexOf(myInterest.interest.toLowerCase()) !== -1) {
          console.log("here");
          return (
            <Quiz
              key={index2}
              category={quiz.category}
            />
          )
        }
      });
    }).reduce((r, element, index) => {
      index % groupSize === 0 && r.push([]);
      r[r.length - 1].push(element);
      return r;
    }, []);

    return(
      <div>
      {myQuizzes}
      </div>
    );
  }
}

export default Interests;
