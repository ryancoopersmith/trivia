class Api::V1::ScoresController < ApiController
  def index
    user = User.find(params[:user_id])
    render json: user.scores
  end

  def create
    user = User.find(params[:user_id])
    user.scores.create(score_params)
  end

  private

  def score_params
    params.require(:score_params).permit(:user_id, :score)
  end
end
