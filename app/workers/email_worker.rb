class EmailWorker
  include Sidekiq::Worker

  def perform
    User.all.each do |user|
      UserMailer.reminder(user).deliver
    end
  end
end
