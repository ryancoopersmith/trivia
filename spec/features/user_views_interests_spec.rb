require 'rails_helper'

feature 'user visits interests page' do
  # As an authenticated user that wants to play some trivia
  # I should be able to see my interests
  # So that I know which quizzes will be tailored to me
  #
  # [X] I should be able to see my interests
  # [X] I should be able to add more interests
  # [X] I should be able to edit my interests
  # [X] I should be able to delete my interests
  let!(:user) { FactoryGirl.create(:user) }

  scenario "user clicks on 'view your interests'" do
    visit new_user_session_path
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Sign In"
    click_link "View Your Interests"

    expect(page).to have_content("Your Interests")
    expect(page).to have_content("Add Interests")
  end

  scenario "user successfully adds interests" do
    visit new_user_session_path
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Sign In"
    click_link "View Your Interests"

    click_link "Add Interests"
    fill_in "interest-field-1", with: "History"
    fill_in "interest-field-2", with: "Science"
    click_button "Add Interests"

    expect(page).to have_content("Interests successfully saved")
    click_link "View Your Interests"

    expect(page).to have_content("History")
    expect(page).to have_content("Science")
  end

  scenario "user unsuccessfully adds interests" do
    visit new_user_session_path
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Sign In"
    click_link "View Your Interests"

    click_link "Add Interests"
    fill_in "interest-field-1", with: "fun"
    fill_in "interest-field-2", with: "hi"
    click_button "Add Interests"

    expect(page).to have_content("One or more interests failed to save. Interests must be four letters or longer.")
  end

  scenario "user successfully edits interests" do
    visit new_user_session_path
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Sign In"
    click_link "View Your Interests"

    click_link "Add Interests"
    fill_in "interest-field-1", with: "History"
    fill_in "interest-field-2", with: "Science"
    click_button "Add Interests"
    click_link "View Your Interests"

    click_link "edit-interest-1"
    fill_in "Interest", with: "Sports"
    click_button "Edit Interest"

    expect(page).to have_content('Sports')
    expect(page).to_not have_content('History')
  end

  scenario "user unsuccessfully edits interests" do
    visit new_user_session_path
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Sign In"
    click_link "View Your Interests"

    click_link "Add Interests"
    fill_in "interest-field-1", with: "History"
    fill_in "interest-field-2", with: "Science"
    click_button "Add Interests"
    click_link "View Your Interests"

    click_link "edit-interest-1"
    fill_in "Interest", with: ""
    click_button "Edit Interest"

    expect(page).to have_content("Interest can't be blank")
  end

  scenario "user deletes interests" do
    visit new_user_session_path
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password
    click_button "Sign In"
    click_link "View Your Interests"
    click_link "Add Interests"
    fill_in "interest-field-1", with: "History"
    fill_in "interest-field-2", with: "Science"
    click_button "Add Interests"
    click_link "View Your Interests"

    click_link "delete-interest-1"
    click_link "View Your Interests"

    expect(page).to have_content('Science')
    expect(page).to_not have_content('History')
  end
end
