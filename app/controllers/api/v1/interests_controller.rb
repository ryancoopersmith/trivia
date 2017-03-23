class Api::V1::InterestsController < ApiController
  def index
    render json: current_user.interests
  end

  before_action :authenticate_user!
end
