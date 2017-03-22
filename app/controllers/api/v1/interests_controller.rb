class Api::V1::InterestsController < ApiController
  def index
    render json: current_user.interests
  end
end
