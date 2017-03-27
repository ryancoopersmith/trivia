require 'rails_helper'

feature "profile photo" do
  # As a user that wants to play some trivia
  # I should be able to upload a profile photo when I sign up
  # So that I can see my pretty face on the site

  # [X] I should be able to upload a profile photo when signing up and when viewing my account

  scenario "user uploads a profile photo" do
    visit root_path
    click_link "Sign Up"
    fill_in "Username", with: "jennyb"
    fill_in "Email", with: "jennyb2@gmail.com"
    fill_in "Password", with: "password"
    fill_in "Password Confirmation", with: "password"
    attach_file "Profile Photo", File.join(Rails.root, 'spec', 'support', 'images', 'golden_retriever_dog_animal.jpg')
    click_button "Sign Up"
    click_link "My Account"

    expect(page).to have_css("img[src*='golden_retriever_dog_animal.jpg']")
  end
end
