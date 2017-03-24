class Api::V1::FavoriteCategoriesController < ApiController
  def index
    render json: current_user.favorite_categories
  end

  def create
    #save to database and send back json
  end

  before_action :authenticate_user!
end
