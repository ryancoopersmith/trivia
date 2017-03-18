import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './components/Quiz';

$(function() {
  reactDOM.render(
    <Quiz />,
    document.getElementById('quiz')
  );
});
