class Api::V1::ScoresController < ApiController
  def index
    render json: current_user.scores
  end

  def create
    current_user.scores.create(score_params)
  end

  before_action :authenticate_user!

  private

  def score_params
    params.require(:score_params).permit(:user_id, :score)
  end
end
