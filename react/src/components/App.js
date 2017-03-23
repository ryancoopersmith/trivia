import QuizList from './QuizList';
import Interests from './Interests';
import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      myQuiz: false
    };
    this.toggleMyQuizzes = this.toggleMyQuizzes.bind(this);
  }

  toggleMyQuizzes(value) {
    if (value === 0) {
      this.setState({ myQuiz: false });
    } else {
      this.setState({ myQuiz: true });
    }
  }

  render() {
    let classNames = require('classnames');

    let quizClasses = classNames({
      'button': true,
      'paginate': true,
      'toggleQuizzes': true
    });

    let page;
    let quiz;
    if (this.state.myQuiz) {
      page = <div className="center">
      <button type="button" onClick={() => this.toggleMyQuizzes(0)} className={quizClasses}>See All Quizzes</button>
      </div>;
      quiz = <Interests />;
    } else {
      page = <div className="center">
      <button type="button" onClick={() => this.toggleMyQuizzes(1)} className={quizClasses}>My Quizzes</button>
      </div>;
      quiz = <QuizList />;
    }

    return(
      <div>
        {quiz}
        {page}
      </div>
    );
  }
}

export default App;