class Api::V1::ScoresController < ApiController
  def index
    render json: current_user.scores
  end

  def create
    current_user.scores.create(score: 0)
    # use like normal controller create action
    # save to database and send back json
  end

  before_action :authenticate_user!
end
