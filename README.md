![Build Status](https://codeship.com/projects/4af01c90-e639-0134-6c39-22570000ff61/status?branch=master)
![Code Climate](https://codeclimate.com/github/ryancoopersmith/trivia.png)
[![Coverage Status](https://coveralls.io/repos/github/ryancoopersmith/trivia/badge.svg?branch=master)](https://coveralls.io/github/ryancoopersmith/trivia?branch=master)

# Trivia Extraordinaire

My breakable toy, "Trivia Extraordinaire", is a trivia app composed of over 200,000 questions in over 1,200 categories. The large amount of data ensures that the user can chose between a seemingly infinite amount of categories. The user can chose between randomly sorted trivia categories or categories tailored to their own personal interests. The user can also view their comprehensive history, including a pie chart representation of their favorite categories and their scoring stats. These are just some
of the numerous features in "Trivia Extraordinaire".

## Development
* Trivia Extraordinaire started off as a 50 megabyte CSV file and an idea
* The trivia data was filtered and formatted into clean JSON using a combination of Bash, Perl, and Regular Expressions
* The entire back end was built using Ruby on Rails
* The quiz portion and the home page is implemented using React
* The user data is stored in a PostgreSQL database
* The app is styled using Foundation with custom CSS
* The Chart.js API is used so the user can view a piechart of their top 5 favorite categories
* The scoring system is implemented for each question by rounding up the time left on the timer multiplied by 10
* The authentication process provides the user with a choice of either custom registration via Devise or Twitter registration via Omniauth
* The wrong answers were implemented by finding random answers of other questions of the same category
* Users will recieve an email reminding them to come back and play 3 times a week if they haven't played a quiz in a week or longer



### Deployed Site:
* https://trivia-extraordinaire.herokuapp.com/ (best viewed in Chrome or Firefox)
