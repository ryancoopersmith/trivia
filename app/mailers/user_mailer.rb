class UserMailer < ApplicationMailer
  def new_user(user)
    @user = user
    mail(
      to: user.email,
      subject: "Success"
    )
  end

  def reminder(user, question)
    @user = user
    @question = question
    mail(
      to: user.email,
      subject: "Can you answer this?"
    )
  end
end
