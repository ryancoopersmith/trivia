class EmailWorker
  include Sidekiq::Worker

  def email
    User.all.each do |user|
      UserMailer.reminder(user).deliver
    end
  end
end
