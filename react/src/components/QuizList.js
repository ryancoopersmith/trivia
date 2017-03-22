import React, { Component } from 'react';
import Quiz from './Quiz';

class QuizList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      search: '',
      prevSearch: '',
      group: 1
    };
    this.getQuizzes = this.getQuizzes.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.setQuizzes = this.setQuizzes.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  updateSearch(event) {
    let prevSearch = this.state.search;
    this.setState({ prevSearch: prevSearch });
    this.setState({search: event.target.value.substr(0, 20)});
    if(this.state.search.length === 1 && this.state.prevSearch > this.state.search) {
      this.setState({ group: 1 });
    } else if(this.state.search.length > -1){
      this.setState({ group: 0 });
    }
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
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
        let randomizedBody = this.shuffle(body);
        this.setState({ quizzes: randomizedBody });
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
    let classNames = require('classnames');

    let paginationClass = classNames({
      'button': true,
      'paginate': true
    })

    let groupSize = 4;
    let pageSize = 34;

    let quizzes = this.state.quizzes.map((quiz, index) => {
      if (quiz.category.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) {
        return (
          <Quiz
           key={index + 1}
           category={quiz.category}
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

    let pageNumbers = [];
    for(let i = 1; i <= pageSize; i++) {
      pageNumbers.push(<input type="submit" value={i} className={paginationClass} onClick={() => this.setQuizzes(i)} />)
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
