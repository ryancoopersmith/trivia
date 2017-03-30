import React, { Component } from 'react';
import Quiz from './Quiz';
import QuizList from './QuizList';

class Interests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      interests: []
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
    fetch(`https://trivia-extraordinaire.herokuapp.com/api/v1/users/${this.props.userId}/interests.json`, {
      credentials: 'same-origin'
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

        this.setState({ interests: body });
      })
      .catch(error => {
        console.error(`Error in fetch: ${error.message}`);
      });
  }

  componentDidMount() {
    if (this.props.userId) {
      document.getElementsByClassName('toggleQuizzes')[0].style.top = '12px';
      document.getElementsByClassName('top-bar-right')[0].style.marginRight = '38px';
    }
    this.getMyQuizzes();
    if (this.props.userId) {
      this.getMyInterests();
    }
  }

  render() {
    let groupSize = 4;

    let myQuizzes = this.state.interests.map((myInterest, index) => {
      return this.state.quizzes.map((quiz, quizIndex) => {
        if (quiz.category.toLowerCase().indexOf(myInterest.interest.toLowerCase()) !== -1) {
          return (
            <Quiz
              key={quizIndex + 1}
              category={quiz.category}
              userId={this.props.userId}
            />
          )
        }
      });
    }).reduce((r, element, index) => {
      index % groupSize === 0 && r.push([]);
      r[r.length - 1].push(element);
      return r;
    }, []).map((quizContent) => {
      return(
        <div className="row">
          {quizContent}
        </div>
      );
    });

    if (!this.props.userId) {
      myQuizzes = <h2 className="noQuizzes">Sign in and add your interests to see your personalized quizzes</h2>;
    }

    return(
      <div>
        {myQuizzes}
      </div>
    );
  }
}

export default Interests;
