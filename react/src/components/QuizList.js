import React, { Component } from 'react';
import Quiz from './Quiz';

class QuizList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      search: '',
      prevSearch: '',
      group: 1,
      interests: []
    };
    this.getQuizzes = this.getQuizzes.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.setQuizzes = this.setQuizzes.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.updateGroup = this.updateGroup.bind(this);
    this.getInterests = this.getInterests.bind(this);
    this.showMyQuizzes = this.showMyQuizzes.bind(this);
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

  updateGroup(page) {
    let nextGroup = this.state.group + page;
    this.setState({ group: nextGroup });
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

  getInterests() {
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
    this.getQuizzes();
    this.getInterests();
  }

  setQuizzes(page) {
    this.setState({ group: page })
  }

  showMyQuizzes() {
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

    this.setState({ interests: myQuizzes });
  }

  render() {
    let classNames = require('classnames');

    let paginateClasses = classNames({
      'button': true,
      'paginate': true
    });

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

    let page;
    if (this.state.interests.category) {
      page = <div className="center">
      <button type="button" onClick={() => this.updateGroup(1)} className={paginateClasses}>Next</button>
      </div>;
    } else if (this.state.group > 1 && this.state.group < 33) {
      page = <div className="center">
      <button type="button" onClick={() => this.updateGroup(-1)} className={paginateClasses}>Previous</button>
      <button type="button" onClick={() => this.updateGroup(1)} className={paginateClasses}>Next</button>
      </div>;
    } else if (this.state.group === 33){
      page = <div className="center">
      <button type="button" onClick={() => this.updateGroup(-1)} className={paginateClasses}>Previous</button>
      </div>;
    } else if (this.state.interests[0]){
      page = <div className="center">
      <button type="button" onClick={() => this.showMyQuizzes()} className={paginateClasses}>My Quizzes</button>
      <button type="button" onClick={() => this.updateGroup(1)} className={paginateClasses}>Next</button>
      </div>;
    } else {
      page = <div className="center">
      <button type="button" onClick={() => this.updateGroup(1)} className={paginateClasses}>Next</button>
      </div>;
    }
    if (this.state.interests.category) {
      <div>
        <input type="text" className="search" placeholder="Search"
        value={this.state.search}
        onChange={this.updateSearch}/>
        {this.state.interests}
        {page}
      </div>
    }
    return(
      <div>
        <input type="text" className="search" placeholder="Search"
        value={this.state.search}
        onChange={this.updateSearch}/>
        {quizzes}
        {page}
      </div>
    );
  }
}

export default QuizList;
