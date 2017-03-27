require "rails_helper"

RSpec.describe Api::V1::FavoriteCategoriesController, type: :controller do
  describe "GET #index" do

    let(:user) { FactoryGirl.create(:user) }

    it "should return all of the user's favorite categories" do
      FavoriteCategory.create(user: user, category: "History")
      FavoriteCategory.create(user: user, category: "Sports")

      get :index, params: { user_id: user.id }
      json = JSON.parse(response.body)

      expect(json.length).to eq(2)
      expect(json[0]["category"]).to eq("History")
      expect(json[1]["category"]).to eq("Sports")
    end
  end
end
