class EmailWorker
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence { hourly }
  # recurrence { daily(3) } (what I actually want)

  def email
    User.all.each do |user|
      UserMailer.reminder(user).deliver
    end
  end
end
