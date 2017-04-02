class EmailWorker
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence { daily(3) }

  def email
    User.all.each do |user|
      UserMailer.reminder(user).deliver
    end
  end
end
