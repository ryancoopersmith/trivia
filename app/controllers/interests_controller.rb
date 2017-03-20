class InterestsController < ApplicationController
  before_action :authenticate_user!

  def new
    @user = current_user
    @interests = []
    10.times { @interests << @user.interests.new }
  end

  def create
    @user = current_user
    @interests = @user.interests.create(interests_params)
    @interests.each do |interest|
      if interest.save
        flash[:notice] = "Interests successfully added"
      else
        flash[:notice] = "Interests failed to add"
      end
    end
    #add a redirect
  end

  def edit
    @user = current_user
    @interests = @user.interests
  end

  def update
    @user = current_user
    @interests = @user.interests
    @interests.each do |interest|
      if interest.update_attributes(interests_params)
        flash[:notice] = "Interests successfully updated"
      else
        flash[:notice] = "Interest failed to update"
      end
    end
    #add a redirect
  end

  private

  def interests_params
    params.require(:interest).permit(:interest, :user_id)
  end

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      flash[:notice] = "This page doesn't exist"
      redirect_to root_path
    end
  end
end
