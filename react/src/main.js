import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import QuizList from './components/QuizList';

$(function() {
  ReactDOM.render(
    <QuizList />,
    document.getElementById('quiz')
  );
});
