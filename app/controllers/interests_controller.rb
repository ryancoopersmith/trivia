class InterestsController < ApplicationController
  before_action :authenticate_user!

  def new
    @user = current_user
    @interests = []
    10.times { @interests << @user.interests.new }
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
      flash[:notice] = "One or more interests failed to add"
    end
    redirect_to root_path
  end

  def edit
    @user = current_user
    @old_interests = @user.interests
    count = 10 - @old_interests.length
    @interests = []
    count.times { @interests << @user.interests.new }
  end

  def update
    @user = current_user
    success = false
    if params.has_key?("interest")
      my_interest = @user.interests.update_attributes(interests_params(params['interest']))
      if my_interest.save
        success = true
      else
        success = false
      end
    else
      params['interests'].each do |interest|
        if interest['interest'] != ""
          my_interest = @user.interests.update_attributes(interests_params(interest))
          if my_interest.save
            success = true
          else
            success = false
          end
        end
      end
    end
    if success
      flash[:notice] = "Interests successfully updated"
    else
      flash[:notice] = "Interest failed to update"
    end
    redirect_to root_path
  end

  private

  def interests_params(interest_params)
    interest_params.permit(:interest, :user_id)
  end

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      flash[:notice] = "This page doesn't exist"
      redirect_to root_path
    end
  end
end
