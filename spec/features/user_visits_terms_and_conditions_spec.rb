require 'rails_helper'

feature 'user visits terms and conditions' do
  # As a trivia lover
  # I want to view the terms and conditions
  # So that I know the legal aspects of the site

  # [X] I should be able to find the terms and conditions on the index page
  # [X] I shouldn't have to be signed in
  scenario "user finds the terms and conditions from the index page" do
    visit root_path
    click_link "Terms and Conditions"

    expect(page).to have_content("This website is not affiliated with, sponsored by, or operated by Jeopardy Productions, Inc.")
  end
end
