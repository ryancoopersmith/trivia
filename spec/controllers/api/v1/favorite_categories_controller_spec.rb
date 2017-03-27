require "rails_helper"

RSpec.describe Api::V1::FavoriteCategoriesController, type: :controller do
  describe "GET #index" do

    let(:user) { FactoryGirl.create(:user) }

    it "should return all of the user's favorite categories" do
      FavoriteCategory.create(user: user, category: "History")
      FavoriteCategory.create(user: user, category: "Sports")

      get :index
      json = JSON.parse(response.body)

      expect(json["favorite_categories"].length).to eq(2)
      expect(json["favorite_categories"][0]["category"]).to eq("History")
      expect(json["favorite_categories"][1]["category"]).to eq("Sports")
    end
  end
end
