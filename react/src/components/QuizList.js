import React, { Component } from 'react';
import Quiz from './Quiz';

class QuizList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      search: '',
      group: 1
    };
    this.getQuizzes = this.getQuizzes.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.setQuizzes = this.setQuizzes.bind(this);
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0, 20)});
    if (this.state.search.length > 1) {
      this.setState({ group: 0 });
    } else {
      this.setState({ group: 1 });
    }
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

  setQuizzes(page) {
    this.setState({ group: page })
  }

  render() {
    let groupSize = 6;
    let pageSize = 36;
    let pageNumberLength = Math.ceil(this.state.quizzes.length / pageSize); //make sure this is right

    let quizzes = this.state.quizzes.map((quiz, index) => {
      if (quiz.category.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) {
        return (
          <Quiz
           category={quiz.category}
           key={index + 1}
          />
        );
      }
    }).reduce((r, element, index) => {
      index % groupSize === 0 && r.push([]);
      r[r.length - 1].push(element);
      return r;
    }, []).reduce((r, element, index) => {
      index % pageSize === 0 && r.push([]);
      r[r.length - 1].push(element);
      return r;
    }, []).map((quizContent) => {
      if (this.state.group) {
        return(
          <div className="row">
            {quizContent[this.state.group - 1]}
          </div>
        );
      } else {
        return(
          <div className="row">
            {quizContent}
          </div>
        );
      }
    });

    let pageNumbers = []
    for(let i = 1; i <= pageNumberLength; i++) {
      pageNumbers.push(<input type="submit" value={i} className="button" onClick={() => this.setQuizzes(i)} />)
    }

    return(
      <div>
        <input type="text" className="search" placeholder="Search"
        value={this.state.search}
        onChange={this.updateSearch}/>
        {quizzes}
        <div className="numbers">
          {pageNumbers}
        </div>
      </div>
    );
  }
}

export default QuizList;
