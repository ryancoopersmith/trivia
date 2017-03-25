class Api::V1::FavoriteCategoriesController < ApiController
  def index
    user = User.find(params[:user_id])
    render json: user.favorite_categories
  end

  def create
    user = User.find(params[:user_id])
    user.favorite_categories.create(favorite_category_params)
  end

  private

  def favorite_category_params
    params.require(:favorite_category).permit(:user_id, :category)
  end
end
