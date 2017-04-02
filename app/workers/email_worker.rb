require "net/https"
require 'json'

class EmailWorker
  include Sidekiq::Worker

  def perform
    User.all.each do |user|
      if user.interests
        random = rand(user.interests.length) + 1
        lower_category = user.interests[random].downcase
        updated_category = lower_category.gsub /([\:\s])/, '-'
        category = updated_category.gsub /([\?\!\(\)\,\'\"\&\.\*])/, ''
        uri = URI("https://s3.amazonaws.com/trivia-extraordinaire/categories/#{category}.json")
      else
        uri = URI("https://s3.amazonaws.com/trivia-extraordinaire/categories/history.json")
      end
      response = Net::HTTP.get_response(uri)
      questions = JSON.parse(response.body)
      random_question = rand(questions.length) + 1
      question = questions[random_question].question
      UserMailer.reminder(user, question).deliver
    end
  end
end
