import React, { Component } from 'react';
import Quiz from './Quiz';
import QuizList from './QuizList';

class Interests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      interests: [],
      myQuiz: true
    };
    this.getMyQuizzes = this.getMyQuizzes.bind(this);
    this.getMyInterests = this.getMyInterests.bind(this);
    this.showAll = this.showAll.bind(this);
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
        this.setState({ quizzes: body });
        debugger
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

  showAll() {
    this.setState({ myQuiz: false })
  }

  render() {
    let classNames = require('classnames');

    let paginateClasses = classNames({
      'button': true,
      'paginate': true
    });

    let groupSize = 4;

    let myQuizzes = this.state.interests.map((myInterest, index) => {
      this.state.quizzes.forEach((quiz) => {
        if (quiz.category.toLowerCase().indexOf(myInterest.interest.toLowerCase()) !== -1) {
          return (
            <Quiz
            key={index + 1}
            category={quiz.category}
            />
          );
        }
      });
    }).reduce((r, element, index) => {
      index % groupSize === 0 && r.push([]);
      r[r.length - 1].push(element);
      return r;
    }, []);

    let page = <div className="center">
    <button type="button" onClick={() => this.showAll()} className={paginateClasses}>Go Back</button>
    </div>;

    if (this.state.myQuiz) {
      return(
        <div>
        {myQuizzes}
        {page}
        </div>
      );
    } else {
      return(
        <div>
          <QuizList />
        </div>
      )
    }
  }
}

export default Interests;
