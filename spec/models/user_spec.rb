require 'rails_helper'

describe User do
  # [X] It should have a unique email
  # [X] It should have a valid email

  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password) }

  it "should have a unique email" do
    expect {
      FactoryGirl.create(
      :user, email: "johnny3@gmail.com"
      )
    }.to_not raise_error
    expect {
      FactoryGirl.create(
      :user, email: "johnny3@gmail.com"
      )
    }.to raise_error
  end

  it "should have a valid email" do
    expect {
      FactoryGirl.create(
      :user, email: "johnny3@gmail"
      )
    }.to raise_error
    expect {
      FactoryGirl.create(
      :user, email: "@gmail.com"
      )
    }.to raise_error
  end
end
