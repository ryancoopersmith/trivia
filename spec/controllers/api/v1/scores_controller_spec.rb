require "rails_helper"

RSpec.describe Api::V1::ScoresController, type: :controller do
  describe "GET #index" do

    let(:user) { FactoryGirl.create(:user) }

    it "should return all of the user's scores" do
      Score.create(user: user, score: 300)
      Score.create(user: user, score: 100)

      get :index
      json = JSON.parse(response.body)
    end
  end
end
