class InterestsController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    @interests = @user.interests
  end

  def new
    @user = current_user
    @old_interests = @user.interests
    @interests = []
    count = 10
    if @old_interests
      count -= @old_interests.length
    end
    count.times { @interests << @user.interests.new }
  end

  def create
    @user = current_user
    success = false
    if params.has_key?("interest")
      my_interest = @user.interests.create(interests_params(params['interest']))
      if my_interest.save
        success = true
      else
        success = false
      end
    else
      params['interests'].each do |interest|
        if interest['interest'] != ""
          my_interest = @user.interests.create(interests_params(interest))
          if my_interest.save
            success = true
          else
            success = false
          end
        end
      end
    end
    if success
      flash[:notice] = "Interests successfully added"
    else
      flash[:notice] = "One or more interests failed to save"
    end
    redirect_to root_path
  end

  def edit
    @user = current_user
    @interest = @user.interests.find(params[:id])
  end

  def update
    @user = current_user
    @interest = @user.interests.find(params[:id])
    if @interest.update_attributes(one_interest_params)
      flash[:notice] = "Interest updated successfully"
    else
      flash[:notice] = @interest.errors.messages
    end
    redirect_to user_interests_path(@user)
  end

  def destroy
    @user = current_user
    @interest = Interest.find(params[:id])
    @interest.delete
    flash[:notice] = "Interest successfully deleted"
    redirect_to user_interests_path(@user)
  end

  private

  def interests_params(interest_params)
    interest_params.permit(:interest, :user_id)
  end

  def one_interest_params
    params.require(:interest).permit(:interest, :user_id)
  end

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      flash[:notice] = "You need to sign in or sign up before continuing"
      redirect_to root_path
    end
  end
end
