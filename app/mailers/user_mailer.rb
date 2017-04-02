class UserMailer < ApplicationMailer
  def new_user(user)
    @user = user
    mail(
      to: user.email,
      subject: "Success"
    )
  end

  def reminder(user)
    @user = user
    mail(
      to: user.email,
      subject: "There's over 1,200 quizzes waiting for you!"
    )
  end
end
