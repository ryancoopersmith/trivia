import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Question from './components/question'

$(function() {
  ReactDOM.render(
    <Question />,
    document.getElementById('app')
  );
});
