require 'rails_helper'

feature 'user visits account page' do
  # As an authenticated user that wants to play some trivia
  # I should be able to see my trivia stats
  # So that I can see my favorite categories and score history
  #
  # [X] I should be able to see my best category
  # [X] I should be able to see my worst category
  # [X] I should be able to see my total number of wins
  # [X] I should be able to see my total number of losses
  # [X] I should be able to see my most played ("favorite") category
  # [X] I should be able to see any quizzes I've created
  let!(:user) { FactoryGirl.create(:user) }

  scenario "user clicks on 'My Account'" do
    visit root_path
    click_link "Sign In"
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Sign In"
    click_link "My Account"

    expect(page).to have_content("Edit")
    expect(page).to have_content("Unhappy?")
  end

  scenario "user successfully edits account information" do
    visit root_path
    click_link "Sign In"
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Sign In"

    click_link "My Account"
    fill_in "Username", with: "newusername"
    fill_in "Password", with: 'newpassword'
    fill_in "Password Confirmation", with: "newpassword"
    fill_in "Current Password", with: user.password
    click_button "Update"

    expect(page).to have_content('Your account has been updated successfully.')
  end

  scenario "user edits account with invalid information" do
    visit root_path
    click_link "Sign In"
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Sign In"

    click_link "My Account"
    fill_in "Email", with: "newemail@com"
    click_button "Update"

    expect(page).to_not have_content('Your account has been updated successfully.')
    expect(page).to have_content('Email is invalid')
  end

  scenario "user deletes account" do
    visit root_path
    click_link "Sign In"
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Sign In"

    click_link "My Account"
    click_button "Delete Account"

    expect(page).to_not have_content('Bye! We hope to see you again soon')
    expect(page).to_not have_content('Sign Out')
  end
end
