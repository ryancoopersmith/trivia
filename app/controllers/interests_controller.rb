class InterestsController < ApplicationController
  before_action :authenticate_user!

  def new
    @user = current_user
    10.times { @user.interests.new }
  end

  def create
    @user = current_user
  end

  def edit
    @user = current_user
  end

  def update
    @user = current_user
  end

  private

  def interests_params
    params.require(:review).permit(:interest, :user_id)
  end

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      flash[:notice] = "This page doesn't exist"
      redirect_to root_path
    end
  end
end
