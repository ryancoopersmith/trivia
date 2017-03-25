class Api::V1::FavoriteCategoriesController < ApiController
  def index
    render json: current_user.favorite_categories
  end

  def create
    current_user.favorite_categories.create(favorite_category_params)
  end

  before_action :authenticate_user!

  private

  def favorite_category_params
    params.require(:favorite_category).permit(:user_id, :category)
  end
end
