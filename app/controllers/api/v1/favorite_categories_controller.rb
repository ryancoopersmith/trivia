class Api::V1::FavoriteCategoriesController < ApiController
  def index
    user = User.find(params[:user_id])
    render json: user.favorite_categories
  end

  def create
    user = User.find(params[:user_id])
    FavoriteCategory.create(user: user, category: params[:_json])
  end
end
