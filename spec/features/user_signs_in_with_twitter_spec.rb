require 'rails_helper'

describe "Twitter Authentication" do
  # As a frequent twitter user that wants to play some trivia
  # I should be able to sign in using my twitter information
  # So that I can save my progress and tweet my score
  #
  # [X] I must provide a valid email
  # [X] I must provide a valid password
  # [X] I should see an error message if I enter an invalid email or password
  # [X] I should remain on the sign in page if I enter invalid information
  # [X] I should see a success message if I successfully sign in
  # [X] I should be taken to the root path when I sign in

  # before do
  #   request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:twitter]
  # end

  it "can sign in user with Twitter account" do
    visit new_user_session_path
    expect(page).to have_content("Sign in with Twitter")
    click_link "Sign in with Twitter"
    expect(page).to have_content("Sign Out")
  end

  it "can handle authentication error" do
    OmniAuth.config.mock_auth[:twitter] = :invalid_credentials
    visit new_user_session_path
    expect(page).to have_content("Sign in with Twitter")
    click_link "Sign in with Twitter"
    expect(page).to have_content('Could not authenticate you from Twitter')
  end
end
