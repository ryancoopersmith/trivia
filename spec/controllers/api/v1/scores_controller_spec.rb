require "rails_helper"

RSpec.describe Api::V1::ScoresController, type: :controller do
  describe "GET #index" do

    let(:user) { FactoryGirl.create(:user) }

    it "should return all of the user's scores" do
      Score.create(user: user, score: 300)
      Score.create(user: user, score: 100)

      get :index, params: { user_id: user.id }
      json = JSON.parse(response.body)

      expect(json.length).to eq(2)
      expect(json[0]["score"]).to eq(300)
      expect(json[1]["score"]).to eq(100)
    end
  end
end
