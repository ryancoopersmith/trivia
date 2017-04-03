require 'date'

class EmailWorker
  include Sidekiq::Worker

  def perform
    User.all.each do |user|
      if Time.at(user.updated_at + (7*24*60*60)).to_date <= Time.at(Time.now).to_date
        UserMailer.reminder(user).deliver
      end
    end
  end
end
