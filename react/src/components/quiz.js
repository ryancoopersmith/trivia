import React, { Component } from 'react';

class Quiz extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{this.props.category}</p>
      </div>
    );
  }
}

export default Quiz;
