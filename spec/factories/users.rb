FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "johnnyboy#{n}@gmail.com" }
    username 'johnnyboy'
    password 'password'
    password_confirmation 'password'
  end
end
