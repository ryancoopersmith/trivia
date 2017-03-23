![Build Status](https://codeship.com/projects/4af01c90-e639-0134-6c39-22570000ff61/status?branch=master)
![Code Climate](https://codeclimate.com/github/ryancoopersmith/trivia.png)
[![Coverage Status](https://coveralls.io/repos/github/ryancoopersmith/trivia/badge.svg?branch=master)](https://coveralls.io/github/ryancoopersmith/trivia?branch=master)

# Trivia Extraordinaire

My breakable toy, "Trivia Extraordinaire", is a trivia app composed of over 200,000 questions,
found by crawling the Jeopardy archives. The large amount of data ensures that the user can chose
between a seemingly infinite amount of categories. The user can also view their comprehensive
history, including their favorite category, total number of points accumulated and the badges
they've collected through the feats they've accomplished. The user can also chose to add their
own trivia questions. These are just some of the numerous features in "Trivia Extraordinaire".

## Development
* The trivia data was filtered using a combination of Ruby, Perl, and Regular Expressions
* All of the forms were built using Ruby on Rails
* The user data is stored in a PostgreSQL database
* The quiz portion is implemented using React
* The front-end is styled using Foundation with custom CSS
* The Chart.js API is used so the user can view their personal statistics in a piechart

### Deployed Site:
* https://trivia-extraordinaire.herokuapp.com/
