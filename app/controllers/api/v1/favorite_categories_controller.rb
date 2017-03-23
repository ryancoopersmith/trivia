class Api::V1::FavoriteCategoriesController < ApiController
  def index
    render json: current_user.favorite_categories
  end

  before_action :authenticate_user!
end
