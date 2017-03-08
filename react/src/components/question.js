import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { question: '' };
  }

  componentDidMount() {
    $.ajax({
      url: "https://s3.amazonaws.com/myBucket/myfile.json",
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({ question: data.question });
    });
  }

  render() {
    return (
      <h1>Question: {this.state.question}</h1>
    );
  }
}

export default Question;
