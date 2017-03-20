require 'rails_helper'

feature 'user signs up' do
  # As a new user that wants to play some trivia
  # I should be able to sign up using my personal information
  # So that I can save my progress, post new questions, and comment on questions
  #
  # [] I must provide a unique username
  # [] I must provide a valid email
  # [] I must provide a password
  # [] I must provide a password confirmation that matches my password
  # [] I should see an error message if I enter invalid information
  # [] I should remain on the sign in page if I enter invalid information
  # [] I should see a success message if I successfully sign up
  # [] I should be taken to the root path when I sign up

  before { ActionMailer::Base.deliveries = [] }

  scenario 'user visits sign up page' do
    visit root_path
    click_link 'Sign Up'
    expect(page).to have_content('Sign Up')
    expect(page).to have_content('Username')
    expect(page).to have_content('Email')
    expect(page).to have_content('Password')
    expect(page).to have_content('Password Confirmation')
  end

  scenario 'user successfully signs up' do
    visit new_user_registration_path
    fill_in 'Username', with: 'johnnyboy1'
    fill_in 'Email', with: 'johnnyboy1@gmail.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'password'
    click_button 'Sign Up'

    expect(page).to have_content("You've successfully signed up!")
    expect(page).to_not have_content('Sign Up')
    expect(page).to_not have_content('Sign In')
    expect(ActionMailer::Base.deliveries.count).to eq(1)
  end

  scenario 'user provides different password confirmation' do
    visit new_user_registration_path
    fill_in 'Username', with: 'leonardo5'
    fill_in 'Email', with: 'leonardo5@gmail.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'notmypassword'
    click_button 'Sign Up'

    expect(page).to have_content("Password confirmation doesn't match")
    expect(page).to have_content('Sign Up')
    expect(page).to_not have_content("You've successfully signed up!")
  end

  scenario 'user provides invalid email' do
    visit new_user_registration_path
    fill_in 'Username', with: 'fredrick13'
    fill_in 'Email', with: 'wrongemail@.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'password'
    click_button 'Sign Up'

    expect(page).to_not have_content("You've successfully signed up!")
    expect(page).to have_content('Email is invalid')
    expect(page).to have_content('Sign Up')
  end

  scenario 'user provides missing information' do
    visit new_user_registration_path
    fill_in 'Username', with: ""
    fill_in 'Email', with: 'missingperson1@gmail.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'password'
    click_button 'Sign Up'

    expect(page).to_not have_content("You've successfully signed up!")
    expect(page).to have_content("Username can't be blank")
    expect(page).to have_content('Sign Up')
  end
end
