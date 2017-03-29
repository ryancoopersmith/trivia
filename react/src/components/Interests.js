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
    fetch(`http://localhost:3000/api/v1/users/${this.props.userId}/interests.json`, {
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

    if (!this.state.userId) {
      myQuizzes = <h2 className="noQuizzes">Sign in and add your interests to see your personalized quizzes</h2>;
      document.getElementsByClassName('footer')[0].style.position = 'fixed';
      document.getElementsByClassName('footer')[0].style.bottom = '0px';
      document.getElementsByClassName('footer')[0].style.left = '0px';
    }

    return(
      <div>
        {myQuizzes}
      </div>
    );
  }
}

export default Interests;
