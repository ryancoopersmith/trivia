import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>{this.props.category}</h1>
        <p>{this.props.question}</p>
        <p>{this.props.answer}</p>
      </div>
    );
  }
}

export default Question;
