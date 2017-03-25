class Api::V1::ScoresController < ApiController
  def index
    user = User.find(params[:user_id])
    render json: user.scores
  end

  def create
    user = User.find(params[:user_id])
    Score.create(user: user, score: score_params[:score])
  end

  private

  def score_params
    params.require(:score).permit(:user_id, :score)
  end
end
