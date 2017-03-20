FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "johnnyboy#{n}@gmail.com" }
    sequence(:username) { |n| "johnnyboy#{n}" }
    password 'password'
    password_confirmation 'password'
  end
end
