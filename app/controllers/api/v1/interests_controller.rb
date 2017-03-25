class Api::V1::InterestsController < ApiController
  def index
    user = User.find(params[:user_id])
    render json: user.interests
  end
end
