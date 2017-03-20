# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
if Rails.env.development? || Rails.env.production?
  User.destroy_all
  User.create!(username: "ryancoopersmith", email: "ryancoopersmith1@gmail.com", password: "password", password_confirmation: "password", admin: true)
  User.create!(username: "typicaluser", email: "typicaluser12345@gmail.com", password: "typicalpassword", password_confirmation: "typicalpassword")
end
